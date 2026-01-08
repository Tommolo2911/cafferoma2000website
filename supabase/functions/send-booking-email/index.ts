const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const { mail: sgMail } = require('@sendgrid/mail');

exports.handler = async (event: { httpMethod: string; body: string; }, context: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: 'ok'
    };
  }

  try {
    const { bookingData } = JSON.parse(event.body);

    // formatBookingDetails identico al tuo!
    const formatBookingDetails = (bookingData: any) => {
      if (!bookingData) return '';

      const lines: string[] = [];

      lines.push(`Booking Type: ${bookingData.booking_type ?? ''}`);
      lines.push(`Customer: ${bookingData.customer_name ?? ''}`);
      if (bookingData.date) lines.push(`Date: ${bookingData.date}`);
      if (bookingData.time) lines.push(`Time: ${bookingData.time}`);
      if (bookingData.people) lines.push(`People: ${bookingData.people}`);
      if (bookingData.notes) lines.push(`Notes: ${bookingData.notes}`);

      // Append any other fields that may be present
      const knownKeys = new Set(['booking_type', 'customer_name', 'date', 'time', 'people', 'notes']);
      Object.keys(bookingData).forEach((key) => {
        if (!knownKeys.has(key)) {
          const value = bookingData[key];
          lines.push(`${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`);
        }
      });

      return lines.join('\n');
    };

    const emailBody = formatBookingDetails(bookingData);
    const htmlBody = emailBody.replace(/\n/g, '<br>').replace(/ {2,}/g, '&nbsp;&nbsp;');

    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    if (!sendgridApiKey) {
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'Email skipped - no API key'
        })
      };
    }

    sgMail.setApiKey(sendgridApiKey);

    await sgMail.send({
      personalizations: [{
        to: [{ email: 'leggierotommaso2001@gmail.com', name: 'Caffè Roma 2000' }],
        subject: `Nuova Prenotazione - ${bookingData.customer_name} - ${bookingData.booking_type.toUpperCase()}`
      }],
      from: { email: 'cafferoma2000@gmail.com', name: 'Sistema Prenotazioni Caffè Roma 2000' },
      content: [
        { type: 'text/plain', value: emailBody },
        { type: 'text/html', value: `<pre style="font-family: monospace; white-space: pre-wrap;">${htmlBody}</pre>` }
      ]
    });

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Email sent' })
    };

  } catch (error) {
    console.error('Email error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: errorMessage })
    };
  }
};
