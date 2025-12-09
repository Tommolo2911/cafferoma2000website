import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Heart, Star, Clock } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Pasticceria() {
  // Hook per ogni singola sezione
  const headerSection = useScrollAnimation();
  const torteSection = useScrollAnimation();
  const cornettiSection = useScrollAnimation();
  const mignonSection = useScrollAnimation();
  const pasticciottoSection = useScrollAnimation();
  const pasteSection = useScrollAnimation();
  const frolliniSection = useScrollAnimation();
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

      {/* Intro Header - appare on scroll */}
      <section
        ref={headerSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-12 bg-white transition-all duration-1000 ${headerSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-900 mb-6 font-serif">
              Le Nostre Specialità
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Ogni creazione è un capolavoro di sapore e tradizione
            </p>
          </div>
        </div>
      </section>

      {/* Sezione 1: Torte su Misura - appare on scroll */}
      <section
        ref={torteSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-white transition-all duration-1000 ${torteSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${torteSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/assets/Torta.jpg"
                  alt="Torte Artigianali"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Torte su Misura</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Creazioni personalizzate per ogni occasione speciale, realizzate con ingredienti di prima qualità.
                  Ogni torta è unica e progettata secondo i tuoi desideri, dalla più semplice alla più elaborata.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 2: Cornetti Artigianali - appare on scroll */}
      <section
        ref={cornettiSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-blue-50 transition-all duration-1000 ${cornettiSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${cornettiSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Cornetti Artigianali</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Cornetti e brioche artigianali, preparati tutte le mattine per iniziare la giornata con autentico gusto italiano.
                  Fragranti, dorati e farciti con creme genuine preparate nel nostro laboratorio.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg order-1 md:order-2">
                <img
                  src="/assets/Croissant.jpg"
                  alt="Cornetti Artigianali"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 3: Pasticceria Mignon - appare on scroll */}
      <section
        ref={mignonSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-white transition-all duration-1000 ${mignonSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${mignonSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/assets/Mignon.jpg"
                  alt="Mignon"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Pasticceria Mignon</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Un assortimento raffinato di dolcetti artigianali, per regalarvi un momento di dolcezza autentica.
                  Perfetti per eventi, buffet o semplicemente per coccolarsi con piccole delizie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 4: Pasticciotto Leccese - appare on scroll */}
      <section
        ref={pasticciottoSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-blue-50 transition-all duration-1000 ${pasticciottoSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${pasticciottoSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Pasticciotto Leccese</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Il re della pasticceria del Salento, una farcitura artigianale e vellutata racchiusa in una pasta frolla dorata.
                  Un simbolo della tradizione pugliese che conquista al primo morso.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg order-1 md:order-2">
                <img
                  src="assets/Pasticiotto.jpg"
                  alt="Pasticciotto Leccese"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 5: Paste di Mandorla - appare on scroll */}
      <section
        ref={pasteSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-white transition-all duration-1000 ${pasteSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${pasteSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/assets/PasteDiMandorle.jpg"
                  alt="Paste di Mandorla"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Paste di Mandorla</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Dolci tradizionali pugliesi realizzati con mandorle selezionate e zucchero, un sapore unico perfetto per ogni occasione,
                  soprattutto le più importanti. Morbide, profumate e irresistibili.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 6: Frollini - appare on scroll */}
      <section
        ref={frolliniSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-blue-50 transition-all duration-1000 ${frolliniSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${frolliniSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Frollini</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Fragranti biscotti prodotti nel nostro laboratorio, perfetti per accompagnare il caffè o da gustare in ogni momento.
                  Friabili, genuini e preparati con ricette tradizionali.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg order-1 md:order-2">
                <img
                  src="/assets/Frollini.png"
                  alt="Biscotti Artigianali"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
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
            con amore e passione, utilizzando solo ingredienti di prima qualità.
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
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-200 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
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
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-400 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
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
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-600 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
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
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-800 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
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

        @keyframes pasticceriaFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pasticceria-fade-in-down { opacity: 0; animation: pasticceriaFadeInDown 1s ease-out 0.2s forwards; }
        .pasticceria-fade-in-down-delay { opacity: 0; animation: pasticceriaFadeInDown 1s ease-out 0.5s forwards; }
        .pasticceria-fade-in-down-delay-2 { opacity: 0; animation: pasticceriaFadeInDown 1s ease-out 0.8s forwards; }
        .pasticceria-fade-in-up { opacity: 0; animation: pasticceriaFadeInUp 0.8s ease-out 0.2s forwards; }
      `}</style>
    </div>
  );
}
