'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Inicio', href: '/' },
    { 
      name: 'Productos', 
      href: '#',
      dropdown: [
        { name: 'Gestión de Nómina', href: '/#nomina' },
        { name: 'Órdenes de Trabajo', href: '/#ordenes' },
        { name: 'Reportes y Analytics', href: '/#reportes' },
        { name: 'Cumplimiento Legal', href: '/#cumplimiento' }
      ]
    },
    { name: 'Precios', href: '/#precios' },
    { name: 'Clientes', href: '/#clientes' },
    { name: 'Contacto', href: '/#contacto' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isScrolled 
                ? 'bg-slate-900' 
                : 'bg-white/20 backdrop-blur-lg'
            }`}>
              <span className={`text-xl font-bold ${
                isScrolled ? 'text-white' : 'text-slate-900'
              }`}>H</span>
            </div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled 
                ? 'text-slate-900' 
                : pathname === '/' ? 'text-white' : 'text-slate-900'
            }`}>
              HarwebDBO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                        isScrolled 
                          ? 'text-slate-700 hover:text-slate-900' 
                          : pathname === '/' ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {isProductsOpen && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                        onMouseEnter={() => setIsProductsOpen(true)}
                        onMouseLeave={() => setIsProductsOpen(false)}
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                            onClick={() => setIsProductsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isScrolled 
                        ? 'text-slate-700 hover:text-slate-900' 
                        : pathname === '/' ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link
              href="/login"
              className={`px-4 py-2 text-sm font-medium transition-all ${
                isScrolled
                  ? 'text-slate-700 hover:text-slate-900'
                  : pathname === '/' ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isScrolled
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : pathname === '/' 
                    ? 'bg-white text-slate-900 hover:bg-white/90' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              Empezar Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isScrolled
                ? 'text-slate-700 hover:bg-slate-100'
                : pathname === '/' ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-200">
            <div className="px-4 py-6 space-y-3">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-900 px-3 py-2">
                        {item.name}
                      </div>
                      <div className="pl-6 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-md text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Empezar Gratis
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}