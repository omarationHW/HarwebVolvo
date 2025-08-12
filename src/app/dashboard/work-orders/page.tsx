'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Briefcase, 
  Users, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock,
  Search,
  Filter,
  DollarSign,
  Calendar,
  User,
  Building,
  Plus
} from 'lucide-react'

interface WorkOrder {
  id: string
  name: string
  employerId: string
  employerName: string
  organizationName: string
  status: 'active' | 'paused' | 'completed' | 'pending'
  employeeCount: number
  totalSalary: number
  nextPayrollDate: string
  manager: string
  description: string
  type: 'individual' | 'group' | 'department'
  createdAt: string
  lastProcessed?: string
}

const mockWorkOrders: WorkOrder[] = [
  {
    id: 'wo-dev-team',
    name: 'Equipo de Desarrollo',
    employerId: 'emp-panxea-mx',
    employerName: 'Panxea México',
    organizationName: 'Panxea Corporation',
    status: 'active',
    employeeCount: 45,
    totalSalary: 1875000,
    nextPayrollDate: '2025-01-15',
    manager: 'María García',
    description: 'Desarrollo de aplicaciones web y móviles usando React y Node.js',
    type: 'department',
    createdAt: '2024-12-01',
    lastProcessed: '2024-12-31'
  },
  {
    id: 'wo-marketing',
    name: 'Marketing Digital',
    employerId: 'emp-panxea-mx',
    employerName: 'Panxea México',
    organizationName: 'Panxea Corporation',
    status: 'active',
    employeeCount: 12,
    totalSalary: 480000,
    nextPayrollDate: '2025-01-15',
    manager: 'Luis Fernández',
    description: 'Campañas digitales y estrategias de crecimiento en redes sociales',
    type: 'department',
    createdAt: '2024-11-15'
  },
  {
    id: 'wo-sales',
    name: 'Ventas Corporativas',
    employerId: 'emp-panxea-mx',
    employerName: 'Panxea México',
    organizationName: 'Panxea Corporation',
    status: 'pending',
    employeeCount: 18,
    totalSalary: 720000,
    nextPayrollDate: '2025-01-15',
    manager: 'Patricia Morales',
    description: 'Ventas B2B y desarrollo de relaciones con clientes corporativos',
    type: 'department',
    createdAt: '2024-12-10'
  },
  {
    id: 'wo-consulting',
    name: 'Consultoría',
    employerId: 'emp-panxea-services',
    employerName: 'Panxea Services',
    organizationName: 'Panxea Corporation',
    status: 'active',
    employeeCount: 25,
    totalSalary: 1250000,
    nextPayrollDate: '2025-01-15',
    manager: 'Elena Torres',
    description: 'Consultoría en transformación digital y arquitectura de software',
    type: 'group',
    createdAt: '2024-10-20',
    lastProcessed: '2024-12-31'
  },
  {
    id: 'wo-support',
    name: 'Soporte Técnico',
    employerId: 'emp-panxea-services',
    employerName: 'Panxea Services',
    organizationName: 'Panxea Corporation',
    status: 'active',
    employeeCount: 30,
    totalSalary: 1080000,
    nextPayrollDate: '2025-01-15',
    manager: 'Jorge Mendoza',
    description: 'Soporte 24/7 para clientes corporativos y mantenimiento de sistemas',
    type: 'group',
    createdAt: '2024-11-01',
    lastProcessed: '2024-12-31'
  },
  {
    id: 'wo-development',
    name: 'Desarrollo de Software',
    employerId: 'emp-techstart-main',
    employerName: 'TechStart Principal',
    organizationName: 'TechStart Solutions',
    status: 'active',
    employeeCount: 55,
    totalSalary: 2200000,
    nextPayrollDate: '2025-01-15',
    manager: 'Ricardo Herrera',
    description: 'Desarrollo de plataformas SaaS y aplicaciones móviles innovadoras',
    type: 'department',
    createdAt: '2024-09-15',
    lastProcessed: '2024-12-31'
  },
  {
    id: 'wo-qa',
    name: 'Aseguramiento de Calidad',
    employerId: 'emp-techstart-main',
    employerName: 'TechStart Principal',
    organizationName: 'TechStart Solutions',
    status: 'paused',
    employeeCount: 20,
    totalSalary: 700000,
    nextPayrollDate: '2025-01-15',
    manager: 'Claudia Ruiz',
    description: 'Testing automatizado y control de calidad de software',
    type: 'group',
    createdAt: '2024-11-30'
  }
]

