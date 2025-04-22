 // JavaScript to toggle the mobile navigation menu
 const burgerIcon = document.getElementById('burger-icon');
 const mobileNav = document.getElementById('mobile-nav');

 burgerIcon.addEventListener('click', () => {
   mobileNav.classList.toggle('active'); // Toggle the visibility of mobile navigation
 });