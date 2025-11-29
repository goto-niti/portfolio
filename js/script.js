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
     Theme toggle (dark/light) - FIXED
     ------------------------ */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("themeMode") || "dark";
  
  setTheme(savedTheme);
  
  if(themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = localStorage.getItem("themeMode") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }
  
  function setTheme(mode){
    if(mode === "light"){
      // Light theme colors
      root.style.setProperty("--bg", "#f8fafc");
      root.style.setProperty("--text-light", "#1e293b");
      root.style.setProperty("--glass", "rgba(0,0,0,0.05)");
      root.style.setProperty("--primary", "#6366f1");
      root.style.setProperty("--secondary", "#0ea5e9");
      
      document.body.style.background = "#f0f4ff";
      document.body.style.color = "#1e293b";
      
      // Update all text elements
      document.querySelectorAll('.neon-title, .section-title, .hero-sub, .lead, p, h1, h2, h3, h4, .skill-name, .project-info, .timeline-item').forEach(el => {
        el.style.color = "#1e293b";
      });
      
      // Update navbar and links
      document.querySelectorAll('.nav-item, .logo').forEach(el => {
        el.style.color = "#1e293b";
      });
      
      // Update glass panels for light mode
      document.querySelectorAll('.glass-panel').forEach(el => {
        el.style.background = "rgba(255,255,255,0.6)";
        el.style.border = "1px solid rgba(0,0,0,0.1)";
      });
      
      // Update navbar background
      const navbar = document.querySelector('.navbar');
      if(navbar) {
        navbar.style.background = "rgba(255, 255, 255, 0.7)";
        navbar.style.borderColor = "rgba(0,0,0,0.1)";
      }
      
      // Update galaxy background for light mode with AMAZING effects
      const galaxy = document.getElementById('galaxy-bg');
      if(galaxy) {
        // Create a vibrant animated mesh gradient background
        galaxy.style.background = `
          radial-gradient(circle at 10% 20%, rgba(255, 200, 124, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(147, 51, 234, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #fef3c7 0%, #ddd6fe 25%, #bfdbfe 50%, #fce7f3 75%, #ccfbf1 100%)
        `;
        galaxy.style.opacity = "0.6";
        galaxy.style.animation = "mesh-gradient 20s ease-in-out infinite";
        
        // Remove old light particles if any
        const existingParticles = galaxy.querySelectorAll('.light-particle');
        existingParticles.forEach(p => p.remove());
        
        // Create floating geometric shapes
        for(let i = 0; i < 30; i++) {
          let shape = document.createElement('div');
          shape.className = 'light-particle';
          shape.style.position = 'absolute';
          
          const size = Math.random() * 60 + 20;
          shape.style.width = size + 'px';
          shape.style.height = size + 'px';
          shape.style.top = Math.random() * 100 + '%';
          shape.style.left = Math.random() * 100 + '%';
          
          // Random shapes: circles, squares, triangles
          const shapeType = Math.floor(Math.random() * 3);
          if(shapeType === 0) {
            shape.style.borderRadius = '50%'; // Circle
          } else if(shapeType === 1) {
            shape.style.borderRadius = '15%'; // Rounded square
            shape.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
          } else {
            shape.style.borderRadius = '0'; // Diamond
            shape.style.transform = 'rotate(45deg)';
          }
          
          // Vibrant gradient colors
          const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
          ];
          
          shape.style.background = gradients[Math.floor(Math.random() * gradients.length)];
          shape.style.opacity = Math.random() * 0.15 + 0.05;
          shape.style.filter = 'blur(' + (Math.random() * 40 + 20) + 'px)';
          shape.style.animation = `morph-shape ${Math.random() * 20 + 15}s ease-in-out infinite`;
          shape.style.animationDelay = Math.random() * 5 + 's';
          
          galaxy.appendChild(shape);
        }
        
        // Create sparkle/glitter effects
        for(let i = 0; i < 50; i++) {
          let sparkle = document.createElement('div');
          sparkle.className = 'light-particle sparkle';
          sparkle.style.position = 'absolute';
          sparkle.style.width = Math.random() * 4 + 2 + 'px';
          sparkle.style.height = sparkle.style.width;
          sparkle.style.borderRadius = '50%';
          sparkle.style.top = Math.random() * 100 + '%';
          sparkle.style.left = Math.random() * 100 + '%';
          
          const sparkleColors = ['#fbbf24', '#f59e0b', '#a78bfa', '#c084fc', '#60a5fa', '#34d399'];
          sparkle.style.background = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
          sparkle.style.boxShadow = `0 0 10px ${sparkle.style.background}`;
          sparkle.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
          sparkle.style.animationDelay = Math.random() * 3 + 's';
          
          galaxy.appendChild(sparkle);
        }
        
        // Add animations if not exists
        if(!document.getElementById('light-mode-animations')) {
          const style = document.createElement('style');
          style.id = 'light-mode-animations';
          style.textContent = `
            @keyframes mesh-gradient {
              0%, 100% { 
                filter: hue-rotate(0deg) brightness(1.1);
                transform: scale(1);
              }
              33% { 
                filter: hue-rotate(30deg) brightness(1.15);
                transform: scale(1.05);
              }
              66% { 
                filter: hue-rotate(-20deg) brightness(1.12);
                transform: scale(1.02);
              }
            }
            
            @keyframes morph-shape {
              0%, 100% { 
                transform: translate(0, 0) rotate(0deg) scale(1);
                border-radius: 50%;
              }
              25% { 
                transform: translate(30px, -50px) rotate(90deg) scale(1.3);
                border-radius: 20%;
              }
              50% { 
                transform: translate(-20px, -100px) rotate(180deg) scale(0.8);
                border-radius: 40%;
              }
              75% { 
                transform: translate(40px, -70px) rotate(270deg) scale(1.1);
                border-radius: 10%;
              }
            }
            
            @keyframes twinkle {
              0%, 100% { 
                opacity: 0.2;
                transform: scale(0.8);
              }
              50% { 
                opacity: 1;
                transform: scale(1.3);
              }
            }
          `;
          document.head.appendChild(style);
        }
      }
      
      // Update bg-effect for light mode with animated waves
      const bgEffect = document.querySelector('.bg-effect');
      if(bgEffect) {
        bgEffect.style.background = `
          radial-gradient(circle at 15% 25%, rgba(99, 102, 241, 0.15), transparent 50%),
          radial-gradient(circle at 85% 75%, rgba(236, 72, 153, 0.15), transparent 50%),
          radial-gradient(circle at 50% 10%, rgba(34, 211, 238, 0.12), transparent 55%)
        `;
        bgEffect.style.animation = "wave-effect 25s ease-in-out infinite";
        
        // Add wave animation
        if(!document.getElementById('wave-effect-animation')) {
          const style = document.createElement('style');
          style.id = 'wave-effect-animation';
          style.textContent = `
            @keyframes wave-effect {
              0%, 100% { 
                transform: translateY(0) scale(1);
                opacity: 1;
              }
              50% { 
                transform: translateY(-30px) scale(1.1);
                opacity: 0.8;
              }
            }
          `;
          document.head.appendChild(style);
        }
      }
      
      // Make stars visible but subtle in light mode
      const stars = galaxy ? galaxy.querySelectorAll('span') : [];
      stars.forEach(star => {
        star.style.background = "radial-gradient(circle, #fbbf24, #f59e0b)";
        star.style.opacity = "0.5";
        star.style.boxShadow = "0 0 12px rgba(251, 191, 36, 0.8)";
        star.style.filter = "blur(1px)";
      });
      
      localStorage.setItem("themeMode","light");
      if(themeToggle) themeToggle.textContent = "🌙";
      
    } else {
      // Dark theme colors (original)
      root.style.setProperty("--bg", "#0b0d14");
      root.style.setProperty("--text-light", "#cdd5e0");
      root.style.setProperty("--glass", "rgba(255,255,255,0.06)");
      root.style.setProperty("--primary", "#9b5bff");
      root.style.setProperty("--secondary", "#4cc9f0");
      
      document.body.style.background = "#0b0d14";
      document.body.style.color = "#cdd5e0";
      
      // Reset all text elements to original colors
      document.querySelectorAll('.neon-title, .section-title, .hero-sub, .lead, p, h1, h2, h3, h4, .skill-name, .project-info, .timeline-item').forEach(el => {
        el.style.color = "";
      });
      
      // Reset navbar and links
      document.querySelectorAll('.nav-item, .logo').forEach(el => {
        el.style.color = "";
      });
      
      // Reset glass panels
      document.querySelectorAll('.glass-panel').forEach(el => {
        el.style.background = "";
        el.style.border = "";
      });
      
      // Reset navbar background
      const navbar = document.querySelector('.navbar');
      if(navbar) {
        navbar.style.background = "";
        navbar.style.borderColor = "";
      }
      
      // Reset galaxy background
      const galaxy = document.getElementById('galaxy-bg');
      if(galaxy) {
        galaxy.style.background = "";
        galaxy.style.opacity = "";
        galaxy.style.animation = "";
        
        // Remove light mode particles
        const particles = galaxy.querySelectorAll('.light-particle');
        particles.forEach(p => p.remove());
      }
      
      // Reset bg-effect
      const bgEffect = document.querySelector('.bg-effect');
      if(bgEffect) {
        bgEffect.style.background = "";
        bgEffect.style.animation = "";
      }
      
      // Reset stars to original
      const stars = galaxy ? galaxy.querySelectorAll('span') : [];
      stars.forEach(star => {
        star.style.background = "";
        star.style.opacity = "";
      });
      
      localStorage.setItem("themeMode","dark");
      if(themeToggle) themeToggle.textContent = "🌓";
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
          formMessage.textContent = "Message sent – thank you!";
          contactForm.reset();
        }, (err) => {
          console.error(err);
          formMessage.textContent = "Oops – something went wrong. Try again later.";
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

  /* ------------------------
     Generate random stars for galaxy background
     ------------------------ */
  const galaxy = document.getElementById("galaxy-bg");
  if(galaxy) {
    for (let i = 0; i < 120; i++) {
      let star = document.createElement("span");
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 6 + "s";
      star.style.opacity = Math.random();
      galaxy.appendChild(star);
    }
  }

  /* ------------------------
     Reveal certificates on scroll
     ------------------------ */
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
