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
        "/sales/[orderId]/edit",

        "/companies",
        "/companies/add",
        "/companies/[companyId]/edit",

        "/gas",
        "/gas/add",
        "/gas/[gasId]/edit",

        "/users",
        "/users/add",

        "/api/orders",
        "/api/orders/[orderId]",

        "/api/companies",
        "/api/companies/[companyId]",

        "/api/gas",
        "/api/gas/[gasId]",

        "/api/users",

        "/api/export-pdf",
    ],
};
