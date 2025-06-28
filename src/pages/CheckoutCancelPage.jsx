import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutCancelPage = () => {
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
          <XCircle className="h-24 w-24 text-red-500 mx-auto" />
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Pembayaran Dibatalkan
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Pesanan Anda belum selesai. Keranjang belanja Anda telah disimpan, Anda dapat mencoba lagi kapan saja.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cart">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Kembali ke Keranjang
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg" className="w-full">
                Lanjut Belanja
              </Button>
            </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutCancelPage;