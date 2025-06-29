export default async function handler(req, res) {
  const apiKey = process.env.MAYAR_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not set' });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://api.mayar.id/v1/logistics/cost', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Cost error:', error);
    res.status(500).json({ error: 'Failed to fetch shipping cost' });
  }
}
