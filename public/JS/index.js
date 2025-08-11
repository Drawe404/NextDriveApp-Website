// ===================================
// === HLAVNÍ FUNKCE STRÁNKY ===
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  // --- FORMULÁŘ KONTAKTU ---
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const dataToSend = {
        "1_Timestamp": null,
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
        const cloudFunctionUrl = "https://europe-west1-website-nextdrive.cloudfunctions.net/submitContact";
        const response = await fetch(cloudFunctionUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit form. Contact through socials");
        }

        console.log("Formulář úspěšně odeslán:", await response.json());
        form.reset();
        setTimeout(() => {
        if (button) { 
          button.classList.remove("clicked-once");
        }
      }, 8000);

      } catch (err) {
        console.error("Chyba při odesílání formuláře:", err);
        alert("An error occurred. Please try again or contact me via social media.");
      }
    });
  }

  // --- ANIMACE TLAČÍTKA ODESLAT ---
  const sendButton = document.querySelector(".send-button");
  if (sendButton) {
    sendButton.addEventListener("click", () => {
      if (!sendButton.classList.contains("clicked-once")) {
        sendButton.classList.add("clicked-once");
      }
    });
  }

  // --- PLYNULÉ SCROLLOVÁNÍ ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --- AKORDEON PRO SLUŽBY ---
  document.querySelectorAll(".service-header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");
      document.querySelectorAll(".service-item").forEach((i) => i.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
  
  // --- PŘEKLADY A PŘEPÍNAČ JAZYKŮ (i18n) ---
  // (Celý tvůj kód pro překlady zde zůstává beze změny)
  setupLanguageSwitcher();

  // ==========================================================
  // === EFEKTY POUZE PRO DESKTOP (PC verze) ===
  // ==========================================================
  if (window.innerWidth > 767) {
    
    // --- 1. BLOB SLEDUJÍCÍ MYŠ V HERO SEKCI ---
    const dot = document.getElementById("dot-cursor");
    const hero = document.getElementById("hero");

    if (dot && hero) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        const speed = 0.01; // Lehce zrychleno pro plynulejší pocit

        const animateDot = () => {
            dotX += (mouseX - dotX) * speed;
            dotY += (mouseY - dotY) * speed;
            dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            requestAnimationFrame(animateDot);
        };

        hero.addEventListener("mousemove", (e) => {
            mouseX = e.clientX - (dot.offsetWidth / 2);
            mouseY = e.clientY - (dot.offsetHeight / 2);
            dot.style.opacity = "1";
        });

        hero.addEventListener("mouseleave", () => {
            dot.style.opacity = "0";
        });
        
        // Spustíme animaci
        animateDot();
    }
    
    // --- 2. GLOW EFEKT NA TLAČÍTKU PODLE KURZORU ---
    const syncPointer = ({ x: pointerX, y: pointerY }) => {
        const x = pointerX.toFixed(2);
        const y = pointerY.toFixed(2);
        const xp = (pointerX / window.innerWidth).toFixed(2);
        const yp = (pointerY / window.innerHeight).toFixed(2);
        document.documentElement.style.setProperty('--x', x);
        document.documentElement.style.setProperty('--xp', xp);
        document.documentElement.style.setProperty('--y', y);
        document.documentElement.style.setProperty('--yp', yp);
    };
    document.body.addEventListener('pointermove', syncPointer);
  }

  // --- POSOUVACÍ TEXT "FOLLOW US" --- (Funguje na všech zařízeních)
  const slideText = document.querySelectorAll(".slide-text > *");
  if (slideText.length > 0) {
      anime({
          targets: slideText,
          translateX: "-100%",
          duration: 13000, // Mírně zpomaleno pro lepší čitelnost
          easing: "linear",
          loop: true,
      });
  }
});


// ===================================
// === FUNKCE PRO PŘEKLADY (i18n) ===
// ===================================
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

