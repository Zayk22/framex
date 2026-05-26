import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes — accessible without authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/movies",
  "/movies/(.*)",
  "/movie/(.*)",
  "/anime",
  "/anime/(.*)",
  "/tv-shows",
  "/kids",
  "/watch/(.*)",
  "/watchlist",
  "/api/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};