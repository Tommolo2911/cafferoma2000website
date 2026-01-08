// components/TermsConditions.jsx
import { useEffect, type SVGProps } from 'react';
import { Link } from 'react-router-dom';

/* Local lightweight SVG icon components to avoid external dependency */
function ArrowLeft(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    );
}
function FileText(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13h8M8 17h8" />
        </svg>
    );
}

export default function TermsConditions() {
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
                        <FileText className="w-10 h-10 text-yellow-600 mr-4" />
                        <h1 className="text-4xl font-bold text-blue-900">
                            Termini e Condizioni
                        </h1>
                    </div>

                    <p className="text-gray-600 mb-8">
                        Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
                    </p>

                    {/* Introduzione */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            1. Introduzione
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Benvenuto sul sito web di Caffè Roma 2000. Utilizzando questo sito e i servizi offerti,
                            accetti i presenti Termini e Condizioni. Ti invitiamo a leggerli attentamente prima di
                            utilizzare il nostro sito.
                        </p>
                        <p className="text-gray-700">
                            Se non accetti questi termini, ti preghiamo di non utilizzare il sito.
                        </p>
                    </section>

                    {/* Informazioni Azienda */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            2. Informazioni sull'Azienda
                        </h2>
                        <ul className="list-none text-gray-700 space-y-2">
                            <li><strong>Ragione Sociale:</strong> Caffè Roma 2000</li>
                            <li><strong>Indirizzo:</strong> Via Lepanto 103, 70043 Monopoli (BA), Italia</li>
                            <li><strong>P.IVA:</strong> 05591600720</li>
                            <li><strong>Email:</strong> info@cafferoma2000.it</li>
                            <li><strong>Telefono:</strong> +080 8876792</li>
                        </ul>
                    </section>

                    {/* Servizi Offerti */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            3. Servizi Offerti
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Il sito permette di:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Visualizzare informazioni sui nostri prodotti (gelato, pasticceria, cornetti, mignon, monoporzioni)</li>
                            <li>Prenotare prodotti per il ritiro in negozio</li>
                            <li>Contattarci tramite form o informazioni di contatto</li>
                            <li>Iscriversi alla newsletter</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            I servizi sono disponibili per persone maggiorenni o minori con autorizzazione di un genitore/tutore.
                        </p>
                    </section>

                    {/* Prenotazioni */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            4. Prenotazioni Prodotti
                        </h2>

                        <h3 className="text-xl font-semibold text-blue-800 mb-3">
                            4.1 Modalità di Prenotazione
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Le prenotazioni possono essere effettuate tramite i form presenti sul sito per:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Gelato artigianale (vassoi da 500g, 1kg, 2kg, 2.5kg)</li>
                            <li>Pasticceria (torte su misura)</li>
                            <li>Cornetti artigianali (vassoi)</li>
                            <li>Mignon e monoporzioni (vassoi personalizzati)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-blue-800 mb-3">
                            4.2 Conferma Prenotazione
                        </h3>
                        <p className="text-gray-700 mb-4">
                            La prenotazione effettuata tramite il sito è da considerarsi una <strong>richiesta</strong>.
                            Riceverai una conferma via email o telefono entro 24 ore. La prenotazione diventa effettiva
                            solo dopo la nostra conferma esplicita.
                        </p>

                        <h3 className="text-xl font-semibold text-blue-800 mb-3">
                            4.3 Tempi di Preavviso
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li><strong>Gelato e Mignon:</strong> Minimo 24 ore di preavviso</li>
                            <li><strong>Cornetti:</strong> Minimo 24 ore di preavviso</li>
                            <li><strong>Torte su misura:</strong> Minimo 48-72 ore di preavviso (a seconda della complessità)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-blue-800 mb-3">
                            4.4 Ritiro e Pagamento
                        </h3>
                        <p className="text-gray-700 mb-4">
                            I prodotti prenotati devono essere ritirati presso il nostro locale in:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Via Lepanto 103, 70043 Monopoli (BA)</li>
                            <li>Orari: dalle 7:00 alle 23:00 (chiusi il martedì)</li>
                        </ul>
                        <p className="text-gray-700 mb-4">
                            Il <strong>pagamento</strong> avviene esclusivamente al momento del ritiro, in contanti o con carte di pagamento accettate.
                        </p>

                        <h3 className="text-xl font-semibold text-blue-800 mb-3">
                            4.5 Cancellazione e Modifiche
                        </h3>
                        <p className="text-gray-700 mb-4">
                            È possibile cancellare o modificare una prenotazione contattandoci:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Almeno <strong>12 ore prima</strong> dell'orario di ritiro previsto per gelato, cornetti e mignon</li>
                            <li>Almeno <strong>24 ore prima</strong> per torte su misura</li>
                        </ul>
                        <p className="text-gray-700">
                            In caso di mancato ritiro senza preavviso, ci riserviamo il diritto di rifiutare future prenotazioni.
                        </p>
                    </section>

                    {/* Prezzi */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            5. Prezzi
                        </h2>
                        <p className="text-gray-700 mb-4">
                            I prezzi indicati sul sito sono orientativi e possono variare in base a:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Disponibilità degli ingredienti</li>
                            <li>Complessità della personalizzazione richiesta</li>
                            <li>Variazioni stagionali</li>
                        </ul>
                        <p className="text-gray-700">
                            Il prezzo finale verrà comunicato al momento della conferma della prenotazione e potrà essere confermato
                            al momento del ritiro. Tutti i prezzi sono espressi in Euro (€) e includono IVA.
                        </p>
                    </section>

                    {/* Responsabilità */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            6. Limitazione di Responsabilità
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Caffè Roma 2000 non è responsabile per:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Interruzioni temporanee del servizio del sito dovute a manutenzione o problemi tecnici</li>
                            <li>Informazioni fornite da terze parti (Google Maps, Instagram, widget esterni)</li>
                            <li>Ritardi o impossibilità di preparazione dovuti a cause di forza maggiore</li>
                            <li>Allergie o intolleranze non comunicate al momento della prenotazione</li>
                        </ul>
                        <p className="text-gray-700">
                            I nostri prodotti possono contenere allergeni. È responsabilità dell'utente comunicare eventuali
                            allergie o intolleranze nel campo note della prenotazione.
                        </p>
                    </section>

                    {/* Allergie */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            7. Informazioni su Allergeni
                        </h2>
                        <p className="text-gray-700 mb-4">
                            I nostri prodotti possono contenere o essere venuti a contatto con:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Latte e derivati</li>
                            <li>Uova</li>
                            <li>Glutine (cereali contenenti glutine)</li>
                            <li>Frutta a guscio (mandorle, nocciole, pistacchi, noci)</li>
                            <li>Soia</li>
                            <li>Anidride solforosa e solfiti</li>
                        </ul>
                        <p className="text-gray-700">
                            Per informazioni dettagliate sugli allergeni di specifici prodotti, contattaci prima di effettuare
                            la prenotazione.
                        </p>
                    </section>

                    {/* Proprietà Intellettuale */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            8. Proprietà Intellettuale
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Tutti i contenuti presenti sul sito (testi, immagini, loghi, grafica, video) sono di proprietà
                            di Caffè Roma 2000 o utilizzati con licenza e sono protetti da copyright e altre leggi sulla
                            proprietà intellettuale.
                        </p>
                        <p className="text-gray-700">
                            È vietato copiare, riprodurre, modificare, distribuire o utilizzare i contenuti del sito senza
                            autorizzazione scritta.
                        </p>
                    </section>

                    {/* Uso del Sito */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            9. Uso Corretto del Sito
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Utilizzando il sito, ti impegni a:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Fornire informazioni veritiere e accurate nelle prenotazioni</li>
                            <li>Non utilizzare il sito per scopi illegali o non autorizzati</li>
                            <li>Non tentare di accedere a parti protette del sito senza autorizzazione</li>
                            <li>Non danneggiare, disabilitare o sovraccaricare il sito</li>
                            <li>Non utilizzare bot, spider o altri metodi automatici per accedere al sito</li>
                        </ul>
                        <p className="text-gray-700">
                            Ci riserviamo il diritto di sospendere o terminare l'accesso al sito in caso di violazione
                            di questi termini.
                        </p>
                    </section>

                    {/* Privacy */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            10. Privacy e Protezione Dati
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Il trattamento dei tuoi dati personali è regolato dalla nostra{' '}
                            <Link to="/privacy-policy" className="text-blue-600 hover:text-yellow-600 underline">
                                Privacy Policy
                            </Link>
                            , conforme al Regolamento Generale sulla Protezione dei Dati (GDPR - Reg. UE 2016/679).
                        </p>
                        <p className="text-gray-700">
                            Utilizzando il sito accetti il trattamento dei tuoi dati come descritto nella Privacy Policy.
                        </p>
                    </section>

                    {/* Cookie */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            11. Cookie
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Il sito utilizza cookie tecnici e di terze parti. Per informazioni dettagliate consulta la nostra{' '}
                            <Link to="/cookie-policy" className="text-blue-600 hover:text-yellow-600 underline">
                                Cookie Policy
                            </Link>.
                        </p>
                    </section>

                    {/* Link Esterni */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            12. Link a Siti di Terze Parti
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Il sito può contenere link a siti esterni (Google Maps, Instagram, ecc.).
                            Non siamo responsabili per:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Il contenuto di questi siti</li>
                            <li>Le loro politiche sulla privacy</li>
                            <li>L'accuratezza delle informazioni fornite</li>
                        </ul>
                    </section>

                    {/* Modifiche */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            13. Modifiche ai Termini e Condizioni
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Ci riserviamo il diritto di modificare questi Termini e Condizioni in qualsiasi momento.
                            Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.
                        </p>
                        <p className="text-gray-700">
                            Continuando a utilizzare il sito dopo le modifiche, accetti i nuovi termini.
                        </p>
                    </section>

                    {/* Legge Applicabile */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            14. Legge Applicabile e Foro Competente
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Questi Termini e Condizioni sono regolati dalla legge italiana.
                        </p>
                        <p className="text-gray-700">
                            Per qualsiasi controversia sarà competente esclusivamente il Foro di Bari.
                        </p>
                    </section>

                    {/* Risoluzione Controversie Online */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            15. Risoluzione delle Controversie Online (ODR)
                        </h2>
                        <p className="text-gray-700 mb-4">
                            In conformità al Regolamento UE 524/2013, segnaliamo che la Commissione Europea ha istituito
                            una piattaforma per la risoluzione online delle controversie (ODR) tra consumatori e professionisti.
                        </p>
                        <p className="text-gray-700">
                            La piattaforma è accessibile al seguente link:{' '}
                            <a
                                href="https://ec.europa.eu/consumers/odr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-yellow-600 underline"
                            >
                                https://ec.europa.eu/consumers/odr
                            </a>
                        </p>
                    </section>

                    {/* Contatti */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            16. Contatti
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Per domande, chiarimenti o reclami sui presenti Termini e Condizioni, contattaci:
                        </p>
                        <ul className="list-none text-gray-700 space-y-2">
                            <li><strong>Email:</strong> info@cafferoma2000.it</li>
                            <li><strong>Telefono:</strong> +080 8876792</li>
                            <li><strong>Indirizzo:</strong> Via Lepanto 103, 70043 Monopoli (BA)</li>
                            <li><strong>Orari:</strong> Lun-Sab: 7:00-23:00 (Chiusi il Martedì)</li>
                        </ul>
                    </section>

                    {/* Accettazione */}
                    <div className="mt-12 bg-blue-50 border border-blue-200 p-6 rounded-lg">
                        <p className="text-gray-700 text-center">
                            <strong>Utilizzando questo sito, dichiari di aver letto, compreso e accettato i presenti
                                Termini e Condizioni.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
