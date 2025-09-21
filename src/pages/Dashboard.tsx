import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Home, Star, Bell, ChevronRight, Minus, Plus, X, ArrowLeft, Filter, MapPin, CreditCard, Package, Settings, LogOut, Camera, Edit, Trash2, Check, Clock, TrendingUp, Award, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdvertisementCarousel from '@/components/App-components/advertisements';
import { useAppContext } from '../Context/AppContext';

const BeautyShopApp = () => {
  // Use context instead of local state
  const {
    activeTab,
    setActiveTab,
    cartItems,
    setCartItems,
    favoriteItems,
    setFavoriteItems,
    selectedProduct,
    setSelectedProduct,
    searchQuery,
    setSearchQuery
  } = useAppContext();

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Enhanced categories
  const categories = [
    { id: 1, name: "العناية بالبشرة", icon: "🧴", count: 156, color: "from-pink-400 to-rose-500" },
    { id: 2, name: "مكياج", icon: "💄", count: 89, color: "from-purple-400 to-pink-500" },
    { id: 3, name: "العيون", icon: "👁️", count: 124, color: "from-blue-400 to-purple-500" },
    { id: 4, name: "الشفاه", icon: "💋", count: 67, color: "from-red-400 to-pink-500" },
    { id: 5, name: "الشعر", icon: "✨", count: 98, color: "from-amber-400 to-orange-500" },
    { id: 6, name: "العطور", icon: "🌸", count: 45, color: "from-violet-400 to-purple-500" }
  ];

  // Enhanced products data
  const products = [
    {
      id: 1,
      name: "سيروم فيتامين سي المركز",
      brand: "GlowSkin Pro",
      price: 129,
      originalPrice: 189,
      rating: 4.8,
      reviews: 234,
      image: "🧴",
      discount: 32,
      inStock: true,
      badge: "الأكثر مبيعاً",
      description: "سيروم مركز بفيتامين سي لإشراقة فورية ونضارة دائمة"
    },
    {
      id: 2,
      name: "باليت ظلال العيون الاحترافي",
      brand: "ColorMagic Elite",
      price: 85,
      originalPrice: 120,
      rating: 4.9,
      reviews: 156,
      image: "🎨",
      discount: 29,
      inStock: true,
      badge: "جديد",
      description: "36 لون مذهل للحصول على إطلالات لا محدودة"
    },
    {
      id: 3,
      name: "كريم الأساس السحري",
      brand: "PerfectBase Plus",
      price: 95,
      originalPrice: 140,
      rating: 4.7,
      reviews: 89,
      image: "💫",
      discount: 31,
      inStock: true,
      badge: "اختيار الخبراء",
      description: "تغطية كاملة تدوم 24 ساعة مع حماية من الشمس"
    },
    {
      id: 4,
      name: "ماسكارا الرموش الكثيفة",
      brand: "LashPro Max",
      price: 65,
      originalPrice: 90,
      rating: 4.6,
      reviews: 76,
      image: "👁️",
      discount: 28,
      inStock: false,
      badge: "نفذ المخزون",
      description: "رموش كثيفة وطويلة بتركيبة مقاومة للماء"
    }
  ];

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    setFavoriteItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Home Page Component
  const HomePage = () => (
    <div className="pb-20 animate-fadeIn">
      {/* Hero Carousel */}
      <div className="relative overflow-hidden">
        <AdvertisementCarousel />
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <TrendingUp size={16} />, label: "عروض اليوم", value: "24", color: "from-orange-500 to-red-500" },
            { icon: <Award size={16} />, label: "نقاط المكافآت", value: "850", color: "from-purple-500 to-pink-500" },
            { icon: <Gift size={16} />, label: "هدايا مجانية", value: "3", color: "from-emerald-500 to-teal-500" }
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl shadow-lg`}>
              <div className="flex items-center gap-2 text-white">
                {stat.icon}
                <div>
                  <p className="text-xs opacity-90">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></span>
          تسوق حسب الفئة
        </h2>
        
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              <Card className="border-0 shadow-lg hover:shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 transform transition-transform group-hover:scale-110">{category.icon}</div>
                  <h3 className="font-semibold text-sm text-gray-900">{category.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{category.count} منتج</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            منتجات مميزة
          </h2>
          <Button variant="ghost" size="sm" className="text-pink-600">
            عرض الكل <ChevronRight size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 h-44">
                <span className="text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
                  {product.image}
                </span>
                {product.discount > 0 && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                    -{product.discount}%
                  </Badge>
                )}
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0">
                    {product.badge}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-3 left-3 h-8 w-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                >
                  <Heart size={16} className={favoriteItems.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <Badge variant="outline" className="text-xs mb-2 border-gray-300">{product.brand}</Badge>
                <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-bold text-lg text-gray-900">{product.price}</span>
                    <span className="text-xs text-gray-600 mr-1">ر.س</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through mr-2">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
                <Button
                  className={`w-full ${product.inStock 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600' 
                    : 'bg-gray-300 text-gray-500'} text-white shadow-md transition-all duration-300`}
                  disabled={!product.inStock}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product.inStock) {
                      setCartItems(prev => {
                        const existing = prev.find(item => item.id === product.id);
                        if (existing) {
                          return prev.map(item => 
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                          );
                        }
                        return [...prev, { 
                          id: product.id, 
                          name: product.name, 
                          brand: product.brand, 
                          price: product.price, 
                          quantity: 1, 
                          image: product.image 
                        }];
                      });
                    }
                  }}
                >
                  {product.inStock ? 'أضف للسلة' : 'نفذ المخزون'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Favorites Page Component
  const FavoritesPage = () => (
    <div className="p-4 pb-20 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Heart size={24} />
        المفضلة
      </h2>
      
      {favoriteItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💝</div>
          <p className="text-gray-500 mb-4">لا توجد منتجات في المفضلة</p>
          <Button 
            onClick={() => setActiveTab('home')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
          >
            اكتشف المنتجات
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.filter(p => favoriteItems.includes(p.id)).map((product) => (
            <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-40 flex items-center justify-center">
                  <span className="text-4xl">{product.image}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-md rounded-full"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart size={16} className="fill-red-500 text-red-500" />
                  </Button>
                </div>
                <div className="p-3">
                  <Badge variant="outline" className="text-xs mb-1">{product.brand}</Badge>
                  <h3 className="font-semibold text-sm text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-pink-600">{product.price} ر.س</span>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                      onClick={() => {
                        setCartItems(prev => {
                          const existing = prev.find(item => item.id === product.id);
                          if (existing) {
                            return prev.map(item => 
                              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                            );
                          }
                          return [...prev, { 
                            id: product.id, 
                            name: product.name, 
                            brand: product.brand, 
                            price: product.price, 
                            quantity: 1, 
                            image: product.image 
                          }];
                        });
                      }}
                    >
                      <ShoppingBag size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  // Search Page Component
  const SearchPage = () => (
    <div className="p-4 pb-20 animate-fadeIn">
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="ابحث عن المنتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-xl py-3 pr-10 pl-4 text-sm border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
            autoFocus
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1"
          >
            <Filter size={18} />
          </Button>
        </div>

        {/* Recent Searches */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">عمليات البحث الأخيرة</h3>
          <div className="flex flex-wrap gap-2">
            {["كريم واقي", "ماسكارا", "سيروم", "أحمر شفاه"].map((term) => (
              <Badge
                key={term}
                variant="secondary"
                className="cursor-pointer hover:bg-pink-100"
                onClick={() => setSearchQuery(term)}
              >
                <Clock size={12} className="ml-1" />
                {term}
              </Badge>
            ))}
          </div>
        </div>

        {/* Trending Searches */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">الأكثر بحثاً</h3>
          <div className="flex flex-wrap gap-2">
            {["فيتامين سي", "كولاجين", "ريتينول", "نياسيناميد", "هايلورونيك"].map((term, index) => (
              <Badge
                key={term}
                variant="outline"
                className="cursor-pointer hover:bg-pink-50 border-pink-200"
                onClick={() => setSearchQuery(term)}
              >
                <TrendingUp size={12} className="ml-1 text-pink-500" />
                {term}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div>
          <h3 className="text-lg font-semibold mb-4">نتائج البحث</h3>
          <div className="grid grid-cols-2 gap-3">
            {products.filter(p => 
              p.name.includes(searchQuery) || 
              p.brand.includes(searchQuery) ||
              p.description.includes(searchQuery)
            ).map((product) => (
              <Card key={product.id} className="border-0 shadow-md">
                <CardContent className="p-3">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2 flex items-center justify-center h-24">
                    <span className="text-3xl">{product.image}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">{product.name}</h4>
                  <p className="text-pink-600 font-bold mt-1">{product.price} ر.س</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Product Details Modal
  const ProductDetailsModal = ({ product, onClose }: { product: any; onClose: () => void }) => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fadeIn">
        <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
          <div className="sticky top-0 bg-white z-10 p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">تفاصيل المنتج</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={onClose}
              >
                <X size={18} />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 mb-6 flex items-center justify-center">
              <span className="text-8xl">{product.image}</span>
            </div>

            <div className="mb-4">
              <Badge variant="outline" className="mb-2">{product.brand}</Badge>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} تقييم)</span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                  <span className="text-lg text-gray-600 mr-2">ر.س</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through mr-2">{product.originalPrice}</span>
                      <Badge className="bg-red-100 text-red-600 border-0">
                        خصم {product.discount}%
                      </Badge>
                    </>
                  )}
                </div>
                <Button
                  size="lg"
                  className="h-12 w-12 p-0 rounded-full"
                  variant="outline"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart size={20} className={favoriteItems.includes(product.id) ? 'fill-red-500 text-red-500' : ''} />
                </Button>
              </div>

              <Button
                className={`w-full h-12 text-lg ${product.inStock 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600' 
                  : 'bg-gray-300'} text-white shadow-lg`}
                disabled={!product.inStock}
                onClick={() => {
                  if (product.inStock) {
                    setCartItems(prev => {
                      const existing = prev.find(item => item.id === product.id);
                      if (existing) {
                        return prev.map(item => 
                          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        );
                      }
                      return [...prev, { 
                        id: product.id, 
                        name: product.name, 
                        brand: product.brand, 
                        price: product.price, 
                        quantity: 1, 
                        image: product.image 
                      }];
                    });
                    onClose();
                  }
                }}
              >
                {product.inStock ? 'أضف إلى السلة' : 'نفذ المخزون'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen" dir="rtl">
      {/* Main Content - Only home, search, and favorites tabs */}
      <div className="relative">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'search' && <SearchPage />}
        {activeTab === 'favorites' && <FavoritesPage />}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BeautyShopApp;