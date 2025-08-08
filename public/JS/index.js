// Form submission handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Data
    const dataToSend = { 
      "1_Timestamp": null, // Timestamp bude generovat Cloud Function, takže zde posíláme 'null'
      "2_Name": {
        FirstName: form.firstName.value,
        LastName: form.lastName.value
      },
      "3_Email": form.email.value,
      "4_Phone": form.phone.value,
      "5_Msg": form.message.value,
      "6_userAgent": navigator.userAgent,
      "7_reffered": document.referrer || "Direct"
    };

    const button = document.querySelector(".send-button");

    try {
      const cloudFunctionUrl = "https://europe-west1-website-nextdrive.cloudfunctions.net/submitContact"; // Zkontroluj URL!

      const response = await fetch(cloudFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form via Cloud Function. Contact through socials");
      }

      const result = await response.json();
      console.log("Formulář úspěšně odeslán přes Cloud Function:", result);

      form.reset();
      setTimeout(() => {
        if (button) { 
          button.classList.remove("clicked-once");
        }
      }, 8000);

    } catch (err) {
      console.error("Chyba při odesílání formuláře:", err);
      alert("An error occurred while submitting the form. Please try again later, refresh the page, or contact me via social media.");
    }
  });
});


// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});


// index.js - full i18n + language switcher integration for your current HTML

