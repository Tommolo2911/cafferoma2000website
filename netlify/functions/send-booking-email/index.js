const resend = require('resend').Resend(process.env.RESEND_API_KEY);

const corsHeaders = {  // ← SPOSATI IN ALTO
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
};


export async function handler(event) {
    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: corsHeaders, body: 'ok' };

    try {
        const { bookingData } = JSON.parse(event.body);

        // COPIA QUI LA TUA FUNZIONE COMPLETA:
        const formatBookingDetails = (data) => {
            let details = `
NUOVA PRENOTAZIONE - ${data.booking_type.toUpperCase()}

DETTAGLI CLIENTE:
- Nome: ${data.customer_name}
- Telefono: ${data.customer_phone}
- Email: ${data.customer_email}

DETTAGLI PRENOTAZIONE:
- Tipo: ${data.booking_type}
- Data ritiro: ${data.pickup_date}
- Orario ritiro: ${data.pickup_time}
- Totale stimato: €${(data.total_amount || 0).toFixed(2)}
${data.notes ? `- Note: ${data.notes}` : ''}

DETTAGLI PRODOTTI:
`

            // Format specific booking data based on type
            if (data.booking_data) {
                switch (data.booking_type) {
                    case 'cake':
                        details += `- Torta: ${data.booking_data.cakeType}
${data.booking_data.filling ? `- Farcitura: ${data.booking_data.filling}` : ''}
${data.booking_data.glaze ? `- Glazatura: ${data.booking_data.glaze}` : ''}
${data.booking_data.exterior ? `- Esterno: ${data.booking_data.exterior}` : ''}
${data.booking_data.weight ? `- Persone: ${data.booking_data.weight}` : ''}
${data.booking_data.profiteroleCount ? `- Bignè: ${data.booking_data.profiteroleCount}` : ''}
${data.booking_data.message ? `- Scritta: "${data.booking_data.message}"` : ''}
${data.booking_data.allergies ? `- Allergie: ${data.booking_data.allergies}` : ''}`
                        break;

                    case 'cornetti':
                        data.booking_data.items?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x ${item.product}
  ̶ - Farcitura: ${item.filling}
  ${item.extras?.length > 0 ? `- Extra: ${item.extras.join(', ')} (+€${(item.extras.length * 0.50).toFixed(2)})` : ''}
`
                        });
                        break;
                    case 'mignon':
                        details += `- Giorno: ${data.booking_data.dayType === 'weekday' ? 'Feriale' : 'Domenica'}
`
                        data.booking_data.items?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x Vassoio ${item.product} (${item.format} pezzi)
`
                        })
                        data.booking_data.monoporzioni?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x ${item.product} (monoporzione)
`
                        })
                        break

                    case 'vaschette_gelato':
                        data.booking_data.items?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x Vaschetta ${item.size}
   - Gusti: ${item.flavors.join(', ')}
`
                        })
                        break

                    case 'torte_gelato':
                        data.booking_data.items?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x ${item.type} (${item.format})
   ${item.flavors?.length > 0 ? `- Gusti: ${item.flavors.join(', ')}` : ''}
   ${item.message ? `- Scritta: "${item.message}"` : ''}
`
                        })
                        data.booking_data.spumoni?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x Spumone
`
                        })
                        data.booking_data.tartufiMono?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x ${item.type} (monoporzione)
`
                        })
                        break

                    case 'frollini':
                        data.booking_data.items?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x Confezione ${item.type} (${item.format} pezzi)
`
                        })
                        break

                    case 'pasticciotti':
                        data.booking_data.items?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x ${item.type}
`
                        })
                        break

                    case 'paste_mandorla':
                        data.booking_data.items?.forEach((item, index) => {
                            details += `${index + 1}. ${item.quantity}x ${item.type} (${item.weight}g)
   ${item.packaging ? `- Confezione: ${item.packaging}` : ''}
   ${item.travelPackaging ? '- Confezione da viaggio: Sì' : ''}
   ${item.ribbon && item.ribbon !== 'Nessun nastro' ? `- Nastro: ${item.ribbon}` : ''}
`
                        })
                        break

                    case 'table':
                        details += JSON.stringify(data.booking_data, null, 2)
                        break


                }
            } // end if booking_data

            return details;
        };  // fine funzione

        const emailBody = formatBookingDetails(bookingData);
        const htmlBody = emailBody.replace(/\n/g, '<br>').replace(/ {2,}/g, '&nbsp;&nbsp;');

        await resend.emails.send({
            from: 'no-reply@cafferoma2000.com',
            to: 'leggierotommaso2001@gmail.com',
            subject: `Prenotazione ${bookingData.customer_name}`,
            html: `<pre style="font-family:monospace;white-space:pre-wrap">${htmlBody}</pre>`
        });

        resend.setApiKey(apiKey);
        await resend.emails.send({
            personalizations: [{
                to: [{ email: 'leggierotommaso2001@gmail.com', name: 'Caffè Roma 2000' }],
                subject: `Nuova Prenotazione - ${bookingData.customer_name} - ${bookingData.booking_type.toUpperCase()} `
            }],
            from: { email: 'cafferoma2000@gmail.com', name: 'Sistema Prenotazioni Caffè Roma 2000' },
            content: [
                { type: 'text/plain', value: emailBody },
                { type: 'text/html', value: `< pre style = "font-family: monospace; white-space: pre-wrap;" > ${htmlBody}</pre > ` }
            ]
        });

        return {
            statusCode: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, message: 'Email sent' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: error.message })
        };
    }
}
