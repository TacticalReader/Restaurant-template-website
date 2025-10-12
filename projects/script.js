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
    "caesar salad", "tiramisu", "lobster tail",
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
        } else {
            // No results handling (placeholder)
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

    inp.addEventListener("input", function (e) {
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

                b.addEventListener("click", function (e) {
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
// Form Validation & Authentication
// =========================
document.addEventListener("DOMContentLoaded", function () {
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

            alert('Account created for ' + name + ' (' + email + ')!');
            userFormContainer.classList.remove('active');
            this.reset();
        });
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
