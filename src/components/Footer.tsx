import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InstagramFeed from './InstagramFeed';
import TrustmaryWidget from './TrustmaryWidget';

const reopenCookieSettings = () => {
  localStorage.removeItem('cookie_consent');
  window.location.reload();
};


export default function Footer() {
  return (
    <footer id="contacts" className="bg-slate-800 text-white relative">
      {/* New Decorative Pattern Border */}
      <div className="h-12 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 flex">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-12 h-12 relative">
              {/* Diamond pattern with circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-600/20 transform rotate-45 relative">
                  <div className="absolute inset-1 bg-yellow-500/30 rounded-full transform -rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                </div>
              </div>
              {/* Connecting lines */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-yellow-600/10 transform -translate-y-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Centered Logo Section with Social Icons */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-6 mb-6">


            {/* Logo */}
            <div className="w-12 h-12 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12"
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
              <h3 className="text-2xl font-bold font-serif text-yellow-400">CAFFÈ ROMA 2000</h3>
              <p className="text-sm text-gray-300 tracking-wider">COFFEE, PASTRY AND ICE CREAM SHOP</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-20 lg:gap-30">

          {/* Address and Newsletter Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">INDIRIZZO</h4>
            <div className="flex items-start space-x-3 mb-8">
              <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-300">Via Lepanto 103</p>
                <p className="text-gray-300">70043 Monopoli (BA)</p>
              </div>
            </div>
            <div className="mt-8">
              <h5 className="text-md font-semibold text-yellow-400 mb-4">ORARI</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Aperti dalle 7:00 alle 23:00</p>
                <p className="space-y-2 text-sm text-red-500">Giorno di Chiusura: Martedì</p>
              </div>
            </div>

            {/* Newsletter Section */}
            {/*<h4 className="text-lg font-semibold text-yellow-400 mb-4">ISCRIVITI ALLA NEWSLETTER</h4>
            <div className="flex mb-8">
              <input
                type="email"
                placeholder="Il tuo indirizzo e-mail"
                className="flex-1 bg-slate-600 text-white px-3 py-2 rounded-l-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-r-lg transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>*/}
          </div>

          <div className="lg:col-span-1">

            <InstagramFeed />


          </div>


          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-yellow-400 mb-6">CONTATTI</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <a
                  href="tel:+0808876792"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  +080 8876792
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <a
                  href="mailto:info@cafferoma2000.it"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  info@cafferoma2000.it
                </a>
              </div>
              <div className="w-full">
                <TrustmaryWidget />
              </div>
            </div>

          </div>

          {/* Mappa Section */}
          <div className="map-responsive">
            <h4 className="text-lg font-semibold text-yellow-400 mb-6">MAPPA</h4>

            {/* Map Image with Google Maps Link */}
            <div className="rounded-lg overflow-hidden mb-6 shadow-lg group">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.696161194883!2d17.302408976323928!3d40.94432582335986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1346353a53c99d97%3A0x8725f17b831f331c!2sCaff%C3%A8%20Roma%202000!5e0!3m2!1sit!2sit!4v1762339672272!5m2!1sit!2sit"
                loading="lazy" >
              </iframe>
              <a
                href="https://www.google.com/maps/place/Caff%C3%A8+Roma+2000/@40.9443258,17.3024036,17z/data=!3m1!4b1!4m6!3m5!1s0x1346353a53c99d97:0x8725f17b831f331c!8m2!3d40.9443258!4d17.3049785!16s%2Fg%2F11c5q9x8qy"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden"
              >
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-400">
              <Link to="/privacy-policy" className="hover:text-yellow-400 transition-colors" >
                Privacy Policy
              </Link>
              <span className="hidden md:inline">|</span>
              <Link to="/terms-conditions" className="hover:text-yellow-400 transition-colors">
                Termini e Condizioni
              </Link>
              <span className="hidden md:inline">|</span>
              <Link to="/cookie-policy" className="hover:text-yellow-400 transition-colors">
                Cookie Policy
              </Link>
              <span className="hidden md:inline">|</span>
              <span>Made in Monopoli</span>
            </div>


            <button
              onClick={reopenCookieSettings}
              className="text-sm text-gray-400 hover:text-yellow-400 transition-colors underline"
            >
              Gestisci Cookie
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
            >
              TOP
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
}