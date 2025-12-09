import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Snowflake, Sun, Leaf, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Gelateria() {
  // Hook per ogni singola sezione
  const headerSection = useScrollAnimation();
  const tartufiSection = useScrollAnimation();
  const torteSection = useScrollAnimation();
  const rolleSection = useScrollAnimation();
  const tortePersSection = useScrollAnimation();
  const vaschetteSection = useScrollAnimation();
  const coniSection = useScrollAnimation();
  const inviteSection = useScrollAnimation();
  const featuresSection = useScrollAnimation();
  const infoSection = useScrollAnimation();

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
            backgroundImage: 'url("assets/VetrinaTorteGelato.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-serif">
            <span className="block gelateria-fade-in-down">LA NOSTRA</span>
            <span className="block gelateria-fade-in-down-delay">GELATERIA</span>
            <span className="block text-yellow-400 font-elegant italic text-4xl md:text-5xl mt-4 gelateria-fade-in-down-delay-2">
              ARTIGIANALE
            </span>
          </h1>
          <p className="font-elegant text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto italic gelateria-fade-in-down-delay-3">
            "Il gelato come una volta"
          </p>
        </div>
      </section>

      {/* Call to Action Buttons */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto gelateria-fade-in-up">
            <Link
              to="/prenota-vaschette-gelato"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg text-center"
            >
              Prenota Vaschette Gelato
            </Link>
            <Link
              to="/prenota-torte-gelato"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg text-center"
            >
              Prenota Torte Gelato
            </Link>
            <a
              href="https://www.instagram.com/cafferoma2000/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-blue-600 text-blue-600 hover:border-yellow-700 hover:bg-yellow-700 hover:text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg text-center"
            >
              Scopri i Gusti del Giorno
            </a>
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
              Le Nostre Specialità Gelato
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Ogni gusto racconta una storia di sapore e tradizione
            </p>
          </div>
        </div>
      </section>

      {/* Sezione 1: Tartufi - appare on scroll */}
      <section
        ref={tartufiSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-white transition-all duration-1000 ${tartufiSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${tartufiSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="cafferoma2000website/assets/Tartufo.jpg"
                  alt="Tartufi"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">I Nostri Storici Tartufi</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Cremosa base di gelato con un gustoso caramello al caffè, un classico intramontabile che ci riporta al passato.
                  Un dolce simbolo della nostra tradizione artigianale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 2: Torte Gelato Classiche - appare on scroll */}
      <section
        ref={torteSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-blue-50 transition-all duration-1000 ${torteSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${torteSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Torte Gelato Classiche</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Scopri tutte le tipologie che realizziamo giornalmente, ne abbiamo per tutti i gusti: dalle creme alla frutta,
                  dal cioccolato al caramello, dall'acidulo al dolce. Ogni torta è un'esperienza unica.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg order-1 md:order-2">
                <img
                  src="/assets/TortaGelato.jpg"
                  alt="Torte Gelato"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 3: Rollè Gelato - appare on scroll */}
      <section
        ref={rolleSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-white transition-all duration-1000 ${rolleSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${rolleSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/assets/Rollè.jpg"
                  alt="Rollè"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Rollè Gelato</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Il dolce incontro tra il nostro gelato e il Pan di Spagna, un piacere per il palato.
                  Personalizza il tuo scegliendo tra le tante varianti disponibili.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 4: Torte Gelato Personalizzate - appare on scroll */}
      <section
        ref={tortePersSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-blue-50 transition-all duration-1000 ${tortePersSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${tortePersSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Torte Gelato Personalizzate</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Unisci i tuoi gusti preferiti e realizza il tuo connubio perfetto, sia per un evento speciale che per un piacere quotidiano.
                  Ogni torta è unica come te.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg order-1 md:order-2">
                <img
                  src="assets/TortaGelPers.png"
                  alt="Torte Personalizzate"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 5: Vaschette - appare on scroll */}
      <section
        ref={vaschetteSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-white transition-all duration-1000 ${vaschetteSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${vaschetteSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/assets/VaschetteGelato.png"
                  alt="Vaschette"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Vaschetta da asporto</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Scegli il formato ed i gusti per la vaschetta da gustare a casa in compagnia,
                  ma va benissimo anche da soli non ti giudichiamo! Porta a casa il gelato artigianale che ami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 6: Coni e Coppe - appare on scroll */}
      <section
        ref={coniSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-blue-50 transition-all duration-1000 ${coniSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className={`group cursor-pointer max-w-4xl mx-auto transition-all duration-700 delay-300 ${coniSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-semibold text-blue-900 mb-4">Coni e coppe</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Gelati perfetti per ogni occasione, disponibili in oltre 18 gusti di inverno ed oltre 30 gusti di estate.
                  Vieni a scoprire i nostri gusti del giorno!
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg order-1 md:order-2">
                <img
                  src="/assets/Cono.png"
                  alt="Coni e Coppe"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Assapora l'Estate</h2>
          <p className="text-xl md:text-2xl font-elegant italic mb-8 max-w-3xl mx-auto">
            "Ogni gelato è un momento di pura felicità"
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Vieni a scoprire i nostri gusti del giorno! La nostra gelateria ti aspetta
            con cremosità autentiche e sapori che cambiano con le stagioni.
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
                  <Snowflake className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Produzione Giornaliera</h3>
              <p className="text-gray-600 text-sm">Gelato fresco preparato ogni mattina</p>
            </div>

            {/* Feature 2 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-400 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Ingredienti Naturali</h3>
              <p className="text-gray-600 text-sm">Solo frutta fresca e ingredienti genuini</p>
            </div>

            {/* Feature 3 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-600 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Sun className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Gusti Stagionali</h3>
              <p className="text-gray-600 text-sm">Sapori che seguono le stagioni</p>
            </div>

            {/* Feature 4 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-800 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Tradizione Familiare</h3>
              <p className="text-gray-600 text-sm">Ricette tramandate con amore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Box - appare on scroll */}
      <div
        ref={infoSection.elementRef as React.RefObject<HTMLDivElement>}
        className={`container mx-auto px-4 mb-8 transition-all duration-1000 ${infoSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 font-serif">Informazioni Importanti</h3>
          <div>
            <h4 className="font-semibold text-yellow-400 mb-2">⏰ Tempi di Prenotazione</h4>
            <p>• Vaschette gelato: 24 ore di anticipo</p>
            <p>• Torte gelato: 48 ore di anticipo</p>
            <p>• Confermare tramite Whatsapp o Email</p>
          </div>
          <div className="mt-6 bg-yellow-600/20 p-4 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <strong>Nota:</strong> Il costo finale verrà stimato al momento della prenotazione.
              Pagamento al ritiro. Per informazioni: +080 8876792
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations Hero */}
      <style>{`
        @keyframes gelateriaFadeInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes gelateriaFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .gelateria-fade-in-down { opacity: 0; animation: gelateriaFadeInDown 1s ease-out 0.2s forwards; }
        .gelateria-fade-in-down-delay { opacity: 0; animation: gelateriaFadeInDown 1s ease-out 0.5s forwards; }
        .gelateria-fade-in-down-delay-2 { opacity: 0; animation: gelateriaFadeInDown 1s ease-out 0.8s forwards; }
        .gelateria-fade-in-down-delay-3 { opacity: 0; animation: gelateriaFadeInDown 1s ease-out 1.1s forwards; }
        .gelateria-fade-in-up { opacity: 0; animation: gelateriaFadeInUp 0.8s ease-out 0.2s forwards; }
      `}</style>
    </div>
  );
}