// --- TRANSLATIONS ---
// Add more keys if you want to translate additional pieces.
const translations = {
  en: {
    pageTitle: "NextDrive — Smart Driving School Scheduling App",
    // Nav
    navServices: "Services",
    navAbout: "About me",
    navContact: "Contact",
    // Hero
    heroTitle: "Drive Smarter",
    heroSubtitle: "Plan better.    Grow faster.    Stay in control.",
    ctaButton: "Contact me",
    ctaSubtitle: "For Driving Schools",
    // Services
    servicesTitle: "Our Services",
    service1Title: "Lessons Scheduling",
    service1Content:
      "Complicated groupchats or writing in chat? Constant calls to people and a million contacts in your phone? Planning rides for the next week in notes or a notebook? God forbid someone cancels a ride. Our platform solves all these problems conveniently in one application.",
    service2Title: "Everything in One Place",
    service2Content:
      "Students and instructors often face misunderstandings, canceled rides, or missed lessons. Our app introduces a shared smart calendar with real-time updates, so every lesson is confirmed, clear, stress-free, and hassle-free.",
    service3Title: "Growth with Clarity",
    service3Content:
      "Driving school owners struggle to track student progress or instructor performance. Our analytics dashboard provides access to performance metrics that generate higher revenue.",
    // Story
    storyTitle: "The Story Behind ND",
    storySubtitle: "( NextDrive )",
    storyP1:
      "I am a young, ambitious founder who built this business from scratch. I saw how chaotic and outdated planning and communication in driving schools could be, and I decided to modernize the entire industry.",
    storyP2:
      "Without any background or wealthy family, I started a few years ago in my room after realizing that I didn't want to just consume content, but to create something valuable. To show people that modern technology should help us, I decided to solve a real problem: to make life easier for students, instructors, and owners. Everything you see was designed, programmed, planned, and brought to life by me.",
    storyP3:
      "Although it may not seem like it, it was incredibly difficult and complicated to do all of this; after all, you only see 10% of it. In the end, I had to learn everything from scratch, but it was worth it because now I can see what I've achieved so far, and I think I can be proud of myself. But that doesn't mean I'm done; on the contrary, this is just the beginning. The beginning of a revolution in driving schools around the world.",
    moreButton: "More About me soon...",
    // Contact
    contactTitle: "Contact Me",
    contactP1: "Not sure if it's for you?",
    contactP2: "That's exactly why you should send me a message.",
    contactP3: "Whether you're curious, have a question, or just want to see.",
    contactP4: "I personally read and reply to every message.",
    instagramMain: "You can also write me a dm on Instagram !!!",
    instagramNested: "(Just click on the Ig icon)",
    placeholderFirstName: "First Name",
    placeholderLastName: "Last Name",
    placeholderEmail: "Email",
    placeholderPhone: "Phone number (optional)",
    placeholderMessage: "Message",
    sendButton: "SEND",
    replyNote: "I usually reply within 1 day",
    // Footer
    footerLocationLabel: "Location",
    footerLocationValue: "Zlín, Czech Republic",
    footerContactLabel: "Contact Info",
    footerCopyright: "© 2025 NextDrive. All rights reserved."
  },

  cz: {
    pageTitle: "NextDrive — Chytrá aplikace pro autoškoly",
    // Nav
    navServices: "Služby",
    navAbout: "O mně",
    navContact: "Kontakt",
    // Hero
    heroTitle: "Chytrá Autoškola",
    heroSubtitle: "Plánuj jednoduše.  Pohodlně otevři appku.  Měj vše pod kontrolou.",
    ctaButton: "Kontaktuj mě",
    ctaSubtitle: "Pro autoškoly",
    // Services
    servicesTitle: "Naše Služby",
    service1Title: "Plánování lekcí",
    service1Content:
      "Složité tvoření skupin nebo psaní do chatu? Neustálé volaní lidem a milion kontaktů v mobilu? Plánování jízd na další týden v poznámkách nebo sešitu? Nedej bože, aby někdo zrušil jízdu. Naše platforma řeší všechny tyto problémy pohodlně v jedné aplikaci.",
    service2Title: "Vše na jednom místě",
    service2Content:
      "Studenti a instruktoři se často potýkají s nedorozuměními, zrušenými jízdami nebo zmeškanými lekcemi. Naše aplikace zavádí sdílený inteligentní kalendář s aktualizacemi v reálném čase, takže každá lekce je potvrzená, jasná, bez stresu a pohoda.",
    service3Title: "Růst s přehledem",
    service3Content:
      "Majitelé autoškol se potýkají s obtížemi při sledování pokroku studentů nebo výkonu instruktorů. Náš analytický panel poskytuje přístup k metrikám výkonu, které generují vyšší příjmy.",
    // Story
    storyTitle: "Příběh NextDrive",
    storySubtitle: "( NextDrive )",
    storyP1:
      "Jsem mladý ambiciózní zakladatel, který vytvořil tento byznys od nuly, viděl jsem, jak chaotické a zastaralé může být plánování a komunikace v autoškolách a rozhodl jsem se pro modernizaci celého odvětví.",
    storyP2:
      "Bez žádného zázemí či bohaté rodiny, jsem začal před několika lety u sebe v pokoji potom co jsem si uvědomil, že nechci jenom konzumovat obsah, ale vytvořit něco hodnotného. Ukazat lidem, že moderní technologie nám mají pomáhat a proto jsem se rozhodl vyřešit skutečný problém: usnadnit život studentům, instruktorům a majitelům. Vše, co vidíte, bylo navrženo, naprogramováno, naplánováno a uvedeno do života mnou.",
    storyP3:
      "I když to tak možná nevypadá, bylo neuvěřitelně obtížné a komplikované to všechno udělat, konec konců vidíte pouze 10 %. Nakonec jsem se musel všechno naučit od nuly, ale stálo to za to, protože teď vidím, co jsem dosud dokázal, a myslím, že na sebe mohu být pyšný. To ale neznamená, že jsem hotový, naopak, tohle je teprve začátek. Začátek revoluce autoškol po celém světě.",
    moreButton: "Více o mně brzy...",
    // Contact
    contactTitle: "Kontaktuj mě",
    contactP1: "Nejste si jistí, jestli je to pro vás?",
    contactP2: "Právě proto mi napište zprávu.",
    contactP3: "Ať už jste zvědaví, máte dotaz nebo chcete více informací.",
    contactP4: "Osobně čtu a odpovídám na každou zprávu.",
    instagramMain: "Můžete mi také napsat DM na Instagramu !!!",
    instagramNested: "(Stačí kliknout na ikonu IG)",
    placeholderFirstName: "Jméno",
    placeholderLastName: "Příjmení",
    placeholderEmail: "E-mail",
    placeholderPhone: "Telefon (volitelný)",
    placeholderMessage: "Zpráva",
    sendButton: "ODESLAT",
    replyNote: "Obvykle odpovídám do 1 dne",
    // Footer
    footerLocationLabel: "Lokalita",
    footerLocationValue: "Zlín, Česká republika",
    footerContactLabel: "Kontaktní informace",
    footerCopyright: "© 2025 NextDrive. Všechna práva vyhrazena."
  }
};

// --- HELPERS ---
function qs(selector) {
  return document.querySelector(selector);
}
function qsa(selector) {
  return Array.from(document.querySelectorAll(selector));
}
function safeSetText(el, text) {
  if (!el) return;
  // preserve white-space pre for hero subtitle (we set textContent)
  el.textContent = text;
}
function safeSetHTML(el, html) {
  if (!el) return;
  el.innerHTML = html;
}
function safeSetPlaceholder(el, text) {
  if (!el) return;
  el.placeholder = text;
}

