import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Coffee, Users, Clock } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  // Hook per ogni sezione
  const headerSection = useScrollAnimation();
  const featuresSection = useScrollAnimation();
  const passioneSection = useScrollAnimation();
  const arteSection = useScrollAnimation();
  const vieniSection = useScrollAnimation();
  const filosofiaSection = useScrollAnimation();

  return (
    <>
      {/* Header Section - appare on scroll */}
      <section
        ref={headerSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-20 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${headerSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 font-serif">
              CAFFÈ ROMA 2000
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Benvenuti al Caffè Roma 2000, un'autentica esperienza gastronomica nel cuore di Monopoli,
              dove la tradizione italiana incontra l'innovazione artigianale. Situato in Via Lepanto,
              il nostro locale vi accoglie a pochi passi dal mare cristallino pugliese, offrendo un'oasi
              di gusto e qualità in un ambiente moderno e accogliente.
            </p>
          </div>

          {/* Features - appare on scroll */}
          <div
            ref={featuresSection.elementRef as React.RefObject<HTMLDivElement>}
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 transition-all duration-1000 ${featuresSection.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
              }`}
          >
            {/* Feature 1 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-200 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-yellow-500/10 rounded-full scale-0 group-hover:scale-125 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Award className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2 transition-colors duration-300 group-hover:text-yellow-700">Qualità Premium</h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Ingredienti selezionati e preparazioni di alta qualità</p>
            </div>

            {/* Feature 2 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-400 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-yellow-500/10 rounded-full scale-0 group-hover:scale-125 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Coffee className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2 transition-colors duration-300 group-hover:text-yellow-700">Caffè Artigianale</h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Miscela esclusiva e preparazioni tradizionali</p>
            </div>

            {/* Feature 3 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-600 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-yellow-500/10 rounded-full scale-0 group-hover:scale-125 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Users className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2 transition-colors duration-300 group-hover:text-yellow-700">Atmosfera Accogliente</h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Ambiente dedicato a tutti e per ogni occasione</p>
            </div>

            {/* Feature 4 */}
            <div className={`text-center group cursor-pointer transition-all duration-700 delay-800 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-yellow-500/10 rounded-full scale-0 group-hover:scale-125 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Clock className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2 transition-colors duration-300 group-hover:text-yellow-700">Sempre Aperto</h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Dalla colazione al dopo cena, sempre al vostro servizio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Passione, Tradizione e Accoglienza */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Blocco 1: Testo DA SINISTRA + Immagine */}
          <div
            ref={passioneSection.elementRef as React.RefObject<HTMLDivElement>}
            className="grid lg:grid-cols-2 gap-12 items-center mb-20"
          >
            <div className={`order-2 lg:order-1 transition-all duration-1000 delay-300 ${passioneSection.isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-20'
              }`}>
              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 font-serif">
                Passione, Tradizione e Accoglienza
              </h3>
              <div className="w-24 h-1 bg-yellow-600 mb-8" />
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Crediamo che la vera eccellenza nasca dall'amore per il proprio lavoro.
                Per questo, ogni prodotto che serviamo racconta una storia fatta di tradizione,
                ricerca e innovazione.
              </p>
            </div>
            <div className={`order-1 lg:order-2 transition-all duration-1000 ${passioneSection.isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-20'
              }`}>
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://res.cloudinary.com/duxp8wxlj/image/upload/v1765310358/InternoBar_nyfmx3.png"
                  alt="Caffè Roma 2000"
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* Blocco 2: Immagine + Testo DA DESTRA */}
          <div
            ref={arteSection.elementRef as React.RefObject<HTMLDivElement>}
            className="grid lg:grid-cols-2 gap-12 items-center mb-20"
          >
            <div className={`transition-all duration-1000 ${arteSection.isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-20'
              }`}>
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://res.cloudinary.com/duxp8wxlj/image/upload/v1765311241/Caffe2_xc9cio.jpg"
                  alt="Dolci artigianali del Caffè Roma 2000"
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${arteSection.isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-20'
              }`}>
              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 font-serif">
                L'Arte del Sapore Autentico
              </h3>
              <div className="w-20 h-1 bg-yellow-600 mb-6" />
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Ogni creazione nasce dalla passione per l'eccellenza e dalla ricerca costante
                della perfezione. Utilizziamo solo ingredienti selezionati e tecniche
                artigianali tramandate nel tempo.
              </p>
            </div>
          </div>

          {/* Blocco 3: Testo DA SINISTRA + Immagine Mare */}
          <div
            ref={vieniSection.elementRef as React.RefObject<HTMLDivElement>}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className={`order-2 lg:order-1 transition-all duration-1000 delay-300 ${vieniSection.isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-20'
              }`}>
              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 font-serif">
                Vieni a Trovarci
              </h3>
              <div className="w-20 h-1 bg-yellow-600 mb-6" />
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Lasciati conquistare dai profumi e dai sapori del Sud: il Caffè Roma 2000
                è il luogo ideale per chi cerca qualità, autenticità e un'atmosfera familiare.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <p className="text-lg font-elegant italic text-blue-900 text-center">
                  "Scoprira il piacere di una pausa autentica, a pochi passi dal mare di Monopoli."
                </p>
              </div>
            </div>
            <div className={`order-1 lg:order-2 transition-all duration-1000 ${vieniSection.isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-20'
              }`}>
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://res.cloudinary.com/duxp8wxlj/image/upload/v1765310357/MonopoliMare_htthfz.png"
                  alt="Vista mare vicino al Caffè Roma 2000 a Monopoli"
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-yellow-600/90 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  A pochi passi dal mare
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La Nostra Filosofia - appare on scroll */}
      <section
        ref={filosofiaSection.elementRef as React.RefObject<HTMLElement>}
        className={`py-20 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${filosofiaSection.isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-900 mb-8 font-serif">
              La Nostra Filosofia
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Al Caffè Roma 2000 crediamo che ogni momento della giornata meriti un sapore speciale.
              Utilizziamo solo ingredienti freschi e di qualità, privilegiando i produttori locali
              per offrirvi il meglio della tradizione pugliese in ogni piatto e bevanda.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
