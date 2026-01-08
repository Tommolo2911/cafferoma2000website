import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface BookingData {
  booking_type: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  pickup_date: string;
  pickup_time: string;
  total_amount: number;
  notes?: string;
  booking_data: any;
}

export function useBooking() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: BookingData) => {
    setLoading(true);
    setError(null);

    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const errorMessage = 'Supabase not configured';
      setError(errorMessage);
      setLoading(false);
      return { data: null, error: errorMessage };
    }

    try {
      const { data, error: insertError } = await supabase
        .from('bookings')
        .insert({
          user_id: user?.id || null,
          ...bookingData
        })
        .select()
        .single();

      if (insertError) {
        console.error('Database insert error:', insertError);
        throw insertError;
      }

      // Send email notification
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (supabaseUrl) {
          const emailResponse = await fetch('/.netlify/functions/send-booking-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookingData: data }),
          });
          if (!emailResponse.ok) {
            const errorText = await emailResponse.text();
            console.warn('Email notification warning:', errorText);
            // Don't treat email configuration issues as booking failures
          }
        } else {
          console.warn('Supabase URL not configured, skipping email notification');
        }
      } catch (emailError) {
        console.warn('Email notification error (non-critical):', emailError);
        // Don't fail the booking if email fails
      }

      return { data, error: null };
    } catch (err: any) {
      console.error('Booking creation error:', err);
      let errorMessage = 'Errore durante la creazione della prenotazione';

      if (err.message?.includes('fetch')) {
        errorMessage = 'Errore di connessione. Verifica la tua connessione internet e riprova.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getUserBookings = async () => {
    if (!user) return { data: [], error: 'User not authenticated' };

    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const errorMessage = 'Database not configured. Please check environment variables.';
      setError(errorMessage);
      return { data: [], error: errorMessage };
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      return { data: data || [], error: null };
    } catch (err: any) {
      let errorMessage = 'Errore durante il recupero delle prenotazioni';

      if (err.message?.includes('fetch')) {
        errorMessage = 'Errore di connessione. Verifica la tua connessione internet e riprova.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return { data: [], error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    getUserBookings,
    loading,
    error,
  };
}