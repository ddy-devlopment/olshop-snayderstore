export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const apiURL = "https://snayders.web.id/api/products";

  let products = [];
  try {
    products = await fetch(apiURL).then(r => r.json());
  } catch (e) {}

  const product = products.find(p => p.id === id);

  const title = product?.nama || "Produk Tidak Ditemukan";
  const desc = product?.deskripsi_singkat || "Produk digital Snayders Store";
  const image = product?.gambar || "https://snayders.web.id/default-product.png";

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${image}" />
<meta property="og:type" content="product" />
<meta property="og:url" content="https://snayders.web.id/product-dg?id=${id}" />

<meta http-equiv="refresh" content="0; url=https://snayders.web.id/product-dg?id=${id}" />
</head>
<body></body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}
