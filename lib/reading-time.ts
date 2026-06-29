/**
 * Calculate reading time for blog content
 * Based on average reading speed of 200 words per minute
 * @param content - HTML content string
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '')
  
  // Count words (split by whitespace, filter empty strings)
  const words = text.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length
  
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200
  
  // Calculate reading time (minimum 1 minute)
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  
  return Math.max(readingTime, 1)
}
