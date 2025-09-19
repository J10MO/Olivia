// components/Header.tsx - مصحح لمشكلة dropdown الإعدادات
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Search,
  ShieldCheck,
  Sparkles,
  Menu,
  Settings,
  User,
  LogOut,
  Bell,
  GraduationCap,
  Users,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Trophy,
  Home,
  FileText,
  BarChart3,
  ChevronDown
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/Auth/AuthContext";
import { PERMISSIONS } from "@/Auth/AuthContext";

// قائمة الميزات مع الصلاحيات
const adminFeatures = [
  {
    icon: Home,
    title: "الرئيسية",
    route: "/",
    roles: PERMISSIONS.ADMIN_ONLY
  },
  {
    icon: GraduationCap,
    title: "المعلمون",
    route: "/teachers",
    roles: PERMISSIONS.ADMIN_ONLY
  },
  {
    icon: Users,
    title: "الطلاب",
    route: "/students",
    roles: PERMISSIONS.ADMIN_AND_TEACHER
  },
  {
    icon: BookOpen,
    title: "المناهج والدروس",
    route: "/curriculum",
    roles: PERMISSIONS.ADMIN_AND_TEACHER
  },
  {
    icon: CalendarDays,
    title: "الجدول الزمني",
    route: "/schedule",
    roles: PERMISSIONS.ADMIN_AND_TEACHER
  },
  {
    icon: ClipboardList,
    title: "الحضور والغياب",
    route: "/attendance",
    roles: PERMISSIONS.ADMIN_AND_TEACHER
  },
  {
    icon: Trophy,
    title: "الدرجات",
    route: "/grades",
    roles: PERMISSIONS.ADMIN_AND_TEACHER
  },
  {
    icon: BarChart3,
    title: "التقارير",
    route: "/reports",
    roles: PERMISSIONS.ADMIN_ONLY
  },
  {
    icon: Settings,
    title: "الإعدادات",
    route: "/settings",
    roles: PERMISSIONS.ADMIN_ONLY
  }
];

const teacherFeatures = [
  {
    icon: Home,
    title: "لوحة التحكم",
    route: "/tech",
    roles: PERMISSIONS.TEACHER_ONLY
  },
  {
    icon: Users,
    title: "طلابي",
    route: "/students",
    roles: PERMISSIONS.ADMIN_AND_TEACHER
  },
  {
    icon: BookOpen,
    title: "صفوفي",
    route: "/my-classes",
    roles: PERMISSIONS.TEACHER_ONLY
  },
  {
    icon: CalendarDays,
    title: "جدولي",
    route: "/my-schedule",
    roles: PERMISSIONS.TEACHER_ONLY
  },
  {
    icon: ClipboardList,
    title: "الحضور",
    route: "/attendance",
    roles: PERMISSIONS.ADMIN_AND_TEACHER
  },
  {
    icon: Trophy,
    title: "الدرجات",
    route: "/grades",
    roles: PERMISSIONS.ADMIN_AND_TEACHER
  },
  {
    icon: BookOpen,
    title: "المناهج",
    route: "/curriculum",
    roles: PERMISSIONS.ADMIN_AND_TEACHER
  }
];