// --- MAPPING & APPLYING TRANSFORMATIONS ---
function applyTranslations(lang) {
  const t = translations[lang] || translations.en;

  // Document title
  if (t.pageTitle) document.title = t.pageTitle;
  document.documentElement.lang = lang === 'cz' ? 'cz' : 'en';

  // Nav
  safeSetText(qs('nav .nav-links a[href="#services"]'), t.navServices);
  safeSetText(qs('nav .nav-links a[href="#about"]'), t.navAbout);
  safeSetText(qs('nav .nav-links a[href="#contact"]'), t.navContact);

  // Hero
  safeSetText(qs('.hero h1'), t.heroTitle);
  safeSetText(qs('.hero-subtitle'), t.heroSubtitle);
  safeSetText(qs('.cta-button'), t.ctaButton);
  safeSetText(qs('.cta-subtitle'), t.ctaSubtitle);

  // Services section title
  safeSetText(qs('#services > h2'), t.servicesTitle);

  // Service items (ordered)
  const serviceEls = qsa('.faq-container .service-item');
  if (serviceEls[0]) {
    safeSetText(serviceEls[0].querySelector('.service-title'), t.service1Title);
    safeSetText(serviceEls[0].querySelector('.service-content'), t.service1Content);
  }
  if (serviceEls[1]) {
    safeSetText(serviceEls[1].querySelector('.service-title'), t.service2Title);
    safeSetText(serviceEls[1].querySelector('.service-content'), t.service2Content);
  }
  if (serviceEls[2]) {
    safeSetText(serviceEls[2].querySelector('.service-title'), t.service3Title);
    safeSetText(serviceEls[2].querySelector('.service-content'), t.service3Content);
  }

  // Story section
  safeSetText(qs('#story-title'), t.storyTitle);
  const storyPs = qsa('.story-content > p'); // includes subtitle then content paragraphs
  if (storyPs.length > 0) safeSetText(storyPs[0], t.storySubtitle);
  if (storyPs.length > 1) safeSetText(storyPs[1], t.storyP1);
  if (storyPs.length > 2) safeSetText(storyPs[2], t.storyP2);
  if (storyPs.length > 3) safeSetText(storyPs[3], t.storyP3);
  safeSetText(qs('.more-button span'), t.moreButton);

  // Contact section
  safeSetText(qs('#contact-title'), t.contactTitle);
  const contactPs = qsa('.contact-info > p:not(.instagram-mention)');
  // contactPs should match the first 4 normal <p>'s
  if (contactPs[0]) safeSetText(contactPs[0], t.contactP1);
  if (contactPs[1]) safeSetText(contactPs[1], t.contactP2);
  if (contactPs[2]) safeSetText(contactPs[2], t.contactP3);
  if (contactPs[3]) safeSetText(contactPs[3], t.contactP4);

  // Instagram mention: main text + nested small p - we'll set innerHTML
  const ig = qs('.instagram-mention');
  if (ig) {
    // we will keep a nested <p> for the small note, to match your layout
    ig.innerHTML = `${t.instagramMain} <p>${t.instagramNested}</p>`;
  }

  // Form placeholders & send button
  safeSetPlaceholder(qs('input[name="firstName"]'), t.placeholderFirstName);
  safeSetPlaceholder(qs('input[name="lastName"]'), t.placeholderLastName);
  safeSetPlaceholder(qs('input[name="email"]'), t.placeholderEmail);
  safeSetPlaceholder(qs('input[name="phone"]'), t.placeholderPhone);
  safeSetPlaceholder(qs('textarea[name="message"]'), t.placeholderMessage);

  const sendBtn = qs('.send-button');
  if (sendBtn) safeSetText(sendBtn, t.sendButton);

  // reply note
  safeSetText(qs('.reply-note'), t.replyNote);

  // Footer texts: set by selector where possible
  // Footer location label(s)
  const footerLocs = qsa('.footer .loc');
  if (footerLocs[0]) safeSetText(footerLocs[0], t.footerLocationLabel); // label
  // footer location value element (next sibling in your markup)
  const footerLocationValueEl = qs('.footer .footer-info div:nth-child(2)');
  if (footerLocationValueEl) safeSetText(footerLocationValueEl, t.footerLocationValue);

  // contact label(s)
  const footerContactLabel = qs('.footer .footer-contact .loc');
  if (footerContactLabel) safeSetText(footerContactLabel, t.footerContactLabel);

  // Mobile footer
  const mobileLabels = qsa('.mobile-footer .label');
  if (mobileLabels[0]) safeSetText(mobileLabels[0], t.footerLocationLabel);
  if (mobileLabels[1]) safeSetText(mobileLabels[1], t.footerContactLabel);

  // copyright
  const footerCopyright = qs('.footer .footer-content > div[style]') || qs('.footer .footer-content div:nth-child(3)');
  if (footerCopyright) safeSetText(footerCopyright, t.footerCopyright);

  // If you have other text nodes you want translated, we can add them here with selectors
}

