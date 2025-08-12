'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Search, 
  Plus,
  MoreVertical,
  MapPin,
  Calendar,
  Building2,
  Eye,
  Edit,
  Briefcase,
  DollarSign,
  Mail,
  Phone,
  User
} from 'lucide-react'

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock data for employees
  const employees = [
    {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@panxea.com',
      position: 'Frontend Developer',
      department: 'Desarrollo',
      country: 'México',
      salary: 38000,
      currency: 'MXN',
      hireDate: '2023-03-15',
      status: 'Activo',
      avatar: 'AG'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@panxea.com',
      position: 'Senior Developer',
      department: 'Desarrollo',
      country: 'México',
      salary: 45000,
      currency: 'MXN',
      hireDate: '2022-01-10',
      status: 'Activo',
      avatar: 'CM'
    },
    {
      id: 3,
      name: 'Luis Rodríguez',
      email: 'luis.rodriguez@panxea.com',
      position: 'Marketing Manager',
      department: 'Marketing',
      country: 'México',
      salary: 32000,
      currency: 'MXN',
      hireDate: '2023-06-20',
      status: 'Activo',
      avatar: 'LR'
    },
    {
      id: 4,
      name: 'Pedro Santos',
      email: 'pedro.santos@globalcorp.com.br',
      position: 'Analista de Sistemas',
      department: 'Tecnología',
      country: 'Brasil',
      salary: 8500,
      currency: 'BRL',
      hireDate: '2023-02-28',
      status: 'Activo',
      avatar: 'PS'
    }
  ]

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || 
                         employee.country.toLowerCase() === selectedFilter.toLowerCase()
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Total Empleados</p>
                <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Departamentos</p>
                <p className="text-2xl font-bold text-slate-900">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Países</p>
                <p className="text-2xl font-bold text-slate-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Nuevos (Este mes)</p>
                <p className="text-2xl font-bold text-slate-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar empleados por nombre, email o posición..."
                className="pl-10 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">Todos los países</option>
                <option value="méxico">México</option>
                <option value="brasil">Brasil</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <span className="text-slate-600 font-semibold">{employee.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{employee.name}</h3>
                    <p className="text-sm text-slate-600">{employee.position}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Building2 className="h-4 w-4 mr-2" />
                  {employee.department}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {employee.email}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {employee.country}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {employee.salary.toLocaleString()} {employee.currency}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Desde {new Date(employee.hireDate).toLocaleDateString()}
                </span>
                <div className="flex space-x-1">
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">No se encontraron empleados</h3>
          <p className="text-slate-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}