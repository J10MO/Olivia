// @/components/routes/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  // التحقق من تسجيل الدخول
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');

  // إذا لم يكن مسجل دخول، توجيه لصفحة تسجيل الدخول
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // إذا لم يكن له صلاحية، توجيه لصفحة غير مخول
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // إذا كان له صلاحية، عرض المحتوى
  return <>{children}</>;
};

export default PrivateRoute;

// Hook للاستخدام في المكونات
export const useAuth = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  const username = localStorage.getItem('username');

  const hasRole = (roles: string[]) => {
    return userRole && roles.includes(userRole);
  };

  const isAdmin = () => {
    return userRole === 'admin';
  };

  const isTeacher = () => {
    return userRole === 'teacher';
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const redirectToHome = () => {
    if (userRole === 'admin') {
      window.location.href = '/';
    } else if (userRole === 'teacher') {
      window.location.href = '/tech';
    } else {
      window.location.href = '/login';
    }
  };

  return {
    isLoggedIn,
    userRole,
    username,
    hasRole,
    isAdmin,
    isTeacher,
    logout,
    redirectToHome
  };
};