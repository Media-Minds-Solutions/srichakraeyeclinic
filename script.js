// Initialize AOS animation
AOS.init({
  duration: 700,
  easing: 'ease-in-out',
  once: true,
});

// Initialize Swiper slider for services
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    },
  },
});

// Language toggle buttons
const langButtons = document.querySelectorAll('.lang-btn');
const langEnElems = document.querySelectorAll('.lang-en');
const langTeElems = document.querySelectorAll('.lang-te');

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) return;

    langButtons.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const lang = btn.getAttribute('data-lang');
    if (lang === 'en') {
      langEnElems.forEach((el) => el.classList.add('visible'));
      langTeElems.forEach((el) => el.classList.remove('visible'));
    } else {
      langEnElems.forEach((el) => el.classList.remove('visible'));
      langTeElems.forEach((el) => el.classList.add('visible'));
    }
  });
});

// Service descriptions data
const serviceDescriptions = {
  'comprehensive-exam': {
    en: 'Comprehensive eye examinations with advanced diagnostic technology, including visual acuity, refraction, eye pressure, and retina evaluation.',
    te: 'అధునాతన వైద్య సాంకేతికతతో సమగ్ర కంటి పరీక్షలు, వీక్షణ సామర్థ్యం, పునఃశక్తి, కంటి పీడనం మరియు రెటినా మూల్యాంకనం సహా.',
  },
  'cataract-surgery': {
    en: 'Diagnosis and surgical treatment of cataracts using modern techniques for faster recovery and better vision.',
    te: 'ఆధునిక శస్త్రచికిత్స పద్ధతులతో కంటి మొప్పలను నిర్ధారణ చేసి శస్త్రచికిత్స చేయడం, వేగవంతమైన ఆరోగ్యం మరియు మెరుగైన దృష్టి కోసం.',
  },
  'retina-consultation': {
    en: 'Specialized consultation for retina problems and diabetic eye care to prevent vision loss.',
    te: 'రెటినా సమస్యలకు మరియు మధుమేహ కంటి సంరక్షణకు ప్రత్యేక సలహాలు, దృష్టి కోల్పోకుండా నివారించడానికి.',
  },
  'lasik-surgery': {
    en: 'Laser-assisted in situ keratomileusis (LASIK) surgery for vision correction with minimal downtime.',
    te: 'కనివ్వడం మరియు తగ్గించిన ఆర్థిక వ్యయం తో లేజర్-ఆధారిత LASIK శస్త్రచికిత్స.',
  },
  'pediatric-ophthalmology': {
    en: 'Eye care specialized for children including vision screening and treatment of pediatric eye disorders.',
    te: 'పిల్లల కోసం ప్రత్యేక కంటి సంరక్షణ, వీక్షణ పరీక్షలు మరియు పిల్లల కంటి వ్యాధుల చికిత్స.',
  },
};

// Service detail overlay elements
const overlay = document.getElementById('service-detail-overlay');
const overlayTitle = document.getElementById('service-detail-title');
const overlayDesc = document.getElementById('service-detail-desc');
const closeBtn = overlay.querySelector('.close-btn');

function openServiceDetail(serviceId) {
  const lang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
  const serviceCards = document.querySelectorAll('.card');
  const serviceCard = [...serviceCards].find(card => card.getAttribute('data-service') === serviceId);
  const title = serviceCard.querySelector(`.lang-${lang}`).textContent;
  const description = serviceDescriptions[serviceId][lang];

  overlayTitle.textContent = title;
  overlayDesc.textContent = description;

  overlay.classList.add('visible');
  overlay.focus();

  // Trap focus inside overlay for accessibility
  trapFocus(overlay);
}

function closeServiceDetail() {
  overlay.classList.remove('visible');
  // Return focus to previously focused card
  if (lastFocusedCard) {
    lastFocusedCard.focus();
  }
}

let lastFocusedCard = null;

document.getElementById('services-grid').addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  lastFocusedCard = card;
  const serviceId = card.getAttribute('data-service');
  openServiceDetail(serviceId);
});

document.getElementById('services-grid').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.card');
    if (!card) return;

    e.preventDefault();
    lastFocusedCard = card;
    const serviceId = card.getAttribute('data-service');
    openServiceDetail(serviceId);
  }
});

closeBtn.addEventListener('click', closeServiceDetail);

overlay.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeServiceDetail();
  }
});

// Accessibility helper: trap focus inside overlay
function trapFocus(element) {
  const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function trap(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else { // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formResponse.textContent = '';
  
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formResponse.textContent = 'Please fill out all fields.';
    return;
  }

  if (!validateEmail(email)) {
    formResponse.textContent = 'Please enter a valid email address.';
    return;
  }

  // Simulate form submission (replace with actual backend endpoint)
  formResponse.textContent = 'Sending...';
  setTimeout(() => {
    contactForm.reset();
    formResponse.textContent = 'Thank you for contacting us! We will get back to you shortly.';
  }, 1500);
});

function validateEmail(email) {
  // Simple email validation regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
