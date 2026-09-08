document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);

  $("year").textContent = new Date().getFullYear();

  // Mobile menu
  $("menuBtn")?.addEventListener("click", () => {
    $("navLinks")?.classList.toggle("open");
  });
  document.querySelectorAll(".links a").forEach(a => a.addEventListener("click", () => $("navLinks")?.classList.remove("open")));

  // Theme
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");
  const updateTheme = () => $("themeBtn").textContent = document.body.classList.contains("light") ? "☀" : "☾";
  updateTheme();
  $("themeBtn")?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
    updateTheme();
  });

  // Typing
  const words = ["Developer", "Computer Engineering Student", "Tech Enthusiast", "Gamer", "Hardware Nerd", "Problem Solver"];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi];
    $("typing").textContent = word.slice(0, ci);
    if (!deleting) {
      ci++;
      if (ci > word.length) { deleting = true; return setTimeout(type, 1200); }
    } else {
      ci--;
      if (ci < 0) { ci = 0; deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 40 : 75);
  }
  type();

  // Terminal
  const commands = {
    help: "Available: about, skills, projects, education, contact, status, github, clear",
    about: "I'm Armaan Goyal — a Computer Engineering student interested in development, hardware and technology.",
    skills: "HTML · CSS · JavaScript · C · Python · Databases · Computer Systems",
    projects: "Personal Developer Portfolio · Computer Systems Lab · Programming Experiments",
    education: "Diploma in Computer Engineering — Rayat-Bahra University Polytechnic.",
    contact: "Scroll to the contact section below.",
    status: "● Online — currently building & learning",
    whoami: "Armaan Goyal — Computer Engineering Student & Developer"
  };
  const sectionMap = {about:"#about", skills:"#skills", projects:"#projects", education:"#journey", contact:"#contact"};
  $("terminal")?.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const cmd = e.target.value.trim().toLowerCase();
    e.target.value = "";
    if (cmd === "clear") $("terminalOut").textContent = "";
    else if (cmd === "github") window.open("https://github.com/Goyal-Armaan", "_blank", "noopener");
    else $("terminalOut").textContent = commands[cmd] || "Command not found. Type 'help'.";
    if (sectionMap[cmd]) document.querySelector(sectionMap[cmd])?.scrollIntoView({behavior:"smooth"});
  });

  // Counters
  const counters = document.querySelectorAll("[data-count]");
  const count = el => {
    const target = Number(el.dataset.count);
    let n = 0;
    const timer = setInterval(() => {
      n++;
      el.textContent = n + "+";
      if (n >= target) clearInterval(timer);
    }, 80);
  };
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { count(e.target); obs.unobserve(e.target); }
    }), {threshold:.5});
    counters.forEach(c => obs.observe(c));
  } else counters.forEach(count);

  // Contact mail
  const CONTACT_EMAIL = "your-email@example.com"; // CHANGE THIS
  $("contactForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("name").value.trim(), email = $("email").value.trim(), msg = $("message").value.trim();
    const subject = encodeURIComponent("Portfolio Contact from " + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
});