function setupLanguageSwitcher() {
    function qs(s) { return document.querySelector(s); }
    function safeSetText(el, text) { if (el) el.textContent = text; }
    function safeSetHTML(el, html) { if (el) el.innerHTML = html; }
    function safeSetPlaceholder(el, text) { if (el) el.placeholder = text; }

    function applyTranslations(lang) {
        const t = translations[lang] || translations.en;
        document.title = t.pageTitle;
        document.documentElement.lang = lang;
        // ... (všechny tvoje safeSetText a další volání zde) ...
        safeSetText(qs('nav .nav-links a[href="#services"]'), t.navServices);
        safeSetText(qs('nav .nav-links a[href="#about"]'), t.navAbout);
        safeSetText(qs('nav .nav-links a[href="#contact"]'), t.navContact);
        safeSetText(qs('.hero h1'), t.heroTitle);
        safeSetText(qs('.hero-subtitle'), t.heroSubtitle);
        safeSetText(qs('.cta-button'), t.ctaButton);
        safeSetText(qs('.cta-subtitle'), t.ctaSubtitle);
        safeSetText(qs('#services > h2'), t.servicesTitle);
        const serviceEls = document.querySelectorAll('.faq-container .service-item');
        if (serviceEls[0]) { safeSetText(serviceEls[0].querySelector('.service-title'), t.service1Title); safeSetText(serviceEls[0].querySelector('.service-content'), t.service1Content); }
        if (serviceEls[1]) { safeSetText(serviceEls[1].querySelector('.service-title'), t.service2Title); safeSetText(serviceEls[1].querySelector('.service-content'), t.service2Content); }
        if (serviceEls[2]) { safeSetText(serviceEls[2].querySelector('.service-title'), t.service3Title); safeSetText(serviceEls[2].querySelector('.service-content'), t.service3Content); }
        safeSetText(qs('#story-title'), t.storyTitle);
        const storyPs = document.querySelectorAll('.story-content > p');
        if (storyPs.length > 0) safeSetText(storyPs[0], t.storySubtitle);
        if (storyPs.length > 1) safeSetText(storyPs[1], t.storyP1);
        if (storyPs.length > 2) safeSetText(storyPs[2], t.storyP2);
        if (storyPs.length > 3) safeSetText(storyPs[3], t.storyP3);
        safeSetText(qs('.more-button span'), t.moreButton);
        safeSetText(qs('#contact-title'), t.contactTitle);
        const contactPs = document.querySelectorAll('.contact-info > p:not(.instagram-mention)');
        if (contactPs[0]) safeSetText(contactPs[0], t.contactP1);
        if (contactPs[1]) safeSetText(contactPs[1], t.contactP2);
        if (contactPs[2]) safeSetText(contactPs[2], t.contactP3);
        if (contactPs[3]) safeSetText(contactPs[3], t.contactP4);
        const ig = qs('.instagram-mention');
        if (ig) ig.innerHTML = `${t.instagramMain} <p>${t.instagramNested}</p>`;
        safeSetPlaceholder(qs('input[name="firstName"]'), t.placeholderFirstName);
        safeSetPlaceholder(qs('input[name="lastName"]'), t.placeholderLastName);
        safeSetPlaceholder(qs('input[name="email"]'), t.placeholderEmail);
        safeSetPlaceholder(qs('input[name="phone"]'), t.placeholderPhone);
        safeSetPlaceholder(qs('textarea[name="message"]'), t.placeholderMessage);
        const sendBtn = qs('.send-button');
        if (sendBtn) safeSetText(sendBtn.childNodes[0], t.sendButton);
        safeSetText(qs('.reply-note'), t.replyNote);

        // Opravené selektory pro patičku
        safeSetText(qs('.footer-info .loc'), t.footerLocationLabel);
        safeSetText(qs('.footer-info address'), t.footerLocationValue);
        safeSetText(qs('.footer-contact .loc'), t.footerContactLabel);
        safeSetText(qs('.footer-copyright'), t.footerCopyright);
      }

    function updateLanguageSelectorUI(lang) {
        const selectorRoot = qs('.language-selector');
        if (!selectorRoot) return;
        const imgEl = selectorRoot.querySelector('.language-selected img.language-flag');
        const codeEl = selectorRoot.querySelector('.language-selected .language-code');
        const assets = { en: './assets/en-flag.png', cz: './assets/cz-flag.png' };
        if (imgEl) imgEl.src = assets[lang] || assets.en;
        if (codeEl) codeEl.textContent = lang.toUpperCase();
    }

    function setLanguage(lang, save = true) {
        if (!translations[lang]) lang = 'en';
        applyTranslations(lang);
        updateLanguageSelectorUI(lang);
        if (save) localStorage.setItem('preferredLanguage', lang);
    }

    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = (navigator.language || '').toLowerCase();
    const initialLang = savedLang || (browserLang.startsWith('cz') ? 'cz' : 'en');
    
    setLanguage(initialLang, false);

    const selector = qs('.language-selector');
    if (selector) {
        selector.addEventListener('click', (e) => {
            selector.classList.toggle('active');
        });
        selector.querySelectorAll('.language-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                setLanguage(opt.dataset.lang);
                selector.classList.remove('active');
            });
        });
        document.addEventListener('click', (e) => {
            if (!selector.contains(e.target)) selector.classList.remove('active');
        });
    }
}