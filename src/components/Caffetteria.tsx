import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Utensils, Clock, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Caffetteria() {
  // Hook per ogni singola sezione
  const classiciSection = useScrollAnimation();
  const colazioneSection = useScrollAnimation();
  const oltreCaffeSection = useScrollAnimation();
  const specialtySection = useScrollAnimation();
  const inviteSection = useScrollAnimation();
  const orariSection = useScrollAnimation();

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
            backgroundImage: 'url("https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-serif">
            <span className="block caffetteria-fade-in-down">IL NOSTRO</span>
            <span className="block caffetteria-fade-in-down-delay">CAFFE'</span>
            <span className="block text-yellow-400 font-elegant italic text-4xl md:text-5xl mt-4 caffetteria-fade-in-down-delay-2">
              ARTIGIANALE
            </span>
          </h1>
          <p className="font-elegant text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto italic caffetteria-fade-in-down-delay-3">
            "Dalla colazione al dopo cena, scopri le nostre specialità"
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 caffetteria-fade-in-up">
            <h2 className="text-4xl font-bold text-blue-900 mb-6 font-serif">
              Le Nostre Proposte
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
          </div>

          {/* Sezione 1: I Grandi Classici - appare on scroll */}
          <div
            ref={classiciSection.elementRef as React.RefObject<HTMLDivElement>}
            className={`mb-20 transition-all duration-1000 ${classiciSection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
              }`}
          >
            <div className="flex items-center justify-center mb-8">
              <Coffee className="w-8 h-8 text-yellow-600 mr-3" />
              <h3 className="text-3xl font-bold text-blue-900 font-serif">I Grandi Classici</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-200 ${classiciSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Caffè</h4>
                <p className="text-gray-600 mb-3 flex-grow">Miscela esclusiva tostata artigianalmente da gustare in purezza o in varie sfumatare</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 1,20 - € 2,00</p>
              </div>

              {/* Card 2 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-400 ${classiciSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Espressino</h4>
                <p className="text-gray-600 mb-3 flex-grow">A metà tra macchiato e cappuccino ottimo per iniziare la tua giornata in leggerezza</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 1,40 - € 2,00</p>
              </div>

              {/* Card 3 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-600 ${classiciSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Cappuccino</h4>
                <p className="text-gray-600 mb-3 flex-grow">Caffè con latte cremoso e avvolgente per chi ha bisogna di una coccola in più</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 1,60 - € 2,20</p>
              </div>

              {/* Card 4 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-800 ${classiciSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Latte Macchiato</h4>
                <p className="text-gray-600 mb-3 flex-grow">Perfetto se sei un amante del latte e del caffè realizzato con poca schiuma e tanta dolcezza</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 1,60 - € 2,20</p>
              </div>
            </div>
          </div>

          {/* Sezione 2: Colazione da Campioni - appare on scroll */}
          <div
            ref={colazioneSection.elementRef as React.RefObject<HTMLDivElement>}
            className={`mb-20 transition-all duration-1000 ${colazioneSection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
              }`}
          >
            <div className="flex items-center justify-center mb-8">
              <Utensils className="w-8 h-8 text-yellow-600 mr-3" />
              <h3 className="text-3xl font-bold text-blue-900 font-serif">Colazione da Campioni</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-200 ${colazioneSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Cornetti e Viennoiserie</h4>
                <p className="text-gray-600 mb-3 flex-grow">Sfornati caldi tutte le mattine</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 1,30 - € 2,00</p>
              </div>

              {/* Card 2 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-400 ${colazioneSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Ciambella e Chiffon Cake</h4>
                <p className="text-gray-600 mb-3 flex-grow">Soffice e genuina preparata ogni giorno con ingredienti semplici</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 1,50</p>
              </div>

              {/* Card 3 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-600 ${colazioneSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Crostate e Cookies Cake</h4>
                <p className="text-gray-600 mb-3 flex-grow">Frolla friabile e farciture sempre fresche per un momento di dolcezza</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 3,00</p>
              </div>

              {/* Card 4 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-800 ${colazioneSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Trecce e Frolle</h4>
                <p className="text-gray-600 mb-3 flex-grow">Artigianali dal gusto delicato e friabili da accompagnare a ogni dolce pausa</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 0,70 - €2,00</p>
              </div>
            </div>
          </div>

          {/* Sezione 3: Oltre il Caffè - appare on scroll */}
          <div
            ref={oltreCaffeSection.elementRef as React.RefObject<HTMLDivElement>}
            className={`mb-20 transition-all duration-1000 ${oltreCaffeSection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
              }`}
          >
            <div className="flex items-center justify-center mb-8">
              <Star className="w-8 h-8 text-yellow-600 mr-3" />
              <h3 className="text-3xl font-bold text-blue-900 font-serif">Oltre il Caffè</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-200 ${oltreCaffeSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Orzo e Ginseng</h4>
                <p className="text-gray-600 mb-3 flex-grow">Alternative naturali per una carica di energia</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 1,40 - € 2,50</p>
              </div>

              {/* Card 2 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-400 ${oltreCaffeSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Decaffeinato</h4>
                <p className="text-gray-600 mb-3 flex-grow">Tutto il gusto del caffè senza caffeina</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 1,30 - € 2,00</p>
              </div>

              {/* Card 3 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-600 ${oltreCaffeSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Thè e Tisane</h4>
                <p className="text-gray-600 mb-3 flex-grow">Selezionate con cura perfetti per momenti di relax e benessere</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 1,50 - € 2,50</p>
              </div>

              {/* Card 4 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-800 ${oltreCaffeSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Cioccolata Calda</h4>
                <p className="text-gray-600 mb-3 flex-grow">Avvolgente e preparata con cacao di alta qualità e servita con soffice panna fresca</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 2,50 - € 3,00</p>
              </div>
            </div>
          </div>

          {/* Sezione 4: Specialty Coffee - appare on scroll */}
          <div
            ref={specialtySection.elementRef as React.RefObject<HTMLDivElement>}
            className={`mb-16 transition-all duration-1000 ${specialtySection.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
              }`}
          >
            <div className="flex items-center justify-center mb-8">
              <Clock className="w-8 h-8 text-yellow-600 mr-3" />
              <h3 className="text-3xl font-bold text-blue-900 font-serif">Specialty Coffee</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-200 ${specialtySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Caffè Shakerato</h4>
                <p className="text-gray-600 mb-3 flex-grow">Spuma di caffè dolce e fresca preparata al momento</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 2,00 - € 2,50</p>
              </div>

              {/* Card 2 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-400 ${specialtySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Espressino Freddo</h4>
                <p className="text-gray-600 mb-3 flex-grow">Crema fredda di caffè e latte per le giornate calde</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 2,50 - € 3,00</p>
              </div>

              {/* Card 3 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-600 ${specialtySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Caffè Speciale</h4>
                <p className="text-gray-600 mb-3 flex-grow">Miscela di caffè panna e un liquore a scelta tra Amaretto e Baileys servito caldo</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 3,00</p>
              </div>

              {/* Card 4 */}
              <div className={`bg-blue-50 p-6 rounded-lg flex flex-col transition-all duration-700 delay-800 ${specialtySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Nocciolino</h4>
                <p className="text-gray-600 mb-3 flex-grow">Gelato artigianale affogato al caffè per un connubio speciale</p>
                <p className="text-yellow-600 font-semibold mt-auto">€ 3,00 - €4,00</p>
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
            Vieni a Gustare
          </h2>
          <p className="text-xl md:text-2xl font-elegant italic mb-8 max-w-3xl mx-auto">
            "Ogni momento ha il suo sapore perfetto"
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Ti aspettiamo per condividere insieme i sapori autentici della tradizione pugliese.
            Dalla colazione al dopo cena, ogni momento è speciale al Caffè Roma 2000.
          </p>
        </div>
      </section>

      {/* Orari e Info - appare on scroll */}
      <section
        ref={orariSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-blue-50 transition-all duration-1000 ${orariSection.isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Orario 1 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-200 ${orariSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Colazione</h3>
              <p className="text-gray-600 text-sm">Dalle 7:00 alle 12:00</p>
            </div>

            {/* Orario 2 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-400 ${orariSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Gelati</h3>
              <p className="text-gray-600 text-sm">Tutto il giorno</p>
            </div>

            {/* Orario 3 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-600 ${orariSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Aperitivo</h3>
              <p className="text-gray-600 text-sm">Dalle 11:00 alle 21:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations Hero */}
      <style>{`
        @keyframes caffetteriaFadeInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes caffetteriaFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .caffetteria-fade-in-down { opacity: 0; animation: caffetteriaFadeInDown 1s ease-out 0.2s forwards; }
        .caffetteria-fade-in-down-delay { opacity: 0; animation: caffetteriaFadeInDown 1s ease-out 0.5s forwards; }
        .caffetteria-fade-in-down-delay-2 { opacity: 0; animation: caffetteriaFadeInDown 1s ease-out 0.8s forwards; }
        .caffetteria-fade-in-down-delay-3 { opacity: 0; animation: caffetteriaFadeInDown 1s ease-out 1.1s forwards; }
        .caffetteria-fade-in-up { opacity: 0; animation: caffetteriaFadeInUp 0.8s ease-out 0.2s forwards; }
      `}</style>
    </div>
  );
}
