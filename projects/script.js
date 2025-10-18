document.addEventListener('DOMContentLoaded', () => {

  const app = {
    // =========================
    // INITIALIZATION
    // =========================
    init() {
      this.cacheDOMElements();
      this.setupEventListeners();
      this.sliders.init();
      this.search.init();
      this.loader.init();
      this.ui.initTheme();
    },

    // =========================
    // CACHE DOM ELEMENTS
    // =========================
    cacheDOMElements() {
      this.dom = {
        menu: document.querySelector('#menu-bars'),
        navbar: document.querySelector('header .flex .navbar'),
        sections: document.querySelectorAll('section'),
        navLinks: document.querySelectorAll('header .navbar a'),
        searchIcon: document.querySelector('#search-icon'),
        searchForm: document.querySelector('#search-form'),
        searchBox: document.getElementById('search-box'),
        searchIconLabel: document.querySelector('#search-form .search-input-group label'),
        searchClose: document.querySelector('#close'),
        loaderContainer: document.querySelector('.loader-container'),
        backToTopBtn: document.getElementById('backToTopBtn'),
        darkModeToggle: document.getElementById('darkModeToggle'),
        htmlElement: document.documentElement,
        orderForm: document.querySelector('#order form'),
        userIcon: document.querySelector('header .flex .icons .fa-user'),
        userFormContainer: document.querySelector('.user-form-container'),
        closeLoginForm: document.querySelector('#close-login-form'),
        loginForm: document.querySelector('#login-form'),
        signupForm: document.querySelector('#signup-form'),
        showSignupLink: document.querySelector('#show-signup'),
        showLoginLink: document.querySelector('#show-login'),
        newsletterBtn: document.querySelector('.newsletter-btn'),
        newsletterEmailInput: document.querySelector('.email-input'),
        loadMoreBtn: document.getElementById('loadMoreBtn'),
        lightbox: {
          overlay: document.querySelector('.lightbox-overlay'),
          image: document.querySelector('.lightbox-image'),
          close: document.querySelector('.lightbox-close'),
          prev: document.querySelector('.lightbox-prev'),
          next: document.querySelector('.lightbox-next'),
          menuImages: document.querySelectorAll('.menu .box-container .box .image img'),
        },
      };
    },

    // =========================
    // SETUP EVENT LISTENERS
    // =========================
    setupEventListeners() {
      this.dom.menu.onclick = () => this.navbar.toggle();
      window.onscroll = () => {
        this.navbar.hide();
        this.navbar.updateActiveLinkOnScroll();
        this.ui.toggleBackToTopButton();
      };

      this.dom.searchIcon.onclick = () => this.search.toggle();
      this.dom.searchIconLabel.onclick = (e) => {
        e.preventDefault();
        this.search.performSearch(this.dom.searchBox.value);
      };
      this.dom.searchClose.onclick = () => this.search.close();

      this.dom.backToTopBtn.addEventListener('click', this.ui.scrollToTop);
      if (this.dom.darkModeToggle) {
        this.dom.darkModeToggle.addEventListener('click', () => this.ui.toggleTheme());
      }

      if (this.dom.orderForm) {
        this.dom.orderForm.addEventListener('submit', this.forms.validateOrderForm);
      }

      this.forms.initAuthForms();
      this.forms.initNewsletter();
      this.ui.initLoadMore();
      this.lightbox.init();
    },

    // =========================
    // NAVBAR MODULE
    // =========================
    navbar: {
      toggle() {
        app.dom.menu.classList.toggle('fa-times');
        app.dom.navbar.classList.toggle('active');
      },
      hide() {
        app.dom.menu.classList.remove('fa-times');
        app.dom.navbar.classList.remove('active');
      },
      updateActiveLinkOnScroll() {
        app.dom.sections.forEach(sec => {
          const top = window.scrollY;
          const height = sec.offsetHeight;
          const offset = sec.offsetTop - 150;
          const id = sec.getAttribute('id');

          if (top >= offset && top < offset + height) {
            app.dom.navLinks.forEach(link => {
              link.classList.remove('active');
            });
            const activeLink = document.querySelector(`header .navbar a[href*=${id}]`);
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        });
      },
    },

    // =========================
    // SEARCH MODULE
    // =========================
    search: {
      availableKeywords: [], // Will be populated dynamically
      currentFocus: -1,

      init() {
        this.generateKeywords();
        this.autocomplete(app.dom.searchBox, this.availableKeywords);
      },

      generateKeywords() {
        const dishElements = document.querySelectorAll('#dishes .box h3, #menu .box h3');
        const sectionKeywords = ["home", "dishes", "about", "menu", "review", "order"];
        const dishKeywords = Array.from(dishElements).map(el => el.textContent.toLowerCase());
        this.availableKeywords = [...new Set([...sectionKeywords, ...dishKeywords])];
      },

      toggle() {
        if (app.dom.searchForm.classList.contains('active')) {
          this.performSearch(app.dom.searchBox.value);
        } else {
          app.dom.searchForm.classList.add('active');
          app.dom.searchBox.focus();
        }
      },

      close() {
        app.dom.searchForm.classList.remove('active');
        app.dom.searchBox.value = '';
        this.closeAllLists();
        this.hideNoResultsMessage();
        // Remove highlights when search is closed manually
        document.querySelectorAll('.search-highlight').forEach(el => el.classList.remove('search-highlight'));
      },

      performSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        if (!term) {
          console.log("Search term is empty.");
          return;
        }

        this.hideNoResultsMessage();
        document.querySelectorAll('.search-highlight').forEach(el => el.classList.remove('search-highlight'));

        // 1. Check for section ID
        const targetSection = document.getElementById(term);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          this.close();
          return;
        }

        // 2. Search for dish by name or description
        const allDishes = document.querySelectorAll('#dishes .box, #menu .box');
        const matchingDishes = [];

        allDishes.forEach(dish => {
          const dishName = dish.querySelector('h3')?.textContent.toLowerCase();
          const dishDescription = dish.querySelector('p')?.textContent.toLowerCase();

          if (dishName?.includes(term) || (dishDescription && dishDescription.includes(term))) {
            matchingDishes.push(dish);
          }
        });

        if (matchingDishes.length > 0) {
          matchingDishes.forEach(dish => dish.classList.add('search-highlight'));
          matchingDishes[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          this.close();

          setTimeout(() => {
            matchingDishes.forEach(dish => dish.classList.remove('search-highlight'));
          }, 3000); // Highlight for 3 seconds
        } else {
          // 3. No match found
          this.showNoResultsMessage(searchTerm);
        }
      },

      showNoResultsMessage(term) {
        let messageEl = document.getElementById('search-no-results');
        if (!messageEl) {
          messageEl = document.createElement('p');
          messageEl.id = 'search-no-results';
          app.dom.searchBox.parentNode.appendChild(messageEl);
        }
        messageEl.textContent = `No results found for "${term}"`;
        messageEl.style.display = 'block';
      },

      hideNoResultsMessage() {
        const messageEl = document.getElementById('search-no-results');
        if (messageEl) {
          messageEl.style.display = 'none';
        }
      },

      autocomplete(inp, arr) {
        inp.addEventListener("input", () => {
          this.hideNoResultsMessage(); // Hide message on new input
          let val = inp.value;
          this.closeAllLists();
          if (!val) return false;
          this.currentFocus = -1;

          const list = document.createElement("DIV");
          list.setAttribute("id", inp.id + "autocomplete-list");
          list.setAttribute("class", "autocomplete-items");
          inp.parentNode.appendChild(list);

          arr.forEach(item => {
            if (item.toLowerCase().includes(val.toLowerCase())) {
              const itemDiv = document.createElement("DIV");
              const matchIndex = item.toLowerCase().indexOf(val.toLowerCase());
              itemDiv.innerHTML = item.substr(0, matchIndex) +
                                `<strong>${item.substr(matchIndex, val.length)}</strong>` +
                                item.substr(matchIndex + val.length);
              itemDiv.innerHTML += `<input type='hidden' value='${item}'>`;

              itemDiv.addEventListener("click", () => {
                inp.value = itemDiv.getElementsByTagName("input")[0].value;
                this.closeAllLists();
                this.performSearch(inp.value);
              });
              list.appendChild(itemDiv);
            }
          });
        });

        inp.addEventListener("keydown", (e) => {
          let x = document.getElementById(inp.id + "autocomplete-list");
          if (x) x = x.getElementsByTagName("div");

          if (e.key === 'ArrowDown') {
            this.currentFocus++;
            this.addActive(x);
          } else if (e.key === 'ArrowUp') {
            this.currentFocus--;
            this.addActive(x);
          } else if (e.key === 'Enter') {
            e.preventDefault();
            if (this.currentFocus > -1 && x) {
              x[this.currentFocus].click();
            } else {
              this.performSearch(inp.value);
            }
          }
        });

        document.addEventListener("click", (e) => {
          this.closeAllLists(e.target);
        });
      },

      addActive(x) {
        if (!x) return false;
        this.removeActive(x);
        if (this.currentFocus >= x.length) this.currentFocus = 0;
        if (this.currentFocus < 0) this.currentFocus = x.length - 1;
        x[this.currentFocus].classList.add("autocomplete-active");
      },

      removeActive(x) {
        for (let i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      },

      closeAllLists(elmnt) {
        const items = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < items.length; i++) {
          if (elmnt != items[i] && elmnt != app.dom.searchBox) {
            items[i].parentNode.removeChild(items[i]);
          }
        }
      },
    },

    // =========================
    // SWIPER SLIDERS
    // =========================
    sliders: {
      init() {
        new Swiper(".home-slider", {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: { delay: 7500, disableOnInteraction: false },
          pagination: { el: ".swiper-pagination", clickable: true },
          loop: true,
        });

        new Swiper(".review-slider", {
          spaceBetween: 20,
          centeredSlides: true,
          autoplay: { delay: 7500, disableOnInteraction: false },
          pagination: { el: ".swiper-pagination", clickable: true },
          loop: true,
          breakpoints: {
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
        });
      },
    },

    // =========================
    // LOADER
    // =========================
    loader: {
      init() {
        setTimeout(this.fadeOut, 1000);
      },
      fadeOut() {
        app.dom.loaderContainer.classList.add('fade-out');
      },
    },

    // =========================
    // UI COMPONENTS
    // =========================
    ui: {
      toggleBackToTopButton() {
        if (window.scrollY > 300) {
          app.dom.backToTopBtn.style.display = 'block';
        } else {
          app.dom.backToTopBtn.style.display = 'none';
        }
      },
      scrollToTop(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
          this.setTheme(savedTheme);
        } else if (prefersDark) {
          this.setTheme('dark');
        } else {
          this.setTheme('light');
        }
      },
      setTheme(theme) {
        app.dom.htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
          app.dom.darkModeToggle.classList.replace('fa-moon', 'fa-sun');
        } else {
          app.dom.darkModeToggle.classList.replace('fa-sun', 'fa-moon');
        }
      },
      toggleTheme() {
        const currentTheme = app.dom.htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
      },
      initLoadMore() {
        const btn = app.dom.loadMoreBtn;
        if (btn) {
          const extraMenuItems = document.querySelectorAll('.extra-menu-item');
          if (extraMenuItems.length > 0) {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              extraMenuItems.forEach(item => item.classList.remove('hidden'));
              btn.parentElement.style.display = 'none';
            });
          } else {
            btn.parentElement.style.display = 'none';
          }
        }
      },
    },

    // =========================
    // FORMS MODULE
    // =========================
    forms: {
      validateOrderForm(event) {
        let valid = true;
        const inputs = [
          app.dom.orderForm.querySelector('input[placeholder="enter your name"]'),
          app.dom.orderForm.querySelector('input[placeholder="enter your number"]'),
          app.dom.orderForm.querySelector('input[placeholder="enter food name"]'),
          app.dom.orderForm.querySelector('input[placeholder="how many orders"]'),
          app.dom.orderForm.querySelector('input[type="datetime-local"]'),
          app.dom.orderForm.querySelector('textarea[placeholder="enter your address"]'),
          app.dom.orderForm.querySelector('textarea[placeholder="enter your message"]'),
        ];

        inputs.forEach(input => {
          if (!input.value.trim()) {
            valid = false;
            // In a real app, you'd show a message next to the input
            // For now, we'll just alert once.
          }
        });

        if (!valid) {
          event.preventDefault();
          alert('Please fill out all required fields.');
        }
      },

      initAuthForms() {
        const { userIcon, userFormContainer, closeLoginForm, loginForm, signupForm, showSignupLink, showLoginLink } = app.dom;
        if (!userIcon || !userFormContainer) return;

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

        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = loginForm.querySelector('input[type="email"]').value.trim();
          if (email) {
            alert(`Login successful for ${email}!`);
            closeLoginForm.onclick();
          }
        });

        signupForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = signupForm.querySelector('input[type="text"]').value.trim();
          const email = signupForm.querySelector('input[type="email"]').value.trim();
          const password = signupForm.querySelector('input[type="password"]').value;
          const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

          if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
          }
          if (name && email) {
            alert(`Account created for ${name} (${email})!`);
            closeLoginForm.onclick();
          }
        });
      },

      initNewsletter() {
        const { newsletterBtn, newsletterEmailInput } = app.dom;
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
      },
    },

    // =========================
    // LIGHTBOX MODULE
    // =========================
    lightbox: {
      currentImageIndex: 0,
      galleryImages: [],

      init() {
        const { menuImages, overlay, close, next, prev } = app.dom.lightbox;
        menuImages.forEach((img, index) => {
          this.galleryImages.push(img.getAttribute('data-large-src') || img.src);
          img.addEventListener('click', () => {
            this.currentImageIndex = index;
            this.open(this.galleryImages[this.currentImageIndex]);
          });
        });

        close.addEventListener('click', () => this.close());
        next.addEventListener('click', () => this.showNext());
        prev.addEventListener('click', () => this.showPrev());
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) this.close();
        });
        document.addEventListener('keydown', (e) => {
          if (overlay.classList.contains('active')) {
            if (e.key === 'Escape') this.close();
            else if (e.key === 'ArrowRight') this.showNext();
            else if (e.key === 'ArrowLeft') this.showPrev();
          }
        });
      },

      open(imageSrc) {
        app.dom.lightbox.image.src = imageSrc;
        app.dom.lightbox.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      },

      close() {
        app.dom.lightbox.overlay.classList.remove('active');
        document.body.style.overflow = '';
      },

      showNext() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
        app.dom.lightbox.image.src = this.galleryImages[this.currentImageIndex];
      },

      showPrev() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
        app.dom.lightbox.image.src = this.galleryImages[this.currentImageIndex];
      },
    },
  };

  app.init();

});
