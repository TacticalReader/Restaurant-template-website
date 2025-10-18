document.addEventListener('DOMContentLoaded', () => {

  // Data for menu items - easier to manage than hardcoded HTML
  const menuData = [
    { id: "menu-1", name: "beef steak", price: 22.99, image: "menu-1.jpg", description: "Tender grilled beef steak cooked to perfection with aromatic herbs.", category: "speciality" },
    { id: "menu-2", name: "salmon fillet", price: 19.99, image: "menu-2.jpg", description: "Fresh salmon fillet grilled with lemon butter and seasonal vegetables.", category: "speciality" },
    { id: "menu-3", name: "mushroom risotto", price: 16.99, image: "menu-3.jpg", description: "Creamy risotto with wild mushrooms and parmesan cheese.", category: "speciality" },
    { id: "menu-4", name: "lamb chops", price: 25.99, image: "menu-4.jpg", description: "Succulent lamb chops marinated in Mediterranean spices.", category: "speciality" },
    { id: "menu-5", name: "chicken wings", price: 13.99, image: "menu-5.jpg", description: "Crispy buffalo wings served with blue cheese dipping sauce.", category: "speciality" },
    { id: "menu-6", name: "shrimp scampi", price: 18.99, image: "menu-6.jpg", description: "Garlic butter shrimp served over linguine pasta with white wine.", category: "speciality" },
    { id: "menu-7", name: "caesar salad", price: 11.99, image: "menu-7.jpg", description: "Fresh romaine lettuce with croutons, parmesan and caesar dressing.", category: "speciality" },
    { id: "menu-8", name: "tiramisu", price: 8.99, image: "menu-8.jpg", description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.", category: "speciality" },
    { id: "menu-9", name: "lobster tail", price: 32.99, image: "menu-9.jpg", description: "Butter-poached lobster tail served with drawn butter and herbs.", category: "speciality" },
    { id: "menu-10", name: "Butter Chicken", price: 17.99, image: "menu-10.jpg", description: "Tender chicken in a creamy, spiced tomato and butter sauce.", category: "extra" },
    { id: "menu-11", name: "Palak Paneer", price: 15.99, image: "menu-11.jpg", description: "Indian cottage cheese cubes in a smooth, creamy spinach gravy.", category: "extra" },
    { id: "menu-12", name: "Chole Bhature", price: 14.99, image: "menu-12.jpg", description: "Spicy chickpea curry served with fluffy, deep-fried bread.", category: "extra" },
    { id: "menu-13", name: "Masala Dosa", price: 12.99, image: "menu-13.jpg", description: "Crispy rice crepe filled with a savory spiced potato mixture.", category: "extra" },
    { id: "menu-14", name: "Idli Sambar", price: 10.99, image: "menu-14.jpg", description: "Steamed rice cakes served with a tangy lentil-vegetable stew.", category: "extra" },
    { id: "menu-15", name: "Hyderabadi Biryani", price: 18.99, image: "menu-15.jpg", description: "Aromatic basmati rice and meat/veg cooked with saffron and spices.", category: "extra" }
  ];

  const app = {
    // =========================
    // INITIALIZATION
    // =========================
    init() {
      this.cacheDOMElements();
      this.setupGlobalEventListeners();
      this.navbar.init();
      this.sliders.init();
      this.search.init();
      this.loader.init();
      this.ui.init();
      this.forms.init();
      this.lightbox.init();
      this.menu.init();
      this.cart.init();
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
        orderForm: document.getElementById('orderForm'),
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
        menuContainer: document.querySelector('#menu .box-container'),
        toastContainer: document.getElementById('toast-container'),
        cartIcon: document.getElementById('cart-icon'),
        cartCount: document.getElementById('cart-count'),
        cartSidebar: document.getElementById('cart-sidebar'),
        cartOverlay: document.getElementById('cart-overlay'),
        closeCartBtn: document.getElementById('close-cart'),
        cartItemsContainer: document.getElementById('cart-items-container'),
        cartTotalPrice: document.getElementById('cart-total-price'),
        lightbox: {
          overlay: document.querySelector('.lightbox-overlay'),
          image: document.querySelector('.lightbox-image'),
          close: document.querySelector('.lightbox-close'),
          prev: document.querySelector('.lightbox-prev'),
          next: document.querySelector('.lightbox-next'),
        },
      };
    },

    // =========================
    // SETUP GLOBAL EVENT LISTENERS
    // =========================
    setupGlobalEventListeners() {
      // Event delegation for dynamically added elements
      document.body.addEventListener('click', (e) => {
        if (e.target.matches('.add-to-cart-btn')) {
          const item = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
            price: parseFloat(e.target.dataset.price),
            image: e.target.dataset.image,
          };
          this.cart.addItem(item);
          this.ui.showToast(`${item.name} added to cart!`);
        }
      });
    },

    // =========================
    // NAVBAR MODULE
    // =========================
    navbar: {
      init() {
        app.dom.menu.onclick = () => this.toggle();
        window.addEventListener('scroll', () => {
          this.hide();
          this.updateActiveLinkOnScroll();
        });
      },
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
            app.dom.navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`header .navbar a[href*=${id}]`);
            if (activeLink) activeLink.classList.add('active');
          }
        });
      },
    },

    // =========================
    // SEARCH MODULE
    // =========================
    search: {
      availableKeywords: [],
      currentFocus: -1,

      init() {
        this.generateKeywords();
        this.autocomplete(app.dom.searchBox, this.availableKeywords);
        app.dom.searchIcon.onclick = () => this.toggle();
        app.dom.searchIconLabel.onclick = (e) => {
          e.preventDefault();
          this.performSearch(app.dom.searchBox.value);
        };
        app.dom.searchClose.onclick = () => this.close();
      },

      generateKeywords() {
        const dishElements = document.querySelectorAll('#dishes .box h3, #menu .box h3');
        const sectionKeywords = ["home", "dishes", "about", "menu", "review", "order"];
        const dishKeywords = Array.from(dishElements).map(el => el.textContent.toLowerCase());
        this.availableKeywords = [...new Set([...sectionKeywords, ...dishKeywords, ...menuData.map(item => item.name.toLowerCase())])];
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
        document.querySelectorAll('.search-highlight').forEach(el => el.classList.remove('search-highlight'));
      },

      performSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return;

        this.hideNoResultsMessage();
        document.querySelectorAll('.search-highlight').forEach(el => el.classList.remove('search-highlight'));

        const targetSection = document.getElementById(term);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          this.close();
          return;
        }

        const allDishes = document.querySelectorAll('#dishes .box, #menu .box');
        const matchingDishes = Array.from(allDishes).filter(dish => {
          const dishName = dish.querySelector('h3')?.textContent.toLowerCase();
          const dishDescription = dish.querySelector('p')?.textContent.toLowerCase();
          return dishName?.includes(term) || dishDescription?.includes(term);
        });

        if (matchingDishes.length > 0) {
          matchingDishes.forEach(dish => dish.classList.add('search-highlight'));
          matchingDishes[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          this.close();
          setTimeout(() => {
            matchingDishes.forEach(dish => dish.classList.remove('search-highlight'));
          }, 3000);
        } else {
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
        if (messageEl) messageEl.style.display = 'none';
      },

      autocomplete(inp, arr) {
        inp.addEventListener("input", () => {
          this.hideNoResultsMessage();
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

        document.addEventListener("click", (e) => this.closeAllLists(e.target));
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
      init() {
        this.initTheme();
        app.dom.backToTopBtn.addEventListener('click', this.scrollToTop);
        if (app.dom.darkModeToggle) {
          app.dom.darkModeToggle.addEventListener('click', () => this.toggleTheme());
        }
        window.addEventListener('scroll', () => this.toggleBackToTopButton());
      },
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
      showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.classList.add('toast', `toast-${type}`);
        toast.textContent = message;
        app.dom.toastContainer.appendChild(toast);
        setTimeout(() => {
          toast.classList.add('hide');
          toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
      },
    },

    // =========================
    // FORMS MODULE
    // =========================
    forms: {
      init() {
        if (app.dom.orderForm) {
          app.dom.orderForm.addEventListener('submit', this.validateOrderForm);
        }
        this.initAuthForms();
        this.initNewsletter();
      },
      validateOrderForm(event) {
        event.preventDefault();
        const form = app.dom.orderForm;
        if (!form) return;

        let isFormValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        form.querySelectorAll('.input-group').forEach(group => {
            const input = group.querySelector('input, textarea');
            const errorEl = group.querySelector('.error-message');
            if (input) input.classList.remove('invalid');
            if (errorEl) errorEl.textContent = '';
        });

        requiredFields.forEach(field => {
            const group = field.closest('.input-group');
            const errorEl = group.querySelector('.error-message');
            let message = '';

            if (field.validity.valueMissing) {
                message = 'This field is required.';
            } else if (field.type === 'number' && field.validity.rangeUnderflow) {
                message = `Must be at least ${field.min}.`;
            } else if (field.type === 'datetime-local' && !field.value) {
                message = 'Please select a date and time.';
            } else if (!field.checkValidity()) {
                message = 'Please enter a valid value.';
            }

            if (message) {
                isFormValid = false;
                field.classList.add('invalid');
                if (errorEl) errorEl.textContent = message;
            } else {
                field.classList.remove('invalid');
                if (errorEl) errorEl.textContent = '';
            }
        });

        if (isFormValid) {
            app.ui.showToast('Order placed successfully! Thank you.');
            form.reset();
        } else {
            app.ui.showToast('Please correct the errors in the form.', 'error');
            form.querySelector('.invalid')?.focus();
        }
      },

      initAuthForms() {
        const { userIcon, userFormContainer, closeLoginForm, loginForm, signupForm, showSignupLink, showLoginLink } = app.dom;
        if (!userIcon || !userFormContainer) return;

        userIcon.onclick = () => userFormContainer.classList.add('active');
        const closeForm = () => {
          userFormContainer.classList.remove('active');
          loginForm.reset();
          signupForm.reset();
          loginForm.style.display = 'block';
          signupForm.style.display = 'none';
        };
        closeLoginForm.onclick = closeForm;

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
            app.ui.showToast(`Login successful for ${email}!`);
            closeForm();
          }
        });

        signupForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = signupForm.querySelector('input[type="text"]').value.trim();
          const email = signupForm.querySelector('input[type="email"]').value.trim();
          const password = signupForm.querySelector('input[type="password"]').value;
          const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

          if (password !== confirmPassword) {
            app.ui.showToast('Passwords do not match.', 'error');
            return;
          }
          if (name && email) {
            app.ui.showToast(`Account created for ${name} (${email})!`);
            closeForm();
          }
        });
      },

      initNewsletter() {
        const { newsletterBtn, newsletterEmailInput } = app.dom;
        if (newsletterBtn && newsletterEmailInput) {
          newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterEmailInput.value.trim();
            if (email && /^[\S]+@[\S]+\.[\S]+$/.test(email)) {
              app.ui.showToast(`Thank you for subscribing, ${email}!`);
              newsletterEmailInput.value = '';
            } else {
              app.ui.showToast('Please enter a valid email address.', 'error');
            }
          });
        }
      },
    },

    // =========================
    // MENU MODULE
    // =========================
    menu: {
      itemsPerPage: 9,
      currentPage: 1,
      init() {
        this.renderMenu();
        app.dom.loadMoreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.loadMore();
        });
      },
      renderMenu() {
        const menuItems = menuData.slice(0, this.itemsPerPage);
        app.dom.menuContainer.innerHTML = menuItems.map(item => this.createMenuItemHTML(item)).join('');
        if (menuData.length <= this.itemsPerPage) {
          app.dom.loadMoreBtn.parentElement.style.display = 'none';
        }
      },
      loadMore() {
        this.currentPage++;
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = this.currentPage * this.itemsPerPage;
        const newItems = menuData.slice(start, end);
        app.dom.menuContainer.insertAdjacentHTML('beforeend', newItems.map(item => this.createMenuItemHTML(item)).join(''));
        if (end >= menuData.length) {
          app.dom.loadMoreBtn.parentElement.style.display = 'none';
        }
      },
      createMenuItemHTML(item) {
        return `
          <div class="box">
            <div class="image">
              <img src="${item.image}" data-large-src="${item.image}" alt="${item.name}" class="menu-item-image">
              <a href="#" class="fas fa-heart" aria-label="Add to favorites"></a>
            </div>
            <div class="content">
              <div class="stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
              </div>
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <button class="btn add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">add to cart</button>
              <span class="price">$${item.price.toFixed(2)}</span>
            </div>
          </div>
        `;
      },
    },

    // =========================
    // LIGHTBOX MODULE
    // =========================
    lightbox: {
      currentImageIndex: 0,
      galleryImages: [],

      init() {
        const { overlay, close, next, prev } = app.dom.lightbox;
        // Use event delegation for dynamically added menu images
        app.dom.menuContainer.addEventListener('click', (e) => {
          if (e.target.classList.contains('menu-item-image')) {
            this.galleryImages = Array.from(app.dom.menuContainer.querySelectorAll('.menu-item-image')).map(img => img.getAttribute('data-large-src') || img.src);
            this.currentImageIndex = this.galleryImages.indexOf(e.target.getAttribute('data-large-src') || e.target.src);
            this.open(this.galleryImages[this.currentImageIndex]);
          }
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

    // =========================
    // CART MODULE
    // =========================
    cart: {
      items: [],
      init() {
        this.loadFromStorage();
        app.dom.cartIcon.addEventListener('click', () => this.toggle());
        app.dom.closeCartBtn.addEventListener('click', () => this.toggle());
        app.dom.cartOverlay.addEventListener('click', () => this.toggle());
        app.dom.cartItemsContainer.addEventListener('click', (e) => {
          if (e.target.classList.contains('cart-item-remove')) {
            const id = e.target.dataset.id;
            this.removeItem(id);
          }
        });
        app.dom.cartItemsContainer.addEventListener('change', (e) => {
          if (e.target.classList.contains('cart-item-quantity')) {
            const id = e.target.dataset.id;
            const quantity = parseInt(e.target.value, 10);
            this.updateQuantity(id, quantity);
          }
        });
      },
      toggle() {
        app.dom.cartSidebar.classList.toggle('active');
        app.dom.cartOverlay.classList.toggle('active');
      },
      addItem(itemToAdd) {
        const existingItem = this.items.find(item => item.id === itemToAdd.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.items.push({ ...itemToAdd, quantity: 1 });
        }
        this.render();
        this.saveToStorage();
      },
      removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.render();
        this.saveToStorage();
      },
      updateQuantity(id, quantity) {
        const itemToUpdate = this.items.find(item => item.id === id);
        if (itemToUpdate) {
          if (quantity > 0) {
            itemToUpdate.quantity = quantity;
          } else {
            this.removeItem(id);
          }
        }
        this.render();
        this.saveToStorage();
      },
      calculateTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      render() {
        if (this.items.length === 0) {
          app.dom.cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        } else {
          app.dom.cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
              </div>
              <div class="cart-item-actions">
                <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="cart-item-remove" data-id="${item.id}">&times;</button>
              </div>
            </div>
          `).join('');
        }
        app.dom.cartTotalPrice.textContent = `$${this.calculateTotal().toFixed(2)}`;
        this.updateCartIcon();
      },
      updateCartIcon() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        app.dom.cartCount.textContent = totalItems;
        app.dom.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
      },
      saveToStorage() {
        localStorage.setItem('restoCart', JSON.stringify(this.items));
      },
      loadFromStorage() {
        const storedCart = localStorage.getItem('restoCart');
        if (storedCart) {
          this.items = JSON.parse(storedCart);
        }
        this.render();
      },
    },
  };

  app.init();

});
