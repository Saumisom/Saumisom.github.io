/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navSlider = document.querySelector('.nav-slider');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

/*==================== nav slider position ====================*/
function updateNavSlider() {
  const activeLink = document.querySelector('header nav a.active');
  if (activeLink && navSlider && window.innerWidth > 768) {
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    navSlider.style.width = linkRect.width + 'px';
    navSlider.style.left = (linkRect.left - navRect.left) + 'px';
    navSlider.style.opacity = '1';
  } else if (navSlider) {
    navSlider.style.opacity = '0';
  }
}

// Initial position - run immediately and on various events
updateNavSlider();
document.addEventListener('DOMContentLoaded', updateNavSlider);
window.addEventListener('load', updateNavSlider);
window.addEventListener('resize', updateNavSlider);
setTimeout(updateNavSlider, 100);

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
      // Update slider position
      updateNavSlider();
    }
  });

  /*==================== sticky navbar ====================*/
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

/*==================== scroll reveal ====================*/
ScrollReveal({
  reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.about-img, .journey-column:first-child', { origin: 'left' });
ScrollReveal().reveal('.about-content, .journey-column:last-child', { origin: 'right' });
ScrollReveal().reveal('.skill-box, .featured-box, .testimonial-box', { origin: 'bottom', interval: 100 });

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
  strings: ['Backend Developer', 'DBMS Developer', 'Freelance Programmer', 'Founder', 'Learner', 'Leader'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

/*==================== testimonial modal ====================*/
const testimonialBoxes = document.querySelectorAll('.testimonial-box');
const modal = document.getElementById('testimonialModal');
const modalClose = document.getElementById('modalClose');
const modalTestimonial = document.getElementById('modalTestimonial');
const modalAuthor = document.getElementById('modalAuthor');
const modalLinkedin = document.getElementById('modalLinkedin');

testimonialBoxes.forEach(box => {
  box.addEventListener('click', () => {
    const content = box.querySelector('.testimonial-content').innerHTML;
    const author = box.querySelector('.testimonial-author').innerHTML;
    const linkedinUrl = box.getAttribute('data-linkedin');

    modalTestimonial.innerHTML = content;
    modalAuthor.innerHTML = author;
    modalLinkedin.href = linkedinUrl || '#';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

/*==================== schedule call modal ====================*/
const scheduleButtons = document.querySelectorAll('.schedule-call-btn');
const scheduleModal = document.getElementById('scheduleModal');
const scheduleModalClose = document.getElementById('scheduleModalClose');
const scheduleForm = document.getElementById('scheduleForm');
const scheduleDateInput = document.getElementById('scheduleDate');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
if (scheduleDateInput) {
  scheduleDateInput.setAttribute('min', today);
}

scheduleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    scheduleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

if (scheduleModalClose) {
  scheduleModalClose.addEventListener('click', () => {
    scheduleModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

if (scheduleModal) {
  scheduleModal.addEventListener('click', (e) => {
    if (e.target === scheduleModal) {
      scheduleModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

if (scheduleForm) {
  scheduleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(scheduleForm);
    const data = Object.fromEntries(formData);

    // Show success message
    alert(`Thank you ${data.name}! Your call has been scheduled for ${data.date} at ${data.time}. I will contact you at ${data.phone} to confirm.`);

    scheduleModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    scheduleForm.reset();
  });
}

/*==================== contact form ====================*/
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message
    alert(`Thank you ${data.fullName}! Your message has been sent. I'll get back to you soon at ${data.email}.`);

    contactForm.reset();
  });
}
