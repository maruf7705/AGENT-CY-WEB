/**
 * AIVIBEDEV — Main Website Script
 * Navigation, FAQ Accordions, ScrollSpy, Accessible Form Handler & UI Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFaqAccordion();
  initContactForm();
  initScrollSpy();
});

/**
 * Mobile Navigation Drawer & Sticky Header Scroll State
 */
function initNavigation() {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  // Sticky header background transition on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile navigation drawer toggle
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', (!isExpanded).toString());
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', isExpanded.toString());
    });

    // Close mobile nav when clicking any link
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link, .btn');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }
}

/**
 * Accessible FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-button');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other open accordions for clean UX
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-button');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current accordion
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });
}

/**
 * Contact & Scoping Form Handler
 * Validates inputs, provides security notices, and presents an honest demo feedback state
 * with structured JSON export and direct mailto link.
 */
function initContactForm() {
  const form = document.getElementById('workflow-contact-form');
  const feedbackBox = document.getElementById('form-demo-feedback');
  const jsonPreview = document.getElementById('feedback-json-preview');
  const mailtoBtn = document.getElementById('feedback-mailto-btn');
  const copyBtn = document.getElementById('feedback-copy-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const company = document.getElementById('contact-company')?.value.trim();
    const website = document.getElementById('contact-website')?.value.trim() || 'Not provided';
    const tools = document.getElementById('contact-tools')?.value.trim() || 'Not specified';
    const process = document.getElementById('contact-process')?.value.trim();

    if (!name || !email || !company || !process) {
      alert('Please fill in all required fields (Name, Work Email, Company, and Workflow Process).');
      return;
    }

    // Security check: warn if user appears to enter a sensitive string or password
    const lowerProcess = process.toLowerCase();
    if (lowerProcess.includes('password') || lowerProcess.includes('api_key') || lowerProcess.includes('secret_key')) {
      alert('Security Notice: Please do not submit passwords, API keys, or sensitive customer credentials in this scoping form.');
      return;
    }

    const payload = {
      agency_target: "AIVIBEDEV",
      timestamp_utc: new Date().toISOString(),
      lead_profile: {
        contact_name: name,
        work_email: email,
        company_name: company,
        company_website: website,
        existing_stack: tools
      },
      workflow_requirement: {
        process_description: process,
        target_outcome: "Workflow Audit / Scoped Connected System",
        human_review_required: true
      },
      environment_mode: "LOCAL_DEMO_VERIFIED"
    };

    if (jsonPreview) {
      jsonPreview.textContent = JSON.stringify(payload, null, 2);
    }

    if (feedbackBox) {
      feedbackBox.classList.add('show');
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Configure Mailto fallback
    if (mailtoBtn) {
      const subject = encodeURIComponent(`AIVIBEDEV Workflow Scoping — ${company} (${name})`);
      const body = encodeURIComponent(
        `Hi AIVIBEDEV Team,\n\n` +
        `I would like to discuss our workflow requirements:\n\n` +
        `Name: ${name}\n` +
        `Company: ${company}\n` +
        `Email: ${email}\n` +
        `Website: ${website}\n` +
        `Current Tools: ${tools}\n\n` +
        `Process to Improve:\n${process}\n\n` +
        `Best regards,\n${name}`
      );
      mailtoBtn.href = `mailto:inquiries@aivibedev.com?subject=${subject}&body=${body}`;
    }

    // Configure Copy to Clipboard
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
          .then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied JSON to Clipboard!';
            setTimeout(() => { copyBtn.textContent = originalText; }, 2500);
          })
          .catch(() => alert('Could not copy JSON to clipboard.'));
      };
    }
  });
}

/**
 * Smooth ScrollSpy for Header Navigation Links
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
