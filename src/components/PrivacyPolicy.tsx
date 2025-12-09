// components/PrivacyPolicy.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
                        <Shield className="w-10 h-10 text-yellow-600 mr-4" />
                        <h1 className="text-4xl font-bold text-blue-900">
                            Privacy Policy
                        </h1>
                    </div>

                    <p className="text-gray-600 mb-8">
                        Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
                    </p>

                    {/* Sezione 1: Titolare del trattamento */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            1. Titolare del Trattamento
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Il Titolare del trattamento dei dati è:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Ragione Sociale:</strong> Caffè Roma 2000</li>
                            <li><strong>Sede:</strong> Via Lepanto 103, 70043 Monopoli (BA)</li>
                            <li><strong>P.IVA:</strong> 05591600720</li>
                            <li><strong>Email:</strong> info@cafferoma2000.it</li>
                            <li><strong>Tel:</strong> +080 8876792</li>
                        </ul>
                    </section>

                    {/* Sezione 2: Dati raccolti */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            2. Dati Personali Raccolti
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Il nostro sito raccoglie i seguenti tipi di dati:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Dati di contatto:</strong> nome, email, telefono (tramite form di prenotazione)</li>
                            <li><strong>Dati di navigazione:</strong> indirizzo IP, browser, sistema operativo</li>
                            <li><strong>Cookie:</strong> cookie tecnici e di terze parti (Google Maps, Instagram, Behold)</li>
                        </ul>
                    </section>

                    {/* Sezione 3: Finalità del trattamento */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            3. Finalità del Trattamento
                        </h2>
                        <p className="text-gray-700 mb-4">
                            I dati raccolti vengono utilizzati per:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Gestire le prenotazioni di prodotti (gelato, pasticceria, cornetti, mignon)</li>
                            <li>Rispondere alle richieste di contatto</li>
                            <li>Inviare conferme e comunicazioni relative agli ordini</li>
                            <li>Migliorare l'esperienza utente sul sito</li>
                        </ul>
                    </section>

                    {/* Sezione 4: Base giuridica */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            4. Base Giuridica del Trattamento
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Il trattamento dei dati si basa su:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Consenso dell'interessato</strong> (art. 6.1.a GDPR) per newsletter e comunicazioni marketing</li>
                            <li><strong>Esecuzione di un contratto</strong> (art. 6.1.b GDPR) per gestire le prenotazioni</li>
                            <li><strong>Obbligo legale</strong> (art. 6.1.c GDPR) per adempimenti fiscali e contabili</li>
                        </ul>
                    </section>

                    {/* Sezione 5: Conservazione dati */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            5. Conservazione dei Dati
                        </h2>
                        <p className="text-gray-700">
                            I dati personali vengono conservati per il tempo necessario a soddisfare le finalità per cui sono stati raccolti:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
                            <li>Dati di prenotazione: fino a 24 mesi dalla raccolta</li>
                            <li>Dati di navigazione: fino a 12 mesi</li>
                            <li>Dati per obblighi fiscali: 10 anni (come da normativa italiana)</li>
                        </ul>
                    </section>

                    {/* Sezione 6: Cookie */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            6. Cookie e Tecnologie di Tracciamento
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Il sito utilizza:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Cookie tecnici:</strong> necessari per il funzionamento del sito</li>
                            <li><strong>Cookie di terze parti:</strong> Google Maps (per visualizzare la mappa), Behold (per feed Instagram)</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Per maggiori informazioni consulta la nostra{' '}
                            <Link to="/cookie-policy" className="text-blue-600 hover:text-yellow-600">
                                Cookie Policy
                            </Link>
                        </p>
                    </section>

                    {/* Sezione 7: Diritti dell'utente */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            7. Diritti dell'Interessato
                        </h2>
                        <p className="text-gray-700 mb-4">
                            In qualità di interessato, hai diritto a:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Accedere ai tuoi dati personali (art. 15 GDPR)</li>
                            <li>Rettificare dati inesatti (art. 16 GDPR)</li>
                            <li>Cancellare i dati ("diritto all'oblio") (art. 17 GDPR)</li>
                            <li>Limitare il trattamento (art. 18 GDPR)</li>
                            <li>Opporti al trattamento (art. 21 GDPR)</li>
                            <li>Portabilità dei dati (art. 20 GDPR)</li>
                            <li>Revocare il consenso in qualsiasi momento</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Per esercitare i tuoi diritti, contattaci a:{' '}
                            <a href="mailto:info@cafferoma2000.it" className="text-blue-600 hover:text-yellow-600">
                                info@cafferoma2000.it
                            </a>
                        </p>
                    </section>

                    {/* Sezione 8: Sicurezza */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            8. Sicurezza dei Dati
                        </h2>
                        <p className="text-gray-700">
                            Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, perdita o distruzione, tra cui:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
                            <li>Connessione HTTPS sicura</li>
                            <li>Database protetti con crittografia</li>
                            <li>Accesso limitato ai dati solo al personale autorizzato</li>
                        </ul>
                    </section>

                    {/* Sezione 9: Modifiche */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            9. Modifiche alla Privacy Policy
                        </h2>
                        <p className="text-gray-700">
                            Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.
                        </p>
                    </section>

                    {/* Sezione 10: Contatti */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            10. Contatti
                        </h2>
                        <p className="text-gray-700">
                            Per qualsiasi domanda o richiesta relativa al trattamento dei tuoi dati personali, puoi contattarci:
                        </p>
                        <ul className="list-none text-gray-700 space-y-2 mt-4">
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
