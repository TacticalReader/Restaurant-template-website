// =========================
// Navbar Toggle
// =========================
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('header .flex .navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

// =========================
// Active Link Highlight on Scroll
// =========================
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec => {
    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document
          .querySelector('header .navbar a[href*=' + id + ']')
          .classList.add('active');
      });
    }
  });
};

// =========================
// Search and Autocomplete
// =========================
const availableKeywords = [
  "spicy noodles", "fried chicken", "hot pizza", "grilled burger", "pasta alfredo",
  "seafood platter", "chicken curry", "veggie salad", "chocolate cake", "beef steak",
  "salmon fillet", "mushroom risotto", "lamb chops", "chicken wings", "shrimp scampi",
  "caesar salad", "tiramisu", "lobster tail", "butter chicken", "palak paneer", "chole bhature",
  "masala dosa", "idli sambar", "hyderabadi biryani",
  "home", "dishes", "about", "menu", "review", "order"
];

let searchBox = document.getElementById("search-box");
let autocompleteList = document.getElementById("autocomplete-list");
let searchIconLabel = document.querySelector('#search-form .search-input-group label');

// -------------------------
// Close Search Form
// -------------------------
function closeSearchForm() {
  document.querySelector('#search-form').classList.remove('active');
  searchBox.value = '';
  closeAllLists();
}

// -------------------------
// Perform Search
// -------------------------
function performSearch(searchTerm) {
  searchTerm = searchTerm.toLowerCase().trim();
  if (searchTerm) {
    console.log("Searching for: " + searchTerm);
    const targetSection = document.getElementById(searchTerm);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    closeSearchForm();
  } else {
    console.log("Search term is empty.");
  }
}

