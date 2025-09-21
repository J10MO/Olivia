import React, { useState } from 'react';
import { ArrowLeft, Phone, User, MapPin, Shield, Award, Gift, Package, Heart, Star, CreditCard, Bell, Settings, LogOut, Camera, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();
  const { 
    authState, 
    favoriteItems, 
    checkExistingUser, 
    loginWithCode, 
    registerNewUser,
    logout 
  } = useAppContext();

  const [loginStep, setLoginStep] = useState<'phone' | 'code' | 'register'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('966501234567'); // Pre-filled for demo
  const [verificationCode, setVerificationCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);

  // Registration form state
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      district: '',
      postalCode: ''
    }
  });

  // Handle phone number submission
  const handlePhoneSubmit = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('يرجى إدخال رقم هاتف صحيح');
      return;
    }

    const existingUser = checkExistingUser(phoneNumber);
    setIsExistingUser(!!existingUser);
    
    if (existingUser) {
      setLoginStep('code');
      setError('');
    } else {
      setLoginStep('register');
      setError('');
    }
  };

  // Handle verification code submission
  const handleCodeSubmit = async () => {
    if (!verificationCode) {
      setError('يرجى إدخال رمز التحقق');
      return;
    }

    const success = await loginWithCode(phoneNumber, verificationCode);
    if (!success) {
      setError('رمز التحقق غير صحيح');
    } else {
      setError('');
      // User is now logged in through context
    }
  };

  // Handle new user registration
  const handleRegistration = async () => {
    if (!registrationData.name || !registrationData.address.street || !registrationData.address.city) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const success = await registerNewUser({
      name: registrationData.name,
      phone: phoneNumber,
      email: registrationData.email,
      address: registrationData.address
    });

    if (success) {
      setError('');
      // User is now logged in through context
    } else {
      setError('حدث خطأ أثناء إنشاء الحساب');
    }
  };

  // Get membership level color and label
  const getMembershipInfo = (level: string) => {
    switch (level) {
      case 'bronze':
        return { color: 'from-amber-600 to-amber-700', label: 'عضو برونزي', textColor: 'text-amber-700' };
      case 'silver':
        return { color: 'from-gray-400 to-gray-600', label: 'عضو فضي', textColor: 'text-gray-600' };
      case 'gold':
        return { color: 'from-yellow-400 to-yellow-600', label: 'عضو ذهبي', textColor: 'text-yellow-600' };
      case 'platinum':
        return { color: 'from-purple-400 to-purple-600', label: 'عضو بلاتيني', textColor: 'text-purple-600' };
      default:
        return { color: 'from-gray-400 to-gray-600', label: 'عضو', textColor: 'text-gray-600' };
    }
  };

  // Phone input component
  const PhoneInput = () => (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone size={32} className="text-pink-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">مرحباً بك</h1>
        <p className="text-gray-600">أدخل رقم هاتفك للمتابعة</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="966xxxxxxxxx"
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none text-center text-lg"
            dir="ltr"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <Button
          onClick={handlePhoneSubmit}
          className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
          disabled={authState.isLoading}
        >
          {authState.isLoading ? 'جاري التحقق...' : 'متابعة'}
        </Button>

        {/* Demo hint */}
        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
          <p className="font-medium mb-1">للتجربة:</p>
          <p>• المستخدمون المسجلون: 966501234567, 966502345678, 966503456789</p>
          <p>• رمز التحقق للجميع: 1234, 5678, 9876</p>
        </div>
      </div>
    </div>
  );

  // Verification code input component
  const CodeInput = () => (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLoginStep('phone')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">رمز التحقق</h2>
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield size={24} className="text-green-600" />
        </div>
        <p className="text-gray-600 mb-2">تم إرسال رمز التحقق إلى</p>
        <p className="font-bold text-gray-900">{phoneNumber}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">رمز التحقق</label>
          <div className="relative">
            <input
              type={showCode ? "text" : "password"}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="أدخل الرمز"
              className="w-full p-4 border border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none text-center text-lg tracking-widest"
              maxLength={4}
              dir="ltr"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowCode(!showCode)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <Button
          onClick={handleCodeSubmit}
          className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
          disabled={authState.isLoading}
        >
          {authState.isLoading ? 'جاري التحقق...' : 'تأكيد'}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setLoginStep('phone')}
          className="w-full text-gray-600"
        >
          تغيير رقم الهاتف
        </Button>
      </div>
    </div>
  );

  // Registration form component
  const RegistrationForm = () => (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLoginStep('phone')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">إنشاء حساب جديد</h2>
      </div>

      <div className="space-y-4">
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
                value={registrationData.name}
                onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني (اختياري)"
                value={registrationData.email}
                onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-pink-600" />
              العنوان
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="الشارع والمنطقة *"
                value={registrationData.address.street}
                onChange={(e) => setRegistrationData(prev => ({ 
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
                  value={registrationData.address.city}
                  onChange={(e) => setRegistrationData(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, city: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="الحي"
                  value={registrationData.address.district}
                  onChange={(e) => setRegistrationData(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, district: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="الرمز البريدي"
                value={registrationData.address.postalCode}
                onChange={(e) => setRegistrationData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, postalCode: e.target.value }
                }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
              />
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <Button
          onClick={handleRegistration}
          disabled={authState.isLoading}
          className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
        >
          {authState.isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
        </Button>
      </div>
    </div>
  );

  // User profile component
  const UserProfile = () => {
    if (!authState.user) return null;
    
    const membershipInfo = getMembershipInfo(authState.user.membershipLevel);

    return (
      <div className="pb-20">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-6 rounded-b-3xl shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">👩</span>
              </div>
              <Button
                size="sm"
                className="absolute bottom-0 right-0 h-7 w-7 p-0 bg-white text-gray-700 rounded-full shadow-md"
              >
                <Camera size={14} />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{authState.user.name}</h2>
              <p className="text-white/80 text-sm">{membershipInfo.label}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  <Award size={12} className="ml-1" />
                  {authState.user.points} نقطة
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Gift size={12} className="ml-1" />
                  3 مكافآت
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "الطلبات", value: authState.user.totalOrders, icon: <Package size={16} /> },
              { label: "المفضلة", value: favoriteItems.length, icon: <Heart size={16} /> },
              { label: "التقييمات", value: "18", icon: <Star size={16} /> }
            ].map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center justify-center gap-2 text-white">
                  {stat.icon}
                  <div className="text-center">
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs opacity-90">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Information */}
        <div className="p-4">
          <Card className="border-0 shadow-md mb-4">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">معلومات الحساب</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">رقم الهاتف:</span>
                  <span className="font-medium">{authState.user.phone}</span>
                </div>
                {authState.user.email && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">البريد الإلكتروني:</span>
                    <span className="font-medium">{authState.user.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ الانضمام:</span>
                  <span className="font-medium">{authState.user.joinDate}</span>
                </div>
                <div className="border-t pt-3">
                  <span className="text-gray-600 block mb-1">العنوان:</span>
                  <p className="font-medium">
                    {authState.user.address.street}<br />
                    {authState.user.address.district && `${authState.user.address.district}، `}
                    {authState.user.address.city}
                    {authState.user.address.postalCode && ` ${authState.user.address.postalCode}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Menu */}
          <div className="space-y-3">
            {[
              { icon: <User size={18} />, label: "تعديل المعلومات الشخصية", badge: null },
              { icon: <MapPin size={18} />, label: "العناوين المحفوظة", badge: "2" },
              { icon: <CreditCard size={18} />, label: "طرق الدفع", badge: "1" },
              { icon: <Package size={18} />, label: "طلباتي", badge: authState.user.totalOrders > 0 ? "جديد" : null },
              { icon: <Gift size={18} />, label: "المكافآت والعروض", badge: "3" },
              { icon: <Bell size={18} />, label: "الإشعارات", badge: "5" },
              { icon: <Settings size={18} />, label: "الإعدادات", badge: null }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center">
                        <div className="text-pink-600">{item.icon}</div>
                      </div>
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <Badge className="bg-pink-100 text-pink-600 border-0">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={logout}
            className="w-full mt-6 border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} className="ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold text-gray-900">حسابي</h1>
      </div>

      {/* Content */}
      {!authState.isLoggedIn ? (
        <>
          {loginStep === 'phone' && <PhoneInput />}
          {loginStep === 'code' && <CodeInput />}
          {loginStep === 'register' && <RegistrationForm />}
        </>
      ) : (
        <UserProfile />
      )}
    </div>
  );
};

export default AccountPage;