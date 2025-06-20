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

    // Toggle current
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

let mouseX = 0,
  mouseY = 0;
let dotX = 0,
  dotY = 0;
const speed = 0.03; // Lower is slower, smoother

function animate() {
  dotX += (mouseX - dotX) * speed;
  dotY += (mouseY - dotY) * speed;
  dot.style.left = dotX + "px";
  dot.style.top = dotY + "px";
  requestAnimationFrame(animate);
}

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

animate();
