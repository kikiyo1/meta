export default async function handler(req, res) {
  const apiKey = process.env.MAYAR_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not set' });
  }

  try {
    const response = await fetch('https://api.mayar.id/v1/logistics/provinces', {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('API provinces error:', error);
    res.status(500).json({ error: 'Failed to fetch provinces' });
  }
}
