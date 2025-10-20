const heroBgs = document.querySelectorAll('.parallax-bg');

function updateParallax() {
  const scrollY = window.scrollY;
  
  heroBgs.forEach(bg => {
    const rect = bg.parentElement.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY;

    if (scrollY + window.innerHeight > offsetTop && scrollY < offsetTop + rect.height) {
      const distance = scrollY - offsetTop;
      bg.style.transform = `translateY(${distance * 0.66}px)`;
    }
  });
}

// Od razu ustaw pozycję tła przy załadowaniu strony
window.addEventListener('load', updateParallax);
window.addEventListener('scroll', updateParallax);
window.addEventListener('resize', updateParallax);
