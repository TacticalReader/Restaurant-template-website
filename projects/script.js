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

document.querySelector('#search-icon').onclick = () =>{
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
}

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
  setInterval(loader, 3000);
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

if (!phoneNumberRegexIndia.test(phoneNumberInput.value.trim())) {
    valid = false;
    alert('Please enter a valid Indian phone number.');
}
