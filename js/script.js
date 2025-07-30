// -------------------------
// Typing Animation
// -------------------------
const roles = ["Full-Stack Developer", "AI Developer", "Prompt Engineer"];
let index = 0, charIndex = 0;

function typeRole() {
  const title = document.getElementById("typing");
  if (!title) return;

  if (charIndex < roles[index].length) {
    title.innerHTML += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 100);
  } else {
    setTimeout(() => {
      title.innerHTML = "";
      charIndex = 0;
      index = (index + 1) % roles.length;
      typeRole();
    }, 2000);
  }
}
typeRole();

// -------------------------
// Smooth Scroll Navigation
// -------------------------
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
    document.querySelector('.nav-links').classList.remove('show');
  });
});

// -------------------------
// Active Menu Highlight on Scroll
// -------------------------
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if(pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === `#${current}`){
      link.classList.add('active');
    }
  });
});

// -------------------------
// Hamburger Menu Toggle
// -------------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

if(hamburger){
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
}

// -------------------------
// Fade-in on Scroll
// -------------------------
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

faders.forEach(fader => observer.observe(fader));

// -------------------------
// Modal Popup for Reubro
// -------------------------
const modal = document.getElementById("projectModal");
const reubroCard = document.querySelector(".reubro-card");
const closeModal = document.querySelector(".close-btn");

if(reubroCard && modal){
  reubroCard.addEventListener('click', () => {
    modal.style.display = "block";
  });
}

if(closeModal){
  closeModal.addEventListener('click', () => {
    modal.style.display = "none";
  });
}

window.addEventListener('click', e => {
  if(e.target === modal){
    modal.style.display = "none";
  }
});

// -------------------------
// Contact Form + Success Modal
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('portfolioForm');
  const successModal = document.getElementById('successModal');
  const closeBtn = document.querySelector('.close-success');

  // ✅ If redirected from FormSubmit with ?success=true, show modal
  if(window.location.search.includes('success=true')){
    successModal.style.display = 'flex';
    setTimeout(() => {
      successModal.style.display = 'none';
      if(form) form.reset();
    }, 3000);
  }

  // Local validation before submit
  if(form){
    form.addEventListener('submit', function(event){
      const name = this.querySelector('input[name="name"]').value.trim();
      const email = this.querySelector('input[name="email"]').value.trim();
      const message = this.querySelector('textarea[name="message"]').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(name === '' || message.length < 10 || !emailPattern.test(email)) {
        event.preventDefault();
        alert('Please fill in all fields with valid information (message min 10 chars).');
        return false;
      }
      // ✅ Do not preventDefault here for FormSubmit; it must submit to send email
    });
  }

  // Close modal on X button click
  if(closeBtn){
    closeBtn.addEventListener('click', () => {
      successModal.style.display = 'none';
    });
  }

  // Close modal on outside click
  window.addEventListener('click', e => {
    if(e.target === successModal){
      successModal.style.display = 'none';
    }
  });
});

// -------------------------
// Animated Background with Glowing Skill Rain
// -------------------------
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// Skill set for rain
const skills = [
  "PHP","WordPress","Python","MySQL","JavaScript","HTML","CSS","jQuery","Git",
  "AI","ChatGPT","Gemini","Perplexity","n8n","Prompt Engineering"
];

const skillDrops = [];
for(let i=0; i<10; i++){ // fewer skill drops
  skillDrops.push({
    text: skills[Math.floor(Math.random() * skills.length)],
    x: Math.random() * width,
    y: Math.random() * height,
    speed: 0.3 + Math.random() * 1, // slower fall
    fontSize: 18 + Math.random() * 10
  });
}

// Particle network setup
const particles = [];
for(let i=0; i<60; i++){
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 2 + Math.random()*2,
    dx: -1 + Math.random()*2,
    dy: -1 + Math.random()*2
  });
}

function drawBackground(){
  ctx.clearRect(0, 0, width, height);

  // Draw particles
  ctx.fillStyle = "#0ff";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
    ctx.fill();
  });

  // Connect particles with faint lines
  for(let i=0; i<particles.length; i++){
    for(let j=i+1; j<particles.length; j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < 150){
        ctx.strokeStyle = "rgba(0,255,255,0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Move particles
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if(p.x < 0 || p.x > width) p.dx *= -1;
    if(p.y < 0 || p.y > height) p.dy *= -1;
  });

  // Draw skill rain with glow & fade
  skillDrops.forEach(drop => {
    const aiSkills = ["ChatGPT","Gemini","Perplexity","n8n","Prompt Engineering","AI"];
    const isAI = aiSkills.includes(drop.text);

    ctx.font = `${drop.fontSize}px Arial`;
    ctx.fillStyle = isAI ? "rgba(0,255,255,0.8)" : "rgba(255,255,255,0.7)";
    
    ctx.shadowBlur = 15;
    ctx.shadowColor = isAI ? "#0ff" : "#fff";

    ctx.fillText(drop.text, drop.x, drop.y);

    ctx.shadowBlur = 0; // reset shadow

    drop.y += drop.speed;
    if(drop.y > height + 20){
      drop.y = -20;
      drop.x = Math.random() * width;
      drop.text = skills[Math.floor(Math.random() * skills.length)];
      drop.speed = 0.3 + Math.random() * 1;
      drop.fontSize = 18 + Math.random() * 10;
    }
  });

  requestAnimationFrame(drawBackground);
}

drawBackground();

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("projectModal");
  const reubroCard = document.querySelector(".reubro-card");
  const closeModal = document.querySelector(".close-btn");

  if (reubroCard && modal) {
    reubroCard.addEventListener("click", () => {
      modal.style.display = "flex"; // show on click
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"; // close on X
    });
  }

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none"; // close on outside click
    }
  });
});
