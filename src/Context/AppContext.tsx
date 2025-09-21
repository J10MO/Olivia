import { createContext, useContext, useState, type ReactNode } from 'react';

// Match the CartItem interface from your BeautyShopApp
interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

// User information interface
interface UserInfo {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
  };
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  totalOrders: number;
  joinDate: string;
  avatar?: string;
}

// Auth state interface
interface AuthState {
  isLoggedIn: boolean;
  user: UserInfo | null;
  isLoading: boolean;
}

// Registered users database (for demo)
interface RegisteredUser {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
  };
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  totalOrders: number;
  joinDate: string;
  verificationCode: string; // For demo purposes
}

interface AppContextType {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoriteItems: number[];
  setFavoriteItems: (items: number[] | ((prev: number[]) => number[])) => void;
  selectedProduct: any;
  setSelectedProduct: (product: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  authState: AuthState;
  setAuthState: (state: AuthState | ((prev: AuthState) => AuthState)) => void;
  showCheckout: boolean;
  setShowCheckout: (show: boolean) => void;
  registeredUsers: RegisteredUser[];
  
  // Auth functions
  checkExistingUser: (phone: string) => RegisteredUser | null;
  loginWithCode: (phone: string, code: string) => Promise<boolean>;
  registerNewUser: (userData: Omit<RegisteredUser, 'id' | 'verificationCode' | 'points' | 'totalOrders' | 'joinDate' | 'membershipLevel'>) => Promise<boolean>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "سيروم فيتامين سي", brand: "GlowSkin", price: 129, quantity: 2, image: "🧴" },
    { id: 2, name: "باليت ظلال العيون", brand: "ColorMagic", price: 85, quantity: 1, image: "🎨" }
  ]);
  const [activeTab, setActiveTab] = useState('home');
  const [favoriteItems, setFavoriteItems] = useState<number[]>([1, 3]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  // Demo registered users database
  const [registeredUsers] = useState<RegisteredUser[]>([
    {
      id: 1,
      name: "سارة أحمد",
      phone: "966501234567",
      email: "sara@example.com",
      address: {
        street: "شارع الملك فهد، حي النخيل",
        city: "الرياض",
        district: "النخيل",
        postalCode: "12345"
      },
      membershipLevel: 'gold',
      points: 850,
      totalOrders: 24,
      joinDate: "2023-01-15",
      verificationCode: "1234"
    },
    {
      id: 2,
      name: "فاطمة محمد",
      phone: "966502345678",
      email: "fatima@example.com",
      address: {
        street: "شارع العليا، حي العليا",
        city: "الرياض",
        district: "العليا",
        postalCode: "54321"
      },
      membershipLevel: 'silver',
      points: 420,
      totalOrders: 12,
      joinDate: "2023-06-20",
      verificationCode: "5678"
    },
    {
      id: 3,
      name: "نورا عبدالله",
      phone: "966503456789",
      email: "nora@example.com",
      address: {
        street: "شارع التحلية، حي الملقا",
        city: "الرياض",
        district: "الملقا",
        postalCode: "67890"
      },
      membershipLevel: 'platinum',
      points: 1250,
      totalOrders: 35,
      joinDate: "2022-09-10",
      verificationCode: "9876"
    }
  ]);

  // Auth state - initially not logged in
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isLoading: false
  });

  // Check if user exists by phone number
  const checkExistingUser = (phone: string): RegisteredUser | null => {
    return registeredUsers.find(user => user.phone === phone) || null;
  };

  // Login with verification code
  const loginWithCode = async (phone: string, code: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = registeredUsers.find(u => u.phone === phone && u.verificationCode === code);
    
    if (user) {
      const userInfo: UserInfo = {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        address: user.address,
        membershipLevel: user.membershipLevel,
        points: user.points,
        totalOrders: user.totalOrders,
        joinDate: user.joinDate
      };
      
      setAuthState({
        isLoggedIn: true,
        user: userInfo,
        isLoading: false
      });
      return true;
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  // Register new user
  const registerNewUser = async (userData: Omit<RegisteredUser, 'id' | 'verificationCode' | 'points' | 'totalOrders' | 'joinDate' | 'membershipLevel'>): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo, we'll use a fixed verification code
    const verificationCode = "0000";
    
    const newUser: UserInfo = {
      id: registeredUsers.length + 1,
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      address: userData.address,
      membershipLevel: 'bronze',
      points: 100, // Welcome bonus
      totalOrders: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setAuthState({
      isLoggedIn: true,
      user: newUser,
      isLoading: false
    });
    
    return true;
  };

  // Logout
  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      user: null,
      isLoading: false
    });
  };

  return (
    <AppContext.Provider value={{ 
      cartItems, 
      setCartItems, 
      activeTab, 
      setActiveTab,
      favoriteItems,
      setFavoriteItems,
      selectedProduct,
      setSelectedProduct,
      searchQuery,
      setSearchQuery,
      authState,
      setAuthState,
      showCheckout,
      setShowCheckout,
      registeredUsers,
      checkExistingUser,
      loginWithCode,
      registerNewUser,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};