// -------------------------
// Autocomplete Function
// -------------------------
function autocomplete(inp, arr) {
  let currentFocus;

  inp.addEventListener("input", function () {
    let a, b, i, val = this.value;
    closeAllLists();
    if (!val) return false;
    currentFocus = -1;

    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);

    for (i = 0; i < arr.length; i++) {
      if (arr[i].toLowerCase().includes(val.toLowerCase())) {
        b = document.createElement("DIV");
        let matchIndex = arr[i].toLowerCase().indexOf(val.toLowerCase());
        let beforeMatch = arr[i].substr(0, matchIndex);
        let match = arr[i].substr(matchIndex, val.length);
        let afterMatch = arr[i].substr(matchIndex + val.length);

        b.innerHTML = beforeMatch + "<strong>" + match + "</strong>" + afterMatch;
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

        b.addEventListener("click", function () {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
          performSearch(inp.value);
        });

        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");

    if (e.keyCode == 40) { // DOWN arrow
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) { // UP arrow
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) { // ENTER key
      e.preventDefault();
      if (currentFocus > -1 && x) {
        x[currentFocus].click();
      } else {
        performSearch(inp.value);
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(searchBox, availableKeywords);

// -------------------------
// Search Icon Click Behavior
// -------------------------
document.querySelector('#search-icon').onclick = () => {
  const searchForm = document.querySelector('#search-form');
  if (searchForm.classList.contains('active')) {
    performSearch(searchBox.value);
  } else {
    searchForm.classList.add('active');
    searchBox.focus();
  }
};

searchIconLabel.onclick = (e) => {
  e.preventDefault();
  performSearch(searchBox.value);
};

document.querySelector('#close').onclick = closeSearchForm;

// =========================
// Swiper Sliders
// =========================
var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  breakpoints: {
    0: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

// =========================
// Loader
// =========================
function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
  setInterval(loader, 1000);
}

window.onload = fadeOut;

// =========================
// Back to Top Button
// =========================
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// =========================
// Form Validation & Authentication
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlElement = document.documentElement;

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      darkModeToggle.classList.remove('fa-moon');
      darkModeToggle.classList.add('fa-sun');
    } else {
      darkModeToggle.classList.remove('fa-sun');
      darkModeToggle.classList.add('fa-moon');
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    let valid = true;
    const nameInput = document.querySelector('input[type="text"][placeholder="enter your name"]');
    const numberInput = document.querySelector('input[type="number"][placeholder="enter your number"]');
    const orderInput = document.querySelector('input[type="text"][placeholder="enter food name"]');
    const quantityInput = document.querySelector('input[type="number"][placeholder="how many orders"]');
    const dateTimeInput = document.querySelector('input[type="datetime-local"]');
    const addressTextarea = document.querySelector('textarea[placeholder="enter your address"]');
    const messageTextarea = document.querySelector('textarea[placeholder="enter your message"]');

    if (!nameInput.value.trim()) { valid = false; alert('Please enter your name.'); }
    if (!numberInput.value.trim()) { valid = false; alert('Please enter your number.'); }
    if (!orderInput.value.trim()) { valid = false; alert('Please enter the food name for your order.'); }
    if (!quantityInput.value.trim()) { valid = false; alert('Please enter the quantity.'); }
    if (!dateTimeInput.value.trim()) { valid = false; alert('Please enter the date and time.'); }
    if (!addressTextarea.value.trim()) { valid = false; alert('Please enter your address.'); }
    if (!messageTextarea.value.trim()) { valid = false; alert('Please enter your message.'); }

    if (!valid) event.preventDefault();
  });

  // -------------------------
  // User Authentication
  // -------------------------
  let userIcon = document.querySelector('header .flex .icons .fa-user');
  let userFormContainer = document.querySelector('.user-form-container');
  let closeLoginForm = document.querySelector('#close-login-form');
  let loginForm = document.querySelector('#login-form');
  let signupForm = document.querySelector('#signup-form');
  let showSignupLink = document.querySelector('#show-signup');
  let showLoginLink = document.querySelector('#show-login');

  if (userIcon && userFormContainer && closeLoginForm && loginForm && signupForm && showSignupLink && showLoginLink) {
    userIcon.onclick = () => userFormContainer.classList.add('active');
    closeLoginForm.onclick = () => {
      userFormContainer.classList.remove('active');
      loginForm.reset();
      signupForm.reset();
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    };

    showSignupLink.onclick = (e) => {
      e.preventDefault();
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    };

    showLoginLink.onclick = (e) => {
      e.preventDefault();
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
    };

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value.trim();
      const password = this.querySelector('input[type="password"]').value.trim();

      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      alert('Login successful for ' + email + '!');
      userFormContainer.classList.remove('active');
      this.reset();
    });

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = this.querySelector('input[type="text"]').value.trim();
      const email = this.querySelector('input[type="email"]').value.trim();
      const password = this.querySelector('input[type="password"]').value.trim();
      const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value.trim();

      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      alert(`Account created for ${name} (${email})!`);
      userFormContainer.classList.remove('active');
      this.reset();
    });
  }

  // =========================
  // Newsletter Subscription
  // =========================
  const newsletterBtn = document.querySelector('.newsletter-btn');
  const newsletterEmailInput = document.querySelector('.email-input');

  if (newsletterBtn && newsletterEmailInput) {
    newsletterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = newsletterEmailInput.value.trim();
      if (email && email.includes('@') && email.includes('.')) {
        alert(`Thank you for subscribing, ${email}!`);
        newsletterEmailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // =========================
  // Menu Load More
  // =========================
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    const extraMenuItems = document.querySelectorAll('.extra-menu-item');

    if (extraMenuItems.length > 0) {
      loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        extraMenuItems.forEach(item => {
          item.classList.remove('hidden');
        });
        // Hide the button's container after loading
        loadMoreBtn.parentElement.style.display = 'none';
      });
    } else {
      // If no extra items are found, hide the button container
      loadMoreBtn.parentElement.style.display = 'none';
    }
  }
});

// =========================
// Image Lightbox/Gallery for Menu Items
// =========================
const lightboxOverlay = document.querySelector('.lightbox-overlay');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const menuImages = document.querySelectorAll('.menu .box-container .box .image img');

let currentImageIndex = 0;
let galleryImages = [];

// Populate galleryImages array and add click listeners
menuImages.forEach((img, index) => {
  galleryImages.push(img.getAttribute('data-large-src') || img.src);
  img.addEventListener('click', () => {
    currentImageIndex = index;
    openLightbox(galleryImages[currentImageIndex]);
  });
});

function openLightbox(imageSrc) {
  lightboxImage.src = imageSrc;
  lightboxOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex];
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex];
}

// Event listeners for lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Close lightbox on overlay click (but not on content click)
lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (lightboxOverlay.classList.contains('active')) {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') showNextImage();
    else if (e.key === 'ArrowLeft') showPrevImage();
  }
});

// =========================
// Phone Number Validation (Commented)
// =========================
/*
const phoneNumberInput = document.querySelector('input[type="tel"]');
const phoneNumberRegexIndia = /^[6-9]\d{9}$/;
if (!phoneNumberRegexIndia.test(phoneNumberInput.value.trim())) {
  valid = false;
  alert('Please enter a valid Indian phone number.');
}
*/
