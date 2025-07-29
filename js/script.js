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
// Contact Form Validation
// -------------------------
const form = document.getElementById('portfolioForm');
const formStatus = document.getElementById('formStatus');

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

    formStatus.style.display = 'block';
    formStatus.innerText = 'Message sent successfully!';
    setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
  });
}

const form = document.getElementById('portfolioForm');
const successModal = document.getElementById('successModal');

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

    // Show success modal
    event.preventDefault(); // Remove if using actual FormSubmit
    successModal.style.display = 'flex';

    setTimeout(() => {
      successModal.style.display = 'none';
      form.reset();
    }, 3000);
  });
}
