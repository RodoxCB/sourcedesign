// Basic rate limiting for contact form
// This is a simple implementation using a Map (in production, use Redis or similar)

const rateLimitMap = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3; // Max 3 submissions per 15 minutes

export default async (request, context) => {
  // Only apply rate limiting to POST requests to contact function
  if (request.method !== 'POST' || !request.url.includes('/.netlify/functions/contact')) {
    return context.next();
  }

  const clientIP = request.headers.get('x-forwarded-for') ||
                   request.headers.get('x-real-ip') ||
                   request.headers.get('cf-connecting-ip') ||
                   'unknown';

  const key = `contact-${clientIP}`;
  const now = Date.now();

  // Get current rate limit data
  let rateLimitData = rateLimitMap.get(key);

  if (!rateLimitData) {
    // First request from this IP
    rateLimitData = {
      count: 1,
      resetTime: now + WINDOW_MS
    };
    rateLimitMap.set(key, rateLimitData);
  } else {
    // Check if window has expired
    if (now > rateLimitData.resetTime) {
      // Reset the window
      rateLimitData = {
        count: 1,
        resetTime: now + WINDOW_MS
      };
      rateLimitMap.set(key, rateLimitData);
    } else {
      // Increment counter
      rateLimitData.count++;

      // Check if limit exceeded
      if (rateLimitData.count > MAX_REQUESTS) {
        // Rate limit exceeded
        const remainingTime = Math.ceil((rateLimitData.resetTime - now) / 1000 / 60);

        return new Response(JSON.stringify({
          error: `Muitas tentativas. Tente novamente em ${remainingTime} minutos.`
        }), {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': remainingTime * 60,
            'X-RateLimit-Limit': MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitData.resetTime.toString()
          }
        });
      }
    }
  }

  // Clean up old entries periodically (simple cleanup)
  if (Math.random() < 0.1) { // 10% chance on each request
    const cutoff = now - WINDOW_MS;
    for (const [k, v] of rateLimitMap.entries()) {
      if (v.resetTime < cutoff) {
        rateLimitMap.delete(k);
      }
    }
  }

  // Add rate limit headers to response
  const response = await context.next();

  // Clone the response to add headers
  const newResponse = new Response(response.body, response);

  const remaining = Math.max(0, MAX_REQUESTS - rateLimitData.count);
  newResponse.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString());
  newResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
  newResponse.headers.set('X-RateLimit-Reset', rateLimitData.resetTime.toString());

  return newResponse;
};
