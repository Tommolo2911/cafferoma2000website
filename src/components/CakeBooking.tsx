import React, { useState } from 'react';
import { useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, AlertTriangle, ChefHat, ArrowLeft, Scale, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBooking } from '../hooks/useBooking';

export default function CakeBooking() {
  const { user } = useAuth();
  const { createBooking, loading: bookingLoading } = useBooking();
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState({
    cakeType: '',
    filling: '',
    glaze: '',
    exterior: '',
    weight: '',
    profiteroleCount: '',
    message: '',
    allergies: '',
    name: user?.user_metadata?.full_name || '',
    phone: '',
    email: '',
    pickupDate: '',
    pickupTime: ''
  });

  // Update name field when user changes
  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setFormData(prev => ({
        ...prev,
        name: user.user_metadata.full_name
      }));
    }
  }, [user]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  type CakeOption = {
    fillings?: string[];
    glazes?: string[];
    exteriors?: string[];
    hasWeight?: boolean;
    hasProfiteroleCount?: boolean;
  };

  // Definizione delle opzioni per ogni tipo di torta
  const cakeOptions: Record<string, CakeOption> = {
    'Pan di Spagna': {
      fillings: ['Chantilly & Cioccolato', 'Chantilly & Frutta', 'Panna & Fragole', 'Cioccolato & Nocciola'],
      hasWeight: true
    },
    'Millefoglie': {
      fillings: ['Chantilly & Cioccolato', 'Chantilly & Frutti di Bosco'],
      hasWeight: true
    },
    'Tiramisù': {
      fillings: ['Farcitura standard'],
      hasWeight: true
    },
    'Torta ai Tre Cioccolati': {
      fillings: ['Farcitura standard'],
      hasWeight: true
    },
    'Cheesecake': {
      glazes: ['Frutti di Bosco', 'Passion Fruit', 'Mango'],
      hasWeight: true
    },
    'Mousse ai Frutti di Bosco': {
      fillings: ['Farcitura standard'],
      hasWeight: true
    },
    'Saint Honoré': {
      fillings: ['Farcitura standard'],
      hasWeight: true
    },
    'Bignolata alla Frutta': {
      fillings: ['Farcitura standard'],
      hasWeight: true
    },
    'Sacher': {
      fillings: ['Albicocca', 'Nutella'],
      hasWeight: true
    },
    'Crostata alla Frutta': {
      fillings: ['Farcitura standard'],
      hasWeight: true
    },
    'Mimosa Classica': {
      fillings: ['Farcitura standard'],
      hasWeight: true
    },
    'Profiterolles': {
      exteriors: ['Cioccolato', 'Chantilly', 'Cioccolato e Chantilly'],
      hasProfiteroleCount: true
    }
  };

  const weightOptions = [6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40];
  const profiteroleCountOptions = Array.from({ length: 16 }, (_, i) => 10 + i * 2); // 10, 12, 14, ... 40

  const calculateTotal = () => {
    if (formData.cakeType === 'Profiterolles' && formData.profiteroleCount) {
      return parseInt(formData.profiteroleCount) * 2; // €2 per bignè
    } else if (formData.weight) {
      return parseInt(formData.weight) * 3; // €3 per persona
    }
    return 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Reset dependent fields when cake type changes
    if (name === 'cakeType') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        filling: '',
        glaze: '',
        exterior: '',
        weight: '',
        profiteroleCount: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cakeType) newErrors.cakeType = 'Seleziona il tipo di torta';

    // Validate conditional fields
    const selectedCake = cakeOptions[formData.cakeType as keyof typeof cakeOptions];
    if (selectedCake) {
      if ('fillings' in selectedCake && selectedCake.fillings && selectedCake.fillings.length > 1 && !formData.filling) {
        newErrors.filling = 'Seleziona la farcitura';
      }
      if ('glazes' in selectedCake && selectedCake.glazes && !formData.glaze) {
        newErrors.glaze = 'Seleziona la farcitura';
      }
      if ('exteriors' in selectedCake && selectedCake.exteriors && !formData.exterior) {
        newErrors.exterior = 'Seleziona l\'esterno';
      }
      if ('hasWeight' in selectedCake && selectedCake.hasWeight && !formData.weight) {
        newErrors.weight = 'Seleziona il peso/persone';
      }
      if ('hasProfiteroleCount' in selectedCake && selectedCake.hasProfiteroleCount && !formData.profiteroleCount) {
        newErrors.profiteroleCount = 'Seleziona il numero di bignè';
      }
    }

    if (!formData.name) newErrors.name = 'Inserisci il tuo nome';
    if (!formData.phone) newErrors.phone = 'Inserisci il numero di telefono';
    if (!formData.email) newErrors.email = 'Inserisci la tua email';
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

  const getSelectedCakeOptions = () => {
    return cakeOptions[formData.cakeType as keyof typeof cakeOptions];
  };

  const renderFillingField = () => {
    const selectedCake = getSelectedCakeOptions();
    if (!selectedCake || !('fillings' in selectedCake) || !selectedCake.fillings) return null;

    // If only one filling (standard), don't show the field but display info
    if (selectedCake.fillings.length === 1 && selectedCake.fillings[0] === 'Farcitura standard') {
      let standardDescription = 'Questa torta viene preparata con la farcitura standard della casa';

      // Descrizioni specifiche per le torte con farcitura standard
      if (formData.cakeType === 'Bignolata alla Frutta') {
        standardDescription = 'Farcitura: panna, chantilly e frutta mista';
      } else if (formData.cakeType === 'Mimosa Classica') {
        standardDescription = 'Farcitura: chantilly e ananas';
      }

      return (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-900 font-medium">
            <ChefHat className="w-4 h-4 inline mr-2" />
            {standardDescription}
          </p>
        </div>
      );
    }

    return (
      <div>
        <label className="block text-lg font-semibold text-blue-900 mb-4">
          Farcitura <span className="text-red-500">*</span>
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          {selectedCake.fillings.map((filling) => (
            <label key={filling} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
              <input
                type="radio"
                name="filling"
                value={filling}
                checked={formData.filling === filling}
                onChange={handleInputChange}
                className="w-5 h-5 text-yellow-600 mr-3"
              />
              <span className="text-gray-700 font-medium">{filling}</span>
            </label>
          ))}
        </div>
        {errors.filling && <p className="text-red-500 text-sm mt-2">{errors.filling}</p>}
      </div>
    );
  };

  const renderGlazeField = () => {
    const selectedCake = getSelectedCakeOptions();
    if (!selectedCake?.glazes) return null;

    return (
      <div>
        <label className="block text-lg font-semibold text-blue-900 mb-4">
          Farcitura <span className="text-red-500">*</span>
        </label>
        <div className="grid md:grid-cols-3 gap-4">
          {selectedCake.glazes.map((glaze) => (
            <label key={glaze} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
              <input
                type="radio"
                name="glaze"
                value={glaze}
                checked={formData.glaze === glaze}
                onChange={handleInputChange}
                className="w-5 h-5 text-yellow-600 mr-3"
              />
              <span className="text-gray-700 font-medium">{glaze}</span>
            </label>
          ))}
        </div>
        {errors.glaze && <p className="text-red-500 text-sm mt-2">{errors.glaze}</p>}
      </div>
    );
  };

  const renderExteriorField = () => {
    const selectedCake = getSelectedCakeOptions();
    if (!selectedCake?.exteriors) return null;

    return (
      <div>
        <label className="block text-lg font-semibold text-blue-900 mb-4">
          Esterno <span className="text-red-500">*</span>
        </label>
        <div className="grid md:grid-cols-3 gap-4">
          {selectedCake.exteriors.map((exterior) => (
            <label key={exterior} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
              <input
                type="radio"
                name="exterior"
                value={exterior}
                checked={formData.exterior === exterior}
                onChange={handleInputChange}
                className="w-5 h-5 text-yellow-600 mr-3"
              />
              <span className="text-gray-700 font-medium">{exterior}</span>
            </label>
          ))}
        </div>
        <div className="bg-blue-50 p-3 rounded-lg mt-3">
          <p className="text-blue-800 text-sm">
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            All'interno viene utilizzata panna come farcitura standard
          </p>
        </div>
        {errors.exterior && <p className="text-red-500 text-sm mt-2">{errors.exterior}</p>}
      </div>
    );
  };

  const renderWeightField = () => {
    const selectedCake = getSelectedCakeOptions();
    if (!selectedCake?.hasWeight) return null;

    return (
      <div>
        <label className="block text-lg font-semibold text-blue-900 mb-4">
          <Scale className="w-5 h-5 inline mr-2" />
          Peso/Persone <span className="text-red-500">*</span>
        </label>
        <select
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
        >
          <option value="">Seleziona numero di persone</option>
          {weightOptions.map((weight) => (
            <option key={weight} value={weight}>
              {weight} persone
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-600 mt-2">
          <Users className="w-4 h-4 inline mr-1" />
          Il peso medio per persona è circa 150g
        </p>
        {errors.weight && <p className="text-red-500 text-sm mt-2">{errors.weight}</p>}
      </div>
    );
  };

  const renderProfiteroleCountField = () => {
    const selectedCake = getSelectedCakeOptions();
    if (!selectedCake?.hasProfiteroleCount) return null;

    return (
      <div>
        <label className="block text-lg font-semibold text-blue-900 mb-4">
          <ChefHat className="w-5 h-5 inline mr-2" />
          Numero di Bignè <span className="text-red-500">*</span>
        </label>
        <select
          name="profiteroleCount"
          value={formData.profiteroleCount}
          onChange={handleInputChange}
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
        >
          <option value="">Seleziona numero di bignè</option>
          {profiteroleCountOptions.map((count) => (
            <option key={count} value={count}>
              {count} bignè
            </option>
          ))}
        </select>
        {errors.profiteroleCount && <p className="text-red-500 text-sm mt-2">{errors.profiteroleCount}</p>}
      </div>
    );
  };

  const handleBookingSubmit = async () => {
    const bookingData = {
      booking_type: 'cake',
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email,
      pickup_date: formData.pickupDate,
      pickup_time: formData.pickupTime,
      total_amount: calculateTotal(),
      notes: formData.allergies ? `Allergie: ${formData.allergies}. Note: ${formData.message}` : formData.message,
      booking_data: {
        cakeType: formData.cakeType,
        filling: formData.filling,
        glaze: formData.glaze,
        exterior: formData.exterior,
        weight: formData.weight,
        profiteroleCount: formData.profiteroleCount,
        message: formData.message,
        allergies: formData.allergies
      }
    };

    const { error } = await createBooking(bookingData);

    if (error) {
      console.error('Errore durante la prenotazione:', error);
      // You could show an error message to the user here
    } else {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ChefHat className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6 font-serif">
              Prenotazione Ricevuta!
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Ti ricontatteremo al più presto per confermare i dettagli.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-900 font-semibold mb-2">Riepilogo della tua prenotazione:</p>
              <div className="text-left space-y-2 text-gray-700">
                <p><strong>Torta:</strong> {formData.cakeType}</p>
                {formData.filling && <p><strong>Farcitura:</strong> {formData.filling}</p>}
                {formData.glaze && <p><strong>Farcitura:</strong> {formData.glaze}</p>}
                {formData.exterior && <p><strong>Esterno:</strong> {formData.exterior}</p>}
                {formData.weight && <p><strong>Persone:</strong> {formData.weight}</p>}
                {formData.profiteroleCount && <p><strong>Bignè:</strong> {formData.profiteroleCount}</p>}
                {formData.message && <p><strong>Scritta:</strong> "{formData.message}"</p>}
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
                    cakeType: '',
                    filling: '',
                    glaze: '',
                    exterior: '',
                    weight: '',
                    profiteroleCount: '',
                    message: '',
                    allergies: '',
                    name: '',
                    phone: '',
                    email: '',
                    pickupDate: '',
                    pickupTime: ''
                  });
                }}
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Nuova Prenotazione
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
              to="/"
              className="inline-flex items-center text-blue-900 hover:text-yellow-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna alla Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 font-serif">
              PRENOTA LA TUA
              <span className="block text-yellow-600">TORTA ARTIGIANALE</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              Personalizza la tua torta artigianale con i nostri maestri pasticceri.
              Ogni creazione è unica e realizzata con ingredienti di prima qualità,
              perfetta per rendere speciale ogni tua occasione.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 md:p-12">

              {/* Tipo di Torta */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-blue-900 mb-4">
                  Tipo di Torta <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.keys(cakeOptions).map((cakeType) => (
                    <label key={cakeType} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
                      <input
                        type="radio"
                        name="cakeType"
                        value={cakeType}
                        checked={formData.cakeType === cakeType}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-yellow-600 mr-3"
                      />
                      <span className="text-gray-700 font-medium">{cakeType}</span>
                    </label>
                  ))}
                </div>
                {errors.cakeType && <p className="text-red-500 text-sm mt-2">{errors.cakeType}</p>}
              </div>

              {/* Conditional Fields */}
              {formData.cakeType && (
                <div className="space-y-8">
                  {renderFillingField()}
                  {renderGlazeField()}
                  {renderExteriorField()}
                  {renderWeightField()}
                  {renderProfiteroleCountField()}
                </div>
              )}

              {/* Scritta sulla torta */}
              {formData.cakeType && (
                <div className="mt-8">
                  <label className="block text-lg font-semibold text-blue-900 mb-4">
                    <MessageSquare className="w-5 h-5 inline mr-2" />
                    Scritta sulla torta
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Inserisci la dedica o scritta da mettere sulla torta (es. 'Buon Compleanno Maria!')"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                    rows={3}
                  />
                </div>
              )}

              {/* Allergie */}
              {formData.cakeType && (
                <div className="mt-8">
                  <label className="block text-lg font-semibold text-blue-900 mb-4">
                    <AlertTriangle className="w-5 h-5 inline mr-2" />
                    Allergie o intolleranze
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    placeholder="Specifica eventuali allergie, intolleranze o richieste particolari"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                    rows={3}
                  />
                </div>
              )}

              {/* Dati di contatto */}
              {formData.cakeType && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-6">Dati di contatto</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nome completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
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
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
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
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="La tua email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              )}

              {/* Data e orario ritiro */}
              {formData.cakeType && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-6">Data e orario di ritiro</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Data di ritiro <span className="text-red-500">*</span>
                      </label>
                      <div className="date-input-container">
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleInputChange}
                          min={new Date(Date.now() + 43200000 * 2).toISOString().split('T')[0]}
                          className="booking-date-input w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                          style={{
                            colorScheme: 'light'
                          }}
                          onInput={(e) => {
                            const selectedDate = new Date(e.currentTarget.value);
                            const element = e.currentTarget;
                            if (selectedDate.getDay() === 2) { // Tuesday
                              element.value = '';
                              element.style.borderColor = '#ff3b3b';
                              setTimeout(() => {
                                if (element && element.style) {
                                  element.style.borderColor = '';
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
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                      >
                        <option value="">Seleziona orario</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                      </select>
                      {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    * Le torte devono essere ordinate con almeno 24 ore di anticipo
                  </p>
                </div>
              )}

              {/* Submit Button */}
              {formData.cakeType && (
                <div className="text-center mt-8">
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
                    <ChefHat className="w-5 h-5 inline mr-2" />
                    {bookingLoading ? 'Invio in corso...' : 'Conferma'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}