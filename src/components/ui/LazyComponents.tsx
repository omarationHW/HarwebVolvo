import dynamic from 'next/dynamic'

// Lazy load heavy components
export const LazyChart = dynamic(() => import('./Chart'), {
  loading: () => <div className="animate-pulse bg-slate-200 h-64 rounded-lg" />,
  ssr: false
})

export const LazyDataTable = dynamic(() => import('./DataTable'), {
  loading: () => <div className="animate-pulse bg-slate-200 h-48 rounded-lg" />,
  ssr: false
})

export const LazyModal = dynamic(() => import('./Modal'), {
  loading: () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center" />,
  ssr: false
})

export const LazyFormBuilder = dynamic(() => import('./FormBuilder'), {
  loading: () => <div className="animate-pulse space-y-4">
    <div className="h-10 bg-slate-200 rounded" />
    <div className="h-32 bg-slate-200 rounded" />
  </div>,
  ssr: false
})