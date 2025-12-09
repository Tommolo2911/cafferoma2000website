// components/CookieBanner.jsx
import { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true, // Sempre true, non modificabile
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Controlla se l'utente ha già dato il consenso
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Mostra il banner dopo 1 secondo
            setTimeout(() => setShowBanner(true), 1000);
        }
    }, []);

    const saveConsent = (acceptAll = false) => {
        const consentData = acceptAll
            ? { necessary: true, analytics: true, marketing: true }
            : preferences;

        localStorage.setItem('cookie_consent', JSON.stringify(consentData));
        localStorage.setItem('cookie_consent_date', new Date().toISOString());
        setShowBanner(false);
        setShowSettings(false);

        // Qui puoi aggiungere logica per caricare/bloccare script in base al consenso
        if (consentData.analytics) {
            // Carica Google Analytics, ecc.
            console.log('Analytics enabled');
        }
    };

    const acceptAll = () => {
        saveConsent(true);
    };

    const acceptNecessary = () => {
        setPreferences({ necessary: true, analytics: false, marketing: false });
        saveConsent(false);
    };

    const savePreferences = () => {
        saveConsent(false);
    };

    if (!showBanner) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />

            {/* Banner */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 border border-gray-200">

                        {!showSettings ? (
                            // Vista principale
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <Cookie className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                                        <h3 className="text-xl md:text-2xl font-bold text-blue-900">
                                            Utilizzo dei Cookie
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-6 text-sm md:text-base">
                                    Utilizziamo cookie tecnici necessari per il funzionamento del sito e cookie di terze parti (Google Maps, Instagram) per migliorare la tua esperienza.
                                    Continuando la navigazione accetti l'uso dei cookie.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={acceptAll}
                                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Accetta Tutti
                                    </button>

                                    <button
                                        onClick={acceptNecessary}
                                        className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Solo Necessari
                                    </button>

                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Settings className="w-4 h-4" />
                                        <span>Personalizza</span>
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 mt-4 text-center">
                                    Leggi la nostra{' '}
                                    <Link to="/cookie-policy" className="text-blue-600 hover:text-yellow-600 underline">
                                        Cookie Policy
                                    </Link>
                                    {' e '}
                                    <Link to="/privacy-policy" className="text-blue-600 hover:text-yellow-600 underline">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>
                        ) : (
                            // Vista impostazioni dettagliate
                            <div>
                                <div className="flex items-start justify-between mb-6">
                                    <h3 className="text-xl md:text-2xl font-bold text-blue-900">
                                        Gestisci Preferenze Cookie
                                    </h3>
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {/* Cookie Necessari */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Cookie Necessari</h4>
                                                <p className="text-sm text-gray-600">
                                                    Essenziali per il funzionamento del sito
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-sm text-gray-500 mr-2">Sempre attivi</span>
                                                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center px-1">
                                                    <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cookie Analytics */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Cookie Analitici</h4>
                                                <p className="text-sm text-gray-600">
                                                    Ci aiutano a capire come utilizzi il sito
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                                                className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${preferences.analytics ? 'bg-blue-600' : 'bg-gray-300'
                                                    }`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-0'
                                                    }`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Cookie Marketing */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Cookie Marketing</h4>
                                                <p className="text-sm text-gray-600">
                                                    Utilizzati per mostrare contenuti personalizzati
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                                                className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${preferences.marketing ? 'bg-blue-600' : 'bg-gray-300'
                                                    }`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${preferences.marketing ? 'translate-x-6' : 'translate-x-0'
                                                    }`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={savePreferences}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Salva Preferenze
                                    </button>
                                    <button
                                        onClick={acceptAll}
                                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Accetta Tutti
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Animazione slide-up */}
            <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