export default function WorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders)
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isProcessing, setIsProcessing] = useState(false)

  const filteredOrders = workOrders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.employerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.manager.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200'
      case 'paused': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'pending': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />
      case 'paused': return <Pause className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'paused': return 'Pausado'
      case 'completed': return 'Completado'
      case 'pending': return 'Pendiente'
      default: return status
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'individual': return 'Individual'
      case 'group': return 'Grupo'
      case 'department': return 'Departamento'
      default: return type
    }
  }

  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders)
    if (selectedOrders.has(orderId)) {
      newSelected.delete(orderId)
    } else {
      newSelected.add(orderId)
    }
    setSelectedOrders(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedOrders.size === filteredOrders.length) {
      setSelectedOrders(new Set())
    } else {
      setSelectedOrders(new Set(filteredOrders.map(order => order.id)))
    }
  }

  const handleProcessPayroll = async () => {
    if (selectedOrders.size === 0) {
      alert('Selecciona al menos una orden de trabajo para procesar')
      return
    }

    setIsProcessing(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const selectedOrdersArray = Array.from(selectedOrders)
    const updatedOrders = workOrders.map(order => {
      if (selectedOrdersArray.includes(order.id)) {
        return {
          ...order,
          status: 'completed' as const,
          lastProcessed: new Date().toISOString().split('T')[0]
        }
      }
      return order
    })
    
    setWorkOrders(updatedOrders)
    setSelectedOrders(new Set())
    setIsProcessing(false)
    
    alert(`Nómina procesada exitosamente para ${selectedOrdersArray.length} orden(es) de trabajo`)
  }

  const selectedOrdersData = filteredOrders.filter(order => selectedOrders.has(order.id))
  const totalSelectedEmployees = selectedOrdersData.reduce((sum, order) => sum + order.employeeCount, 0)
  const totalSelectedSalary = selectedOrdersData.reduce((sum, order) => sum + order.totalSalary, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Órdenes Total</p>
                <p className="text-2xl font-bold text-slate-900">{workOrders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Empleados</p>
                <p className="text-2xl font-bold text-slate-900">{workOrders.reduce((sum, order) => sum + order.employeeCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Play className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Activas</p>
                <p className="text-2xl font-bold text-slate-900">{workOrders.filter(wo => wo.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Total Nómina</p>
                <p className="text-2xl font-bold text-slate-900">${(workOrders.reduce((sum, order) => sum + order.totalSalary, 0) / 1000000).toFixed(1)}M</p>
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
                placeholder="Buscar órdenes de trabajo..."
                className="pl-10 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activo</option>
                <option value="pending">Pendiente</option>
                <option value="paused">Pausado</option>
                <option value="completed">Completado</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Orden
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary */}
      {selectedOrders.size > 0 && (
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-slate-900">
                    {selectedOrders.size} orden(es) seleccionada(s)
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  <span className="flex items-center"><Users className="h-4 w-4 mr-1" /> {totalSelectedEmployees} empleados</span>
                </div>
                <div className="text-sm text-slate-600">
                  <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" /> ${totalSelectedSalary.toLocaleString()}</span>
                </div>
              </div>
              <Button
                onClick={handleProcessPayroll}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? 'Procesando...' : 'Procesar Nómina'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Work Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <Card 
            key={order.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-0 ${
              selectedOrders.has(order.id) 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-slate-50'
            } shadow-sm`}
            onClick={() => handleSelectOrder(order.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-slate-900 mb-1">
                    {order.name}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-700 flex items-center">
                      <Building className="h-3 w-3 mr-1" />
                      {order.employerName}
                    </p>
                    <p className="text-xs text-slate-500">{order.organizationName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders.has(order.id)}
                    onChange={() => {}}
                    className="rounded border-slate-300"
                  />
                  <span className={`px-2 py-1 rounded-full text-xs border flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{getStatusLabel(order.status)}</span>
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{order.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center text-slate-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{order.employeeCount} empleados</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <User className="h-4 w-4 mr-2" />
                    <span>{order.manager}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{getTypeLabel(order.type)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-slate-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>${order.totalSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{order.nextPayrollDate}</span>
                  </div>
                  {order.lastProcessed && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Procesado: {order.lastProcessed}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">No se encontraron órdenes de trabajo</h3>
          <p className="text-slate-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}