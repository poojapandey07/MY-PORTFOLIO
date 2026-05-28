// NULL SAFETY HELPER
const $ = (sel) => document.querySelector(sel);

// TYPING EFFECT — loops through multiple roles
const roles = [
  "Aspiring Full Stack Developer 💻",
  "C++ Programmer 🧠",
  "Creative Coder 🚀",
  "UI/UX Enthusiast 🎨"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  const display = isDeleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  const el = $(".typing");
  if (el) el.textContent = display;

  if (!isDeleting && charIndex > current.length) {
    setTimeout(() => { isDeleting = true; typeEffect(); }, 1500);
    return;
  }
  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// BUTTON — scroll to projects smoothly
const btn = $(".btn");
if (btn) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
}

// SCROLL REVEAL — animate cards and sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".card, .skill-badge").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ACTIVE NAV LINK HIGHLIGHT on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute("href") === `#${current}`
      ? "#38bdf8"
      : "#94a3b8";
  });
});