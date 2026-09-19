/* ================================
   GLAMTOUCH - SCRIPT PROFESSIONNEL
================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. MODE SOMBRE
  ========================================== */
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkIcon = darkModeToggle.querySelector('i');

  const savedMode = localStorage.getItem('glamtouch-dark');
  if (savedMode === 'enabled') {
    document.body.classList.add('dark');
    darkIcon.classList.replace('fa-moon', 'fa-sun');
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    darkIcon.classList.toggle('fa-moon', !isDark);
    darkIcon.classList.toggle('fa-sun', isDark);
    localStorage.setItem('glamtouch-dark', isDark ? 'enabled' : 'disabled');
  });

  /* ==========================================
     2. MENU MOBILE
  ========================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  menuToggle.addEventListener('click', () => nav.classList.toggle('active'));

  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
  });

  /* ==========================================
     3. SMOOTH SCROLL
  ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================
     4. BOUTON RDV HERO
  ========================================== */
  const rdvButton = document.querySelector('.hero button');
  rdvButton?.addEventListener('click', () => {
    const target = document.getElementById('reservation');
    const headerHeight = document.querySelector('header').offsetHeight;
    window.scrollTo({
      top: target.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  });

  /* ==========================================
     5. FADE-IN DES SECTIONS
  ========================================== */
  const faders = document.querySelectorAll('section');
  const appearOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(section => appearOnScroll.observe(section));

  /* ==========================================
     6. LIGHTBOX (services + galerie)
  ========================================== */
  const lightboxImages = document.querySelectorAll('.service img, .gallery-grid img');

  lightboxImages.forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      const lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.style.display = 'flex';
      lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      lightbox.addEventListener('click', () => {
        lightbox.remove();
        document.body.style.overflow = '';
      });
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const lightbox = document.getElementById('lightbox');
      if (lightbox) {
        lightbox.remove();
        document.body.style.overflow = '';
      }
      const chatbot = document.getElementById('chatbot');
      if (chatbot) chatbot.classList.remove('open');
    }
  });

  /* ==========================================
     7. HEADER STICKY
  ========================================== */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
  });

  /* ==========================================
     8. SLIDER TÉMOIGNAGES
  ========================================== */
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
  }

  function nextTestimonial() {
    showTestimonial((currentTestimonial + 1) % testimonials.length);
  }

  function startAutoSlide() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  function resetAutoSlide() {
    clearInterval(testimonialInterval);
    startAutoSlide();
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showTestimonial(parseInt(dot.dataset.index));
      resetAutoSlide();
    });
  });

  startAutoSlide();

  /* ==========================================
     9. FORMULAIRE DE RÉSERVATION → WHATSAPP
  ========================================== */
  const bookingForm = document.getElementById('bookingForm');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const tel = document.getElementById('telephone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const heure = document.getElementById('heure').value;
    const personnes = document.getElementById('personnes').value;
    const message = document.getElementById('message').value.trim();

    const dateObj = new Date(date);
    const dateFormatee = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    let text = `Bonjour GlamTouch 👋%0A%0A`;
    text += `Je souhaite réserver un rendez-vous :%0A%0A`;
    text += `👤 *Nom* : ${nom}%0A`;
    text += `📞 *Téléphone* : ${tel}%0A`;
    text += `💇‍♀️ *Service* : ${service}%0A`;
    text += `📅 *Date* : ${dateFormatee}%0A`;
    text += `🕐 *Heure* : ${heure}%0A`;
    text += `👥 *Personnes* : ${personnes}%0A`;
    if (message) text += `💬 *Message* : ${message}%0A`;
    text += `%0AMerci de me confirmer 🙏`;

    const whatsappURL = `https://wa.me/221774546185?text=${text}`;
    window.open(whatsappURL, '_blank');

    showNotification('✅ Votre réservation a été envoyée sur WhatsApp !');
    bookingForm.reset();
  });

  /* ==========================================
     10. NOTIFICATION TOAST
  ========================================== */
  function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification-toast';
    notif.textContent = message;
    notif.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #25D366;
      color: white;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 3000;
      opacity: 0;
      transition: all 0.4s ease;
    `;
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = '1';
      notif.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => notif.remove(), 400);
    }, 3500);
  }

  /* ==========================================
     11. CHATBOT
  ========================================== */
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbot = document.getElementById('chatbot');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotBody = document.getElementById('chatbotBody');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSend = document.getElementById('chatbotSend');

  const responses = {
    services: "Nous proposons 4 services principaux :<br>💇‍♀️ <strong>Twist</strong> - dès 5 000 FCFA<br>💆‍♀️ <strong>Lissage</strong> - dès 15 000 FCFA<br>🌸 <strong>Soin capillaire</strong> - dès 8 000 FCFA<br>✨ <strong>Tresses</strong> - dès 10 000 FCFA",
    tarifs: "Voici nos tarifs indicatifs :<br>• Twist : 5 000 - 20 000 FCFA<br>• Lissage : 15 000 - 40 000 FCFA<br>• Soin : 8 000 - 15 000 FCFA<br>• Tresses : 10 000 - 30 000 FCFA<br><br>Le prix exact dépend de la longueur et de la densité de vos cheveux. 💕",
    rdv: "Pour prendre rendez-vous, vous pouvez :<br>📅 Remplir le <a href='#reservation' style='color:#d4a5a5;font-weight:600'>formulaire de réservation</a><br>📞 Nous appeler au +221 77 454 61 85<br>💬 Nous écrire sur WhatsApp<br><br>Nous vous répondons en moins d'1h !",
    horaires: "🕐 Nous sommes ouverts :<br>• Lundi - Vendredi : 9h - 20h<br>• Samedi : 9h - 21h<br>• Dimanche : sur rendez-vous",
    contact: "📞 Téléphone : <a href='tel:+221774546185' style='color:#d4a5a5;font-weight:600;'>+221 77 454 61 85</a><br>📸 Instagram : <a href='https://www.instagram.com/glamtouchnappy?stkn=MWE4Mmt2cGF1bW9haw==' target='_blank' style='color:#d4a5a5;font-weight:600;'>@glamtouchnappy</a><br>🎵 TikTok : <a href='https://www.tiktok.com/@binette2829' target='_blank' style='color:#d4a5a5;font-weight:600;'>@binette2829</a><br>📍 Adresse : GlamTouche Nappy, Dakar",
    bonjour: "Bonjour 👋 Comment puis-je vous aider aujourd'hui ?",
    salut: "Salut ! 😊 Que puis-je faire pour vous ?",
    merci: "Avec plaisir ! 💕 N'hésitez pas si vous avez d'autres questions.",
    prix: "Nos prix varient selon la prestation. Consultez l'option 'tarifs' ou contactez-nous directement ! 💰",
    adresse: "Nous sommes situés à <strong>GlamTouche Nappy, Dakar</strong> 📍. <br><br><a href='https://maps.google.com/?q=GlamTouche+Nappy+Dakar' target='_blank' style='color:#d4a5a5;font-weight:600;'>Voir sur Google Maps</a>",
    default: "Je n'ai pas bien compris 🤔. Choisissez une option ci-dessous ou contactez-nous au +221 77 454 61 85."
  };

  chatbotToggle.addEventListener('click', () => {
    chatbot.classList.toggle('open');
  });

  chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('open');
  });

  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'user-message';
    msg.textContent = text;
    chatbotBody.appendChild(msg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function addBotMessage(html) {
    const msg = document.createElement('div');
    msg.className = 'bot-message';
    msg.innerHTML = html;
    chatbotBody.appendChild(msg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function getBotResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes('service')) return responses.services;
    if (lower.includes('tarif') || lower.includes('prix') || lower.includes('coût')) return responses.tarifs;
    if (lower.includes('rdv') || lower.includes('rendez') || lower.includes('réserver')) return responses.rdv;
    if (lower.includes('horaire') || lower.includes('ouvert')) return responses.horaires;
    if (lower.includes('contact') || lower.includes('téléphone') || lower.includes('appel')) return responses.contact;
    if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello')) return responses.bonjour;
    if (lower.includes('merci')) return responses.merci;
    if (lower.includes('adresse') || lower.includes('où')) return responses.adresse;
    return responses.default;
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    addUserMessage(text);

    setTimeout(() => {
      addBotMessage(getBotResponse(text));
    }, 600);
  }

  chatbotSend.addEventListener('click', () => {
    sendMessage(chatbotInput.value);
    chatbotInput.value = '';
  });

  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(chatbotInput.value);
      chatbotInput.value = '';
    }
  });

  chatbotBody.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.reply) {
      const reply = e.target.dataset.reply;
      const labels = {
        services: 'Voir les services',
        tarifs: 'Connaître les tarifs',
        rdv: 'Prendre rendez-vous',
        horaires: "Horaires d'ouverture",
        contact: 'Nous contacter'
      };
      addUserMessage(labels[reply]);
      setTimeout(() => addBotMessage(responses[reply]), 600);
    }
  });

  /* ==========================================
     12. DATE MIN = AUJOURD'HUI
  ========================================== */
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

});
