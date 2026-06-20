/**
 * Estimates reading time for a given text based on word count.
 * @param text The markdown or plain text content.
 * @returns Estimated reading time in minutes (minimum 1).
 */
export function getReadingTime(text: string): number {
    if (!text) return 0;
    const wordsPerMinute = 200;

    // Basic markdown cleanup to avoid counting syntax characters as words
    const cleanText = text
        .replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags
        .replace(/[#*`_\[\]()\-+]/g, " ") // Replace markdown characters with space
        .trim();

    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
