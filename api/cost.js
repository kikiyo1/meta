export default async function handler(req, res) {
  const apiKey = process.env.MAYAR_API_KEY;
  const body = req.body;

  const response = await fetch('https://api.mayar.id/v1/logistics/cost', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
