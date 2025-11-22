import { NextResponse } from "next/server";

export function middleware(req) {
    const userAgent = req.headers.get("user-agent") || "";
    const url = new URL(req.url);

    // Bot sosial media (WhatsApp, Telegram, FB, Discord)
    const bots = ["facebook", "whatsapp", "telegram", "discord", "twitterbot", "linkedin"];

    const isBot = bots.some(bot => userAgent.toLowerCase().includes(bot));

    // Jika bot membuka link product-dg
    if (url.pathname === "/product-dg" && isBot) {
        const id = url.searchParams.get("id") || "";
        return NextResponse.rewrite(
            new URL(`/api/og-product?id=${id}`, req.url)
        );
    }

    return NextResponse.next();
}
