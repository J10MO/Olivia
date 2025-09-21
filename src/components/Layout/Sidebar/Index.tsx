"use client"

import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import {
  Home,
  Calendar,
  Users,
  FileText,
  Settings,
  Phone,
  Mail,
  MapPin,
  Activity,
  UserCheck,
  Clock,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Bell,
  Package,
  Award,
} from "lucide-react"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const navigationItems = [
    { icon: Home, label: "لوحة التحكم", path: "/" },
    { icon: Calendar, label: "المواعيد", path: "/appointments" },
    { icon: Users, label: "المرضى", path: "/patients" },
    { icon: UserCheck, label: "الطاقم الطبي", path: "/staff" },
    { icon: Activity, label: "السجلات الطبية", path: "/records" },
    { icon: FileText, label: "التقارير", path: "/reports" },
    { icon: Clock, label: "الجدولة", path: "/schedule" },
    { icon: Bell, label: "التذكيرات", path: "/reminders" },
    { icon: Package, label: "المخزون", path: "/inventory" },
    { icon: Award, label: "الجودة", path: "/quality" },
    { icon: Settings, label: "الإعدادات", path: "/settings" },
  ]

  const quickStats = [
    { label: "مواعيد اليوم", value: "24", color: "bg-blue-500" },
    { label: "المرضى النشطون", value: "156", color: "bg-green-500" },
    { label: "التقارير المعلقة", value: "8", color: "bg-orange-500" },
  ]

  return (
    <div
      className={`${isCollapsed ? "w-20" : "w-72"} ${isCollapsed ? "h-screen" : "h-full"}  transition-all duration-300 bg-white border-l border-gray-200  flex flex-col `}
      dir="rtl"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {!isCollapsed && (
            <div className="flex items-center space-x-3 space-x-reverse">
              <div>
                <h1
                  className="text-xl font-bold text-gray-800"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  عيادة دنتل
                </h1>
                <p className="text-sm text-gray-500">إدارة الرعاية الصحية</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={index}
              to={item.path}
              className={`w-auto flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg transition-all duration-200 text-right ${
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100">
          <h3
            className="text-sm font-semibold text-gray-800 mb-3 text-right"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            نظرة سريعة
          </h3>
          <div className="space-y-3">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-3 space-x-reverse">
                <div className="flex-1 text-right">
                  <p className="text-xs text-gray-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                    {stat.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-600 justify-end">
              <span dir="ltr">+964 770 123 4567</span>
              <Phone className="w-3 h-3" />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-600 justify-end">
              <span dir="ltr">info@dintelclinic.com</span>
              <Mail className="w-3 h-3" />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-600 justify-end">
              <span style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>شارع الصحة 123، بغداد الطبية</span>
              <MapPin className="w-3 h-3" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
