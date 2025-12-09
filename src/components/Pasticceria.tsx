import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Heart, Star, Clock } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation'; // Importa l'hook

export default function Pasticceria() {
  // Hook per diverse sezioni
  const gallerySection = useScrollAnimation();
  const inviteSection = useScrollAnimation();
  const featuresSection = useScrollAnimation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen pt-16 md:pt-32">
      {/* Hero Section - appare immediatamente */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("assets/Tiramisù.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-serif">
            <span className="block pasticceria-fade-in-down">LA NOSTRA PASTICCERIA</span>
            <span className="block text-yellow-400 font-elegant italic text-4xl md:text-5xl mt-4 pasticceria-fade-in-down-delay">
              ARTIGIANALE
            </span>
          </h1>
          <p className="font-elegant text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto italic pasticceria-fade-in-down-delay-2">
            "Dolci artigianali che raccontano l'Italia"
          </p>
        </div>
      </section>

      {/* Call to Action Buttons */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto pasticceria-fade-in-up">
            <Link
              to="/prenota-prodotti"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg text-center"
            >
              Prenota i Tuoi Dolci Preferiti
            </Link>
          </div>
        </div>
      </section>

      {/* Galleria Specialità - appare on scroll */}
      <section
        ref={gallerySection.elementRef as React.RefObject<HTMLElement>}
        className={`py-20 bg-white transition-all duration-1000 ${gallerySection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6 font-serif">
              Le Nostre Specialità
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Ogni creazione è un capolavoro di sapore e tradizione
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Torte */}
            <div
              className={`group cursor-pointer flex flex-col h-full transition-all duration-700 delay-100 ${gallerySection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
                }`}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src="/assets/Torta.jpg"
                  alt="Torte Artigianali"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Torte su Misura</h3>
              <p className="text-gray-600 flex-grow">Creazioni personalizzate per ogni occasione speciale</p>
            </div>

            {/* Card 2 - Cornetti */}
            <div
              className={`group cursor-pointer flex flex-col h-full transition-all duration-700 delay-200 ${gallerySection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
                }`}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src="/assets/Croissant.jpg"
                  alt="Cornetti Artigianali"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Cornetti Artigianali</h3>
              <p className="text-gray-600 flex-grow">Preparati tutte le mattine per iniziare la giornata</p>
            </div>

            {/* Card 3 - Mignon */}
            <div
              className={`group cursor-pointer flex flex-col h-full transition-all duration-700 delay-300 ${gallerySection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
                }`}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src="/assets/Mignon.jpg"
                  alt="Mignon"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Pasticceria Mignon</h3>
              <p className="text-gray-600 flex-grow">Un assortimento raffinato di dolcetti artigianali</p>
            </div>

            {/* Card 4 - Pasticciotto */}
            <div
              className={`group cursor-pointer flex flex-col h-full transition-all duration-700 delay-400 ${gallerySection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
                }`}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src="public/Pasticiotto.jpg"
                  alt="Pasticciotto Leccese"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Pasticciotto Leccese</h3>
              <p className="text-gray-600 flex-grow">Il re della pasticceria del Salento</p>
            </div>

            {/* Card 5 - Paste di Mandorla */}
            <div
              className={`group cursor-pointer flex flex-col h-full transition-all duration-700 delay-500 ${gallerySection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
                }`}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src="/assets/PasteDiMandorle.jpg"
                  alt="Paste di Mandorla"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Paste di Mandorla</h3>
              <p className="text-gray-600 flex-grow">Dolci tradizionali pugliesi con mandorle selezionate</p>
            </div>

            {/* Card 6 - Frollini */}
            <div
              className={`group cursor-pointer flex flex-col h-full transition-all duration-700 delay-600 ${gallerySection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
                }`}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src="/assets/Frollini.png"
                  alt="Biscotti Artigianali"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Frollini</h3>
              <p className="text-gray-600 flex-grow">Fragranti biscotti prodotti nel nostro laboratorio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Invito all'Azione - appare on scroll */}
      <section
        ref={inviteSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white transition-all duration-1000 ${inviteSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Vieni a Scoprire
          </h2>
          <p className="text-xl md:text-2xl font-elegant italic mb-8 max-w-3xl mx-auto">
            "Il gusto della tradizione, ogni giorno"
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Vieni a trovarci per assaporare le nostre creazioni! Ogni dolce è preparato
            con amore e passione.
          </p>
        </div>
      </section>

      {/* Features - appare on scroll */}
      <section
        ref={featuresSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-blue-50 transition-all duration-1000 ${featuresSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-100 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Artigianalità</h3>
              <p className="text-gray-600 text-sm">Ogni dolce realizzato a mano</p>
            </div>

            {/* Feature 2 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-200 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Ingredienti Selezionati</h3>
              <p className="text-gray-600 text-sm">Solo materie prime di eccellenza</p>
            </div>

            {/* Feature 3 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-300 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Tradizione Pugliese</h3>
              <p className="text-gray-600 text-sm">Ricette autentiche tramandate</p>
            </div>

            {/* Feature 4 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-400 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Freschezza Quotidiana</h3>
              <p className="text-gray-600 text-sm">Produzione giornaliera garantita</p>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations Hero */}
      <style>{`
        @keyframes pasticceriaFadeInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pasticceria-fade-in-down { opacity: 0; animation: pasticceriaFadeInDown 1s ease-out 0.2s forwards; }
        .pasticceria-fade-in-down-delay { opacity: 0; animation: pasticceriaFadeInDown 1s ease-out 0.5s forwards; }
        .pasticceria-fade-in-down-delay-2 { opacity: 0; animation: pasticceriaFadeInDown 1s ease-out 0.8s forwards; }
        .pasticceria-fade-in-up { opacity: 0; animation: pasticceriaFadeInDown 1s ease-out 0.4s forwards; }
      `}</style>
    </div>
  );
}
