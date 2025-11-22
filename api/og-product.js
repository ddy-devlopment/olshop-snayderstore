export const config = {
    runtime: "edge",
};

export default async function handler(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Ambil data produk dari API kamu
    const apiURL = "https://snayders.web.id/api/products";
    const products = await fetch(apiURL).then(r => r.json());
    const product = products.find(p => p.id === id);

    // Jika produk tidak ditemukan
    const title = product?.nama || "Produk Tidak Ditemukan";
    const desc = product?.deskripsi_singkat || "Produk digital Snayders Store";
    const image = product?.gambar || "https://snayders.web.id/default-product.png";

    const html = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${image}">
<meta property="og:url" content="https://snayders.web.id/product-dg?id=${id}">
<meta property="og:type" content="product">
<meta name="twitter:card" content="summary_large_image">

<!-- Ini penting, agar saat user klik, diarahkan ke page normal -->
<meta http-equiv="refresh" content="0; url=/product-dg?id=${id}">
</head>
<body></body>
</html>
`;

    return new Response(html, {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
        },
    });
}
