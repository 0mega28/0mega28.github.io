---
title: "Type Erasure in Java Generics"
description: "How the Java compiler erases generic type information at runtime."
publishDate: 2026-01-01
series: "java-generics"
order: 1
tags: ["java", "generics", "jvm"]
draft: true
---

Java generics were introduced in JDK 5 to provide compile-time type safety. However, to maintain backward compatibility with older JVM versions, the compiler implements generics using a process called type erasure. 

This post looks at how type erasure works under the hood and what the compiler does to your code during compilation.

## How Type Erasure Works

When the Java compiler compiles your generic classes and methods, it replaces all generic type parameters with their bounds. If a type parameter is unbounded, it is replaced with `Object`.

### Unbounded Type Parameters

Consider the following simple generic box class:

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

Because `T` is unbounded, the Java compiler erases `T` and replaces it with `Object`. The compiled bytecode is equivalent to:

```java
public class Box {
    private Object value;

    public void set(Object value) {
        this.value = value;
    }

    public Object get() {
        return value;
    }
}
```

### Bounded Type Parameters

If a type parameter is bounded, the compiler uses the first bound instead. For example:

```java
public class NumericBox<T extends Number> {
    private T value;

    public double doubleValue() {
        return value.doubleValue();
    }
}
```

The compiler replaces `T` with `Number`. After compilation, the class becomes:

```java
public class NumericBox {
    private Number value;

    public double doubleValue() {
        return value.doubleValue();
    }
}
```

## Inspecting Compiled Bytecode

We can inspect the compiled bytecode of our generic classes using the `javap` command-line tool. Let's look at what the compiler generates for a method invocation that uses a generic class.

Here is a snippet of bytecode showing how the JVM performs casts at the call site:

```plaintext {3,5}
0: new           #2  // class Box
3: dup
4: invokespecial #3  // Method Box."<init>":()V
7: astore_1
8: aload_1
9: ldc           #4  // String Hello
11: invokevirtual #5  // Method Box.set:(Ljava/lang/Object;)V
14: aload_1
15: invokevirtual #6  // Method Box.get:()Ljava/lang/Object;
18: checkcast     #7  // class java/lang/String
21: astore_2
```

Notice the call to `Box.set` takes an `Object` reference at line 11. When calling `Box.get` at line 15, the compiler inserts a `checkcast` instruction at line 18 to cast the returned `Object` back to a `String`. This is how type safety is enforced without the JVM knowing about generics at runtime.

## Summary

Type erasure is a compile-time mechanism. The compiler replaces type parameters with bounds or `Object`, inserts explicit casts at call sites, and generates bridge methods when necessary to preserve polymorphism. This allows new generic code to run on older Java virtual machines seamlessly.
