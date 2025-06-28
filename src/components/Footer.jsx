
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <span className="text-2xl font-bold gradient-text">HadeSolution</span>
            <p className="text-gray-300">
              Toko online terpercaya yang menyediakan berbagai produk berkualitas untuk kebutuhan rumah dan kantor Anda.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Tautan Cepat</span>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Beranda</Link>
              <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Produk</Link>
              <Link to="/products/rak" className="text-gray-300 hover:text-white transition-colors">Rak</Link>
              <Link to="/products/software" className="text-gray-300 hover:text-white transition-colors">Software</Link>
              <Link to="/products/elektronik" className="text-gray-300 hover:text-white transition-colors">Elektronik</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Layanan Pelanggan</span>
            <div className="flex flex-col space-y-2">
              <span className="text-gray-300">Bantuan</span>
              <span className="text-gray-300">FAQ</span>
              <span className="text-gray-300">Kebijakan Privasi</span>
              <span className="text-gray-300">Syarat & Ketentuan</span>
              <span className="text-gray-300">Pengembalian</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Kontak Kami</span>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300">info@hadesolution.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 HadeSolution. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
