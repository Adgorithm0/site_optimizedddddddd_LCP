document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if(!form) return;

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(statusEl) statusEl.textContent = 'Enviando...';

    const fd = new FormData(form);
    const servicios = Array.from(form.querySelectorAll('input[name="servicio[]"]:checked')).map(c=>c.value);

    const payload = {
      nombre: fd.get('nombre'),
      email: fd.get('email'),
      negocio: fd.get('negocio'),
      servicio: servicios,
      mensaje: fd.get('mensaje')
    };

    try{
      const resp = await fetch('/.netlify/functions/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if(!resp.ok) throw new Error(await resp.text());

      if(statusEl) statusEl.textContent = '¡Gracias! Te contactaremos pronto.';
      form.reset();
    }catch(err){
      console.error(err);
      if(statusEl) statusEl.textContent = 'Hubo un problema al enviar. Inténtalo de nuevo.';
    }
  });
});