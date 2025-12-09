// components/CookiePolicy.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function CookiePolicy() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen pt-32 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <Link
                    to="/"
                    className="inline-flex items-center text-blue-900 hover:text-yellow-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Torna alla Home
                </Link>

                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <div className="flex items-center mb-8">
                        <Cookie className="w-10 h-10 text-yellow-600 mr-4" />
                        <h1 className="text-4xl font-bold text-blue-900">
                            Cookie Policy
                        </h1>
                    </div>

                    <p className="text-gray-600 mb-8">
                        Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
                    </p>

                    {/* Introduzione */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            Cosa sono i Cookie
                        </h2>
                        <p className="text-gray-700 mb-4">
                            I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet o smartphone) quando visiti un sito web. I cookie permettono al sito di ricordare le tue azioni e preferenze per un certo periodo di tempo.
                        </p>
                    </section>

                    {/* Cookie utilizzati */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            Cookie Utilizzati su Questo Sito
                        </h2>

                        {/* Cookie Tecnici */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">
                                1. Cookie Tecnici (Strettamente Necessari)
                            </h3>
                            <p className="text-gray-700 mb-3">
                                Questi cookie sono essenziali per il corretto funzionamento del sito e non richiedono il tuo consenso.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-300">
                                        <tr>
                                            <th className="text-left py-2 px-2">Nome Cookie</th>
                                            <th className="text-left py-2 px-2">Finalità</th>
                                            <th className="text-left py-2 px-2">Durata</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-2 px-2 font-mono text-xs">session_id</td>
                                            <td className="py-2 px-2">Gestione sessione utente</td>
                                            <td className="py-2 px-2">Sessione</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-2 px-2 font-mono text-xs">cookie_consent</td>
                                            <td className="py-2 px-2">Memorizza preferenze cookie</td>
                                            <td className="py-2 px-2">12 mesi</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Cookie di Terze Parti */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">
                                2. Cookie di Terze Parti
                            </h3>
                            <p className="text-gray-700 mb-3">
                                Il nostro sito utilizza servizi di terze parti che possono installare cookie sul tuo dispositivo.
                            </p>

                            {/* Google Maps */}
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <h4 className="font-semibold text-blue-900 mb-2">Google Maps</h4>
                                <p className="text-gray-700 text-sm mb-2">
                                    Utilizziamo Google Maps per mostrare la nostra posizione. Google può raccogliere dati di navigazione.
                                </p>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                                    <li><strong>Cookie:</strong> NID, CONSENT, 1P_JAR</li>
                                    <li><strong>Durata:</strong> 6-24 mesi</li>
                                    <li><strong>Privacy Policy:</strong>{' '}
                                        <a
                                            href="https://policies.google.com/privacy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-yellow-600"
                                        >
                                            Google Privacy
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Instagram/Behold */}
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <h4 className="font-semibold text-blue-900 mb-2">Instagram Feed (Behold)</h4>
                                <p className="text-gray-700 text-sm mb-2">
                                    Mostriamo i nostri ultimi post Instagram tramite il servizio Behold.
                                </p>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                                    <li><strong>Cookie:</strong> Vari cookie di Instagram/Facebook</li>
                                    <li><strong>Durata:</strong> Variabile</li>
                                    <li><strong>Privacy Policy:</strong>{' '}
                                        <a
                                            href="https://behold.so/privacy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-yellow-600"
                                        >
                                            Behold Privacy
                                        </a>
                                        {' · '}
                                        <a
                                            href="https://www.instagram.com/legal/privacy/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-yellow-600"
                                        >
                                            Instagram Privacy
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Supabase */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Supabase (Database)</h4>
                                <p className="text-gray-700 text-sm mb-2">
                                    Utilizziamo Supabase per gestire le prenotazioni e i dati degli utenti.
                                </p>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                                    <li><strong>Cookie:</strong> sb-access-token, sb-refresh-token</li>
                                    <li><strong>Durata:</strong> Sessione</li>
                                    <li><strong>Privacy Policy:</strong>{' '}
                                        <a
                                            href="https://supabase.com/privacy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-yellow-600"
                                        >
                                            Supabase Privacy
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Gestione Cookie */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            Come Gestire i Cookie
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Puoi controllare e/o eliminare i cookie come desideri. Puoi:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Modificare le tue preferenze cliccando sul pulsante "Gestisci Cookie" in basso alla pagina</li>
                            <li>Cancellare tutti i cookie già presenti sul tuo dispositivo</li>
                            <li>Configurare il tuo browser per bloccare i cookie</li>
                        </ul>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                            <p className="text-gray-700 text-sm">
                                ⚠️ <strong>Nota:</strong> La disattivazione di alcuni cookie potrebbe limitare alcune funzionalità del sito (ad esempio, la visualizzazione della mappa o del feed Instagram).
                            </p>
                        </div>
                    </section>

                    {/* Istruzioni Browser */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            Gestione Cookie nei Browser
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Google Chrome</h4>
                                <a
                                    href="https://support.google.com/chrome/answer/95647"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-yellow-600 text-sm"
                                >
                                    Guida Chrome →
                                </a>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Mozilla Firefox</h4>
                                <a
                                    href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-yellow-600 text-sm"
                                >
                                    Guida Firefox →
                                </a>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                                <a
                                    href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-yellow-600 text-sm"
                                >
                                    Guida Safari →
                                </a>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Microsoft Edge</h4>
                                <a
                                    href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-yellow-600 text-sm"
                                >
                                    Guida Edge →
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Contatti */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            Contatti
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Per domande sulla nostra Cookie Policy, contattaci:
                        </p>
                        <ul className="list-none text-gray-700 space-y-2">
                            <li><strong>Email:</strong> info@cafferoma2000.it</li>
                            <li><strong>Telefono:</strong> +080 8876792</li>
                            <li><strong>Indirizzo:</strong> Via Lepanto 103, 70043 Monopoli (BA)</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
