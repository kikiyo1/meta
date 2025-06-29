// Di dalam CheckoutPage.jsx, ganti fungsi handleSubmit:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);

  try {
    const res = await axios.post('/api/invoice', {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      items,
      total: subtotal + tax + (shippingCost || 0)
    });

    window.location.href = res.data.invoice_url;
  } catch (err) {
    toast({ title: 'Gagal membuat invoice Mayar', variant: 'destructive' });
  } finally {
    setIsProcessing(false);
  }
};