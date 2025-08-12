'use client'

import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: number
    label: string
  }
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray'
  className?: string
}

export function MetricCard({ 
  title, 
  value, 
  icon, 
  trend, 
  color = 'blue',
  className = '' 
}: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    purple: 'bg-purple-500 text-white',
    orange: 'bg-orange-500 text-white',
    red: 'bg-red-500 text-white',
    gray: 'bg-gray-500 text-white'
  }

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-500'
    if (value < 0) return 'text-red-500'
    return 'text-gray-500'
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
              {icon}
            </div>
            {trend && (
              <div className="flex items-center space-x-1">
                {getTrendIcon(trend.value)}
                <span className={`text-sm font-medium ${getTrendColor(trend.value)}`}>
                  {trend.value > 0 ? '+' : ''}{trend.value}%
                </span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className="text-xs text-gray-500 mt-1">{trend.label}</p>
            )}
          </div>
        </div>
        
        {/* Bottom gradient line */}
        <div className={`h-1 bg-gradient-to-r ${
          color === 'blue' ? 'from-blue-400 to-blue-600' :
          color === 'green' ? 'from-green-400 to-green-600' :
          color === 'purple' ? 'from-purple-400 to-purple-600' :
          color === 'orange' ? 'from-orange-400 to-orange-600' :
          color === 'red' ? 'from-red-400 to-red-600' :
          'from-gray-400 to-gray-600'
        }`} />
      </CardContent>
    </Card>
  )
}