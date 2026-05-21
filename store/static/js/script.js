document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!"); // Debugging

    // Say Hello Button - Shows an alert
    document.querySelector(".btn").addEventListener("click", function () {
        alert("Hello! Thanks for visiting my portfolio.");
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Validation
    document.querySelector(".footer__form").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        let name = document.querySelector("input[placeholder='Your Name']").value.trim();
        let email = document.querySelector("input[placeholder='Your Email Address']").value.trim();
        let message = document.querySelector("textarea").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Basic email validation
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Thank you! Your message has been sent.");
        this.reset(); // Clear the form after submission
    });

    // Play Button Interaction (if used)
    let playButton = document.querySelector(".video .play");
    if (playButton) {
        playButton.addEventListener("click", function () {
            alert("Video play feature is not implemented yet.");
        });
    }
});



// Typed text effect
const roles = [
  "FULLSTACK DEVELOPER.",
  "DJANGO DEVELOPER.",
  "REACT DEVELOPER.",
  "FREELANCER.",
  "PYTHON DEVELOPER"
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  const word = roles[ri];
  typedEl.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
  deleting ? ci-- : ci++;

  if (!deleting && ci === word.length) {
    deleting = true;
    setTimeout(type, 1600);
    return;
  }
  if (deleting && ci === 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
    setTimeout(type, 400);
    return;
  }
  setTimeout(type, deleting ? 40 : 90);
}
type();

// Floating skills word cloud
const skills = [
  { name: "Python",      size: 32 },
  { name: "Django",      size: 28 },
  { name: "React",       size: 26 },
  { name: "JavaScript",  size: 24 },
  { name: "PostgreSQL",  size: 20 },
  { name: "REST API",    size: 22 },
  { name: "HTML",        size: 28 },
  { name: "CSS",         size: 24 },
  { name: "Git",         size: 18 },
  { name: "Tailwind",    size: 20 },
  { name: "Redis",       size: 16 },
  { name: "Celery",      size: 16 },
  { name: "Linux",       size: 16 },
  { name: "Docker",      size: 18 },
];

const container = document.getElementById("skillsCloud");
if (container) {
  const W = container.offsetWidth;
  const H = 420;
  const words = [];

  skills.forEach(s => {
    const el = document.createElement("span");
    el.className = "skill__word";
    el.textContent = s.name;
    el.style.fontSize = s.size + "px";
    el.style.opacity = 0.5 + Math.random() * 0.5;
    container.appendChild(el);

    const w = el.offsetWidth;
    const h = el.offsetHeight;

    words.push({
      el,
      x: Math.random() * (W - w),
      y: Math.random() * (H - h),
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      w, h
    });
  });

  function animateCloud() {
    words.forEach(word => {
      word.x += word.vx;
      word.y += word.vy;

      if (word.x <= 0 || word.x + word.w >= W) word.vx *= -1;
      if (word.y <= 0 || word.y + word.h >= H) word.vy *= -1;

      word.x = Math.max(0, Math.min(W - word.w, word.x));
      word.y = Math.max(0, Math.min(H - word.h, word.y));

      word.el.style.transform = `translate(${word.x}px, ${word.y}px)`;
    });
    requestAnimationFrame(animateCloud);
  }

  animateCloud();
}


// email js
// EmailJS
emailjs.init("euhLyUFl0ytyo-wQx"); // replace this

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const btn = document.getElementById("submitBtn");
  btn.textContent = "Sending...";
  btn.disabled = true;

  const params = {
    user_name:    document.getElementById("user_name").value,
    user_email:   document.getElementById("user_email").value,
    user_phone:   document.getElementById("user_phone").value,
    user_message: document.getElementById("user_message").value,
  };

  emailjs.send("service_u9qfdcv", "template_lzzsult", params)
    .then(() => {
      btn.textContent = "Message Sent ✓";
      btn.style.background = "#1db954";
      document.getElementById("contactForm").reset();
    })
    .catch(() => {
      btn.textContent = "Failed. Try Again.";
      btn.style.background = "#e74c3c";
      btn.disabled = false;
    });
});


// Particle Network - Skills Section
const skillCanvas = document.getElementById("skillsCanvas");
const skillCtx = skillCanvas.getContext("2d");

function resizeSkillCanvas() {
  skillCanvas.width = skillCanvas.offsetWidth;
  skillCanvas.height = skillCanvas.offsetHeight;
}
resizeSkillCanvas();
window.addEventListener("resize", resizeSkillCanvas);

const skillParticles = [];
const SKILL_PARTICLE_COUNT = 60;
const SKILL_MAX_DIST = 120;

for (let i = 0; i < SKILL_PARTICLE_COUNT; i++) {
  skillParticles.push({
    x: Math.random() * skillCanvas.width,
    y: Math.random() * skillCanvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1
  });
}

function drawSkillParticles() {
  skillCtx.clearRect(0, 0, skillCanvas.width, skillCanvas.height);

  skillParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > skillCanvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > skillCanvas.height) p.vy *= -1;

    skillCtx.beginPath();
    skillCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    skillCtx.fillStyle = "rgba(180,180,200,0.6)";
    skillCtx.fill();
  });

  for (let i = 0; i < skillParticles.length; i++) {
    for (let j = i + 1; j < skillParticles.length; j++) {
      const dx = skillParticles[i].x - skillParticles[j].x;
      const dy = skillParticles[i].y - skillParticles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < SKILL_MAX_DIST) {
        skillCtx.beginPath();
        skillCtx.moveTo(skillParticles[i].x, skillParticles[i].y);
        skillCtx.lineTo(skillParticles[j].x, skillParticles[j].y);
        skillCtx.strokeStyle = `rgba(180,180,200,${1 - dist / SKILL_MAX_DIST})`;
        skillCtx.lineWidth = 0.4;
        skillCtx.stroke();
      }
    }
  }
  requestAnimationFrame(drawSkillParticles);
}
drawSkillParticles();


