// api/verify.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Ambil data dari environment variable
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Cek apakah kredensial cocok dengan username ATAU email
  if ((username === adminUsername || username === adminEmail) && password === adminPassword) {
    // Buat token sederhana (base64 dari "username:timestamp")
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: 'Username, email, atau password salah' });
  }
}