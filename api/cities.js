export default async function handler(req, res) {
  const { province } = req.query;
  const apiKey = process.env.MAYAR_API_KEY;
  if (!province || !apiKey) return res.status(400).json({ error: 'Missing province or API key' });

  try {
    const response = await fetch(`https://api.mayar.id/v1/logistics/cities?province=${province}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Cities error:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
}
