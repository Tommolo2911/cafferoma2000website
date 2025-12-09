import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Facebook, Instagram, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Funzione per scrollare in alto quando si clicca su una sezione
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Componente Link personalizzato che scrolla in alto
  const ScrollToTopLink = ({ to, children, className, onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: () => void }) => (
    <Link
      to={to}
      className={className}
      onClick={() => {
        scrollToTop();
        onClick?.();
      }}
    >
      {children}
    </Link>
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Social Icons - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">

              <a href="https://www.facebook.com/people/Caff%C3%A8-Roma-2000/100031454030543/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-yellow-600 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/cafferoma2000/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-yellow-600 transition-colors">
                <Instagram size={24} />
              </a>
            </div>

            {/* Mobile social icons - smaller and fewer */}
            <div className="flex md:hidden items-center space-x-2">

              <a href="https://www.facebook.com/people/Caff%C3%A8-Roma-2000/100031454030543/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-yellow-600 transition-colors">
                <Facebook size={25} />
              </a>
              <a href="https://www.instagram.com/caffe_roma2000/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-yellow-600 transition-colors">
                <Instagram size={25} />
              </a>
            </div>

            {/* Logo with Ice Cream Cone */}
            <ScrollToTopLink to="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                {/* Stylized Ice Cream Cone */}
                <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 md:w-12 md:h-12"
                    fill="none"
                  >
                    {/* Ice cream scoops */}
                    <circle cx="12" cy="8" r="3" fill="#FFD700" />
                    <circle cx="12" cy="5" r="2.5" fill="#FF69B4" />
                    <circle cx="12" cy="2.5" r="2" fill="#87CEEB" />

                    {/* Cone */}
                    <path
                      d="M9 11 L12 20 L15 11 Z"
                      fill="#D2691E"
                      stroke="#8B4513"
                      strokeWidth="0.5"
                    />

                    {/* Cone pattern */}
                    <path
                      d="M9.5 12 L14.5 12 M10 14 L14 14 M10.5 16 L13.5 16 M11 18 L13 18"
                      stroke="#8B4513"
                      strokeWidth="0.3"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-xs md:text-xl font-bold text-blue-900 font-serif tracking-wider">CAFFÈ ROMA 2000</h1>
                <p className="text-xs text-gray-600 tracking-widest hidden md:block">COFFEE, PASTRY AND ICE CREAM SHOP</p>
              </div>
            </ScrollToTopLink>

            {/* Contact Info */}
            <div className="flex items-center space-x-1 md:space-x-2 text-blue-900">
              {user ? (
                <div className="hidden md:flex items-center space-x-2">
                  <User size={16} className="text-yellow-600" />
                  <span className="text-xs md:text-sm font-medium hidden md:block">
                    {user.email}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="text-xs md:text-sm hover:text-yellow-600 transition-colors flex items-center"
                  >
                    <LogOut size={14} className="mr-1" />
                    <span className="hidden md:inline">Esci</span>
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-1 md:space-x-2">
                  <Phone size={12} className="md:hidden" />
                  <Phone size={18} className="hidden md:block" />
                  <a
                    href="tel:+0808876792"
                    className="font-semibold text-xs md:text-base hover:text-yellow-600 transition-colors"
                  >
                    +080 8876792
                  </a>
                  <span className="mx-2 text-gray-400">|</span>
                  <Link
                    to="/login"
                    className="text-xs md:text-sm hover:text-yellow-600 transition-colors"
                  >
                    Accedi
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-blue-900 hover:text-yellow-600 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block border-t border-gray-200">
            <div className="flex justify-center space-x-3 md:space-x-8 py-2 md:py-4 overflow-x-auto">
              <ScrollToTopLink to="/prenota-prodotti" className="text-blue-900 hover:text-yellow-600 font-medium tracking-wide transition-colors text-base whitespace-nowrap">PRENOTA</ScrollToTopLink>
              <ScrollToTopLink to="/gelateria" className="text-blue-900 hover:text-yellow-600 font-medium tracking-wide transition-colors text-base whitespace-nowrap">GELATERIA</ScrollToTopLink>
              <ScrollToTopLink to="/pasticceria" className="text-blue-900 hover:text-yellow-600 font-medium tracking-wide transition-colors text-base whitespace-nowrap">PASTICCERIA</ScrollToTopLink>
              <ScrollToTopLink to="/caffetteria" className="text-blue-900 hover:text-yellow-600 font-medium tracking-wide transition-colors text-base whitespace-nowrap">CAFFETTERIA</ScrollToTopLink>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-slate-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  fill="none"
                >
                  <circle cx="12" cy="8" r="3" fill="#FFD700" />
                  <circle cx="12" cy="5" r="2.5" fill="#FF69B4" />
                  <circle cx="12" cy="2.5" r="2" fill="#87CEEB" />
                  <path
                    d="M9 11 L12 20 L15 11 Z"
                    fill="#D2691E"
                    stroke="#8B4513"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M9.5 12 L14.5 12 M10 14 L14 14 M10.5 16 L13.5 16 M11 18 L13 18"
                    stroke="#8B4513"
                    strokeWidth="0.3"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-yellow-400 font-bold text-lg font-serif">CAFFÈ ROMA 2000</h2>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 py-8">
            <div className="space-y-2 px-6">
              <ScrollToTopLink
                to="/prenota-prodotti"
                className="block py-4 px-4 text-yellow-400 hover:text-yellow-300 hover:bg-slate-700 font-medium tracking-wide transition-all duration-200 rounded-lg text-lg"
                onClick={closeMobileMenu}
              >
                PRENOTA
              </ScrollToTopLink>
              <ScrollToTopLink
                to="/gelateria"
                className="block py-4 px-4 text-yellow-400 hover:text-yellow-300 hover:bg-slate-700 font-medium tracking-wide transition-all duration-200 rounded-lg text-lg"
                onClick={closeMobileMenu}
              >
                GELATERIA
              </ScrollToTopLink>
              <ScrollToTopLink
                to="/pasticceria"
                className="block py-4 px-4 text-yellow-400 hover:text-yellow-300 hover:bg-slate-700 font-medium tracking-wide transition-all duration-200 rounded-lg text-lg"
                onClick={closeMobileMenu}
              >
                PASTICCERIA
              </ScrollToTopLink>
              <ScrollToTopLink
                to="/caffetteria"
                className="block py-4 px-4 text-yellow-400 hover:text-yellow-300 hover:bg-slate-700 font-medium tracking-wide transition-all duration-200 rounded-lg text-lg"
                onClick={closeMobileMenu}
              >
                CAFFETTERIA
              </ScrollToTopLink>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="border-t border-slate-700 p-6">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-yellow-400">
                  <User size={20} />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-3 text-yellow-400 hover:text-yellow-300 transition-colors w-full"
                >
                  <LogOut size={20} />
                  <span className="text-sm">Esci</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-yellow-400">
                  <Phone size={20} />
                  <a
                    href="tel:+0808876792"
                    className="font-semibold hover:text-yellow-300 transition-colors"
                  >
                    +080 8876792
                  </a>
                </div>
                <ScrollToTopLink
                  to="/login"
                  className="flex items-center space-x-3 text-yellow-400 hover:text-yellow-300 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <User size={20} />
                  <span>Accedi</span>
                </ScrollToTopLink>
              </div>
            )}

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-slate-700">
              <a href="https://www.facebook.com/people/Caff%C3%A8-Roma-2000/100031454030543/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/caffe_roma2000/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}