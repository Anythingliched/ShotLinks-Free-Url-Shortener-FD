import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/urls/create",
    "/about",
    "/terms",
    "/privacy",
    "/faq",
    // Allow short code redirects and custom aliases without authentication
    /^\/([a-zA-Z0-9-]+)$/,
  ],
  ignoredRoutes: [
    "/api/urls/redirect/(.*)",
  ],
});

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|.*\\..*).*)",
    // Optional: Match API routes
    "/(api|trpc)(.*)",
  ],
}; 