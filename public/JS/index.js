// Firebase imports
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC2xx3EGFbFk_L9qyxxR5vB6XBEErYA--U",
  authDomain: "website-nextdrive.firebaseapp.com",
  projectId: "website-nextdrive",
  storageBucket: "website-nextdrive.firebasestorage.app",
  messagingSenderId: "188086077103",
  appId: "1:188086077103:web:5a08409b3a3afa8c57765a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submission handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      "1_Timestamp": serverTimestamp(),
      "2_Name": {
        FirstName: form.firstName.value,
        LastName: form.lastName.value,
        "3_Email": form.email.value,
        "4_Phone": form.phone.value,
        "5_Msg": form.message.value,
        "6_userAgent": navigator.userAgent,
        "7_reffered": document.referrer || "Direct"
      }
    };

    try {
      await addDoc(collection(db, "form-table"), data);
      alert("Form submitted successfully!");
      form.reset();
    } catch (err) {
      console.error("Error writing document:", err);
      alert("Something went wrong. Try again later.");
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
