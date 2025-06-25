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
// Form submission handler
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! I will reply within 1 day.");
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
