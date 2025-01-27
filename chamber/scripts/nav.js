// Nav section
const menubutton = document.querySelector('#hamburger');
const menunav = document.querySelector('nav')

//Toggle the show class off and on
menubutton.addEventListener('click', () => {
	menunav.classList.toggle('show');
	menubutton.classList.toggle('show');
});

// Select all links inside the nav
const navLinks = document.querySelectorAll("nav ul li a");

// Add a click event listener to each link
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    // Remove the 'active' class from all nav links
    navLinks.forEach(nav => nav.parentElement.classList.remove("active"));

    // Add the 'active' class to the clicked link's parent <li>
    this.parentElement.classList.add("active");
  });
});