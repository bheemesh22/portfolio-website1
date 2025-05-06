// Complete app.js with working theme toggle and animations
document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // THEME TOGGLE FUNCTIONALITY
  // ======================
  const themeBtn = document.getElementById('themeBtn');
  const html = document.documentElement;
  
  // 1. Initialize theme from localStorage or default to light
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
  }
  
  // 2. Update button icon based on current theme
  function updateThemeButton(theme) {
    themeBtn.textContent = theme === 'dark' ? '🌞' : '🌙';
  }
  
  // 3. Toggle between light/dark themes
  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
  }
  
  // Initialize theme system
  initTheme();
  themeBtn.addEventListener('click', toggleTheme);

  // ======================
  // SCROLL TO TOP BUTTON
  // ======================
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ======================
  // SMOOTH SCROLLING
  // ======================
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });

  // ======================
  // GSAP ANIMATIONS
  // ======================
  gsap.registerPlugin(ScrollTrigger);
  
  // Header animation
  gsap.from('header h1', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
  });

  // Section animations
  gsap.utils.toArray('section').forEach((section, i) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    
    // Heading effects
    gsap.from(section.querySelector('h2'), {
      x: -30,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });

  // Project cards animation
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      rotation: i % 2 === 0 ? -5 : 5,
      duration: 0.8,
      delay: i * 0.15,
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });

  // Skills animation
  gsap.utils.toArray('.skill').forEach((skill, i) => {
    gsap.from(skill, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: skill,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });

  // Timeline animation
  gsap.from('.timeline li', {
    x: -30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.6,
    scrollTrigger: {
      trigger: '.timeline',
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  // Floating animation for theme button
  gsap.to('#themeBtn', {
    y: 5,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Hover effects for all buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
});