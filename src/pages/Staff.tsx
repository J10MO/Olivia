"use client"

import type React from "react"
import { useState } from "react"
import {
  UserCheck,
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Award,
  Clock,
  Users,
  Activity,
  Star,
} from "lucide-react"

const Staff: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)

  const staff = [
    {
      id: 1,
      name: "د. سارة أحمد محمد",
      position: "طبيب أسنان عام",
      specialization: "طب ال��سنان العام",
      phone: "0770111222",
      email: "sara.ahmed@clinic.com",
      joinDate: "2020-03-15",
      experience: "8 سنوات",
      status: "active",
      patientsCount: 45,
      rating: 4.8,
      schedule: "الأحد - الخميس",
      workingHours: "08:00 - 16:00",
    },
    {
      id: 2,
      name: "د. محمد حسن علي",
      position: "أخصائي تقويم الأسنان",
      specialization: "تقويم الأسنان",
      phone: "0771222333",
      email: "mohammed.hassan@clinic.com",
      joinDate: "2019-07-20",
      experience: "10 سنوات",
      status: "active",
      patientsCount: 32,
      rating: 4.9,
      schedule: "السبت - الأربعاء",
      workingHours: "09:00 - 17:00",
    },
    {
      id: 3,
      name: "د. فاطمة علي حسين",
      position: "أخصائي جراحة الفم",
      specialization: "جراحة الفم والوجه والفكين",
      phone: "0772333444",
      email: "fatima.ali@clinic.com",
      joinDate: "2021-01-10",
      experience: "6 سنوات",
      status: "active",
      patientsCount: 28,
      rating: 4.7,
      schedule: "الأحد - الخميس",
      workingHours: "10:00 - 18:00",
    },
    {
      id: 4,
      name: "أحمد محمود حسن",
      position: "مساعد طبيب أسنان",
      specialization: "مساعدة طبية",
      phone: "0773444555",
      email: "ahmed.mahmoud@clinic.com",
      joinDate: "2022-05-01",
      experience: "3 سنوات",
      status: "active",
      patientsCount: 0,
      rating: 4.5,
      schedule: "السبت - الخميس",
      workingHours: "08:00 - 16:00",
    },
    {
      id: 5,
      name: "مريم سالم أحمد",
      position: "ممرضة أسنان",
      specialization: "التمريض المتخصص",
      phone: "0774555666",
      email: "mariam.salem@clinic.com",
      joinDate: "2021-09-15",
      experience: "4 سنوات",
      status: "vacation",
      patientsCount: 0,
      rating: 4.6,
      schedule: "الأحد - الخميس",
      workingHours: "08:00 - 16:00",
    },
  ]

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === "all" || member.status === selectedFilter

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "vacation":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشط"
      case "vacation":
        return "في إجازة"
      case "inactive":
        return "غير نشط"
      default:
        return "غير محدد"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
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
              إدارة الطاقم الطبي
            </h1>
            <p className="text-gray-600 mt-1">إدارة ومتابعة الطاقم الطبي والإداري</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة عضو جديد</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-semibold">إجمالي الطاقم</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">{staff.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Activity className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-semibold">الطاقم النشط</span>
            </div>
            <p className="text-2xl font-bold text-green-900 mt-2">
              {staff.filter((s) => s.status === "active").length}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Award className="w-5 h-5 text-orange-600" />
              <span className="text-orange-800 font-semibold">الأطباء</span>
            </div>
            <p className="text-2xl font-bold text-orange-900 mt-2">
              {staff.filter((s) => s.position.includes("طبيب")).length}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-semibold">إجمالي المرضى</span>
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">
              {staff.reduce((sum, s) => sum + s.patientsCount, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في الطاقم..."
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
              <option value="all">جميع الأعضاء</option>
              <option value="active">النشطون</option>
              <option value="vacation">في إجازة</option>
              <option value="inactive">غير النشطين</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                {getStatusText(member.status)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{member.specialization}</span>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600" dir="ltr">
                  {member.phone}
                </span>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600" dir="ltr">
                  {member.email}
                </span>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{member.schedule}</span>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{member.workingHours}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 space-x-reverse">
                  {renderStars(member.rating)}
                  <span className="text-sm text-gray-600 mr-2">{member.rating}</span>
                </div>
                {member.patientsCount > 0 && (
                  <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{member.patientsCount} مريض</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex space-x-2 space-x-reverse">
              <button className="flex-1 flex items-center justify-center space-x-1 space-x-reverse px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-sm">عرض</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 space-x-reverse px-3 py-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
                <span className="text-sm">تعديل</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 space-x-reverse px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">إضافة عضو جديد للطاقم</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل الاسم الكامل"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المنصب</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">اختر المنصب</option>
                    <option value="doctor">طبيب أسنان</option>
                    <option value="specialist">أخصائي</option>
                    <option value="assistant">مساعد طبيب</option>
                    <option value="nurse">ممرض/ة</option>
                    <option value="admin">إداري</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">التخصص</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="التخصص"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="رقم الهاتف"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">سنوات الخبرة</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="سنوات الخبرة"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="البريد الإلكتروني"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">أيام العمل</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: الأحد - الخميس"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ساعات العمل</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: 08:00 - 16:00"
                  />
                </div>
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
                  إضافة العضو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Staff
