// Performance Optimized JavaScript for Vercel Deployment

// Ensure DOM is ready before applying transitions
document.addEventListener('DOMContentLoaded', () => {
  // Ensure smooth transitions
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
});

// Optimized step transition function
function showStep(stepNumber) {
  requestAnimationFrame(() => {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => step.classList.add('fade-out'));
    
    setTimeout(() => {
      steps.forEach(step => step.style.display = 'none');
      const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
      if (targetStep) {
        targetStep.style.display = 'block';
        targetStep.classList.remove('fade-out');
        targetStep.classList.add('fade-in');
      }
    }, 150); // Reduced from 300ms
  });
}

// Optimized image loading
function preloadImage(src) {
  const img = new Image();
  img.src = src;
}

// Preload critical images
document.addEventListener('DOMContentLoaded', () => {
  preloadImage('/img/step1.svg');
  preloadImage('/img/step2.svg');
  preloadImage('/img/step3.svg');
  preloadImage('/img/step4.svg');
});

// Optimized event listeners
document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.getElementById('nextBtn');
  const backBtn = document.getElementById('backBtn');
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Optimized next step logic
      requestAnimationFrame(() => {
        // Your existing next step logic here
      });
    });
  }
  
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      // Optimized back step logic
      requestAnimationFrame(() => {
        // Your existing back step logic here
      });
    });
  }
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }, 0);
  });
}
