/* ====== Helpers ====== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ====== Mobile Menu (hamburger) ====== */
const menuToggle = $('#menu-toggle');   // the circular button
const navList   = $('header nav ul');   // the UL with links

// Ensure mobile panel behavior
const ensureMobilePanelClass = () => {
  if (window.innerWidth <= 900) {
    navList.classList.add('mobile-panel');
    navList.classList.remove('show');          // hide by default on small screens
    menuToggle.classList.remove('active');     // reset hamburger state
  } else {
    navList.classList.remove('mobile-panel', 'show');
    menuToggle.classList.remove('active');
  }
};
ensureMobilePanelClass();
window.addEventListener('resize', ensureMobilePanelClass);

// Toggle open/close on click
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent document click from firing immediately
  menuToggle.classList.toggle('active');
  navList.classList.toggle('show');
});

// Close menu if clicking outside (on mobile)
document.addEventListener('click', (e) => {
  const clickedInsideMenu = navList.contains(e.target) || menuToggle.contains(e.target);
  if (!clickedInsideMenu && window.innerWidth <= 900) {
    navList.classList.remove('show');
    menuToggle.classList.remove('active');
  }
});

// Auto-close menu when clicking a nav link (on mobile)
$$('header nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      navList.classList.remove('show');
      menuToggle.classList.remove('active');
    }
  });
});

/* ====== Theme Toggle (with icon swap) ====== */
const themeToggle = $('#theme-toggle');
const applyThemeIcon = () => {
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};
applyThemeIcon();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  applyThemeIcon();
});

/* ====== Carousel ====== */
let currentIndex = 0;
const slidesContainer = $('.slides');
const slides = $$('.slide');
const prev = $('.prev');
const next = $('.next');

function showSlide(index) {
  const width = slides[0].clientWidth;
  slidesContainer.style.transform = `translateX(${-index * width}px)`;
  currentIndex = index;
}

function nextSlide() { showSlide((currentIndex + 1) % slides.length); }
function prevSlide() { showSlide((currentIndex - 1 + slides.length) % slides.length); }

if (next) next.addEventListener('click', nextSlide);
if (prev) prev.addEventListener('click', prevSlide);

let auto = setInterval(nextSlide, 5000);
const carouselEl = $('.carousel');
carouselEl.addEventListener('mouseenter', () => clearInterval(auto));
carouselEl.addEventListener('mouseleave', () => (auto = setInterval(nextSlide, 5000)));

window.addEventListener('resize', () => showSlide(currentIndex));

showSlide(0);



// Product filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    // add active class to clicked button
    button.classList.add("active");

    const category = button.getAttribute("data-cat");

    productCards.forEach(card => {
      if (category === "all" || card.getAttribute("data-cat") === category) {
        card.style.display = "block";
        card.style.animation = "fadeUpProd 0.8s forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});


// ✅ Simple Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMsg = document.getElementById("formMsg");

  if (!name || !email || !message) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  // Basic email regex
  const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailRegex.test(email)) {
    alert("⚠️ Please enter a valid email address.");
    return;
  }

  // Show success message
  formMsg.style.display = "block";
  document.getElementById("contactForm").reset();
});

                                                                                                                                                                                                                    