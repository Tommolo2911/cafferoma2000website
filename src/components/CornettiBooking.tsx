import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, User, Phone, Mail, Calendar, Clock, Trash2, Coffee } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBooking } from '../hooks/useBooking';
interface ProductItem {
  id: string;
  product: string;
  filling: string;
  extras: string[];
  quantity: number;
}

interface FormData {
  items: ProductItem[];
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  pickupTime: string;
  notes: string;
}

export default function CornettiBooking() {
  const { user } = useAuth();
  const { createBooking, loading: bookingLoading } = useBooking();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState<FormData>({
    items: [{ id: '1', product: '', filling: '', extras: [], quantity: 1 }],
    name: '',
    phone: '',
    email: '',
    pickupDate: '',
    pickupTime: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Definizione prodotti e farciture
  type ProductOptionType = {
    fillings: string[];
    hasExtras: boolean;
    isPreFilled?: boolean;
  };

  const productOptions: Record<string, ProductOptionType> = {
    'Cornetti Classici': {
      fillings: ['Vuoto', 'Nutella', 'Crema', 'Albicocca', 'Crema e Amarena', 'Frutti di Bosco', 'Amarena', 'Cioccolato Bianco e Nutella', 'Pistacchio'],
      hasExtras: true
    },
    'Cornetti Integrali': {
      fillings: ['Vuoto', 'Nutella', 'Crema', 'Albicocca', 'Crema e Amarena', 'Frutti di Bosco', 'Amarena', 'Pistacchio'],
      hasExtras: true
    },
    'Cornetti Vegani': {
      fillings: ['Vuoto', 'Nutella', 'Crema', 'Albicocca', 'Crema e Amarena', 'Frutti di Bosco', 'Amarena', 'Pistacchio'],
      hasExtras: true
    },
    'Brioche Classiche': {
      fillings: ['Vuoto', 'Nutella', 'Crema', 'Albicocca', 'Crema e Amarena', 'Frutti di Bosco', 'Amarena', 'Cioccolato Bianco e Nutella', 'Pistacchio'],
      hasExtras: true
    },
    'Brioche ai Cereali': {
      fillings: ['Vuoto', 'Nutella', 'Crema', 'Albicocca', 'Frutti di Bosco', 'Pistacchio'],
      hasExtras: true
    },
    'Mezzatonda': {
      fillings: ['Crema e Amarena', 'Crema e Cioccolato', 'Cereali con Crema e Amarena'],
      hasExtras: false
    },
    'Krapfen': {
      fillings: ['Crema', 'Nutella', 'Pistacchio'],
      hasExtras: false
    },
    'Ciambelline Fritte': {
      fillings: ['Zucchero', 'Zucchero a Velo'],
      hasExtras: false
    },
    'Flauti': {
      fillings: ['Cioccolato', 'Mele'],
      hasExtras: false
    },
    'Pastel de Nata': {
      fillings: ['Crema Pasticcera '],
      hasExtras: false,
      isPreFilled: true
    },
    'Pain Suisse al cacao': {
      fillings: ['Cioccolato Fondente'],
      hasExtras: false,
      isPreFilled: true
    },
    'Saccottino': {
      fillings: ['Nutella'],
      hasExtras: false,
      isPreFilled: true
    },
    'Polacca': {
      fillings: ['Crema e Uvetta'],
      hasExtras: false,
      isPreFilled: true
    }
  };

  const extraOptions = ['Panna', 'Fragole', 'Frutta Mista'];

  const calculateItemPrice = (item: ProductItem) => {
    if (!item.product || !item.quantity) return 0;

    let basePrice = 1.30; // Prezzo base per cornetti

    // Prezzo maggiorato per farcitura al pistacchio
    if (item.filling === 'Pistacchio') {
      basePrice = 1.60;
    }

    // Aggiungi 0.50€ per ogni extra
    const extrasPrice = item.extras.length * 0.50;

    return (basePrice + extrasPrice) * item.quantity;
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + calculateItemPrice(item), 0);
  };

  const addItem = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, product: '', filling: '', extras: [], quantity: 1 }]
    }));
  };

  const removeItem = (id: string) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  const updateItem = (id: string, field: keyof ProductItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id
          ? {
            ...item,
            [field]: value,
            // Reset filling and extras when product changes
            ...(field === 'product' ? { filling: '', extras: [] } : {})
          }
          : item
      )
    }));
  };

  const updateFormField = (field: keyof Omit<FormData, 'items'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const toggleExtra = (itemId: string, extra: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? {
            ...item,
            extras: (() => {
              if (item.extras.includes(extra)) {
                // Rimuovi l'extra se già selezionato
                return item.extras.filter(e => e !== extra);
              } else {
                // Logica per fragole e frutta mista (mutuamente esclusivi)
                if (extra === 'Fragole' && item.extras.includes('Frutta Mista')) {
                  return item.extras.filter(e => e !== 'Frutta Mista').concat(extra);
                } else if (extra === 'Frutta Mista' && item.extras.includes('Fragole')) {
                  return item.extras.filter(e => e !== 'Fragole').concat(extra);
                } else {
                  return [...item.extras, extra];
                }
              }
            })()
          }
          : item
      )
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate items
    const validItems = formData.items.filter(item => item.product && item.filling && item.quantity > 0);
    if (validItems.length === 0) {
      newErrors.items = 'Seleziona almeno un prodotto con farcitura e quantità';
    }

    // Validate contact info
    if (!formData.name.trim()) newErrors.name = 'Inserisci nome e cognome';
    if (!formData.phone.trim()) newErrors.phone = 'Inserisci il numero di telefono';
    if (!formData.email.trim()) newErrors.email = 'Inserisci la tua email';
    if (!formData.pickupDate) newErrors.pickupDate = 'Seleziona la data di ritiro';
    if (!formData.pickupTime) newErrors.pickupTime = 'Seleziona l\'orario di ritiro';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      handleBookingSubmit();
    }
  };

  const handleBookingSubmit = async () => {
    const bookingData = {
      booking_type: 'cornetti',
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email,
      pickup_date: formData.pickupDate,
      pickup_time: formData.pickupTime,
      total_amount: calculateTotal(),
      notes: formData.notes,
      booking_data: {
        items: formData.items.filter(item => item.product && item.quantity > 0)
      }
    };

    const { data, error } = await createBooking(bookingData);

    if (error) {
      console.error('Errore durante la prenotazione:', error);
      // You could show an error message to the user here
    } else {
      setIsSubmitted(true);
    }
  };

  const getTotalItems = () => {
    return formData.items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6 font-serif">
              Prenotazione Ricevuta!
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Ti ricontatteremo al più presto per confermare.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-900 font-semibold mb-4">Riepilogo del tuo ordine:</p>
              <div className="text-left space-y-3 text-gray-700">
                {formData.items.filter(item => item.product && item.quantity > 0).map((item, index) => (
                  <div key={index} className="border-b border-blue-200 pb-2">
                    <p><strong>{item.quantity}x {item.product}</strong></p>
                    <p className="text-sm">Farcitura: {item.filling}</p>
                    {item.extras.length > 0 && (
                      <p className="text-sm">Extra: {item.extras.join(', ')}</p>
                    )}
                  </div>
                ))}
                <p className="pt-2"><strong>Totale prodotti:</strong> {getTotalItems()}</p>
                <p><strong>Ritiro:</strong> {formData.pickupDate} alle {formData.pickupTime}</p>
                <p className="text-lg font-bold text-green-600"><strong>Totale:</strong> €{calculateTotal().toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Torna alla Home
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    items: [{ id: '1', product: '', filling: '', extras: [], quantity: 1 }],
                    name: '',
                    phone: '',
                    email: '',
                    pickupDate: '',
                    pickupTime: '',
                    notes: ''
                  });
                }}
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Nuovo Ordine
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/pasticceria"
              className="inline-flex items-center text-blue-900 hover:text-yellow-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna alla Pasticceria
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 font-serif">
              PRENOTA I TUOI
              <span className="block text-yellow-600">CORNETTI ARTIGIANALI</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              Ordina i tuoi prodotti da forno preferiti in un'unica prenotazione.
              Cornetti, brioche, krapfen e specialità artigianali preparati freschi ogni mattina.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 md:p-12">

              {/* Selezione Prodotti */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-blue-900 flex items-center">
                    <Coffee className="w-5 h-5 mr-2" />
                    Seleziona i tuoi prodotti
                  </h3>
                  <div className="text-sm text-gray-600">
                    Totale: <span className="font-semibold text-blue-900">{getTotalItems()} prodotti</span>
                  </div>
                </div>

                {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}

                <div className="space-y-6">
                  {formData.items.map((item, index) => (
                    <div key={item.id} className="border-2 border-gray-200 rounded-lg p-6 relative">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Prodotto */}
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Prodotto <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={item.product}
                            onChange={(e) => updateItem(item.id, 'product', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                          >
                            <option value="">Seleziona prodotto</option>
                            {Object.keys(productOptions).map(product => (
                              <option key={product} value={product}>{product}</option>
                            ))}
                          </select>
                        </div>

                        {/* Quantità */}
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Quantità <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              onClick={() => updateItem(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="50"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                              className="w-20 p-3 border-2 border-gray-200 rounded-lg text-center focus:border-yellow-400 focus:outline-none transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => updateItem(item.id, 'quantity', Math.min(50, item.quantity + 1))}
                              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Farcitura */}
                      {item.product && (
                        <div className="mt-6">
                          <label className="block text-gray-700 font-medium mb-2">
                            {item.quantity}x {item.product} - {item.filling}
                            {item.extras.length > 0 && ` + ${item.extras.join(', ')}`}
                            - €{calculateItemPrice(item).toFixed(2)}
                          </label>
                          <div className="grid md:grid-cols-3 gap-3">
                            {productOptions[item.product as keyof typeof productOptions]?.fillings.map(filling => (
                              <label key={filling} className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
                                <input
                                  type="radio"
                                  name={`filling-${item.id}`}
                                  value={filling}
                                  checked={item.filling === filling}
                                  onChange={(e) => updateItem(item.id, 'filling', e.target.value)}
                                  className="w-4 h-4 text-yellow-600 mr-3"
                                />
                                <span className="text-sm text-gray-700">{filling}</span>
                              </label>
                            ))}
                          </div>

                          {productOptions[item.product as keyof typeof productOptions]?.isPreFilled && (
                            <p className="text-sm text-blue-600 mt-2 italic">
                              * Prodotto già farcito, farcitura non modificabile
                            </p>
                          )}
                        </div>
                      )}

                      {/* Extra */}
                      {item.product && productOptions[item.product as keyof typeof productOptions]?.hasExtras && (
                        <div className="mt-6">
                          <label className="block text-gray-700 font-medium mb-2">
                            Extra (opzionali)
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {extraOptions.map(extra => (
                              <label key={extra} className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={item.extras.includes(extra)}
                                  onChange={() => toggleExtra(item.id, extra)}
                                  className="w-4 h-4 text-yellow-600 mr-3"
                                />
                                <span className="text-sm text-gray-700">
                                  {extra} <span className="text-yellow-600 font-medium">(+€0.50)</span>
                                </span>
                              </label>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            * Fragole e Frutta Mista non possono essere selezionati insieme
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="mt-6 flex items-center justify-center w-full p-4 border-2 border-dashed border-yellow-400 rounded-lg text-yellow-600 hover:bg-yellow-50 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Aggiungi altro prodotto
                </button>
              </div>

              {/* Dati di contatto */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Dati di contatto
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Nome completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormField('name', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="Il tuo nome e cognome"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Telefono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormField('phone', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="Il tuo numero di telefono"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormField('email', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="La tua email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Data e orario ritiro */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Ritiro
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Data di ritiro <span className="text-red-500">*</span>
                    </label>
                    <div className="date-input-container">
                      <input
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => updateFormField('pickupDate', e.target.value)}
                        min={new Date(Date.now() + 43200000 * 2).toISOString().split('T')[0]}
                        className="booking-date-input w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                        style={{
                          colorScheme: 'light'
                        }}
                        onInput={(e) => {
                          const inputElement = e.currentTarget;
                          if (!inputElement) return;

                          const selectedDate = new Date(e.currentTarget.value);
                          if (selectedDate.getDay() === 2) { // Tuesday
                            inputElement.value = '';
                            inputElement.style.borderColor = '#ff3b3b';
                            setTimeout(() => {
                              if (inputElement) {
                                inputElement.style.borderColor = '';
                              }
                            }, 2000);
                            return;
                          }
                        }}
                      />

                    </div>
                    {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Orario di ritiro <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.pickupTime}
                      onChange={(e) => updateFormField('pickupTime', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    >
                      <option value="">Seleziona orario</option>
                      <option value="07:30">07:30</option>
                      <option value="08:00">08:00</option>
                      <option value="08:30">08:30</option>
                      <option value="09:00">09:00</option>
                      <option value="09:30">09:30</option>
                      <option value="10:00">10:00</option>
                      <option value="10:30">10:30</option>
                      <option value="11:00">11:00</option>
                      <option value="11:30">11:30</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                    </select>
                    {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  * I prodotti devono essere ordinati con almeno 24 ore di anticipo
                </p>
              </div>

              {/* Note */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  Note aggiuntive
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateFormField('notes', e.target.value)}
                  placeholder="Richieste particolari, allergie o altre informazioni utili..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                  <p className="text-blue-800 text-lg font-bold mb-2">
                    💰 Totale stimato: €{calculateTotal().toFixed(2)}
                  </p>
                  <p className="text-blue-700 text-sm">
                    Il pagamento avverrà al momento del ritiro. Ti ricontatteremo per confermare il prezzo finale.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5 inline mr-2" />
                  {bookingLoading ? 'Invio in corso...' : 'Conferma'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}