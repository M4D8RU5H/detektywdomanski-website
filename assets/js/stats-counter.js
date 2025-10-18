const statItems = document.querySelectorAll('.stat-item');
const duration = 3000; // animation duration in ms

// easing function for smooth ending (cubic)
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// animate a single counter inside a stat-item
function animateCounter(counter) {
  const target = parseInt(counter.dataset.target);
  const start = performance.now();

  function step(time) {
    const progress = Math.min((time - start) / duration, 1);
    const eased = easeOutCubic(progress);
    counter.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counter.textContent = target; // final value
    }
  }

  requestAnimationFrame(step);
}

// IntersectionObserver to trigger when stat-item is visible
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item = entry.target;
      if (!item.classList.contains('visible')) {
        item.classList.add('visible');

        // find the counter inside this item and animate it
        const counter = item.querySelector('.stat-number');
        if (counter) animateCounter(counter);
      }
    }
  });
}, { threshold: 0.5 }); // trigger when 50% visible

// observe all stat-items
statItems.forEach(item => observer.observe(item));
