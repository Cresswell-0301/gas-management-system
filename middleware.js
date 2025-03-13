import { NextResponse } from "next/server";

const allowedIPs = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(", ") : [];

export function middleware(req) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip || "::1";

    if (!allowedIPs.includes(ip) && ip !== "::1" && ip !== "127.0.0.1") {
        return NextResponse.redirect(new URL("/invalid-device", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        
        "/sales",

        "/companies",
        "/companies/add",

        "/gas",
        "/gas/add",

        "/users",
        "/users/add",

        "/api/orders",
        "/api/orders/[order_id]",

        "/api/companies",
        "/api/gas",

        "/api/users",
        "/api/users/[user_id]",

        "/api/export-pdf",
    ],
};
