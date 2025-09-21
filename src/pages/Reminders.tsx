"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Bell,
  Clock,
  Calendar,
  User,
  Stethoscope,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  X,
  Volume2,
  VolumeX,
  Mail,
  MessageSquare,
  Settings,
  Target,
  Timer,
  Activity,
  FileText,
  Pill,
  Heart,
  Phone,
  Send,
  Eye,
} from "lucide-react"

const Reminders: React.FC = () => {
  const [activeTab, setActiveTab] = useState("active")
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [notifications, setNotifications] = useState<any[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Sample reminders data
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "موعد أحمد محمد - فحص دوري",
      description: "فحص دوري للأسنان مع تنظيف",
      type: "appointment",
      priority: "high",
      scheduledTime: "2024-01-22T09:00:00",
      reminderTime: "2024-01-22T08:30:00",
      patient: "أحمد محمد علي",
      doctor: "د. سارة أحمد",
      status: "active",
      methods: ["push", "sms", "email"],
      recurring: false,
      completed: false,
      room: "غرفة 1",
      phone: "0770123456",
      notes: "مريض يعاني من حساسية البنسلين",
    },
    {
      id: 2,
      title: "تذكير دواء - فاطمة حسن",
      description: "تناول المضاد الحيوي بعد الوجبة",
      type: "medication",
      priority: "high",
      scheduledTime: "2024-01-22T14:00:00",
      reminderTime: "2024-01-22T13:45:00",
      patient: "فاطمة حسن محمود",
      doctor: "د. محمد حسن",
      status: "active",
      methods: ["push", "sms"],
      recurring: true,
      recurringPattern: "daily",
      completed: false,
      medication: "أموكسيسيلين 500mg",
      dosage: "حبة واحدة كل 8 ساعات",
      phone: "0771234567",
    },
    {
      id: 3,
      title: "متابعة علاج - محمد حسين",
      description: "مراجعة حالة زراعة الأسنان",
      type: "followup",
      priority: "medium",
      scheduledTime: "2024-01-23T10:00:00",
      reminderTime: "2024-01-23T09:30:00",
      patient: "محمد حسين علي",
      doctor: "د. فاطمة علي",
      status: "active",
      methods: ["push", "email"],
      recurring: false,
      completed: false,
      treatment: "زراعة أسنان",
      phone: "0772345678",
      notes: "فحص التئام الجرح والتأكد من عدم وجود التهاب",
    },
    {
      id: 4,
      title: "تنظيف معدات - غرفة العمليات",
      description: "تعقيم وتنظيف أدوات الجراحة",
      type: "maintenance",
      priority: "high",
      scheduledTime: "2024-01-22T18:00:00",
      reminderTime: "2024-01-22T17:45:00",
      assignedTo: "فريق التنظيف",
      status: "active",
      methods: ["push"],
      recurring: true,
      recurringPattern: "daily",
      completed: false,
      equipment: "أدوات الجراحة",
      location: "غرفة العمليات",
    },
    {
      id: 5,
      title: "تجديد وصفة - علي محمود",
      description: "تجديد وصفة مسكن الألم",
      type: "prescription",
      priority: "medium",
      scheduledTime: "2024-01-24T11:00:00",
      reminderTime: "2024-01-24T10:30:00",
      patient: "علي محمود حسين",
      doctor: "د. سارة أحمد",
      status: "active",
      methods: ["push", "sms"],
      recurring: false,
      completed: false,
      medication: "إيبوبروفين 400mg",
      phone: "0774567890",
    },
  ])

  const reminderTypes = [
    { id: "appointment", name: "المواعيد", icon: Calendar, color: "bg-blue-500" },
    { id: "medication", name: "الأدوية", icon: Pill, color: "bg-green-500" },
    { id: "followup", name: "المتابعة", icon: Heart, color: "bg-red-500" },
    { id: "maintenance", name: "الصيانة", icon: Settings, color: "bg-orange-500" },
    { id: "prescription", name: "الوصفات", icon: FileText, color: "bg-purple-500" },
  ]

  const priorityLevels = [
    { id: "low", name: "منخفضة", color: "text-green-600", bg: "bg-green-100" },
    { id: "medium", name: "متوسطة", color: "text-yellow-600", bg: "bg-yellow-100" },
    { id: "high", name: "عالية", color: "text-red-600", bg: "bg-red-100" },
  ]

  const notificationMethods = [
    { id: "push", name: "إشعار منبثق", icon: Bell },
    { id: "sms", name: "رسالة نصية", icon: MessageSquare },
    { id: "email", name: "بريد إلكتروني", icon: Mail },
    { id: "call", name: "مكالمة هاتفية", icon: Phone },
  ]

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const upcomingReminders = reminders.filter((reminder) => {
        const reminderTime = new Date(reminder.reminderTime)
        const timeDiff = reminderTime.getTime() - now.getTime()
        return timeDiff > 0 && timeDiff <= 60000 && !reminder.completed // Within 1 minute
      })

      upcomingReminders.forEach((reminder) => {
        if (!notifications.find((n) => n.id === reminder.id)) {
          showNotification(reminder)
        }
      })
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [reminders, notifications])

  const showNotification = (reminder: any) => {
    const notification = {
      id: reminder.id,
      title: reminder.title,
      message: reminder.description,
      type: reminder.type,
      priority: reminder.priority,
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [notification, ...prev])

    // Play sound if enabled
    if (soundEnabled) {
      const audio = new Audio("/notification-sound.mp3")
      audio.play().catch(() => {
        // Handle audio play failure silently
      })
    }

    // Show browser notification if permission granted
    if (Notification.permission === "granted") {
      new Notification(reminder.title, {
        body: reminder.description,
        icon: "/clinic-icon.png",
      })
    }
  }

  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch =
      reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.patient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.doctor?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === "all" || reminder.type === selectedFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && reminder.status === "active" && !reminder.completed) ||
      (activeTab === "completed" && reminder.completed) ||
      (activeTab === "overdue" && new Date(reminder.scheduledTime) < new Date() && !reminder.completed)

    return matchesSearch && matchesFilter && matchesTab
  })

  const getTypeIcon = (type: string) => {
    const typeConfig = reminderTypes.find((t) => t.id === type)
    return typeConfig ? typeConfig.icon : Bell
  }

  const getTypeColor = (type: string) => {
    const typeConfig = reminderTypes.find((t) => t.id === type)
    return typeConfig ? typeConfig.color : "bg-gray-500"
  }

  const getPriorityConfig = (priority: string) => {
    return priorityLevels.find((p) => p.id === priority) || priorityLevels[1]
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTimeUntil = (dateString: string) => {
    const now = new Date()
    const target = new Date(dateString)
    const diff = target.getTime() - now.getTime()

    if (diff < 0) return "متأخر"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `خلال ${days} ${days === 1 ? "يوم" : "أيام"}`
    }

    if (hours > 0) {
      return `خلال ${hours} ${hours === 1 ? "ساعة" : "ساعات"}`
    }

    return `خلال ${minutes} ${minutes === 1 ? "دقيقة" : "دقائق"}`
  }

  const markAsCompleted = (id: number) => {
    setReminders((prev) => prev.map((reminder) => (reminder.id === id ? { ...reminder, completed: true } : reminder)))
  }

  const snoozeReminder = (id: number, minutes: number) => {
    setReminders((prev) =>
      prev.map((reminder) => {
        if (reminder.id === id) {
          const newTime = new Date(reminder.reminderTime)
          newTime.setMinutes(newTime.getMinutes() + minutes)
          return { ...reminder, reminderTime: newTime.toISOString() }
        }
        return reminder
      }),
    )
  }

  const deleteReminder = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا التذكير؟")) {
      setReminders((prev) => prev.filter((reminder) => reminder.id !== id))
    }
  }

  const sendManualReminder = (reminder: any) => {
    showNotification(reminder)
    alert(`تم إرسال التذكير: ${reminder.title}`)
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        alert("تم تفعيل الإشعارات بنجاح!")
      }
    }
  }

  const stats = {
    total: reminders.length,
    active: reminders.filter((r) => r.status === "active" && !r.completed).length,
    completed: reminders.filter((r) => r.completed).length,
    overdue: reminders.filter((r) => new Date(r.scheduledTime) < new Date() && !r.completed).length,
    today: reminders.filter((r) => {
      const today = new Date().toDateString()
      return new Date(r.scheduledTime).toDateString() === today
    }).length,
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
              نظام التذكيرات الذكي
            </h1>
            <p className="text-gray-600 mt-1">إدارة شاملة للتذكيرات والإشعارات الطبية</p>
          </div>
          <div className="flex space-x-3 space-x-reverse">
            <button
              onClick={requestNotificationPermission}
              className="flex items-center space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span>ت��عيل الإشعارات</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة تذكير</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-semibold">إجمالي التذكيرات</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Activity className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-semibold">نشطة</span>
            </div>
            <p className="text-2xl font-bold text-green-900 mt-2">{stats.active}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-semibold">اليوم</span>
            </div>
            <p className="text-2xl font-bold text-yellow-900 mt-2">{stats.today}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-semibold">مكتملة</span>
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">{stats.completed}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-semibold">متأخرة</span>
            </div>
            <p className="text-2xl font-bold text-red-900 mt-2">{stats.overdue}</p>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {notifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">الإشعارات الحديثة</h3>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  soundEnabled ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button onClick={() => setNotifications([])} className="text-gray-600 hover:text-gray-800 text-sm">
                مسح الكل
              </button>
            </div>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Tabs */}
          <div className="flex space-x-2 space-x-reverse">
            {[
              { id: "active", name: "نشطة", count: stats.active },
              { id: "completed", name: "مكتملة", count: stats.completed },
              { id: "overdue", name: "متأخرة", count: stats.overdue },
              { id: "all", name: "الكل", count: stats.total },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-1 space-x-3 space-x-reverse">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث في التذكيرات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الأنواع</option>
                {reminderTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.map((reminder) => {
          const TypeIcon = getTypeIcon(reminder.type)
          const priorityConfig = getPriorityConfig(reminder.priority)
          const isOverdue = new Date(reminder.scheduledTime) < new Date() && !reminder.completed

          return (
            <div
              key={reminder.id}
              className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
                isOverdue
                  ? "border-red-500"
                  : reminder.completed
                    ? "border-green-500"
                    : reminder.priority === "high"
                      ? "border-orange-500"
                      : "border-blue-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 space-x-reverse flex-1">
                  <div
                    className={`w-12 h-12 ${getTypeColor(reminder.type)} rounded-lg flex items-center justify-center`}
                  >
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{reminder.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color}`}
                      >
                        {priorityConfig.name}
                      </span>
                      {reminder.recurring && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          متكرر
                        </span>
                      )}
                      {isOverdue && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          متأخر
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-3">{reminder.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{formatDate(reminder.scheduledTime)}</span>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{formatTime(reminder.scheduledTime)}</span>
                      </div>

                      {reminder.patient && (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{reminder.patient}</span>
                        </div>
                      )}

                      {reminder.doctor && (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Stethoscope className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{reminder.doctor}</span>
                        </div>
                      )}
                    </div>

                    {/* Additional Details */}
                    {(reminder.medication || reminder.treatment || reminder.equipment) && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        {reminder.medication && (
                          <div className="flex items-center space-x-2 space-x-reverse mb-1">
                            <Pill className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">
                              <strong>الدواء:</strong> {reminder.medication}
                            </span>
                          </div>
                        )}
                        {reminder.dosage && (
                          <div className="text-sm text-gray-600 mr-6">
                            <strong>الجرعة:</strong> {reminder.dosage}
                          </div>
                        )}
                        {reminder.treatment && (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Heart className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-gray-700">
                              <strong>العلاج:</strong> {reminder.treatment}
                            </span>
                          </div>
                        )}
                        {reminder.equipment && (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Settings className="w-4 h-4 text-orange-600" />
                            <span className="text-sm text-gray-700">
                              <strong>المعدات:</strong> {reminder.equipment}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Notification Methods */}
                    <div className="mt-3 flex items-center space-x-3 space-x-reverse">
                      <span className="text-sm text-gray-600">طرق التذكير:</span>
                      <div className="flex space-x-2 space-x-reverse">
                        {reminder.methods.map((method) => {
                          const methodConfig = notificationMethods.find((m) => m.id === method)
                          if (!methodConfig) return null
                          const MethodIcon = methodConfig.icon
                          return (
                            <div
                              key={method}
                              className="flex items-center space-x-1 space-x-reverse bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                            >
                              <MethodIcon className="w-3 h-3" />
                              <span>{methodConfig.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {reminder.notes && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>ملاحظات:</strong> {reminder.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Time Until and Actions */}
                <div className="text-left space-y-3">
                  <div className="text-sm">
                    <div className={`font-medium ${isOverdue ? "text-red-600" : "text-gray-800"}`}>
                      {getTimeUntil(reminder.scheduledTime)}
                    </div>
                    <div className="text-gray-500">{formatTime(reminder.reminderTime)}</div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {!reminder.completed && (
                      <>
                        <button
                          onClick={() => markAsCompleted(reminder.id)}
                          className="flex items-center space-x-1 space-x-reverse px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>مكتمل</span>
                        </button>

                        <button
                          onClick={() => sendManualReminder(reminder)}
                          className="flex items-center space-x-1 space-x-reverse px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                        >
                          <Send className="w-4 h-4" />
                          <span>إرسال</span>
                        </button>

                        <div className="flex space-x-1 space-x-reverse">
                          <button
                            onClick={() => snoozeReminder(reminder.id, 15)}
                            className="flex items-center space-x-1 space-x-reverse px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-xs transition-colors"
                            title="تأجيل 15 دقيقة"
                          >
                            <Timer className="w-3 h-3" />
                            <span>15د</span>
                          </button>
                          <button
                            onClick={() => snoozeReminder(reminder.id, 60)}
                            className="flex items-center space-x-1 space-x-reverse px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-xs transition-colors"
                            title="تأجيل ساعة"
                          >
                            <Timer className="w-3 h-3" />
                            <span>1س</span>
                          </button>
                        </div>
                      </>
                    )}

                    <div className="flex space-x-1 space-x-reverse">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        title="عرض التفاصيل"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                        title="تعديل"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filteredReminders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد تذكيرات</h3>
            <p className="text-gray-600">لم يتم العثور على تذكيرات تطابق المعايير المحددة</p>
          </div>
        )}
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">إضافة تذكير جديد</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان التذكير</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل عنوان التذكير"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="وصف مفصل للتذكير"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع التذكير</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {reminderTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {priorityLevels.map((priority) => (
                      <option key={priority.id} value={priority.id}>
                        {priority.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ التذكير</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">وقت التذكير</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">طرق الإشعار</label>
                <div className="grid grid-cols-2 gap-2">
                  {notificationMethods.map((method) => {
                    const MethodIcon = method.icon
                    return (
                      <label key={method.id} className="flex items-center space-x-2 space-x-reverse">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <MethodIcon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{method.name}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 space-x-reverse">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">تذكير متكرر</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات إضافية</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="ملاحظات إضافية"
                ></textarea>
              </div>

              <div className="flex space-x-3 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  إضافة التذكير
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reminders
