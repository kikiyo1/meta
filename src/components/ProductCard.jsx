
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Ditambahkan ke keranjang!",
      description: `${product.name} telah ditambahkan ke keranjang Anda.`
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "🚧 Fitur ini belum tersedia—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
    });
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        <Link to={`/product/${product.id}`}>
          <div className="flex p-6">
            <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img  
                className="w-full h-full object-cover"
                alt={product.name}
               src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
            </div>
            
            <div className="ml-6 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
                <button
                  onClick={handleWishlist}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-600">{product.reviews} ulasan</span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-purple-600">
                  Rp {product.price.toLocaleString()}
                </p>
                <Button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Tambah
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="product-card rounded-xl overflow-hidden group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <div className="aspect-square bg-gray-100">
            <img  
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              alt={product.name}
             src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
          </div>
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleWishlist}
                className="bg-white/90 hover:bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-purple-600">
              Rp {product.price.toLocaleString()}
            </p>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
