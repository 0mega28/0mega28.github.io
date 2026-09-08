---
title: "The JVM Has Never Heard of Your List<String>"
description: "You write List<String>. The compiler checks it, enforces it, then erases it. By the time bytecode runs, the JVM sees List — nothing more. Here's what that means."
publishDate: 2026-09-07
series: "java-generics"
order: 1
tags: ["java", "generics", "jvm", "type-erasure", "bytecode"]
draft: false
---

Run this:

```java
List<String> strings = new ArrayList<>();
List<Integer> integers = new ArrayList<>();

System.out.println(strings.getClass() == integers.getClass());
// true
```

Same class. At runtime, `List<String>` and `List<Integer>` resolve to the same `Class` object. The JVM has no idea you asked for different types. It sees `ArrayList` both times — no parameter, no distinction, nothing.

It's a deliberate design decision behind Java generics: the compiler enforces your types, then strips them out before the JVM ever sees your code. The mechanism is called **type erasure**, and every generic quirk in the language traces back to it.

---

## What the Compiler Does to Your Code

Write a generic class:

```java
public class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}
```

Compile it and run `javap -c -p Box`. Here's what the JVM actually received:

```plaintext
public class Box<T> {
  private T value;

  public void set(T);
    Code:
         0: aload_0
         1: aload_1
         2: putfield      #7       // Field value:Ljava/lang/Object;
         5: return

  public T get();
    Code:
         0: aload_0
         1: getfield      #7       // Field value:Ljava/lang/Object;
         4: areturn
}
```

Look at the comments the disassembler generates. `Field value:Ljava/lang/Object;`. The field's type isn't `T` — it's `Object`. The method `set` takes an `Object`. The method `get` returns an `Object`. The bytecode descriptors use `java.lang.Object` everywhere `T` appeared in the source. (The `T` still visible in javap's method headers comes from a metadata attribute the JVM ignores — more on that in a later post.)

If the type parameter has a bound (say, `<T extends Number>`), the compiler uses that bound instead:

```java
public class NumericBox<T extends Number> {
    private T value;

    public double doubleValue() {
        return value.doubleValue();
    }
}
```

Here, `T` becomes `Number` in the compiled class. The rule is mechanical: unbounded parameters erase to `Object`, bounded parameters erase to their first bound.

---

## Where the Casts Come From

If `Box.get()` returns `Object` at the bytecode level, how does `String value = box.get()` compile without a cast in the source?

The compiler inserts a cast at the call site. Look at the bytecode for a method that uses `Box<String>`:

```plaintext
0: new           #7       // class Box
3: dup
4: invokespecial #9       // Method Box."<init>":()V
7: astore_1
8: aload_1
9: ldc           #10      // String hello
11: invokevirtual #12     // Method Box.set:(Ljava/lang/Object;)V
14: aload_1
15: invokevirtual #16     // Method Box.get:()Ljava/lang/Object;
18: checkcast     #20     // class java/lang/String
21: astore_2
```

Line 11: `Box.set` receives a `java/lang/Object`. Line 15: `Box.get` returns a `java/lang/Object`. Line 18: the compiler inserted a `checkcast` instruction to narrow the `Object` back to `String`.

This is the entire generic contract at runtime: the JVM stores `Object`, returns `Object`, and the compiler scatters `checkcast` instructions at every call site to enforce the types you declared. If a cast fails, you get a `ClassCastException` — the same exception you'd get without generics at all.

---

## Why Erasure Exists

Java 5 shipped generics in 2004. By that point, billions of lines of pre-generic Java were running in production. The hard constraint wasn't that older JVMs had to run new binaries—Java 5 bumped the classfile version anyway. The true constraint was *migration compatibility*. The ecosystem couldn't fracture. Pre-generic legacy code and newly written generic code had to interoperate seamlessly in the same heap, calling each other's methods without adapter layers or forced recompilation.

To pull this off, the bytecode execution model couldn't change. No new instructions. Generics had to be a source-level abstraction that compiled down to the exact same execution instructions you'd write by hand with casts. The compiler does the heavy lifting `[1]`, and the JVM execution engine remains completely blind to your types. (The compiler *does* leave metadata in the classfile's `Signature` attribute for reflection to read—which is how frameworks like Spring work, and what I'll cover in the next post—but the runtime instructions ignore it entirely.)

This wasn't an oversight or a shortcut. The GJ (Generic Java) paper `[2]` laid out this **homogeneous translation** deliberately: every instantiation of a generic class shares a single compiled class. The alternative—generating a separate class for each instantiation, as C++ templates and later C# reified generics do—was ruled out because it would have shattered backward compatibility.

---

## What Erasure Breaks

The consequences are concrete. Every one of these is a direct result of type information not existing at runtime.

`instanceof` doesn't work with type parameters. This code won't compile:

```java
if (obj instanceof List<String>) { ... }
// error: illegal generic type for instanceof
```

The check is impossible because at runtime, every `List` is the same `List`. The JVM has no way to distinguish a `List` that was declared as `List<String>` from one declared as `List<Integer>`.

You can't create generic arrays. `new T[]` is illegal. Since the JVM doesn't know what `T` is, it can't allocate an array of the correct component type. The standard workaround (`(T[]) new Object[n]`) produces an unchecked cast warning because the cast can't be verified at runtime.

You can't overload on type parameters alone. These two methods have the same erasure and can't coexist in the same class:

```java
void process(List<String> strings) { ... }
void process(List<Integer> integers) { ... }
// error: both methods have same erasure
```

After erasure, both signatures become `process(List)`.

Heap pollution is the subtlest consequence. Since the JVM doesn't track type arguments, nothing stops you from smuggling the wrong type into a generic collection at runtime:

```java
List<String> strings = new ArrayList<>();
strings.add("hello");

List raw = strings;           // erase to raw type
List<Integer> integers = raw; // reinterpret as List<Integer>
integers.add(42);             // JVM sees List.add(Object) — no check

System.out.println(raw);
// [hello, 42] — both elements coexist in one list

Integer n = integers.get(0);
// ClassCastException: String cannot be cast to Integer

String s = strings.get(1);
// ClassCastException: Integer cannot be cast to String
```

The `add` succeeds because the JVM dispatches it as `List.add(Object)`. It has no idea `integers` was declared as `List<Integer>`. The exceptions only surface on `get`, when the compiler's inserted `checkcast` tries to narrow the returned `Object` to the declared type. The corruption happened at `integers.add(42)`. The crash happens somewhere else entirely, on a read through a different reference.

---

## What Comes Next: Valhalla

Project Valhalla `[3]` is the long-running effort to give the JVM actual awareness of generic type arguments. The headline feature for generics is **specialized generics**: a `List<int>` that stores primitive ints directly, without boxing, because the JVM knows the type argument at runtime. If Valhalla ships in its current form, it will be the first time in Java's history that the JVM sees what the programmer wrote inside the angle brackets. Twenty years of erasure, slowly unwinding.

---

## References

[1] Gosling, J. et al. *The Java Language Specification*, §4.6: Type Erasure. https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.6

[2] Bracha, G. et al. "Making the future safe for the past: Adding Genericity to the Java Programming Language." OOPSLA, 1998. https://homepages.inf.ed.ac.uk/wadler/gj/Documents/gj-oopsla.pdf

[3] OpenJDK. "Project Valhalla." https://openjdk.org/projects/valhalla/
