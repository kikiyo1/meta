import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const CheckoutSuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-lg w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
          className="mx-auto mb-6"
        >
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Pembayaran Berhasil!
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Terima kasih telah berbelanja di Rak Minimarket! Pesanan Anda sedang kami proses dan akan segera dikirimkan.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Informasi Selanjutnya</h2>
            <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Anda akan menerima email konfirmasi pesanan dalam beberapa menit.</span>
                </li>
                <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Kami akan memberitahu Anda lagi setelah pesanan Anda dikirim.</span>
                </li>
            </ul>
        </div>
        
        <Link to="/">
          <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            Kembali ke Beranda
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccessPage;