import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChefHat, Coffee, Heart, Cookie, Star, Snowflake, Calendar, Users, Clock } from 'lucide-react';

export default function UnifiedBooking() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen pt-20 md:pt-32 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/"
              className="inline-flex items-center text-blue-900 hover:text-yellow-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna alla Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 font-serif">
              PRENOTA I TUOI
              <span className="block text-yellow-600">PRODOTTI ARTIGIANALI</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              Scegli tra le nostre specialità artigianali e prenota i tuoi prodotti preferiti.
              Ogni creazione è realizzata con ingredienti di prima qualità e passione autentica.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Options Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Pasticceria Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-900 mb-4 font-serif flex items-center justify-center">
                  <ChefHat className="w-8 h-8 mr-3 text-yellow-600" />
                  PASTICCERIA ARTIGIANALE
                </h2>
                <div className="w-20 h-1 bg-yellow-600 mx-auto mb-6" />
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Dolci tradizionali preparati ogni giorno con ricette autentiche
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Torte */}
                <div className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="/assets/Torta.jpg"
                        alt="Torte Artigianali"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Torte su Misura</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Creazioni personalizzate per ogni occasione speciale. Pan di Spagna, Millefoglie,
                        Tiramisù, Cheesecake e molte altre specialità.
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          24h anticipo
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          6-40 persone
                        </span>
                      </div>
                      <Link
                        to="/prenota-torta"
                        className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Continua
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Cornetti */}
                <div className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="assets/Croissant.jpg"
                        alt="Cornetti Artigianali"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Cornetti e Brioche</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Cornetti classici, integrali, vegani, brioche, krapfen, mezzatonda
                        e altre specialità da forno.
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          24h anticipo
                        </span>
                        <span className="flex items-center">
                          <Coffee className="w-4 h-4 mr-1" />
                          Freschi ogni giorno
                        </span>
                      </div>
                      <Link
                        to="/prenota-cornetti"
                        className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Continua
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mignon */}
                <div className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="/assets/Mignon.jpg"
                        alt="Mignon"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3"> Pasticceria Mignon</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Un assortimento raffinato di dolcetti artigianali, per regalarvi un momento di dolcezza autentica
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          24h anticipo
                        </span>
                      </div>
                      <Link
                        to="/prenota-mignon"
                        className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Continua
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Frollini */}
                <div className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="/assets/Frollini.png"
                        alt="Frollini Artigianali"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Frollini della Tradizione</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Biscotti artigianali in 8 varietà: bagnati al cioccolato, ripieni,
                        con granella e baci di dama. Confezioni da 6 a 60 pezzi.
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          24h anticipo
                        </span>
                        <span className="flex items-center">
                          <Cookie className="w-4 h-4 mr-1" />
                          Vassoi da 6 a 60 pezzi
                        </span>
                      </div>
                      <Link
                        to="/prenota-frollini"
                        className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Continua
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Pasticciotti */}
                <div className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="/assets/Pasticiotto.jpg"
                        alt="Pasticciotto Leccese"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Pasticciotti Leccesi</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Autentici pasticciotti con crema pasticcera. Classico, crema e amarena,
                        cioccolato, ricotta e amarena. Formati da 4 a 14 pezzi.
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          24h anticipo
                        </span>
                      </div>
                      <Link
                        to="/prenota-pasticciotti"
                        className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Continua
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Paste di Mandorla */}
                <div className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="/assets/PasteDiMandorle.jpg"
                        alt="Paste di Mandorla"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Paste di Mandorla</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Dolci tradizionali pugliesi con mandorle selezionate.
                        Personalizzabili con confezioni regalo e nastri colorati.
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          24h anticipo
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          250g-1kg
                        </span>
                      </div>
                      <Link
                        to="/prenota-paste-mandorla"
                        className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Continua
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gelateria Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-900 mb-4 font-serif flex items-center justify-center">
                  <Snowflake className="w-8 h-8 mr-3 text-yellow-600" />
                  GELATERIA ARTIGIANALE
                </h2>
                <div className="w-20 h-1 bg-yellow-600 mx-auto mb-6" />
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Gelato fresco preparato quotidianamente con ingredienti naturali
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {/* Gelato */}
                <div className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="/assets/VaschetteGelato.png"
                        alt="Gelato Artigianale"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Vaschette Gelato</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Vaschette di gelato artigianale preparate con cura: scegli i tuoi gusti preferiti e troverai la tua selezione pronta ad aspettarti in gelateria.
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          24h anticipo
                        </span>
                        <span className="text-green-600 font-medium">

                        </span>
                      </div>
                      <Link
                        to="/prenota-vaschette-gelato"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Continua
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Torte Gelato */}
                <div className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="/assets/VetrinaTorteGelato.jpg"
                        alt="Torte Gelato"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Torte Gelato</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Torte personalizzate e storici tartufi, pensati per grandi e piccini, perfetti per celebrare ogni occasione speciale con gusto e creatività.
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          48h anticipo
                        </span>
                      </div>
                      <Link
                        to="/prenota-torte-gelato"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Continua
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Servizi Aggiuntivi */}

            {/* Info Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 text-center text-align:center">
              <h3 className="text-2xl font-bold mb-4 font-serif text-align:center">Informazioni Importanti</h3>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2 text-align:center">⏰ Tempi di Prenotazione</h4>
                <p>• Torte, prodotti da forno e vaschette gelato: 24 ore di anticipo</p>
                <p>• Torte gelato: 48 ore di anticipo</p>
                <p>• Confermare tramite Whatsapp o Email la prenotazione</p>
              </div>


              <div className="mt-6 bg-yellow-600/20 p-4 rounded-lg">
                <p className="text-yellow-200 text-sm">
                  <strong>Nota:</strong> Il costo finale verrà stimato al momento della prenotazione.
                  Pagamento al ritiro. Per informazioni chiamaci al +080 8876792.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}