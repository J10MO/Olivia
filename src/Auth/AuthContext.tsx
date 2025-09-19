// @/Auth/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// تعريف الصلاحيات والأدوار
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher'
} as const;

export const PERMISSIONS = {
  // صلاحيات الإدارة فقط
  ADMIN_ONLY: [USER_ROLES.ADMIN],
  
  // صلاحيات المعلم فقط  
  TEACHER_ONLY: [USER_ROLES.TEACHER],
  
  // صلاحيات مشتركة (الإدارة والمعلم)
  ADMIN_AND_TEACHER: [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  
  // جميع المستخدمين
  ALL: [USER_ROLES.ADMIN, USER_ROLES.TEACHER]
} as const;

// Types
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Auth Context Type
interface AuthContextType {
  isLoggedIn: boolean;
  userRole: UserRole | null;
  username: string | null;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  hasRole: (roles: string[]) => boolean;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
}

// إنشاء Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // تحميل البيانات من localStorage عند التشغيل
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserRole = localStorage.getItem('userRole') as UserRole;
    const storedUsername = localStorage.getItem('username');

    if (storedIsLoggedIn && storedUserRole && storedUsername) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
      setUsername(storedUsername);
    }
  }, []);

  const login = (inputUsername: string, inputPassword: string, role: UserRole): boolean => {
    // بيانات تسجيل الدخول الثابتة
    const credentials = {
      [USER_ROLES.ADMIN]: { username: 'Admin', password: '0000' },
      [USER_ROLES.TEACHER]: { username: 'teacher', password: '0000' }
    };

    if (credentials[role] && 
        credentials[role].username === inputUsername && 
        credentials[role].password === inputPassword) {
      
      // حفظ البيانات
      setIsLoggedIn(true);
      setUserRole(role);
      setUsername(inputUsername);
      
      // حفظ في localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', inputUsername);
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUsername(null);
    
    // مسح localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    
    // إعادة توجيه لصفحة تسجيل الدخول
    window.location.href = '/login';
  };

  const hasRole = (roles: string[]): boolean => {
    return userRole ? roles.includes(userRole) : false;
  };

  const isAdmin = (): boolean => {
    return userRole === USER_ROLES.ADMIN;
  };

  const isTeacher = (): boolean => {
    return userRole === USER_ROLES.TEACHER;
  };

  const value: AuthContextType = {
    isLoggedIn,
    userRole,
    username,
    login,
    logout,
    hasRole,
    isAdmin,
    isTeacher
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook لاستخدام Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook للتحقق من الصلاحيات
export const usePermissions = () => {
  const { hasRole, userRole } = useAuth();

  const canManageTeachers = () => hasRole(PERMISSIONS.ADMIN_ONLY);
  const canViewStudents = () => hasRole(PERMISSIONS.ADMIN_AND_TEACHER);
  const canEditGrades = () => hasRole(PERMISSIONS.ADMIN_AND_TEACHER);
  const canAccessSystemSettings = () => hasRole(PERMISSIONS.ADMIN_ONLY);
  const canViewReports = () => hasRole(PERMISSIONS.ADMIN_AND_TEACHER);
  const canManageSchedule = () => hasRole(PERMISSIONS.ADMIN_ONLY);

  return {
    canManageTeachers,
    canViewStudents,
    canEditGrades,
    canAccessSystemSettings,
    canViewReports,
    canManageSchedule,
    userRole
  };
};

// Constants للاستخدام
export const HOME_ROUTES = {
  [USER_ROLES.ADMIN]: '/',
  [USER_ROLES.TEACHER]: '/tech'
} as const;

export const AUTH_CONFIG = {
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 ساعة
  STORAGE_KEYS: {
    IS_LOGGED_IN: 'isLoggedIn',
    USER_ROLE: 'userRole',
    USERNAME: 'username',
    SESSION_EXPIRY: 'sessionExpiry'
  }
} as const;