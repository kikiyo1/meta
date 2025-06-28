
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { toast } from '@/components/ui/use-toast';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === parseInt(id));
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produk tidak ditemukan</h2>
          <Link to="/products">
            <Button>Kembali ke Produk</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Berhasil ditambahkan ke keranjang!",
      description: `${product.name} (${quantity}x) telah ditambahkan ke keranjang Anda.`
    });
  };

  const handleWishlist = () => {
    toast({
      title: "🚧 Fitur ini belum tersedia—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
    });
  };

  const handleShare = () => {
    toast({
      title: "🚧 Fitur ini belum tersedia—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
    });
  };

  const productImages = [product.image, product.image, product.image]; // Mock multiple images

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link to="/products" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Produk
          </Link>
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-600">Beranda</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-purple-600">Produk</Link>
            <span className="mx-2">/</span>
            <Link to={`/products/${product.category}`} className="hover:text-purple-600 capitalize">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
              <img  
                className="w-full h-full object-cover"
                alt={product.name}
               src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg shadow-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-purple-500' : 'border-transparent'
                  }`}
                >
                  <img  
                    className="w-full h-full object-cover"
                    alt={`${product.name} view ${index + 1}`}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.rating})</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{product.reviews} ulasan</span>
              </div>
              <p className="text-4xl font-bold text-purple-600 mb-4">
                Rp {product.price.toLocaleString()}
              </p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Jumlah:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Tambah ke Keranjang
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlist}
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Gratis Ongkir</p>
                  <p className="text-sm text-gray-600">Min. pembelian 500rb</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Garansi Resmi</p>
                  <p className="text-sm text-gray-600">1 tahun garansi</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Easy Return</p>
                  <p className="text-sm text-gray-600">7 hari pengembalian</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-8 mb-16"
        >
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button className="py-2 px-1 border-b-2 border-purple-500 text-purple-600 font-medium">
                Deskripsi
              </button>
              <button className="py-2 px-1 text-gray-500 hover:text-gray-700">
                Spesifikasi
              </button>
              <button className="py-2 px-1 text-gray-500 hover:text-gray-700">
                Ulasan ({product.reviews})
              </button>
            </nav>
          </div>
          
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Detail Produk</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
              commodo consequat.
            </p>
            
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Fitur Utama:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Kualitas premium dengan material terbaik</li>
              <li>Desain modern dan elegan</li>
              <li>Mudah dipasang dan digunakan</li>
              <li>Tahan lama dan awet</li>
              <li>Garansi resmi 1 tahun</li>
            </ul>
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Produk Terkait</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
