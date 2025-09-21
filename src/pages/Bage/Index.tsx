import React, { useState } from 'react';
import { ShoppingBag, Minus, Plus, ArrowLeft, MapPin, Phone, User, CreditCard, Check, Shield, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    setCartItems, 
    setActiveTab,
    authState, // Fixed: Use authState instead of userInfo
    showCheckout,
    setShowCheckout
  } = useAppContext();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      district: '',
      postalCode: ''
    }
  });

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 0; // Free shipping
  const discount = 25;
  const finalTotal = cartTotal - discount + shippingCost;

  // Update cart quantity
  const updateCartQuantity = (id: number, change: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean) as typeof prev);
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Handle checkout process
  const handleCheckout = () => {
    if (authState.isLoggedIn) { // Fixed: Use authState.isLoggedIn
      // User is logged in, proceed directly to payment
      processOrder();
    } else {
      // User is not logged in, redirect to account page for login
      navigate('/account');
    }
  };

  // Process order for logged in users
  const processOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setCartItems([]); // Clear cart
    }, 2000);
  };

  // Handle guest registration and order
  const handleGuestOrder = async () => {
    // Validate guest info
    if (!guestInfo.name || !guestInfo.phone || !guestInfo.address.street || !guestInfo.address.city) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsProcessing(true);
    
    // Simulate saving guest info and processing order
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setCartItems([]); // Clear cart
      setShowCheckout(false);
    }, 2000);
  };

  // Order success component
  const OrderSuccess = () => (
    <div className="p-6 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check size={40} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">تم تأكيد طلبك!</h2>
      <p className="text-gray-600 mb-4">رقم الطلب: #ORD-2024-001</p>
      <p className="text-sm text-gray-500 mb-6">
        سيتم التواصل معك قريباً لتأكيد الطلب وترتيب التسليم
      </p>
      <div className="flex gap-3">
        <Button 
          onClick={() => {
            setOrderComplete(false);
            navigate('/');
            setActiveTab('home');
          }}
          className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white"
        >
          العودة للتسوق
        </Button>
        <Button 
          variant="outline"
          onClick={() => {
            setOrderComplete(false);
            navigate('/account'); // Fixed: Navigate to account page
          }}
          className="flex-1"
        >
          تتبع الطلب
        </Button>
      </div>
    </div>
  );

  // Guest registration form
  const GuestCheckoutForm = () => (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCheckout(false)}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">معلومات التسليم</h2>
      </div>

      <div className="space-y-4">
        {/* Personal Information */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User size={18} className="text-pink-600" />
              المعلومات الشخصية
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="الاسم الكامل *"
                value={guestInfo.name}
                onChange={(e) => setGuestInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="رقم الجوال *"
                value={guestInfo.phone}
                onChange={(e) => setGuestInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني (اختياري)"
                value={guestInfo.email}
                onChange={(e) => setGuestInfo(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-pink-600" />
              عنوان التسليم
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="الشارع والمنطقة *"
                value={guestInfo.address.street}
                onChange={(e) => setGuestInfo(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, street: e.target.value }
                }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="المدينة *"
                  value={guestInfo.address.city}
                  onChange={(e) => setGuestInfo(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, city: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="الحي"
                  value={guestInfo.address.district}
                  onChange={(e) => setGuestInfo(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, district: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="الرمز البريدي"
                value={guestInfo.address.postalCode}
                onChange={(e) => setGuestInfo(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, postalCode: e.target.value }
                }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-pink-50 to-rose-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">ملخص الطلب</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{cartTotal} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span className="text-green-600">مجاني</span>
              </div>
              <div className="flex justify-between">
                <span>الخصم</span>
                <span className="text-red-600">-{discount} ر.س</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>الإجمالي</span>
                <span className="text-pink-600">{finalTotal} ر.س</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleGuestOrder}
          disabled={isProcessing}
          className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
        >
          {isProcessing ? 'جاري المعالجة...' : `تأكيد الطلب - ${finalTotal} ر.س`}
        </Button>
      </div>
    </div>
  );

  if (orderComplete) {
    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen" dir="rtl">
        <OrderSuccess />
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="max-w-sm mx-auto bg-gray-50 min-h-screen" dir="rtl">
        <GuestCheckoutForm />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen pb-20" dir="rtl">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigate('/');
              setActiveTab('home');
            }}
            className="p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag size={24} />
            سلة التسوق
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 mb-4">سلة التسوق فارغة</p>
            <Button 
              onClick={() => {
                navigate('/');
                setActiveTab('home');
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
            >
              ابدأ التسوق
            </Button>
          </div>
        ) : (
          <>
            {/* User Status Info - Show login status */}
            {authState.isLoggedIn && authState.user && (
              <Card className="border-0 shadow-md mb-4 bg-gradient-to-r from-green-50 to-emerald-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-700">مرحباً {authState.user.name}</p>
                      <p className="text-sm text-green-600">سيتم التسليم إلى العنوان المحفوظ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-3xl">{item.image}</span>
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="text-xs mb-1">{item.brand}</Badge>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-lg font-bold text-pink-600">{item.price} ر.س</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => updateCartQuantity(item.id, -1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => updateCartQuantity(item.id, 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          حذف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Delivery Info */}
            <Card className="border-0 shadow-md mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck size={18} className="text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">التسليم المجاني</p>
                    <p>خلال 2-3 أيام عمل</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-pink-50 to-rose-50 mb-6">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-4">ملخص الطلب</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">المجموع الفرعي ({cartItems.length} منتج)</span>
                    <span>{cartTotal} ر.س</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">الشحن</span>
                    <span className="text-green-600">مجاني</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">خصم العضوية</span>
                    <span className="text-red-600">-{discount} ر.س</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>الإجمالي</span>
                      <span className="text-pink-600">{finalTotal} ر.س</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                  <Shield size={14} />
                  <span>الدفع آمن ومحمي</span>
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                >
                  {isProcessing ? 'جاري المعالجة...' : 
                   authState.isLoggedIn ? `الدفع الآن - ${finalTotal} ر.س` : `تسجيل الدخول وإتمام الطلب - ${finalTotal} ر.س`}
                </Button>

                {!authState.isLoggedIn && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    سيتم توجيهك لتسجيل الدخول أو إنشاء حساب جديد
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;