// Navbar scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return; // safety check

  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});