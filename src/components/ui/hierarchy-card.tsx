'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight, Building2, Globe, Users, Briefcase } from 'lucide-react'

interface HierarchyLevel {
  id: string
  name: string
  type: 'country' | 'organization' | 'employer' | 'workorder'
  count?: number
  children?: HierarchyLevel[]
  details?: {
    currency?: string
    location?: string
    employeeCount?: number
    status?: string
    description?: string
    manager?: string
  }
}

interface HierarchyCardProps {
  level: HierarchyLevel
  onSelect?: (level: HierarchyLevel) => void
  isExpanded?: boolean
  expandedLevels?: Set<string>
  depth?: number
}

const getIcon = (type: string) => {
  switch (type) {
    case 'country': return <Globe className="h-5 w-5 text-blue-500" />
    case 'organization': return <Building2 className="h-5 w-5 text-green-500" />
    case 'employer': return <Users className="h-5 w-5 text-purple-500" />
    case 'workorder': return <Briefcase className="h-5 w-5 text-orange-500" />
    default: return <ChevronRight className="h-5 w-5" />
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'country': return 'País'
    case 'organization': return 'Organización'
    case 'employer': return 'Empleador'
    case 'workorder': return 'Orden de Trabajo'
    default: return type
  }
}

export function HierarchyCard({ level, onSelect, isExpanded = false, expandedLevels, depth = 0 }: HierarchyCardProps) {
  const marginLeft = depth * 24

  return (
    <div className="space-y-2" style={{ marginLeft: `${marginLeft}px` }}>
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
          level.type === 'country' ? 'border-l-blue-500 bg-blue-50/30' :
          level.type === 'organization' ? 'border-l-green-500 bg-green-50/30' :
          level.type === 'employer' ? 'border-l-purple-500 bg-purple-50/30' :
          'border-l-orange-500 bg-orange-50/30'
        }`}
        onClick={() => onSelect?.(level)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getIcon(level.type)}
              <div>
                <h3 className="font-semibold text-gray-900">{level.name}</h3>
                <p className="text-sm text-gray-500">{getTypeLabel(level.type)}</p>
                {level.details && (
                  <div className="mt-2 space-y-1">
                    {level.details.location && (
                      <p className="text-xs text-gray-600">📍 {level.details.location}</p>
                    )}
                    {level.details.manager && (
                      <p className="text-xs text-gray-600">👤 {level.details.manager}</p>
                    )}
                    {level.details.employeeCount !== undefined && (
                      <p className="text-xs text-gray-600">👥 {level.details.employeeCount} empleados</p>
                    )}
                    {level.details.currency && (
                      <p className="text-xs text-gray-600">💰 {level.details.currency}</p>
                    )}
                    {level.details.status && (
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        level.details.status === 'Activo' ? 'bg-green-100 text-green-700' :
                        level.details.status === 'Inactivo' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {level.details.status}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {level.count !== undefined && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {level.count}
                </span>
              )}
              {level.children && level.children.length > 0 && (
                <ChevronRight 
                  className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                />
              )}
            </div>
          </div>
          {level.details?.description && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">{level.details.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {isExpanded && level.children && (
        <div className="space-y-2">
          {level.children.map((child) => (
            <HierarchyCard
              key={child.id}
              level={child}
              onSelect={onSelect}
              isExpanded={expandedLevels?.has(child.id) || false}
              expandedLevels={expandedLevels}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}