const contactLinks = {
  fiverr: 'https://www.fiverr.com/harshilmasani/buying?source=avatar_menu_profile',
  contra: 'https://contra.com/harshil_masani_usvikkoh/work?r=harshil_masani_usvikkoh',
  email: 'mailto:masaniharshil1@gmail.com',
  whatsapp: 'https://wa.me/6351505305',
  instagram: 'https://www.instagram.com/harshilmasani/'
};

const projectData = {
  nova: {
    title: 'Nova Coffee', category: 'Café / Business', label: 'Self-Initiated Portfolio Project', overview: 'A modern café experience focused on clean presentation, product discovery, responsive layouts, and a smooth ordering interface.', approach: 'A crisp editorial layout with a warm, approachable visual language and clear paths to explore the menu.', features: 'Responsive layout · Product showcase · Menu experience · Interactive UI · Mobile optimization', art: 'nova-art'
  },
  bean: {
    title: 'Bean & Bloom', category: 'Café / Brand', label: 'Self-Initiated Portfolio Project', overview: 'A premium café concept designed around a warm visual identity, elegant product presentation, and a welcoming customer experience.', approach: 'A tactile palette and expressive type create a digital space that feels as considered as the in-person experience.', features: 'Responsive design · Product showcase · Modern navigation · Interactive sections · Mobile-friendly interface', art: 'bean-art'
  },
  subko: {
    title: 'Subko Concept', category: 'Coffee / Concept', label: 'Portfolio Concept - not an official Subko project or client project', overview: 'An original specialty-coffee-inspired concept exploring editorial layouts, premium typography, product presentation, and modern visual storytelling.', approach: 'A restrained, magazine-like composition uses scale, rhythm, and contrast to give the product room to lead.', features: 'Editorial layout · Premium typography · Product presentation · Visual storytelling · Responsive composition', art: 'subko-art'
  }
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

$$('[data-contact]').forEach((link) => {
  const key = link.dataset.contact;
  link.href = contactLinks[key] || '#';
  if (contactLinks[key] && contactLinks[key] !== '#') link.target = '_blank';
  link.addEventListener('click', (event) => {
    if (!contactLinks[key] || contactLinks[key] === '#') {
      event.preventDefault();
      alert(`Replace the ${key} link in script.js before sharing your portfolio.`);
    }
  });
});

const header = $('.site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

const menuToggle = $('.menu-toggle');
const navLinks = $('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('b').textContent = open ? 'Close menu' : 'Open menu';
});
$$('.nav-links a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((element) => revealObserver.observe(element));

const modal = $('#project-modal');
const modalVisual = $('#modal-visual');
$$('.project-card').forEach((card) => card.addEventListener('click', () => {
  const project = projectData[card.dataset.project];
  $('#modal-category').textContent = project.category;
  $('#modal-title').textContent = project.title;
  $('#modal-label').textContent = project.label;
  $('#modal-overview').textContent = project.overview;
  $('#modal-approach').textContent = project.approach;
  $('#modal-features').textContent = project.features;
  modalVisual.className = 'modal-visual';
  modalVisual.innerHTML = `<div class="${project.art}">${card.querySelector('.project-visual').firstElementChild.innerHTML}</div>`;
  modal.showModal();
}));
$('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
$('#modal-cta').addEventListener('click', () => modal.close());

$('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const formData = new FormData(form);
  const subject = `Portfolio enquiry from ${formData.get('name')}`;
  const body = [
    `Name: ${formData.get('name')}`,
    `Email: ${formData.get('email')}`,
    `Project type: ${formData.get('type')}`,
    '',
    'Message:',
    formData.get('message')
  ].join('\n');
  const recipient = contactLinks.email.replace(/^mailto:/, '');
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $('.form-success', form).hidden = false;
  $('.form-note', form).hidden = true;
});

const cursorGlow = $('.cursor-glow');
if (cursorGlow && window.matchMedia('(pointer:fine)').matches) {
  cursorGlow.style.cssText = 'position:fixed;z-index:-1;width:300px;height:300px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(216,255,88,.045),transparent 70%);transform:translate(-50%,-50%);';
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
}
