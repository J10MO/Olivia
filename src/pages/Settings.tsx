"use client"

import type React from "react"
import { useState } from "react"
import {
  SettingsIcon,
  User,
  Building,
  Clock,
  Bell,
  Shield,
  Database,
  Palette,
  Mail,
  Phone,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  Moon,
  Sun,
  Monitor,
  HardDrive,
  Camera,
  Lock,
  Key,
  Calendar,
  FileText,
} from "lucide-react"

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general")
  const [showPassword, setShowPassword] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    appointments: true,
    reminders: true,
    reports: false,
  })

  const [clinicInfo, setClinicInfo] = useState({
    name: "عيادة دنتل",
    address: "شارع الصحة 123، بغداد الطبية",
    phone: "+964 770 123 4567",
    email: "info@dintelclinic.com",
    website: "www.dintelclinic.com",
    license: "CL-2024-001",
    workingHours: {
      start: "08:00",
      end: "18:00",
      breakStart: "13:00",
      breakEnd: "14:00",
    },
    workingDays: ["sunday", "monday", "tuesday", "wednesday", "thursday"],
  })

  const [userProfile, setUserProfile] = useState({
    name: "د. أحمد محمد",
    email: "ahmed@dintelclinic.com",
    phone: "+964 771 234 567",
    specialization: "طب الأسنان العام",
    license: "DR-2024-001",
    experience: "8 سنوات",
  })

  const [systemSettings, setSystemSettings] = useState({
    language: "ar",
    timezone: "Asia/Baghdad",
    dateFormat: "dd/mm/yyyy",
    currency: "IQD",
    appointmentDuration: 30,
    autoBackup: true,
    backupFrequency: "daily",
    maxPatients: 1000,
    sessionTimeout: 30,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90,
    loginAttempts: 5,
    sessionSecurity: true,
    dataEncryption: true,
    auditLog: true,
  })

  const settingsTabs = [
    { id: "general", name: "عام", icon: SettingsIcon },
    { id: "clinic", name: "معلومات العيادة", icon: Building },
    { id: "profile", name: "الملف الشخصي", icon: User },
    { id: "notifications", name: "الإشعارات", icon: Bell },
    { id: "system", name: "النظام", icon: Database },
    { id: "security", name: "الأمان", icon: Shield },
    { id: "appearance", name: "المظهر", icon: Palette },
    { id: "backup", name: "النسخ الاحتياطي", icon: HardDrive },
  ]

  const handleSaveSettings = () => {
    // Simulate saving settings
    alert("تم حفظ الإعدادات بنجاح!")
  }

  const handleResetSettings = () => {
    if (confirm("هل أنت متأكد من إعادة تعيين جميع الإعدادات؟")) {
      // Reset to default values
      alert("تم إعادة تعيين الإعدادات!")
    }
  }

  const handleExportSettings = () => {
    // Simulate export
    alert("تم تصدير الإعدادات!")
  }

  const handleImportSettings = () => {
    // Simulate import
    alert("تم استيراد الإعدادات!")
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-2xl font-bold text-gray-800"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              إعدادات النظام
            </h1>
            <p className="text-gray-600 mt-1">إدارة وتخصيص إعدادات العيادة والنظام</p>
          </div>
          <div className="flex space-x-3 space-x-reverse">
            <button
              onClick={handleExportSettings}
              className="flex items-center space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>تصدير</span>
            </button>
            <button
              onClick={handleImportSettings}
              className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>استيراد</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <SettingsIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">الإعدادات العامة</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
                  <select
                    value={systemSettings.language}
                    onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                    <option value="ku">کوردی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة الزمنية</label>
                  <select
                    value={systemSettings.timezone}
                    onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Asia/Baghdad">بغداد (GMT+3)</option>
                    <option value="Asia/Erbil">أربيل (GMT+3)</option>
                    <option value="Asia/Kuwait">الكويت (GMT+3)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تنسيق التاريخ</label>
                  <select
                    value={systemSettings.dateFormat}
                    onChange={(e) => setSystemSettings({ ...systemSettings, dateFormat: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
                    <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
                    <option value="yyyy-mm-dd">سنة-شهر-يوم</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                  <select
                    value={systemSettings.currency}
                    onChange={(e) => setSystemSettings({ ...systemSettings, currency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="IQD">دينار عراقي (IQD)</option>
                    <option value="USD">دولار أمريكي (USD)</option>
                    <option value="EUR">يورو (EUR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">مدة الموعد الافتراضية (دقيقة)</label>
                  <input
                    type="number"
                    value={systemSettings.appointmentDuration}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, appointmentDuration: Number.parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">مهلة انتهاء الجلسة (دقيقة)</label>
                  <input
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, sessionTimeout: Number.parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Clinic Information */}
          {activeTab === "clinic" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <Building className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">معلومات العيادة</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم العيادة</label>
                  <input
                    type="text"
                    value={clinicInfo.name}
                    onChange={(e) => setClinicInfo({ ...clinicInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                  <textarea
                    value={clinicInfo.address}
                    onChange={(e) => setClinicInfo({ ...clinicInfo, address: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                    <input
                      type="tel"
                      value={clinicInfo.phone}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={clinicInfo.email}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموقع الإلكتروني</label>
                    <input
                      type="url"
                      value={clinicInfo.website}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, website: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الترخيص</label>
                    <input
                      type="text"
                      value={clinicInfo.license}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, license: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Working Hours */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">ساعات العمل</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">بداية العمل</label>
                      <input
                        type="time"
                        value={clinicInfo.workingHours.start}
                        onChange={(e) =>
                          setClinicInfo({
                            ...clinicInfo,
                            workingHours: { ...clinicInfo.workingHours, start: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نهاية العمل</label>
                      <input
                        type="time"
                        value={clinicInfo.workingHours.end}
                        onChange={(e) =>
                          setClinicInfo({
                            ...clinicInfo,
                            workingHours: { ...clinicInfo.workingHours, end: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">بداية الاستراحة</label>
                      <input
                        type="time"
                        value={clinicInfo.workingHours.breakStart}
                        onChange={(e) =>
                          setClinicInfo({
                            ...clinicInfo,
                            workingHours: { ...clinicInfo.workingHours, breakStart: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نهاية الاستراحة</label>
                      <input
                        type="time"
                        value={clinicInfo.workingHours.breakEnd}
                        onChange={(e) =>
                          setClinicInfo({
                            ...clinicInfo,
                            workingHours: { ...clinicInfo.workingHours, breakEnd: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Working Days */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">أيام العمل</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { id: "sunday", name: "الأحد" },
                        { id: "monday", name: "الاثنين" },
                        { id: "tuesday", name: "الثلاثاء" },
                        { id: "wednesday", name: "الأربعاء" },
                        { id: "thursday", name: "الخميس" },
                        { id: "friday", name: "الجمعة" },
                        { id: "saturday", name: "السبت" },
                      ].map((day) => (
                        <label key={day.id} className="flex items-center space-x-2 space-x-reverse">
                          <input
                            type="checkbox"
                            checked={clinicInfo.workingDays.includes(day.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setClinicInfo({
                                  ...clinicInfo,
                                  workingDays: [...clinicInfo.workingDays, day.id],
                                })
                              } else {
                                setClinicInfo({
                                  ...clinicInfo,
                                  workingDays: clinicInfo.workingDays.filter((d) => d !== day.id),
                                })
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{day.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Profile */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">الملف الشخصي</h2>
              </div>

              <div className="flex items-center space-x-6 space-x-reverse mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <div>
                  <button className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Camera className="w-4 h-4" />
                    <span>تغيير الصورة</span>
                  </button>
                  <p className="text-sm text-gray-600 mt-2">JPG, PNG أو GIF (الحد الأقصى 2MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
                  <input
                    type="text"
                    value={userProfile.specialization}
                    onChange={(e) => setUserProfile({ ...userProfile, specialization: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الترخيص</label>
                  <input
                    type="text"
                    value={userProfile.license}
                    onChange={(e) => setUserProfile({ ...userProfile, license: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                  <input
                    type="text"
                    value={userProfile.experience}
                    onChange={(e) => setUserProfile({ ...userProfile, experience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Change Password */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">تغيير كلمة المرور</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الحالية</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الجديدة</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">إعدادات الإشعارات</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">طرق الإشعار</h3>
                  <div className="space-y-4">
                    {[
                      { key: "email", label: "البريد الإلكتروني", icon: Mail },
                      { key: "sms", label: "الرسائل النصية", icon: Phone },
                      { key: "push", label: "الإشعارات المنبثقة", icon: Bell },
                    ].map((method) => {
                      const Icon = method.icon
                      return (
                        <div key={method.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-800">{method.label}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[method.key as keyof typeof notifications]}
                              onChange={(e) => setNotifications({ ...notifications, [method.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">أنواع الإشعارات</h3>
                  <div className="space-y-4">
                    {[
                      { key: "appointments", label: "المواعيد الجديدة والتغييرات", icon: Calendar },
                      { key: "reminders", label: "التذكيرات", icon: Clock },
                      { key: "reports", label: "التقارير الدورية", icon: FileText },
                    ].map((type) => {
                      const Icon = type.icon
                      return (
                        <div key={type.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-800">{type.label}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[type.key as keyof typeof notifications]}
                              onChange={(e) => setNotifications({ ...notifications, [type.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">إعدادات الأمان</h2>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="text-yellow-800 font-medium">تنبيه أمني</span>
                  </div>
                  <p className="text-yellow-700 text-sm mt-1">
                    تأكد من تفعيل جميع إعدادات الأمان لحماية بيانات العيادة والمرضى
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      key: "twoFactorAuth",
                      label: "المصادقة الثنائية",
                      description: "طبقة حماية إضافية لحسابك",
                      icon: Key,
                    },
                    {
                      key: "sessionSecurity",
                      label: "أمان الجلسة",
                      description: "تشفير جلسات المستخدمين",
                      icon: Lock,
                    },
                    {
                      key: "dataEncryption",
                      label: "تشفير البيانات",
                      description: "تشفير جميع البيانات المخزنة",
                      icon: Shield,
                    },
                    {
                      key: "auditLog",
                      label: "سجل المراجعة",
                      description: "تسجيل جميع العمليات والأنشطة",
                      icon: FileText,
                    },
                  ].map((setting) => {
                    const Icon = setting.icon
                    return (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <div>
                            <span className="font-medium text-gray-800">{setting.label}</span>
                            <p className="text-sm text-gray-600">{setting.description}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={securitySettings[setting.key as keyof typeof securitySettings]}
                            onChange={(e) =>
                              setSecuritySettings({ ...securitySettings, [setting.key]: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    )
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      انتهاء صلاحية كلمة المرور (أيام)
                    </label>
                    <input
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, passwordExpiry: Number.parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      محاولات تسجيل الدخول المسموحة
                    </label>
                    <input
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, loginAttempts: Number.parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <Palette className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">إعدادات المظهر</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">المظهر</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "light", name: "فاتح", icon: Sun },
                      { id: "dark", name: "داكن", icon: Moon },
                      { id: "system", name: "النظام", icon: Monitor },
                    ].map((theme) => {
                      const Icon = theme.icon
                      return (
                        <div
                          key={theme.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            theme.id === "light"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <Icon className="w-6 h-6 text-gray-600" />
                            <span className="font-medium text-gray-800">{theme.name}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">الألوان الأساسية</h3>
                  <div className="grid grid-cols-6 gap-3">
                    {[
                      "bg-blue-500",
                      "bg-green-500",
                      "bg-purple-500",
                      "bg-red-500",
                      "bg-yellow-500",
                      "bg-indigo-500",
                    ].map((color, index) => (
                      <div
                        key={index}
                        className={`w-12 h-12 ${color} rounded-lg cursor-pointer border-2 ${
                          index === 0 ? "border-gray-800" : "border-transparent"
                        } hover:scale-110 transition-transform`}
                      ></div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">حجم الخط</h3>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-sm text-gray-600">صغير</span>
                    <input type="range" min="12" max="20" defaultValue="14" className="flex-1" />
                    <span className="text-sm text-gray-600">كبير</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">الخط المستخدم</h3>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="system">خط النظام</option>
                    <option value="arabic">خط عربي تقليدي</option>
                    <option value="modern">خط عربي حديث</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Backup Settings */}
          {activeTab === "backup" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <HardDrive className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">النسخ الاحتياطي</h2>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">آخر نسخة احتياطية</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    تم إنشاء النسخة الاحتياطية بنجاح في 20 يناير 2024، 10:30 صباحاً
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <RefreshCw className="w-5 h-5 text-gray-600" />
                      <div>
                        <span className="font-medium text-gray-800">النسخ الاحتياطي التلقائي</span>
                        <p className="text-sm text-gray-600">إنشاء نسخ احتياطية تلقائياً</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={systemSettings.autoBackup}
                        onChange={(e) => setSystemSettings({ ...systemSettings, autoBackup: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تكرار النسخ الاحتياطي</label>
                    <select
                      value={systemSettings.backupFrequency}
                      onChange={(e) => setSystemSettings({ ...systemSettings, backupFrequency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="daily">يومياً</option>
                      <option value="weekly">أسبوعياً</option>
                      <option value="monthly">شهرياً</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                      <Download className="w-5 h-5" />
                      <span>إنشاء نسخة احتياطية الآن</span>
                    </button>

                    <button className="flex items-center justify-center space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                      <Upload className="w-5 h-5" />
                      <span>استعادة من نسخة احتياطية</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">النسخ الاحتياطية المحفوظة</h3>
                  <div className="space-y-3">
                    {[
                      { date: "20 يناير 2024", time: "10:30", size: "45.2 MB" },
                      { date: "19 يناير 2024", time: "10:30", size: "44.8 MB" },
                      { date: "18 يناير 2024", time: "10:30", size: "44.1 MB" },
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <HardDrive className="w-5 h-5 text-gray-600" />
                          <div>
                            <span className="font-medium text-gray-800">{backup.date}</span>
                            <p className="text-sm text-gray-600">
                              {backup.time} - {backup.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Summary Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">إجراءات سريعة</h3>
            <div className="space-y-3">
              <button
                onClick={handleSaveSettings}
                className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>حفظ الإعدادات</span>
              </button>

              <button
                onClick={handleResetSettings}
                className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة تعيين</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">حالة النظام</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">حالة الخادم</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm">متصل</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">قاعدة البيانات</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm">نشطة</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">آخر نسخة احتياطية</span>
                <span className="text-gray-600 text-sm">منذ ساعة</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">مساحة التخزين</span>
                <span className="text-gray-600 text-sm">75% مستخدمة</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">النشاط الأخير</h3>
            <div className="space-y-3">
              {[
                { action: "تم تحديث معلومات العيادة", time: "منذ 5 دقائق", icon: Building },
                { action: "تم تغيير إعدادات الإشعارات", time: "منذ ساعة", icon: Bell },
                { action: "تم إنشاء نسخة احتياطية", time: "منذ 3 ساعات", icon: HardDrive },
              ].map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div key={index} className="flex items-center space-x-3 space-x-reverse">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
