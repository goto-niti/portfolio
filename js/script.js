/* =============================
   Main script for interactions
   ============================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ------------------------
     Loader hide after ready
     ------------------------ */
  setTimeout(()=> {
    const loader = document.getElementById("loader");
    if(loader) loader.style.display = "none";
  }, 800);


  /* ------------------------
     Navbar mobile toggle
     ------------------------ */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  if(hamburger && navMenu) {
    hamburger.addEventListener("click", () => navMenu.classList.toggle("show"));
  }

  /* ------------------------
     Theme toggle (dark/light)
     ------------------------ */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("themeMode") || "dark";
  setTheme(savedTheme);
  if(themeToggle) themeToggle.addEventListener("click", () => {
    const current = localStorage.getItem("themeMode") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
  function setTheme(mode){
    if(mode === "light"){
      root.style.setProperty("--bg", "#f8fafc");
      root.style.setProperty("--text-light", "#0b1220");
      root.style.setProperty("--glass", "rgba(0,0,0,0.03)");
      document.body.style.background = "linear-gradient(180deg, #f8fbff, #eef2ff)";
      localStorage.setItem("themeMode","light");
    } else {
      root.style.setProperty("--bg", "#0b0d14");
      root.style.setProperty("--text-light", "#cdd5e0");
      root.style.setProperty("--glass", "rgba(255,255,255,0.06)");
      document.body.style.background = "radial-gradient(circle at top right, rgba(106,90,224,0.12), transparent 20%), linear-gradient(180deg, rgba(12,14,28,0.5), transparent 30%)";
      localStorage.setItem("themeMode","dark");
    }
  }

  /* ------------------------
     Active nav on scroll (intersection)
     ------------------------ */
  const sections = document.querySelectorAll("main section, .page-container section");
  const navLinks = document.querySelectorAll(".nav-item");
  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        navLinks.forEach(a=> a.classList.remove("active"));
        const id = entry.target.id || entry.target.querySelector(".section-title")?.textContent?.toLowerCase() || 'home';
        // match by href contains
        navLinks.forEach(a => {
          if(a.getAttribute("href").includes(id) || (id==='home' && a.getAttribute("href")==="index.html")){
            a.classList.add("active");
          }
        });
      }
    });
  }, { rootMargin: "-40% 0px -40% 0px" });
  sections.forEach(s => observerNav.observe(s));

  /* ------------------------
     Typewriter for roles (clean text)
     ------------------------ */
  const typedTextElement = document.getElementById("typed-text");
  const typedRoles = [
    "Student",
    "Web Developer (in progress)",
    "Tech Enthusiast",
    "Traveller",
    "Creative Thinker",
    "Music Lover",
    "Future Innovator"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if(!typedTextElement) return;
    const currentRole = typedRoles[roleIndex];
    if(!isDeleting) {
      typedTextElement.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    } else {
      typedTextElement.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    }

    if(!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1000;
    } else if(isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % typedRoles.length;
      typeSpeed = 200;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  /* ------------------------
     Animated Gauges (canvas)
     ------------------------ */
  const gaugeNodes = document.querySelectorAll(".gauge");
  const gaugeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const canvas = entry.target;
        const percent = parseInt(canvas.dataset.value || "0", 10);
        drawGauge(canvas, percent);
        gaugeObserver.unobserve(canvas);
      }
    });
  }, {threshold:0.45});

  gaugeNodes.forEach(c => gaugeObserver.observe(c));

  function drawGauge(canvas, percentTarget) {
    // prepare
    const ctx = canvas.getContext("2d");
    const size = 120;
    canvas.width = size;
    canvas.height = size;
    const cx = size/2, cy = size/2, radius = 44;
    let current = 0;

    const gradient = ctx.createLinearGradient(0,0,size,0);
    gradient.addColorStop(0, "#6A5AE0");
    gradient.addColorStop(1, "#9D59F2");

    function step(){
      ctx.clearRect(0,0,size,size);

      // background circle
      ctx.beginPath();
      ctx.arc(cx,cy,radius,0,Math.PI*2);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 10;
      ctx.stroke();

      // animated arc
      ctx.beginPath();
      ctx.arc(cx,cy,radius, -Math.PI/2, (Math.PI*2)*(current/100) - Math.PI/2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 10;
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#A46BFF";
      ctx.stroke();

      // text
      ctx.font = "600 18px Poppins";
      ctx.fillStyle = "#EDEAFF";
      ctx.textAlign = "center";
      ctx.fillText(current + "%", cx, cy + 8);

      if(current < percentTarget) {
        current++;
        requestAnimationFrame(step);
      }
    }
    step();
  }

  /* ------------------------
     Contact form (EmailJS)
     ------------------------ */
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if(contactForm){
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if(!name || !email || !message){
        formMessage.textContent = "Lets get in touch.";
        return;
      }
      // basic email check
      if(!/^\S+@\S+\.\S+$/.test(email)){
        formMessage.textContent = "Please enter a valid email address.";
        return;
      }

      // send via EmailJS - replace SERVICE_ID and TEMPLATE_ID below
      const serviceID = "service_mgx8fen";
      const templateID = "template_p1oao7o";

      const templateParams = {
        from_name: name,
        from_email: email,
        subject: document.getElementById("subject").value || "(no subject)",
        message: message
      };

      formMessage.textContent = "Sending…";
      emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
          formMessage.textContent = "Message sent — thank you!";
          contactForm.reset();
        }, (err) => {
          console.error(err);
          formMessage.textContent = "Oops — something went wrong. Try again later.";
        });
    });
  }

  /* ------------------------
     Smooth scroll polyfill for internal links
     ------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });
// Generate random stars
const galaxy = document.getElementById("galaxy-bg");

for (let i = 0; i < 120; i++) {
    let star = document.createElement("span");
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 6 + "s";
    star.style.opacity = Math.random();

    galaxy.appendChild(star);
}

const certificates = document.querySelectorAll('.certificate-card');

function revealCertificates() {
  certificates.forEach(card => {
    const position = card.getBoundingClientRect().top;
    if (position < window.innerHeight - 60) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", revealCertificates);


}); // DOMContentLoaded end
