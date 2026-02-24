import { Resend } from 'resend';

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { nombre, email, negocio, servicio = [], mensaje } = data;

    const services = Array.isArray(servicio) ? servicio : [servicio].filter(Boolean);
    const list = services.length ? `<ul>${services.map(s=>`<li>${s}</li>`).join('')}</ul>` : '<em>Sin servicios seleccionados</em>';

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#111">
        <h2>Nuevo mensaje desde el sitio</h2>
        <p><strong>Nombre:</strong> ${nombre || '—'}</p>
        <p><strong>Email:</strong> ${email || '—'}</p>
        <p><strong>Tipo de negocio:</strong> ${negocio || '—'}</p>
        <p><strong>Servicios seleccionados:</strong> ${list}</p>
        <p><strong>Mensaje:</strong></p>
        <blockquote>${(mensaje || '').replace(/\n/g,'<br>') || '—'}</blockquote>
        <hr>
        <p style="font-size:12px;color:#666">Enviado automáticamente desde el formulario "Conversemos".</p>
      </div>`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      // Cambia el dominio por uno verificado en Resend
      from: 'ADGORITHM <no-reply@adgorithm.site>',
      to: 'adgorithm.services@gmail.com',
      subject: `Contacto Web — ${nombre || 'Cliente'}`,
      reply_to: email || undefined,
      html
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: err.message }) };
  }
}