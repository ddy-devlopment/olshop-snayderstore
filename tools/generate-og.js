// tools/generate-og.js
import fs from "fs";
import fetch from "node-fetch";

const apiURL = "https://snayders.web.id/api/products";

async function generateOG() {
    let products = [];

    try {
        products = await fetch(apiURL).then(r => r.json());
    } catch (err) {
        console.error("Gagal mengambil API");
        return;
    }

    if (!fs.existsSync("./og")) {
        fs.mkdirSync("./og");
    }

    products.forEach(p => {
        const html = `
<!DOCTYPE html>
<html>
<head>
<meta property="og:title" content="${p.nama}">
<meta property="og:description" content="${p.deskripsi_singkat}">
<meta property="og:image" content="${p.gambar}">
<meta property="og:type" content="product">
<meta property="og:url" content="https://snayders.web.id/product-dg.html?id=${p.id}">
<meta http-equiv="refresh" content="0; url=https://snayders.web.id/product-dg.html?id=${p.id}" />
</head>
<body></body>
</html>
        `;
        
        fs.writeFileSync(`./og/${p.id}.html`, html);
        console.log("OG dibuat:", p.id);
    });

    console.log("OG selesai dibuat.");
}

generateOG();
