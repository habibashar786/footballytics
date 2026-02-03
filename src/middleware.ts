import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/api/players",
    "/api/clubs", 
    "/api/insights",
    "/sign-in",
    "/sign-up",
    "/players",
    "/clubs",
    "/leagues",
    "/fans",
    "/investors",
    "/events",
  ],
  // Routes that can be accessed while signed out but get user info if signed in
  ignoredRoutes: [
    "/api/webhook",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
