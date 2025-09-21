import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "../../../Context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const { activeTab, setActiveTab, favoriteItems, cartItems } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (tabId: string) => {
    if (tabId === 'cart') {
      // Navigate to cart page
      navigate('/cart');
    } else if (tabId === 'profile') {
      // Navigate to account page
      navigate('/account');
    } else {
      // Set active tab and navigate to home if not already there
      setActiveTab(tabId);
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  };

  // Determine which tab should be active based on current route
  const getCurrentActiveTab = () => {
    switch (location.pathname) {
      case '/cart':
        return 'cart';
      case '/account':
        return 'profile';
      default:
        return activeTab;
    }
  };

  const currentActiveTab = getCurrentActiveTab();

  const navigationTabs = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'search', icon: Search, label: 'البحث' },
    { id: 'favorites', icon: Heart, label: 'المفضلة', badge: favoriteItems.length },
    { id: 'cart', icon: ShoppingBag, label: 'السلة', badge: cartItems.length },
    { id: 'profile', icon: User, label: 'حسابي' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 rounded-t-3xl shadow-2xl z-40">
      <div className="flex items-center justify-around px-2 py-3">
        {navigationTabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation(tab.id)}
            className={`flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl transition-all duration-300 relative ${
              currentActiveTab === tab.id 
                ? 'bg-gradient-to-br from-pink-50 to-rose-50 text-pink-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="relative">
              <tab.icon size={20} className={currentActiveTab === tab.id ? 'transform scale-110' : ''} />
              {tab.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`text-xs ${currentActiveTab === tab.id ? 'font-semibold' : ''}`}>{tab.label}</span>
            {currentActiveTab === tab.id && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-600 rounded-full"></div>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Footer;