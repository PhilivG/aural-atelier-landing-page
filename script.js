const body = document.body;
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const revealItems = document.querySelectorAll("[data-reveal]");
const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const parallaxCard = document.querySelector("[data-parallax]");

const setScrolledState = () => {
  body.classList.toggle("is-scrolled", window.scrollY > 24);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const currentId = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === currentId);
      });
    });
  },
  { threshold: 0.55 }
);

sectionTargets.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  setScrolledState();
  if (!parallaxCard) return;
  const offset = Math.min(window.scrollY * 0.04, 22);
  parallaxCard.style.transform = `rotate(-4deg) translateY(${10 - offset}px)`;
});

setScrolledState();

if (navLinks.length) {
  navLinks[0].classList.add("is-active");
}
