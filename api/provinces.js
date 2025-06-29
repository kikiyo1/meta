export default async function handler(req, res) {
  const apiKey = process.env.MAYAR_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not set' });

  try {
    const response = await fetch('https://api.mayar.id/v1/logistics/provinces', {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    const raw = await response.text(); // ambil response mentah
    console.error('Mayar API raw response:', raw); // log untuk cek isinya

    const data = JSON.parse(raw); // coba parse
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Provinces error:', error);
    res.status(500).json({ error: 'Failed to fetch provinces' });
  }
}

