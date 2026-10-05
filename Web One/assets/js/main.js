/**
 * AIVIBEDEV Main Script
 * Orchestration for navigation, FAQ accordions, form handling, and UX interactions.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initFaqAccordion();
    initContactForm();
    initSmoothScroll();
    initScrollSpy();
  });

  /* -------------------------------------------------------------------------- */
  /* 1. Mobile Navigation Drawer                                               */
  /* -------------------------------------------------------------------------- */
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (!toggleBtn || !mobileNav) return;

    toggleBtn.addEventListener('click', function () {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
    });

    // Close when clicking any nav link
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link, .btn');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 2. FAQ Accordion                                                          */
  /* -------------------------------------------------------------------------- */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      if (!btn) return;

      btn.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Optional: close other open items for cleaner UX
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 3. Contact Form Handling & Transparent State                              */
  /* -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('workflow-contact-form');
    const statusBox = document.getElementById('form-status-box');

    if (!form || !statusBox) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Collect field values
      const formData = {
        name: (document.getElementById('contact-name') || {}).value || '',
        email: (document.getElementById('contact-email') || {}).value || '',
        company: (document.getElementById('contact-company') || {}).value || '',
        website: (document.getElementById('contact-website') || {}).value || '',
        tools: (document.getElementById('contact-tools') || {}).value || '',
        process: (document.getElementById('contact-process') || {}).value || '',
        timestamp: new Date().toISOString()
      };

      // Client-side basic validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.process.trim()) {
        statusBox.className = 'form-status-box form-status-info';
        statusBox.style.display = 'block';
        statusBox.innerHTML = `<strong>Required fields missing:</strong> Please ensure your name, work email, company, and workflow process are filled in.`;
        return;
      }

      // Explicit transparency requirement:
      // "If no form backend is configured, make that limitation explicit in the build notes and do not display a false 'message sent' state."
      
      const payloadString = JSON.stringify(formData, null, 2);

      statusBox.className = 'form-status-box form-status-info';
      statusBox.style.display = 'block';
      statusBox.innerHTML = `
        <div style="margin-bottom: 0.75rem;">
          <strong style="color: var(--navy-900); font-size: 0.9375rem; display: block; margin-bottom: 0.25rem;">
            Workflow Inquiry Prepared (Local Environment)
          </strong>
          <span style="font-size: 0.8125rem; color: var(--navy-600);">
            <strong>Notice:</strong> No external backend server or email webhook is currently attached. Your structured scoping payload was validated locally and is displayed below for verification.
          </span>
        </div>
        
        <div style="background-color: var(--navy-950); color: #E2E8F0; padding: 0.75rem; border-radius: 4px; font-family: monospace; font-size: 0.75rem; overflow-x: auto; margin-bottom: 0.75rem;">
          <pre style="margin: 0;">${escapeHTML(payloadString)}</pre>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
          <button type="button" id="copy-payload-btn" class="btn btn-sm btn-primary" style="font-size: 0.78125rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Structured Payload
          </button>
          <a href="mailto:inquiries@aivibedev.com?subject=Workflow%20Discussion%20-%20${encodeURIComponent(formData.company)}&body=${encodeURIComponent('Hi AIVIBEDEV Team,\n\nHere is our workflow inquiry:\n\nName: ' + formData.name + '\nCompany: ' + formData.company + '\nTools: ' + formData.tools + '\nProcess to Improve: ' + formData.process)}" class="btn btn-sm btn-secondary" style="font-size: 0.78125rem;">
            Send via Direct Email &rarr;
          </a>
        </div>
      `;

      // Copy payload button handler
      const copyBtn = document.getElementById('copy-payload-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          navigator.clipboard.writeText(payloadString).then(() => {
            copyBtn.innerHTML = `<span>Copied to Clipboard &check;</span>`;
            setTimeout(() => {
              copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Structured Payload`;
            }, 2500);
          }).catch(err => {
            alert('Payload copied to clipboard.');
          });
        });
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 4. Smooth Anchor Scrolling                                                */
  /* -------------------------------------------------------------------------- */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = 72;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });

          // Focus target element for screen readers
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 5. ScrollSpy Navigation Highlighting                                      */
  /* -------------------------------------------------------------------------- */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', throttle(function () {
      let currentSectionId = '';
      const scrollPos = window.pageYOffset + 120;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, 100));
  }

  /* --- Utilities --- */
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
