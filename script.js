/* ================================
   GLAMTOUCH - SCRIPT PROFESSIONNEL
================================= */

/* --- Smooth Scroll pour la navigation --- */
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/* --- Bouton "Prendre rendez-vous" scroll vers contact --- */
const rdvButton = document.querySelector('.hero button');
rdvButton.addEventListener('click', () => {
  const contactSection = document.getElementById('contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
});

/* --- Fade-in des sections au scroll --- */
const faders = document.querySelectorAll('section');

const appearOptions = { threshold: 0.3 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(section => {
  appearOnScroll.observe(section);
});

/* --- Lightbox pour les images Services --- */
const serviceImages = document.querySelectorAll('.service img');

serviceImages.forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    // Vérifier si un attribut data-large existe pour l'image haute résolution
    const src = img.dataset.large || img.src;
    lightbox.innerHTML = `<img src="${src}" alt="${img.alt}">`;
    document.body.appendChild(lightbox);

    // Fermer au clic
    lightbox.addEventListener('click', () => lightbox.remove());
  });
});

/* --- Animation des boutons et hover effect --- */
const buttons = document.querySelectorAll('button, .social-links a');

buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
});

/* --- Effet de nav sticky et changement couleur au scroll --- */
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if(window.scrollY > 50){
    header.style.backgroundColor = 'rgba(248,215,218,0.95)'; // rose clair transparent
    header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
  } else {
    header.style.backgroundColor = 'var(--rose-poudre)';
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
});

/* --- Optionnel : Smooth parallax pour la Hero --- */
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const offset = window.scrollY;
  hero.style.backgroundPositionY = offset * 0.5 + 'px';
});
