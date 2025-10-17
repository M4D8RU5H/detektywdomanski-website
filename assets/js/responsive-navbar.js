const btnHamburger = document.querySelector(".btn-nav-hamburger");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelector(".nav-links");
const logo = document.querySelector(".logo");

function toggleMenu() {
  mainNav.classList.toggle("active");
  navLinks.classList.toggle("active");
  logo.classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

btnHamburger.addEventListener("click", toggleMenu);