// --- UI: language switcher integration ---
function updateLanguageSelectorUI(lang) {
  const selectorRoot = qs('.language-selector');
  if (!selectorRoot) return;
  const imgEl = selectorRoot.querySelector('.language-selected img.language-flag');
  const codeEl = selectorRoot.querySelector('.language-selected .language-code');

  // Use local asset if present, otherwise try flagcdn fallback
  const assets = {
    en: './assets/en-flag.png',
    cz: './assets/cz-flag.png'
  };

  const src = assets[lang] || assets.en;
  if (imgEl) imgEl.src = src;
  if (codeEl) codeEl.textContent = lang.toUpperCase();
}

// --- Set language and persist ---
function setLanguage(lang, save = true) {
  if (!translations[lang]) lang = 'en';
  applyTranslations(lang);
  updateLanguageSelectorUI(lang);
  if (save) localStorage.setItem('preferredLanguage', lang);
  currentLang = lang;
}

// --- Detect default language ---
const savedLang = localStorage.getItem('preferredLanguage');
const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
const initialLang = savedLang || (browserLang.startsWith('cz') ? 'cz' : 'en');
let currentLang = initialLang;

// --- Hooks & events ---
document.addEventListener('DOMContentLoaded', () => {
  // Apply immediately
  setLanguage(currentLang, false);

  // Language selector interactions
  const selector = qs('.language-selector');
  if (selector) {
    // Toggle dropdown via the visible element
    const selectedDiv = selector.querySelector('.language-selected');
    const options = Array.from(selector.querySelectorAll('.language-option'));

    // Show/hide dropdown by toggling 'active' class (CSS controls display)
    if (selectedDiv) {
      selectedDiv.addEventListener('click', (e) => {
        selector.classList.toggle('active');
      });

      // keyboard: Enter toggles
      selectedDiv.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          selector.classList.toggle('active');
        }
      });
    }

    // Each li option -> set language
    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        const lang = opt.dataset.lang;
        setLanguage(lang);
        selector.classList.remove('active');
      });
      opt.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          opt.click();
        }
      });
    });

    // click outside to close
    document.addEventListener('click', (e) => {
      if (!selector.contains(e.target)) selector.classList.remove('active');
    });
  }

  // Ensure language selected UI matches current language on load
  updateLanguageSelectorUI(currentLang);
});




// Add service accordion functionality

document.querySelectorAll(".service-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const isActive = item.classList.contains("active");

    // Close all
    document
      .querySelectorAll(".service-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("border-b-custom");

    // Open if not already active
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

const dot = document.getElementById("dot-cursor");
const hero = document.getElementById("hero"); // Make sure your hero section has this ID

let mouseX = 0,
  mouseY = 0;
let dotX = 0,
  dotY = 0;
const speed = 0.02;

function animate() {
  dotX += (mouseX - dotX) * speed;
  dotY += (mouseY - dotY) * speed;
  dot.style.left = dotX + "px";
  dot.style.top = dotY + "px";
  requestAnimationFrame(animate);
}

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.display = "block"; // Show the dot only inside hero
});

hero.addEventListener("mouseleave", () => {
  dot.style.display = "none"; // Hide when leaving the hero
});

// Start animation
animate();

let elt = document.querySelectorAll(".slide-text > *");

anime({
  targets: elt,
  translateX: "-100%",
  duration: 12000,
  easing: "linear",
  loop: true,
});

const syncPointer = ({ x: pointerX, y: pointerY }) => {
	const x = pointerX.toFixed(2)
	const y = pointerY.toFixed(2)
	const xp = (pointerX / window.innerWidth).toFixed(2)
	const yp = (pointerY / window.innerHeight).toFixed(2)
	document.documentElement.style.setProperty('--x', x)
	document.documentElement.style.setProperty('--xp', xp)
	document.documentElement.style.setProperty('--y', y)
	document.documentElement.style.setProperty('--yp', yp)
}
document.body.addEventListener('pointermove', syncPointer)

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".send-button");

  if (!button) return; // Safety check

  // Add click event that triggers only once
  button.addEventListener("click", () => {
    // Check if the animation was already triggered
    if (!button.classList.contains("clicked-once")) {
      // Add the class that triggers the animation (CSS handles the animation)
      button.classList.add("clicked-once");
      
      // Optionally, disable the button to prevent further clicks
      // button.disabled = true;
    }

    // Nothing else happens after first click
  });
});
