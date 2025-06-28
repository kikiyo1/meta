import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, MapPin, User, Phone, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const MAYAR_API_KEY = 'REPLACE_WITH_YOUR_MAYAR_API_KEY';
const MAYAR_TOKEN = 'REPLACE_WITH_YOUR_MAYAR_TOKEN';

const shippingOptions = [
  { id: 'jne_reg', name: 'JNE REG (Ekonomis)', price: 18000, eta: '3-5 hari kerja' },
  { id: 'wahana', name: 'Wahana Express (Cepat)', price: 25000, eta: '2-4 hari kerja' },
  { id: 'sicepat_gokil', name: 'SiCepat Gokil (Kargo)', price: 45000, eta: '4-7 hari kerja' },
  { id: 'indah_cargo', name: 'Indah Cargo (Kargo Berat)', price: 80000, eta: '5-10 hari kerja' },
  { id: 'gosend', name: 'GoSend SameDay (Instan)', price: 60000, eta: 'hari ini' },
];

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [shippingMethod, setShippingMethod] = useState(shippingOptions[0].id);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (MAYAR_API_KEY === 'REPLACE_WITH_YOUR_MAYAR_API_KEY' || MAYAR_TOKEN === 'REPLACE_WITH_YOUR_MAYAR_TOKEN') {
      toast({
        title: "Konfigurasi Mayar.id Belum Selesai!",
        description: "Mohon berikan API Key dan Token Mayar.id Anda untuk melanjutkan.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    // Simulasi pembuatan link pembayaran Mayar.id
    console.log("Membuat link pembayaran dengan Mayar.id...");
    console.log("Data Pelanggan:", formData);
    console.log("Item:", items);
    console.log("Total:", total);

    setTimeout(() => {
      toast({
        title: "Mengalihkan ke Pembayaran...",
        description: "Anda akan dialihkan ke halaman pembayaran Mayar.id."
      });
      // Di aplikasi nyata, Anda akan redirect ke URL yang diberikan oleh Mayar.id
      // window.location.href = mayarPaymentUrl;
      
      // Untuk simulasi, kita langsung ke halaman sukses
      navigate('/checkout-success');
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Keranjang Kosong</h2>
            <p className="text-gray-600 mb-8">Tidak ada produk untuk di-checkout.</p>
            <Link to="/products"><Button>Mulai Belanja</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  const selectedShippingCost = shippingOptions.find(opt => opt.id === shippingMethod)?.price || 0;
  const subtotal = getTotalPrice();
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax + selectedShippingCost;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/cart" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Keranjang
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">Checkout</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6"><User className="h-6 w-6 text-purple-600 mr-3" /><h3 className="text-xl font-semibold text-gray-800">Informasi Pelanggan</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label htmlFor="firstName">Nama Depan *</Label><input id="firstName" type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/></div>
                  <div><Label htmlFor="lastName">Nama Belakang *</Label><input id="lastName" type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/></div>
                  <div><Label htmlFor="email">Email *</Label><input id="email" type="email" name="email" required value={formData.email} onChange={handleInputChange} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/></div>
                  <div><Label htmlFor="phone">Nomor Telepon *</Label><input id="phone" type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/></div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6"><MapPin className="h-6 w-6 text-purple-600 mr-3" /><h3 className="text-xl font-semibold text-gray-800">Alamat Pengiriman</h3></div>
                <div className="space-y-4">
                  <div><Label htmlFor="address">Alamat Lengkap *</Label><textarea id="address" name="address" required rows={3} value={formData.address} onChange={handleInputChange} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Jalan, nomor rumah, RT/RW, kelurahan"/></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor="city">Kota *</Label><input id="city" type="text" name="city" required value={formData.city} onChange={handleInputChange} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/></div>
                    <div><Label htmlFor="postalCode">Kode Pos *</Label><input id="postalCode" type="text" name="postalCode" required value={formData.postalCode} onChange={handleInputChange} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/></div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6"><Truck className="h-6 w-6 text-purple-600 mr-3" /><h3 className="text-xl font-semibold text-gray-800">Metode Pengiriman</h3></div>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                  {shippingOptions.map(opt => (
                    <Label key={opt.id} htmlFor={opt.id} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${shippingMethod === opt.id ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}>
                      <div className="flex items-center">
                        <RadioGroupItem value={opt.id} id={opt.id} className="mr-3" />
                        <div>
                          <span className="font-medium">{opt.name}</span>
                          <p className="text-sm text-gray-500">Estimasi: {opt.eta}</p>
                        </div>
                      </div>
                      <span className="font-semibold">Rp {opt.price.toLocaleString()}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6"><CreditCard className="h-6 w-6 text-purple-600 mr-3" /><h3 className="text-xl font-semibold text-gray-800">Metode Pembayaran</h3></div>
                <div className="p-4 border border-purple-500 rounded-lg bg-purple-50">
                  <div className="flex items-center">
                    <img alt="Mayar.id Logo" class="h-6 mr-3" src="https://images.unsplash.com/photo-1642132652860-471b4228023e" />
                    <span className="font-medium">Bayar dengan Mayar.id (Semua Bank, E-Wallet, Kartu Kredit)</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Ringkasan Pesanan</h3>
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"><img className="w-full h-full object-cover" alt={item.name} src="https://images.unsplash.com/photo-1595872018818-97555653a011" /></div>
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-800 truncate">{item.name}</p><p className="text-sm text-gray-600">Qty: {item.quantity}</p></div>
                      <p className="text-sm font-medium text-gray-800">Rp {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 mb-6 border-t pt-4">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span>Rp {subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Ongkos Kirim</span><span>Rp {selectedShippingCost.toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Pajak (10%)</span><span>Rp {tax.toLocaleString()}</span></div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-purple-600">Rp {total.toLocaleString()}</span></div>
                  </div>
                </div>
                <Button type="submit" disabled={isProcessing} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3">
                  {isProcessing ? (<div className="flex items-center justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Memproses...</div>) : 'Bayar Sekarang'}
                </Button>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    <span>Transaksi aman dengan Mayar.id</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;