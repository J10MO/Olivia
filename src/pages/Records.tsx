"use client"

import type React from "react"
import { useState } from "react"
import {
  Activity,
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Download,
  FileText,
  Calendar,
  User,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Clock,
  Pill,
} from "lucide-react"

const Records: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)

  const medicalRecords = [
    {
      id: 1,
      patientName: "أحمد محمد علي",
      patientId: "P001",
      recordDate: "2024-01-20",
      diagnosis: "تسوس في الضرس العلوي الأيمن",
      treatment: "حشو مركب",
      doctor: "د. سارة أحمد",
      status: "completed",
      nextVisit: "2024-02-20",
      medications: ["مسكن ألم", "مضاد حيوي"],
      notes: "المريض يعاني من حساسية طفيفة. يُنصح بالمتابعة الدورية.",
      priority: "medium",
    },
    {
      id: 2,
      patientName: "فاطمة حسن محمود",
      patientId: "P002",
      recordDate: "2024-01-19",
      diagnosis: "التهاب اللثة المزمن",
      treatment: "تنظيف عميق وعلاج اللثة",
      doctor: "د. محمد حسن",
      status: "in-progress",
      nextVisit: "2024-01-26",
      medications: ["غسول فم طبي", "مضاد التهاب"],
      notes: "حالة متقدمة تحتاج متابعة أسبوعية",
      priority: "high",
    },
    {
      id: 3,
      patientName: "محمد حسين علي",
      patientId: "P003",
      recordDate: "2024-01-18",
      diagnosis: "كسر في السن الأمامي",
      treatment: "تركيب تاج خزفي",
      doctor: "د. فاطمة علي",
      status: "pending",
      nextVisit: "2024-01-25",
      medications: ["مسكن ألم قوي"],
      notes: "يحتاج جلسة إضافية لتركيب التاج النهائي",
      priority: "high",
    },
    {
      id: 4,
      patientName: "سارة أحمد حسن",
      patientId: "P004",
      recordDate: "2024-01-17",
      diagnosis: "فحص دوري - حالة جيدة",
      treatment: "تنظيف وتلميع",
      doctor: "د. سارة أحمد",
      status: "completed",
      nextVisit: "2024-07-17",
      medications: [],
      notes: "حالة ممتازة، يُنصح بالمتابعة كل 6 أشهر",
      priority: "low",
    },
    {
      id: 5,
      patientName: "علي محمود حسين",
      patientId: "P005",
      recordDate: "2024-01-16",
      diagnosis: "تقويم الأسنان - مرحلة متوسطة",
      treatment: "تعديل التقويم",
      doctor: "د. محمد حسن",
      status: "in-progress",
      nextVisit: "2024-02-16",
      medications: ["مسكن ألم خفيف"],
      notes: "التقدم جيد، متوقع انتهاء العلاج خلال 8 أشهر",
      priority: "medium",
    },
  ]

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === "all" || record.status === selectedFilter

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "مكتمل"
      case "in-progress":
        return "جاري"
      case "pending":
        return "معلق"
      default:
        return "غير محدد"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <Clock className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
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
              السجلات الطبية
            </h1>
            <p className="text-gray-600 mt-1">إدارة ومتابعة السجلات الطبية للمرضى</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة سجل جديد</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-semibold">إجمالي السجلات</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">{medicalRecords.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-semibold">مكتملة</span>
            </div>
            <p className="text-2xl font-bold text-green-900 mt-2">
              {medicalRecords.filter((r) => r.status === "completed").length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-semibold">جارية</span>
            </div>
            <p className="text-2xl font-bold text-yellow-900 mt-2">
              {medicalRecords.filter((r) => r.status === "in-progress").length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-semibold">عالية الأولوية</span>
            </div>
            <p className="text-2xl font-bold text-red-900 mt-2">
              {medicalRecords.filter((r) => r.priority === "high").length}
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
              placeholder="البحث في السجلات..."
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
              <option value="all">جميع السجلات</option>
              <option value="completed">مكتملة</option>
              <option value="in-progress">جارية</option>
              <option value="pending">معلقة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">المريض</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">التشخيص</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">العلاج</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">الطبيب</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">التاريخ</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">الحالة</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">الأولوية</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{record.patientName}</p>
                        <p className="text-sm text-gray-600">{record.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-800">{record.diagnosis}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-600">{record.treatment}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Stethoscope className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{record.doctor}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{record.recordDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {getStatusText(record.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`flex items-center space-x-1 space-x-reverse ${getPriorityColor(record.priority)}`}>
                      {getPriorityIcon(record.priority)}
                      <span className="text-sm font-medium">
                        {record.priority === "high" ? "عالية" : record.priority === "medium" ? "متوسطة" : "منخفضة"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2 space-x-reverse">
                      <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Records Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecords.slice(0, 4).map((record) => (
          <div key={record.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{record.patientName}</h3>
                  <p className="text-sm text-gray-600">{record.patientId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                  {getStatusText(record.status)}
                </span>
                <div className={getPriorityColor(record.priority)}>{getPriorityIcon(record.priority)}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">التشخيص:</p>
                <p className="text-gray-600">{record.diagnosis}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">العلاج:</p>
                <p className="text-gray-600">{record.treatment}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">الطبيب المعالج:</p>
                  <p className="text-gray-600">{record.doctor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">تاريخ السجل:</p>
                  <p className="text-gray-600">{record.recordDate}</p>
                </div>
              </div>

              {record.medications.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">الأدوية:</p>
                  <div className="flex flex-wrap gap-2">
                    {record.medications.map((med, index) => (
                      <span
                        key={index}
                        className="flex items-center space-x-1 space-x-reverse bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs"
                      >
                        <Pill className="w-3 h-3" />
                        <span>{med}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-gray-700">ملاحظات:</p>
                <p className="text-gray-600 text-sm">{record.notes}</p>
              </div>

              {record.nextVisit && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">الزيارة القادمة:</span>
                    <span className="text-blue-600">{record.nextVisit}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">إضافة سجل طبي جديد</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم المريض</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اسم المريض"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم المريض</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="رقم المريض"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">التشخيص</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="وصف التشخيص"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العلاج المقترح</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="وصف العلاج"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الطبيب المعالج</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">اختر الطبيب</option>
                    <option value="dr-sara">د. سارة أحمد</option>
                    <option value="dr-mohammed">د. محمد حسن</option>
                    <option value="dr-fatima">د. فاطمة علي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الأولوية</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">عالية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الأدوية (اختياري)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل الأدوية مفصولة بفاصلة"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات إضافية</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
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
                  إضافة السجل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Records
