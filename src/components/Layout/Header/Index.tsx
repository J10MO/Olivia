import { Bell, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "../../../Context/AppContext";
import olivia from "../../../assets/olivia.png";

const Header = () => {
  const { cartItems, setActiveTab } = useAppContext();

  return (
    <div
      className="p-4 sticky top-0 z-30 shadow-2xs"
      style={{
        background: 'linear-gradient(280deg, rgba(87, 199, 133, 0.30) 22%, rgba(237, 221, 83, 0.1) 50%, rgba(237, 221, 83, 0.11) 80%)'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center w-25 h-8">
          <img src={olivia} className="" alt="Logo" />
        </div>
        
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          {/* <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 text-white hover:bg-white/20"
            >
              <Bell size={20} />
            </Button>
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              2
            </span>
          </div> */}
          
          {/* Shopping Cart */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 text-white hover:bg-white/20"
              onClick={() => setActiveTab('cart')}
            >
              <ShoppingBag size={20} />
            </Button>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-gray-50 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center p-1">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;