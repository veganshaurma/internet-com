/* ============================================================
   Internet Com LLC — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Current year (footer + legal pages) ─────────────── */
  var currentYear = new Date().getFullYear();
  document.querySelectorAll('.year-current').forEach(function(el) {
    el.textContent = currentYear;
  });

  /* ── Burger Menu ──────────────────────────────────────── */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      const isOpen = burger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Header shadow on scroll ──────────────────────────── */
  const header = document.querySelector('.header');

  if (header) {
    var prevScroll = 0;
    function onScroll() {
      var scroll = window.scrollY;
      header.classList.toggle('scrolled', scroll > 10);
      prevScroll = scroll;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Fade-up animations (IntersectionObserver) ─────────── */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Accordion ─────────────────────────────────────────── */
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var body = header.nextElementSibling;
      var isOpen = header.classList.contains('open');

      // Close all in same accordion group
      var accordionParent = header.closest('.accordion');
      if (accordionParent) {
        accordionParent.querySelectorAll('.accordion-header.open').forEach(function (h) {
          if (h !== header) {
            h.classList.remove('open');
            h.nextElementSibling.classList.remove('open');
          }
        });
      }

      header.classList.toggle('open', !isOpen);
      if (body) body.classList.toggle('open', !isOpen);
    });
  });

  /* ── Vacancy accordion (EN pages) ─────────────────────── */
  // toggleVacancy is called via onclick attribute in EN career page
  window.toggleVacancy = function(headerEl) {
    var accordion = headerEl.closest('.vacancy-accordion');
    if (!accordion) return;
    var body = accordion.querySelector('.vacancy-accordion-body');
    var toggle = accordion.querySelector('.vacancy-toggle');
    var isOpen = body && body.classList.contains('open');
    if (body) body.classList.toggle('open', !isOpen);
    if (toggle) toggle.classList.toggle('open', !isOpen);
  };

  // updateFileName is called via onchange attribute in EN career page
  window.updateFileName = function(input) {
    var label = document.getElementById('fileName');
    if (label && input.files && input.files[0]) {
      label.textContent = input.files[0].name;
      var wrapper = input.closest('.file-input-label');
      if (wrapper) wrapper.classList.add('has-file');
    }
  };

  /* ── EN Career Form (resumeForm) ───────────────────────── */
  var resumeForm = document.getElementById('resumeForm');
  if (resumeForm) {
    resumeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var valid = true;

      // Validate name
      var nameInput = resumeForm.querySelector('#name');
      var nameError = document.getElementById('name-error');
      if (nameInput && !nameInput.value.trim()) {
        nameInput.classList.add('is-error');
        if (nameError) nameError.classList.add('visible');
        valid = false;
      } else if (nameInput) {
        nameInput.classList.remove('is-error');
        if (nameError) nameError.classList.remove('visible');
      }

      // Validate email
      var emailInput = resumeForm.querySelector('#email');
      var emailError = document.getElementById('email-error');
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && (!emailInput.value.trim() || !emailRe.test(emailInput.value))) {
        emailInput.classList.add('is-error');
        if (emailError) emailError.classList.add('visible');
        valid = false;
      } else if (emailInput) {
        emailInput.classList.remove('is-error');
        if (emailError) emailError.classList.remove('visible');
      }

      // Validate position
      var positionInput = resumeForm.querySelector('#position');
      var positionError = document.getElementById('position-error');
      if (positionInput && !positionInput.value) {
        positionInput.classList.add('is-error');
        if (positionError) positionError.classList.add('visible');
        valid = false;
      } else if (positionInput) {
        positionInput.classList.remove('is-error');
        if (positionError) positionError.classList.remove('visible');
      }

      if (!valid) return;

      var btn = resumeForm.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; }

      setTimeout(function() {
        resumeForm.style.display = 'none';
        var success = document.getElementById('formSuccess');
        if (success) {
          success.classList.add('visible');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 700);
    });
  }

  /* ── Vacancy accordion ─────────────────────────────────── */
  document.querySelectorAll('.vacancy-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var body = header.nextElementSibling;
      var isOpen = header.classList.contains('open');

      header.classList.toggle('open', !isOpen);
      if (body) body.classList.toggle('open', !isOpen);
    });
  });

  /* ── Career Form ───────────────────────────────────────── */
  var careerForm = document.getElementById('careerForm');

  if (careerForm) {
    careerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = validateCareerForm();
      if (!valid) return;

      // Simulate submission
      var btn = careerForm.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = btn.dataset.loading || '...';

      setTimeout(function () {
        careerForm.style.display = 'none';
        var success = document.getElementById('formSuccess');
        if (success) {
          success.classList.add('visible');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 800);
    });

    // Live validation
    careerForm.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      field.addEventListener('input', function () {
        if (field.classList.contains('error')) validateField(field);
      });
    });
  }

  function validateCareerForm() {
    var valid = true;
    var fields = careerForm.querySelectorAll('[required]');
    fields.forEach(function (field) {
      if (!validateField(field)) valid = false;
    });
    return valid;
  }

  function validateField(field) {
    var errorEl = field.parentElement.querySelector('.form-error');
    var value = field.value.trim();
    var isValid = true;

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      if (errorEl) {
        errorEl.textContent = errorEl.dataset.required || 'Обязательное поле';
        errorEl.classList.add('visible');
      }
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
      isValid = false;
      if (errorEl) {
        errorEl.textContent = errorEl.dataset.email || 'Введите корректный email';
        errorEl.classList.add('visible');
      }
    } else {
      if (errorEl) errorEl.classList.remove('visible');
    }

    field.classList.toggle('error', !isValid);
    return isValid;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ── Smooth scroll for anchor links ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerH = header ? header.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Active nav link ───────────────────────────────────── */
  var currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    // Normalize
    var normHref = href.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
    var normPath = currentPath.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
    if (normPath === normHref || (normHref !== '/' && normHref !== '/en' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
  });

})();
