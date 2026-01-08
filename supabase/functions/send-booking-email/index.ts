declare const process: { env: { RESEND_API_KEY?: string } };

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
};

export const handler = async (event: { httpMethod: string; body: string; }) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: corsHeaders, body: 'ok' };

  try {
    const { bookingData } = JSON.parse(event.body);

    // TUA FORMAT FUNZIONE COMPLETA (copia dal tuo vecchio codice)
    const formatBookingDetails = (data: { booking_type: string; customer_name: any; customer_phone: any; customer_email: any; pickup_date: any; pickup_time: any; total_amount: any; notes: any; booking_data: any; }) => {
      let details = `
NUOVA PRENOTAZIONE - ${data.booking_type.toUpperCase()}

DETTAGLI CLIENTE:
- Nome: ${data.customer_name}
- Telefono: ${data.customer_phone || 'N/D'}
- Email: ${data.customer_email || 'N/D'}

DETTAGLI PRENOTAZIONE:
- Tipo: ${data.booking_type}
- Data ritiro: ${data.pickup_date || 'N/D'}
- Orario ritiro: ${data.pickup_time || 'N/D'}
- Totale: €${(data.total_amount || 0).toFixed(2)}
${data.notes ? `- Note: ${data.notes}` : ''}

DETTAGLI PRODOTTI:
${data.booking_data ? JSON.stringify(data.booking_data, null, 2) : 'Nessun dettaglio prodotti'}
`;
      return details;
    };

    const emailBody = formatBookingDetails(bookingData);

    await resend.emails.send({
      from: 'no-reply@cafferoma2000.com',
      to: 'leggierotommaso2001@gmail.com',
      subject: `Prenotazione ${bookingData.customer_name || 'Cliente'} - ${bookingData.booking_type}`,
      html: `<pre style="font-family:monospace;white-space:pre-wrap">${emailBody}</pre>`
    });

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Email sent' })
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: errorMessage })
    };
  }
};
