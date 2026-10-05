# AIVIBEDEV — Agency Website & AI Product Studio

A full-stack, responsive B2B product studio website for **AIVIBEDEV**. Built for founders and operations leaders at service firms, agencies, and consultancies.

---

## 1. Project Architecture & Deliverables

- `index.html`: Flagship homepage containing the complete end-to-end B2B journey:
  - Positioning & Hero with Visual Journey Lifecycle diagram (labeled as illustrative example).
  - Solutions Section (Connected AI Websites, Connected Operations, Custom AI Apps).
  - Interactive Demo Component (Fictional visitor chat + internal ops review queue).
  - How We Build (LangChain, LangGraph, n8n, Model selection, Hermes Agent evaluation note, Minimal architecture principle).
  - 5-Stage Implementation Process (Fit Call, Workflow Audit, Scoped Pilot, Evaluation & Handover, Support).
  - Transparent Scoping & Pricing packages with owner-editable placeholders.
  - Interactive Scope & Operating Cost Estimator.
  - Proof & Empirical Measurement Framework (6 core baseline vs. target metrics).
  - Comprehensive FAQ accordion (7 core questions answered).
  - Accessible Contact & Workflow Scoping Form (with honest local demo state & security notice).
- `solutions.html`: Dedicated deep dive on studio service offerings and multi-agent engineering criteria.
- `how-we-build.html`: Detailed architectural breakdown of LangChain, LangGraph, n8n, and Hermes Agent evaluation policies.
- `process.html`: In-depth 5-stage deployment governance and scoped pilot criteria.
- `pricing.html`: Dedicated pricing page with package cards and interactive cost estimator.
- `interactive-demo.html`: Full-page interactive simulation sandbox.
- `proof.html`: Detailed empirical measurement standards (no fabricated reviews or ROI claims).
- `faq.html`: Dedicated searchable FAQ directory.
- `contact.html`: Dedicated workflow scoping contact page.
- `assets/css/style.css`: Editorial B2B stylesheet (warm off-white `#FAF8F5`, deep navy `#0A0F1D`, restrained teal `#0D766E`, accessible focus states, responsive typography, and mobile drawer).
- `assets/js/main.js`: Main navigation, mobile drawer toggle, FAQ accordion, smooth scrolling, active ScrollSpy, and honest local form handling.
- `assets/js/assistant.js`: Grounded on-site AI Assistant widget with embedded owner-approved knowledge base, sample prompts, and live server backend adapter configuration.
- `assets/js/demo-simulator.js`: Dual-view interactive simulation (Visitor inquiry &rarr; Grounded retrieval &rarr; Structured intake &rarr; Operations team triage & approval).
- `assets/js/cost-calculator.js`: Interactive visitor slider and token/hosting run-rate estimator.

---

## 2. Live vs. Illustrative Integrations

| Feature / Integration | Current Status | Description & Production Path |
| :--- | :--- | :--- |
| **On-Site AI Assistant Widget** | **Live (Grounded Client-Side)** | Functions immediately via `assets/js/assistant.js` using owner-approved agency documentation. Can be upgraded to live LLM server endpoint by setting your API endpoint. |
| **Interactive Demo Simulation** | **Illustrative Demo** | Simulates a fictional B2B consulting firm (*Meridian Advisory Group*) to demonstrate grounded FAQ retrieval, structured intake submission, and internal ops lead triage card review without consuming live API tokens. |
| **Cost & Scope Estimator** | **Live Interactive Tool** | Calculates realistic token usage, model hosting tiers, and middleware run rates in real time based on visitor inquiry sliders. |
| **FAQ Accordions & Navigation** | **Live Interactive UI** | Fully accessible keyboard and screen-reader compliant accordion interactions and smooth scroll navigation. |
| **Contact Form Handler** | **Live Local Validation + Direct Mailto Fallback** | Explicitly notifies users that backend demo mode is active, provides a formatted JSON payload preview with one-click clipboard copy, and provides a prefilled direct email link. |
| **CRM / Webhook Dispatch (n8n, HubSpot, Slack)** | **Ready for Webhook URL** | Standardized payload structure generated in `main.js` is formatted for direct `POST` to your n8n or Make.com webhook URL. |

---

## 3. Owner-Editable Placeholders

The following visible placeholders are designated for agency ownership to customize prior to public marketing campaigns:

1. **`[AUDIT PRICE]`**:
   - Locations: `index.html`, `pricing.html`, `assets/js/assistant.js`.
   - Recommended Format: e.g., `$1,500` or `$2,500 Fixed Fee`.
2. **`[WEBSITE STARTING PRICE]`**:
   - Locations: `index.html`, `pricing.html`, `assets/js/assistant.js`.
   - Recommended Format: e.g., `Starting at $5,000` or `$7,500 – $15,000`.
3. **`[CUSTOM SYSTEM PRICING]`**:
   - Locations: `index.html`, `pricing.html`, `assets/js/assistant.js`.
   - Recommended Format: e.g., `From $12,000` or `Custom Scoped Milestones`.
4. **`inquiries@aivibedev.com`**:
   - Locations: `index.html`, `contact.html`, `assets/js/assistant.js`, `assets/js/main.js`.
   - Replace with your designated Google Workspace or Microsoft 365 intake inbox.

---

## 4. Production Launch Checklist

Follow these steps prior to pointing your custom domain (`aivibedev.com`) to production:

- [ ] **1. Replace Pricing Placeholders:**
  - Update `[AUDIT PRICE]`, `[WEBSITE STARTING PRICE]`, and `[CUSTOM SYSTEM PRICING]` across `index.html`, `pricing.html`, and `assets/js/assistant.js` with your approved pricing structure.
- [ ] **2. Connect Form Backend Webhook:**
  - In `assets/js/main.js`, update `initContactForm()` to submit the validated `formData` payload via `fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })` or point to an n8n webhook URL.
- [ ] **3. Connect Calendar Booking Link:**
  - Add your Cal.com or Calendly scheduling link to the direct booking buttons in `contact.html` and `index.html`.
- [ ] **4. Curate Approved Knowledge Base Corpus:**
  - Update `APPROVED_KNOWLEDGE_BASE` in `assets/js/assistant.js` with your exact company background, case studies, terms of service, and service limits.
- [ ] **5. Privacy & Security Review:**
  - Ensure the form retains the clear notice advising visitors not to submit passwords, API keys, or confidential customer PII.
- [ ] **6. Server-Side Assistant API Key Security (If enabling live LLM):**
  - If transitioning the on-site assistant from client-side grounded retrieval to a live OpenAI/Anthropic model endpoint, route all requests through a secure server-side endpoint (e.g. Next.js API route, Cloudflare Worker, or Express server). **Never embed raw provider API keys in browser JavaScript.**
- [ ] **7. Software & Token Ownership Agreement:**
  - Confirm with clients during the fit call that ongoing web hosting ($10–$25/mo) and model token consumption (~$5–$30/mo) are billed directly through their own client-managed accounts.
- [ ] **8. Cross-Browser & Accessibility Verification:**
  - Verify WCAG AA color contrast, keyboard tab order, and mobile viewport responsiveness across iOS Safari, Android Chrome, desktop Firefox, Chrome, and Edge.
