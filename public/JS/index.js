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