// Custom Dropdown Component - حل بديل للـ DropdownMenu
const CustomDropdown: React.FC<{
  trigger: React.ReactNode;
  children: React.ReactNode;
}> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {children}
        </div>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout, username, userRole, isAdmin, isTeacher, hasRole } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  
  // اختيار الميزات حسب نوع المستخدم
  const features = isAdmin ? adminFeatures : teacherFeatures;
  
  // فلترة الميزات حسب الصلاحيات
  const allowedFeatures = features.filter(feature => hasRole(feature.roles));

  const handleLogout = () => {
    logout();
  };

  const getUserRoleDisplay = () => {
    if (isAdmin) return "إدارة المدرسة";
    if (isTeacher) return "معلم";
    return "مستخدم";
  };

  const getUserInitial = () => {
    return username?.charAt(0).toUpperCase() || "U";
  };

  const handleSettingsMenuClick = (action: string) => {
    setShowSettingsMenu(false);
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  return (
    <header dir="rtl" className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <Link to={isAdmin ? "/" : "/tech"} className="flex items-center gap-2">
            <LayoutDashboard className="size-6 text-blue-600" />
            <span className="font-extrabold tracking-tight text-lg text-foreground">مدرستنا</span>
          </Link>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {getUserRoleDisplay()}
          </Badge>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center gap-2 w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
            <Input placeholder="ابحث عن طالب، درس، أو موعد…" className="pl-9" />
          </div>
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="size-4" />
              <span className="absolute -top-1 -right-1 size-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">الإشعارات</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-4 border-b hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Bell className="size-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">اجتماع أولياء الأمور</h4>
                        <p className="text-xs text-gray-600 mt-1">يوم الخميس الساعة 3 مساءً</p>
                        <p className="text-xs text-gray-400 mt-1">منذ ساعة</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Bell className="size-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">موعد تسليم الدرجات</h4>
                        <p className="text-xs text-gray-600 mt-1">آخر موعد يوم الأربعاء</p>
                        <p className="text-xs text-gray-400 mt-1">منذ 3 ساعات</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/notifications');
                    }}
                  >
                    عرض جميع الإشعارات
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Permissions - للإدارة فقط */}
          {isAdmin && (
            <Button variant="ghost" className="gap-2" onClick={() => navigate("/settings")}>
              <ShieldCheck className="size-4"/>
              الصلاحيات
            </Button>
          )}

          {/* User Info */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{getUserInitial()}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-gray-500">{getUserRoleDisplay()}</p>
            </div>
          </div>

          {/* Settings Dropdown - مصحح */}
          <CustomDropdown
            trigger={
              <Button variant="ghost" size="icon" className="relative">
                <Settings className="size-4" />
                <ChevronDown className="size-3 absolute -bottom-1 -right-1" />
              </Button>
            }
          >
            <div className="py-1">
              <button
                className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3"
                onClick={() => handleSettingsMenuClick('profile')}
              >
                <User className="size-4" />
                الملف الشخصي
              </button>
              
              {/* الإعدادات - للإدارة فقط */}
              {isAdmin && (
                <button
                  className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3"
                  onClick={() => handleSettingsMenuClick('settings')}
                >
                  <Settings className="size-4" />
                  الإعدادات
                </button>
              )}
              
              <button
                className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3"
                onClick={() => handleSettingsMenuClick('notifications')}
              >
                <Bell className="size-4" />
                الإشعارات
                <Badge variant="secondary" className="mr-auto text-xs">3</Badge>
              </button>
              
              <div className="border-t my-1"></div>
              
              <button
                className="w-full text-right px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-3"
                onClick={() => handleSettingsMenuClick('logout')}
              >
                <LogOut className="size-4" />
                تسجيل الخروج
              </button>
            </div>
          </CustomDropdown>

          {/* CTA Button - مختلف حسب نوع المستخدم */}
          {isAdmin ? (
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/teachers/add")}>
              <Sparkles className="size-4" />
              إضافة معلم
            </Button>
          ) : (
            <Button className="gap-2 bg-green-600 hover:bg-green-700" onClick={() => navigate("/attendance")}>
              <ClipboardList className="size-4" />
              تسجيل الحضور
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <LayoutDashboard className="size-5 text-blue-600" />
                مدرستنا
              </SheetTitle>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{getUserInitial()}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{username}</p>
                  <p className="text-xs text-gray-500">{getUserRoleDisplay()}</p>
                </div>
              </div>
            </SheetHeader>
            
            <Separator className="my-4"/>
            
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
                <Input placeholder="ابحث…" className="pl-9" />
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">الوحدات الرئيسية</h3>
                <div className="grid gap-2">
                  {allowedFeatures.map((feature) => (
                    <Button
                      key={feature.title}
                      variant="ghost"
                      className="justify-start gap-2 h-12"
                      onClick={() => {
                        navigate(feature.route);
                      }}
                    >
                      <feature.icon className="size-5" />
                      {feature.title}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* User Actions */}
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/profile")}
                >
                  <User className="size-4" />
                  الملف الشخصي
                </Button>
                
                {/* الإعدادات - للإدارة فقط */}
                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-2"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="size-4" />
                    الإعدادات
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/notifications")}
                >
                  <Bell className="size-4" />
                  الإشعارات
                  <Badge variant="secondary" className="mr-auto">3</Badge>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/help")}
                >
                  <FileText className="size-4" />
                  المساعدة
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;