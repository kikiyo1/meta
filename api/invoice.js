export default async function handler(req, res) {
  const apiKey = process.env.MAYAR_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not set' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, items, total } = req.body;

  try {
    const response = await fetch('https://api.mayar.id/v1/invoices', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        items: items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
        total,
        currency: 'IDR',
        success_redirect_url: 'https://metarak.hadesolution.id/checkout-success',
        failure_redirect_url: 'https://metarak.hadesolution.id/checkout-cancel'
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Mayar invoice error:', data);
      return res.status(response.status).json({ error: data.message || 'Invoice creation failed' });
    }

    res.status(200).json({ invoice_url: data.invoice_url });
  } catch (err) {
    console.error('Invoice error:', err);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
}