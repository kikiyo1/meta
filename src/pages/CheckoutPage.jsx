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
      toast({ title: 'Silakan hitung ongkir terlebih dahulu.', variant: 'destructive' });
      setIsProcessing(false);
      return;
    }

    toast({
      title: 'Mengalihkan ke Pembayaran...',
      description: 'Anda akan dialihkan ke halaman pembayaran Mayar.id.'
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 font-semibold">Informasi Pelanggan</div>
              <input type="text" name="firstName" placeholder="Nama Depan" required className="w-full mb-2 p-2 border" value={formData.firstName} onChange={handleInputChange} />
              <input type="text" name="lastName" placeholder="Nama Belakang" required className="w-full mb-2 p-2 border" value={formData.lastName} onChange={handleInputChange} />
              <input type="email" name="email" placeholder="Email" required className="w-full mb-2 p-2 border" value={formData.email} onChange={handleInputChange} />
              <input type="tel" name="phone" placeholder="Nomor Telepon" required className="w-full mb-2 p-2 border" value={formData.phone} onChange={handleInputChange} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 font-semibold">Alamat Pengiriman</div>
              <textarea name="address" placeholder="Alamat Lengkap" required className="w-full mb-2 p-2 border" value={formData.address} onChange={handleInputChange} />
              <select name="province" className="w-full mb-2 p-2 border" onChange={handleInputChange} required>
                <option value="">Pilih Provinsi</option>
                {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <select name="city" className="w-full mb-2 p-2 border" onChange={handleInputChange} required>
                <option value="">Pilih Kota</option>
                {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input type="text" name="postalCode" placeholder="Kode Pos" required className="w-full mb-2 p-2 border" value={formData.postalCode} onChange={handleInputChange} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 font-semibold">Kurir Pengiriman</div>
              <select name="courier" className="w-full mb-2 p-2 border" onChange={handleInputChange} required>
                <option value="jne">JNE</option>
                <option value="tiki">TIKI</option>
                <option value="pos">POS</option>
              </select>
              <Button type="button" onClick={handleCheckShipping} disabled={loadingShipping || !formData.city}>
                {loadingShipping ? 'Menghitung Ongkir...' : 'Hitung Ongkir'}
              </Button>
              {shippingCost !== null && <p className="mt-2 text-green-600">Ongkir: Rp {shippingCost.toLocaleString('id-ID')}</p>}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 font-semibold">Metode Pembayaran</div>
              <div className="p-4 border border-purple-500 rounded-lg bg-purple-50">
                <span className="font-medium">Bayar dengan Mayar.id (Bank, E-Wallet, Kartu Kredit)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h3>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" alt={item.name} src={item.image || 'https://via.placeholder.com/100'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-800">Rp {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-6 border-t pt-4">
              <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span>Rp {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Ongkir</span><span>Rp {(shippingCost || 0).toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Pajak (10%)</span><span>Rp {tax.toLocaleString()}</span></div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-purple-600">Rp {total.toLocaleString()}</span></div>
              </div>
            </div>
            <Button type="submit" disabled={isProcessing} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3">
              {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
