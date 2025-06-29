export default async function handler(req, res) {
  const { province } = req.query;
  const apiKey = process.env.MAYAR_API_KEY;

  const response = await fetch(`https://api.mayar.id/v1/logistics/cities?province=${province}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
