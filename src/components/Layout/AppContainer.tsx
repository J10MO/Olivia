// components/Layout.tsx - محدث مع نظام الحماية
import React from "react";
import Header from "./Navbar/index";
import { useAuth } from "@/Auth/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, userRole, isAdmin, isTeacher } = useAuth();

  // إذا لم يكن مسجل دخول، لا نعرض الـ Layout
  if (!isLoggedIn) {
    return <>{children}</>;
  }

  const getFooterText = () => {
    if (isAdmin) {
      return "المعلمون • الطلاب • التقارير • الإعدادات";
    } else if (isTeacher) {
      return "الطلاب • الصفوف • الدرجات • الحضور";
    }
    return "نظام إدارة المدرسة";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-background to-muted/30 text-foreground">
      <Header />
      
      {/* Main Content */}
      <main className="min-h-[calc(100vh-140px)]">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 items-center">
          
          {/* Brand Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-5 bg-blue-600 rounded" />
              <span className="font-semibold">مدرستنا</span>
            </div>
            <p className="text-sm text-muted-foreground">
              نظام متكامل لإدارة المدارس — بسيط، سريع، وآمن.
            </p>
            {userRole && (
              <p className="text-xs text-blue-600">
                مسجل دخول كـ: {isAdmin ? "إدارة المدرسة" : "معلم"}
              </p>
            )}
          </div>
          
          {/* Features Section */}
          <div className="flex flex-wrap gap-2 md:justify-center">
            <span className="text-sm text-muted-foreground">
              {getFooterText()}
            </span>
          </div>
          
          {/* Links Section */}
          <div className="flex md:justify-end gap-2 flex-wrap">
            <button 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => window.open('/help', '_blank')}
            >
              المساعدة
            </button>
            <span className="text-muted-foreground">•</span>
            <button 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => window.open('/privacy', '_blank')}
            >
              سياسة الخصوصية
            </button>
            <span className="text-muted-foreground">•</span>
            <button 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => window.open('/terms', '_blank')}
            >
              الشروط
            </button>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t bg-gray-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
              <p>© 2024 مدرستنا. جميع الحقوق محفوظة.</p>
              <p>نسخة 1.0.0 - نظام إدارة المدارس الذكي</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;