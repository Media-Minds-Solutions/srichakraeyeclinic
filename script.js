// Services data with translations and details
const servicesData = [
  {
    icon: 'fas fa-eye',
    title: { en: 'Comprehensive Eye Examination', te: 'సమగ్ర కంటి పరీక్ష' },
    details: {
      en: 'Full eye check-up including vision and eye health evaluation.',
      te: 'పూర్తి కంటి పరీక్ష, దృష్టి మరియు కంటి ఆరోగ్య పరీక్షతో.'
    }
  },
  {
    icon: 'fas fa-procedures',
    title: { en: 'Cataract Diagnosis & Surgery', te: 'కంటి మొప్ప పరీక్ష & శస్త్రచికిత్స' },
    details: {
      en: 'Accurate cataract diagnosis and advanced surgical treatments.',
      te: 'నిర్దిష్ట కంటి మొప్ప పరీక్ష మరియు ఆధునిక శస్త్రచికిత్సలు.'
    }
  },
  {
    icon: 'fas fa-search',
    title: { en: 'Glaucoma Screening', te: 'గ్లాకోమా స్క్రీనింగ్' },
    details: {
      en: 'Early detection and management of glaucoma to prevent vision loss.',
      te: 'దృష్టి కోల్పోకుండా గ్లాకోమా ప్రారంభ గుర్తింపు మరియు నిర్వహణ.'
    }
  },
  {
    icon: 'fas fa-radiation',
    title: { en: 'Retinal Diagnostics', te: 'రెటినల్ పరీక్షలు' },
    details: {
      en: 'State-of-the-art retinal imaging and diagnostics for various conditions.',
      te: 'వివిధ పరిస్థితులకు ఆధునిక రేటినల్ ఇమేజింగ్ మరియు పరీక్షలు.'
    }
  },
  {
    icon: 'fas fa-vial',
    title: { en: 'Diabetic Retinopathy Treatment', te: 'డయాబెటిక్ రెటినోపతి చికిత్స' },
    details: {
      en: 'Specialized care and treatment for diabetic retinopathy.',
      te: 'డయాబెటిక్ రెటినోపతి కోసం ప్రత్యేక చికిత్స మరియు సంరక్షణ.'
    }
  },
  {
    icon: 'fas fa-child',
    title: { en: 'Paediatric Eye Care', te: 'పిల్లల కంటి సంరక్షణ' },
    details: {
      en: 'Eye care services specifically designed for children.',
      te: 'పిల్లల కోసం ప్రత్యేకంగా రూపొందించిన కంటి సంరక్షణ సేవలు.'
    }
  },
  {
    icon: 'fas fa-glasses',
    title: { en: 'Contact Lens Clinic', te: 'కాంటాక్ట్ లెన్స్ క్లినిక్' },
    details: {
      en: 'Fitting and guidance for contact lens wearers.',
      te: 'కాంటాక్ట్ లెన్స్ ధరించేవారికి సరైన ఫిట్టింగ్ మరియు సూచనలు.'
    }
  },
  {
    icon: 'fas fa-allergies',
    title: { en: 'Dry Eye & Allergy Management', te: 'డ్రై ఐ & అలర్జీ నిర్వహణ' },
    details: {
      en: 'Treatment for dry eyes and allergy-related eye problems.',
      te: 'డ్రై ఐలు మరియు అలర్జీ సమస్యలకు చికిత్స.'
    }
  }
];

// Function to create service cards dynamically
function renderServices() {
  const container = document.getElementById('services-container');
  container.innerHTML = ''; // Clear existing
  servicesData.forEach((service, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('tabindex', 0);
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');
    card.dataset.index = idx;

    card.innerHTML = `
      <i class="${service.icon}" aria-hidden="true"></i>
      <h3 class="card-title">
        <span class="en">${service.title.en}</span>
        <span class="te">${service.title.te}</span>
      </h3>
      <div class="card-content">
        <p><span class="en">${service.details.en}</span><span class="te">${service.details.te}</span></p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Toggle language display
function switchLang(lang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === 'lang-' + lang);
    btn.setAttribute('aria-pressed', btn.id === 'lang-' + lang);
  });

  if (lang === 'en') {
    document.querySelectorAll('.en').forEach(el => (el.style.display = 'inline'));
    document.querySelectorAll('.te').forEach(el => (el.style.display = 'none'));
  } else {
    document.querySelectorAll('.en').forEach(el => (el.style.display = 'none'));
    document.querySelectorAll('.te').forEach(el => (el.style.display = 'inline'));
  }
}

// Card click to toggle expanded info
function toggleCard(card) {
  const expanded = card.classList.contains('expanded');
  const allCards = document.querySelectorAll('.card');

  if (!expanded) {
    // Close all other cards
    allCards.forEach(c => {
      c.classList.remove('expanded');
      c.setAttribute('aria-expanded', 'false');
      c.querySelector('.card-content').style.opacity = 0;
      c.style.opacity = '0.6';
    });
    // Open clicked card
    card.classList.add('expanded');
    card.setAttribute('aria-expanded', 'true');
    card.querySelector('.card-content').style.opacity = 1;
    card.style.opacity = '1';
  } else {
    // Close this card
    card.classList.remove('expanded');
    card.setAttribute('aria-expanded', 'false');
    card.querySelector('.card-content').style.opacity = 0;
    // Reset all cards opacity
    allCards.forEach(c => (c.style.opacity = '1'));
  }
}

// Keyboard accessibility for cards
function addCardListeners() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => toggleCard(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });

  renderServices();
  switchLang('en'); // default

  // Add click/keyboard listeners after rendering
  addCardListeners();
});
