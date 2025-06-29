import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    city: '', postalCode: '', province: '', courier: 'jne'
  });
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [shippingCost, setShippingCost] = useState(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    axios.get('/api/provinces')
      .then(res => {
        console.log('Provinces response:', res);
        setProvinces(res.data.data);
      })
      .catch(() => toast({ title: 'Gagal memuat provinsi', variant: 'destructive' }));
  }, []);

  useEffect(() => {
    if (formData.province) {
      axios.get(`/api/cities?province=${formData.province}`)
        .then(res => {
          console.log('Cities response:', res);
          setCities(res.data.data);
        })
        .catch(() => toast({ title: 'Gagal memuat kota', variant: 'destructive' }));
    }
  }, [formData.province]);

  const handleCheckShipping = () => {
    if (!formData.city || !formData.courier) return;
    setLoadingShipping(true);

    axios.post('/api/cost', {
      origin: '501',
      destination: formData.city,
      courier: formData.courier,
      weight: 1000
    })
      .then(res => {
        console.log('Shipping cost response:', res);
        setShippingCost(res.data.costs[0].cost);
      })
      .catch(() => toast({ title: 'Gagal menghitung ongkir', variant: 'destructive' }))
      .finally(() => setLoadingShipping(false));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!shippingCost) {
      toast({ title: "Silakan hitung ongkir terlebih dahulu.", variant: 'destructive' });
      setIsProcessing(false);
      return;
    }

    toast({
      title: "Mengalihkan ke Pembayaran...",
      description: "Anda akan dialihkan ke halaman pembayaran Mayar.id."
    });

    setTimeout(() => {
      navigate('/checkout-success');
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-8">Tidak ada produk untuk di-checkout.</p>
          <Link to="/products"><Button>Mulai Belanja</Button></Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax + (shippingCost || 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/cart" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Keranjang
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">Checkout</h1>
        </motion.div>
        {/* Form checkout (dipersingkat) */}
        <form onSubmit={handleSubmit}>
          {/* ...input & ringkasan... */}
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;