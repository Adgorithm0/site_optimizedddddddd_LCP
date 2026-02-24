function toggleMobileNav(){
  const existing = document.querySelector('.mobile');
  if(existing){ existing.remove(); return; }
  const sheet = document.createElement('div');
  sheet.className='mobile';
  sheet.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,.35)"></div>
    <nav style="position:fixed;right:12px;left:12px;top:76px;background:#fff;border:1px solid #e6ecff;border-radius:16px;padding:6px 8px;box-shadow:0 16px 40px rgba(0,0,0,.15);">
      <a href="#inicio" onclick="toggleMobileNav()" style="display:block;padding:14px 12px;border-radius:10px">Inicio</a>
      <a href="#servicios" onclick="toggleMobileNav()" style="display:block;padding:14px 12px;border-radius:10px">Servicios</a>
      <a href="#contacto" onclick="toggleMobileNav()" style="display:block;padding:14px 12px;border-radius:10px">Contacto</a>
    </nav>`;
  document.body.appendChild(sheet);
}

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.opacity=1; e.target.style.transform='translateY(0)'; } });
},{threshold:.12});

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    // Serializar selección múltiple del select "servicio"
    const servicios = Array.from(form.querySelectorAll('input[name="servicio[]"]:checked')).map(c=>c.value);
    data.servicio = servicios;
    console.log('Contacto', data);
    statusEl.textContent = 'Gracias. Hemos recibido tu mensaje.';
    form.reset();
  });
  document.getElementById('y').textContent = new Date().getFullYear();
});

window.addEventListener('scroll', ()=>{
  const h = document.querySelector('.header');
  if(!h) return;
  if(window.scrollY > 8){ h.classList.add('scrolled'); } else { h.classList.remove('scrolled'); }
});


// ===== v15 Smooth scroll-reveal for almost everything =====
(function(){
  const targets = [
    'h1','h2','h3','p','img','.btn','.card','.hero-card','.cta-strip',
    '.steps .step','.metrics .metric','section .wrap','.foot-inline','.brand','.foot-nav','.copy',
    '#casos .btn.primary'
  ];
  const elements = Array.from(document.querySelectorAll(targets.join(',')));
  elements.forEach((el, i)=>{
    el.classList.add('reveal');
    if(i % 5 === 1) el.classList.add('reveal-delay-1');
    if(i % 5 === 2) el.classList.add('reveal-delay-2');
    if(i % 5 === 3) el.classList.add('reveal-delay-3');
    if(i % 5 === 4) el.classList.add('reveal-delay-4');
  });

  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // reveal once
      }
    });
  }, { threshold: .15 });

  elements.forEach(el=> io.observe(el));
})();
