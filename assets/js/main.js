// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculate position of target element relative to the viewport, considering navbar height
      const navbarHeight = document.getElementById('navmenu').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Close mobile navbar if open
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    }
  });
});

// Change navbar background on scroll
window.addEventListener('scroll', function () {
  const nav = document.getElementById('navmenu');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Add active class to navigation items based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.clientHeight;
    if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.parentElement.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.parentElement.classList.add('active');
    }
  });
});

// Initialize tooltips if Bootstrap is available
document.addEventListener('DOMContentLoaded', function() {
  // Check if Bootstrap tooltips are available
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  
  // Initialize Mermaid diagrams
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      themeVariables: {
        primaryColor: '#3498db',
        primaryTextColor: '#333',
        primaryBorderColor: '#2980b9',
        lineColor: '#34495e',
        secondaryColor: '#ecf0f1',
        tertiaryColor: '#f8f9fa'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      },
      gantt: {
        useMaxWidth: true,
        leftPadding: 75,
        gridLineStartPadding: 35
      }
    });
  }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    // Add error handling for missing images
    img.addEventListener('error', function() {
      this.style.display = 'none';
      console.warn('Image failed to load:', this.src);
    });
  });
});

// Add fade-in animation for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all main sections for animation
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.main-sections');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// Form validation for contact form
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('#contact_section form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      
      if (!name || !email || !message) {
        e.preventDefault();
        alert('Please fill in all required fields.');
        return false;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        return false;
      }
    });
  }
});

// Add click tracking for download links (optional analytics)
document.addEventListener('DOMContentLoaded', function() {
  const downloadLinks = document.querySelectorAll('.download-items a');
  downloadLinks.forEach(link => {
    link.addEventListener('click', function() {
      // You can add analytics tracking here
      console.log('Download clicked:', this.href);
    });
  });
});

// Add hover effects for technology icons
document.addEventListener('DOMContentLoaded', function() {
  const techIcons = document.querySelectorAll('.tech-icon');
  techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});

// Lazy loading for images (if needed)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
} 