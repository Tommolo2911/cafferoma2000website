import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/duxp8wxlj/image/upload/v1765310356/insegnaRoma2000_zf9itt.png)'
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Decorative Patterns */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-20">
        <div className="geometric-pattern-left" />
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20">
        <div className="geometric-pattern-right" />
      </div>

      {/* Content con animazioni sequenziali */}
      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {/* Prima parte - appare per prima */}
            <span className="font-elegant italic font-medium text-4xl md:text-5xl block mb-4 text-yellow-400 animate-fade-in-down">
              "Dove la maestria artigianale
            </span>
            {/* Seconda parte - appare dopo 0.4s */}
            <span className="font-elegant text-yellow-400 italic font-medium text-4xl md:text-5xl block mb-4 animate-fade-in-down-delay">
              si fonde con l'arte del sapore"
            </span>
          </h1>
          {/* Pulsante - appare dopo 0.8s */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-down-delay-2">
            <Link
              to="/prenota-prodotti"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Prenota i Tuoi Prodotti
            </Link>
          </div>
        </div>
      </div>

      {/* Stili CSS per le animazioni */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          opacity: 0;
          animation: fadeInDown 1s ease-out 0.2s forwards;
        }

        .animate-fade-in-down-delay {
          opacity: 0;
          animation: fadeInDown 1s ease-out 0.6s forwards;
        }

        .animate-fade-in-down-delay-2 {
          opacity: 0;
          animation: fadeInDown 1s ease-out 1s forwards;
        }
      `}</style>
    </section>
  );
}
