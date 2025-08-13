import dynamic from 'next/dynamic'

// Lazy load heavy third-party components
export const LazyChart = dynamic(() => import('recharts').then(mod => ({ default: mod.LineChart })), {
  loading: () => <div className="animate-pulse bg-slate-200 h-64 rounded-lg" />,
  ssr: false
})

export const LazyBarChart = dynamic(() => import('recharts').then(mod => ({ default: mod.BarChart })), {
  loading: () => <div className="animate-pulse bg-slate-200 h-64 rounded-lg" />,
  ssr: false
})

// Skeleton components for loading states
export const TableSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 bg-slate-200 rounded" />
    <div className="h-8 bg-slate-200 rounded" />
    <div className="h-8 bg-slate-200 rounded" />
    <div className="h-8 bg-slate-200 rounded" />
  </div>
)

export const FormSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 bg-slate-200 rounded" />
    <div className="h-32 bg-slate-200 rounded" />
    <div className="h-10 bg-slate-200 rounded" />
  </div>
)

export const ChartSkeleton = () => (
  <div className="animate-pulse bg-slate-200 h-64 rounded-lg" />
)