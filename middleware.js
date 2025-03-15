import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    signInUrl: "/sign-in",

    publicRoutes: ["/sign-in(.*)", "/sign-up(.*)"],

    ignoredRoutes: [],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};