function setupCopyButtons() {
    const codeBlocks = document.querySelectorAll("pre.astro-code");

    codeBlocks.forEach((block) => {
        // Avoid duplicate buttons
        if (block.querySelector(".copy-code-button")) return;

        // Ensure the container is relatively positioned
        (block as HTMLElement).style.position = "relative";

        const button = document.createElement("button");
        button.className = "copy-code-button";
        button.type = "button";
        button.setAttribute("aria-label", "Copy code to clipboard");
        button.innerHTML = "Copy";

        button.addEventListener("click", async () => {
            // Shiki code structure is usually pre.astro-code > code
            const codeElement = block.querySelector("code");
            const textToCopy = codeElement ? codeElement.innerText : block.textContent || "";

            try {
                await navigator.clipboard.writeText(textToCopy);
                button.innerHTML = "Copied!";
                button.classList.add("copied");

                setTimeout(() => {
                    button.innerHTML = "Copy";
                    button.classList.remove("copied");
                }, 1500);
            } catch (err) {
                console.error("Failed to copy: ", err);
                button.innerHTML = "Error";
                setTimeout(() => {
                    button.innerHTML = "Copy";
                }, 1500);
            }
        });

        block.appendChild(button);
    });
}

// Run on page load
setupCopyButtons();
document.addEventListener("astro:page-load", setupCopyButtons);
document.addEventListener("astro:after-swap", setupCopyButtons);
export {};
