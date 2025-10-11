let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('header .flex .navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

// Array of available search terms (food items, section names)
const availableKeywords = [
    "spicy noodles", "fried chicken", "hot pizza", "grilled burger", "pasta alfredo",
    "seafood platter", "chicken curry", "veggie salad", "chocolate cake", "beef steak",
    "salmon fillet", "mushroom risotto", "lamb chops", "chicken wings", "shrimp scampi",
    "caesar salad", "tiramisu", "lobster tail",
    "home", "dishes", "about", "menu", "review", "order"
];

let searchBox = document.getElementById("search-box");
let autocompleteList = document.getElementById("autocomplete-list");
let searchIconLabel = document.querySelector('#search-form .search-input-group label'); // The search icon label within the group

// Function to close the search form
function closeSearchForm() {
    document.querySelector('#search-form').classList.remove('active');
    searchBox.value = ''; // Clear search box on close
    closeAllLists(); // Clear autocomplete suggestions
}

// Function to perform the search
function performSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    if (searchTerm) {
        console.log("Searching for: " + searchTerm);
        // Here you would implement actual search logic, e.g.:
        // 1. Filter displayed dishes/menu items
        // 2. Scroll to a section if the term matches a section ID
        // 3. Display search results on a dedicated page

        // For this enhancement, we'll simulate a search by logging and closing the form.
        // Optional: Scroll to section if it matches
        const targetSection = document.getElementById(searchTerm);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If not a section, maybe highlight relevant text or show a "no results" message
            // This would require more complex DOM manipulation or a dedicated search results area.
            // For now, just log.
        }
        closeSearchForm();
    } else {
        console.log("Search term is empty.");
    }
}

// Autocomplete logic
function autocomplete(inp, arr) {
    let currentFocus;

    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a); // Append to the wrapper div

        for (i = 0; i < arr.length; i++) {
            if (arr[i].toLowerCase().includes(val.toLowerCase())) { // Use includes for broader matching
                b = document.createElement("DIV");
                // Highlight the matching part
                let matchIndex = arr[i].toLowerCase().indexOf(val.toLowerCase());
                let beforeMatch = arr[i].substr(0, matchIndex);
                let match = arr[i].substr(matchIndex, val.length);
                let afterMatch = arr[i].substr(matchIndex + val.length);

                b.innerHTML = beforeMatch + "<strong>" + match + "</strong>" + afterMatch;
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                    performSearch(inp.value); // Trigger search on selection
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function(e) {
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
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            } else {
                // If no suggestion is selected, perform search with current input value
                performSearch(inp.value);
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
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

// Initialize autocomplete
autocomplete(searchBox, availableKeywords);

// Modify search icon click in header to trigger search or open form
document.querySelector('#search-icon').onclick = () => {
    if (document.querySelector('#search-form').classList.contains('active')) {
        performSearch(searchBox.value);
    } else {
        document.querySelector('#search-form').classList.add('active');
        searchBox.focus(); // Focus the search box when opened
    }
};

// Modify the label inside the search form to trigger search
searchIconLabel.onclick = (e) => {
    e.preventDefault(); // Prevent any default label behavior
    performSearch(searchBox.value);
};

// Modify close button to use the new close function
document.querySelector('#close').onclick = closeSearchForm;

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
  loop:true,
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
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 1000);
}

window.onload = fadeOut;


    document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector('form');

        form.addEventListener('submit', function (event) {
            let valid = true;

            // Validation for name
            const nameInput = document.querySelector('input[type="text"][placeholder="enter your name"]');
            if (!nameInput.value.trim()) {
                valid = false;
                alert('Please enter your name.');
            }

            // Validation for number
            const numberInput = document.querySelector('input[type="number"][placeholder="enter your number"]');
            if (!numberInput.value.trim()) {
                valid = false;
                alert('Please enter your number.');
            }

            // Validation for order
            const orderInput = document.querySelector('input[type="text"][placeholder="enter food name"]');
            if (!orderInput.value.trim()) {
                valid = false;
                alert('Please enter the food name for your order.');
            }

            // Validation for how much
            const quantityInput = document.querySelector('input[type="number"][placeholder="how many orders"]');
            if (!quantityInput.value.trim()) {
                valid = false;
                alert('Please enter the quantity.');
            }

            // Validation for date and time
            const dateTimeInput = document.querySelector('input[type="datetime-local"]');
            if (!dateTimeInput.value.trim()) {
                valid = false;
                alert('Please enter the date and time.');
            }

            // Validation for address
            const addressTextarea = document.querySelector('textarea[placeholder="enter your address"]');
            if (!addressTextarea.value.trim()) {
                valid = false;
                alert('Please enter your address.');
            }

            // Validation for message
            const messageTextarea = document.querySelector('textarea[placeholder="enter your message"]');
            if (!messageTextarea.value.trim()) {
                valid = false;
                alert('Please enter your message.');
            }

            if (!valid) {
                event.preventDefault(); // Prevents the form from submitting if validation fails
            }
        });
    });

const phoneNumberInput = document.querySelector('input[type="tel"]');
const phoneNumberRegexIndia = /^[6-9]\d{9}$/;

// This block of code is problematic as phoneNumberInput might be null if no input[type="tel"] exists
// and it's outside the DOMContentLoaded, potentially causing errors. 
// Also, it's not clear where phoneNumberInput is defined or used in the original context.
// Assuming it's meant for a specific input, it should be placed within a relevant event listener or function.
// For now, commenting it out to prevent errors, as the search functionality is the primary focus.
/*
if (!phoneNumberRegexIndia.test(phoneNumberInput.value.trim())) {
    valid = false;
    alert('Please enter a valid Indian phone number.');
}
*/
