// Simple client-side rate limiter for form submissions.
// Tracks attempts in localStorage with a sliding window.
type Bucket = { count: number; resetAt: number };

export function checkRateLimit(key: string, max = 3, windowMs = 60_000): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(`rl:${key}`);
  const now = Date.now();
  let bucket: Bucket = raw ? JSON.parse(raw) : { count: 0, resetAt: now + windowMs };
  if (now > bucket.resetAt) bucket = { count: 0, resetAt: now + windowMs };
  if (bucket.count >= max) {
    localStorage.setItem(`rl:${key}`, JSON.stringify(bucket));
    return false;
  }
  bucket.count++;
  localStorage.setItem(`rl:${key}`, JSON.stringify(bucket));
  return true;
}
