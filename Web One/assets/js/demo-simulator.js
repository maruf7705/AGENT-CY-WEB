/**
 * AIVIBEDEV Interactive Example Demo Simulator
 * 
 * Fictional client scenario: "Meridian Advisory Group" (B2B Consultancy).
 * Illustrates:
 *   1. Visitor asking service scoping questions.
 *   2. Assistant retrieving answers strictly from approved FAQ.
 *   3. Visitor submitting structured inquiry with explicit consent.
 *   4. Operations Lead reviewing and approving the structured handoff in the internal queue.
 * 
 * Clearly labeled as an Illustrative Demo with fictional data.
 */

(function () {
  'use strict';

  // Fictional approved knowledge items for Meridian Advisory Group
  const DEMO_APPROVED_DOCS = [
    {
      keywords: ['supply chain', 'logistics', 'audit', 'inventory', 'pricing', 'tiers', 'cost'],
      answer: "Meridian Advisory offers two core consulting tiers:\n\n1. **Diagnostic Audit (4 Weeks)**: Fixed-fee evaluation of supplier redundancy, inventory turnover, and warehouse routing.\n2. **Operations Transformation (3-6 Months)**: Implementation of automated scheduling, vendor SLA renegotiation, and ERP synchronization.\n\nWould you like to schedule a 30-minute discovery call to review which tier fits your volume?",
      source: "Meridian Services Handbook &sect; 3.2 (Approved)"
    },
    {
      keywords: ['integrate', 'erp', 'sap', 'netsuite', 'tools', 'software', 'compatibility'],
      answer: "Yes. Meridian consultants work directly with standard ERP and WMS platforms including SAP S/4HANA, NetSuite, Microsoft Dynamics, and Manhattan Associates. Data extraction workflows are verified during the discovery phase.",
      source: "Meridian Technical Integration Matrix 2026 (Approved)"
    },
    {
      keywords: ['timeline', 'how long', 'start', 'availability', 'schedule'],
      answer: "Diagnostic audits typically commence within 10 business days following the kickoff agreement. Full transformation engagements are scheduled quarterly based on lead consultant availability.",
      source: "Meridian Capacity & Engagement Policy &sect; 1.4 (Approved)"
    }
  ];

  // Default state for simulator
  let demoState = {
    step: 'chat', // 'chat' | 'inquiry' | 'submitted' | 'approved',
    messages: [
      {
        sender: 'ai',
        text: 'Welcome to Meridian Advisory Group. I am the virtual assistant grounded in Meridian’s verified service guidelines. How can I assist your team today?',
        source: 'Meridian Welcome Policy v2'
      }
    ],
    submittedInquiry: null
  };

  function initDemoSimulator() {
    const root = document.getElementById('interactive-demo-root');
    if (!root) return;

    renderSimulator(root);
    bindDemoEvents(root);
  }

  function renderSimulator(root) {
    root.innerHTML = `
      <div class="demo-container">
        <!-- Demo Header Banner -->
        <div class="demo-header-bar">
          <div class="demo-title-group">
            <span class="demo-pill">Illustrative Demo</span>
            <div>
              <strong style="color: #FFFFFF; font-size: 0.9375rem;">Connected AI Website &amp; Triage Simulation</strong>
              <div class="demo-sub">Fictional B2B firm: Meridian Advisory Group &bull; Fictional Data Only</div>
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-outline-white" id="demo-reset-btn">Reset Demo</button>
        </div>

        <!-- Split Screen: Left (Visitor) / Right (Operations Team Handoff) -->
        <div class="demo-views">
          
          <!-- LEFT PANEL: Fictional Customer Experience -->
          <div class="demo-panel-left">
            <div class="panel-label">
              <span class="panel-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"></circle><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg>
                Visitor Experience (Client-Facing Website)
              </span>
              <span class="panel-status">Step 1 of 2: Inquire</span>
            </div>

            <div class="demo-preset-chips" id="demo-chips">
              <span style="font-size: 0.75rem; color: var(--navy-500); align-self: center; margin-right: 4px;">Try sample question:</span>
              <button type="button" class="preset-chip" data-q="What service tiers and audit packages do you offer?">What audit tiers do you offer?</button>
              <button type="button" class="preset-chip" data-q="Do your consultants work with NetSuite and SAP ERPs?">ERP integration compatibility?</button>
              <button type="button" class="preset-chip" data-q="What is the typical timeline to start an audit?">Typical kickoff timeline?</button>
            </div>

            <!-- Chat Output -->
            <div class="chat-messages" id="demo-chat-messages">
              <!-- Rendered dynamically -->
            </div>

            <!-- Chat or Inquiry Form Container -->
            <div id="demo-bottom-interaction">
              <div class="demo-chat-input-row" id="demo-input-row">
                <input 
                  type="text" 
                  id="demo-user-input" 
                  class="demo-chat-input" 
                  placeholder="Ask a service question (or click a sample above)..." 
                  autocomplete="off"
                />
                <button type="button" id="demo-send-btn" class="btn btn-sm btn-primary">Ask</button>
              </div>

              <!-- Quick Inquiry CTA Trigger -->
              <div style="margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--navy-500);">Ready to test handoff?</span>
                <button type="button" id="demo-open-inquiry-btn" class="btn btn-sm btn-secondary" style="font-size: 0.75rem; padding: 0.35rem 0.75rem;">
                  Fill Sample Intake Form &rarr;
                </button>
              </div>
            </div>

            <!-- Inline Fictional Intake Form (Hidden initially) -->
            <div id="demo-inquiry-form-wrap" style="display: none; margin-top: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
              <div style="font-size: 0.8125rem; font-weight: 700; color: var(--navy-900); margin-bottom: 0.5rem;">
                Submit Structured Inquiry (Fictional Demo)
              </div>
              <form id="demo-inquiry-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <input type="text" id="demo-lead-name" class="demo-chat-input" placeholder="Name" value="Elena Rostova" required />
                  <input type="email" id="demo-lead-email" class="demo-chat-input" placeholder="Work Email" value="elena@vanguardfreight.com" required />
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <input type="text" id="demo-lead-company" class="demo-chat-input" placeholder="Company" value="Vanguard Freight Dynamics" required />
                  <select id="demo-lead-budget" class="demo-chat-input" style="background: white;">
                    <option value="$15k - $30k (Diagnostic Audit)">$15k - $30k (Diagnostic Audit)</option>
                    <option value="$30k - $75k (Full Transformation)">$30k - $75k (Full Transformation)</option>
                    <option value="Undetermined / Scoping">Undetermined / Scoping</option>
                  </select>
                </div>
                <div style="margin-bottom: 0.5rem;">
                  <input type="text" id="demo-lead-tools" class="demo-chat-input" placeholder="Current Tools (e.g., NetSuite, Slack)" value="NetSuite ERP, ClickUp, HubSpot" />
                </div>
                <div style="margin-bottom: 0.6rem; font-size: 0.71875rem; color: var(--navy-600); display: flex; align-items: flex-start; gap: 0.4rem;">
                  <input type="checkbox" id="demo-lead-consent" checked required style="margin-top: 2px;" />
                  <label for="demo-lead-consent">I consent to sharing these scoping details with Meridian Advisory's lead operations team.</label>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <button type="submit" class="btn btn-sm btn-primary" style="flex-grow: 1;">Submit Demo Inquiry &rarr;</button>
                  <button type="button" id="demo-cancel-inquiry-btn" class="btn btn-sm btn-secondary">Cancel</button>
                </div>
              </form>
            </div>

          </div>

          <!-- RIGHT PANEL: Fictional Internal Ops Review Queue -->
          <div class="demo-panel-right">
            <div class="panel-label">
              <span class="panel-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Operations Team Portal (Human-in-the-Loop)
              </span>
              <span class="panel-status" id="ops-queue-status" style="background-color: var(--navy-100); color: var(--navy-800); border-color: var(--navy-200);">
                Waiting for intake...
              </span>
            </div>

            <!-- Live Queue Container -->
            <div id="ops-queue-content" style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
              
              <!-- Empty State before inquiry -->
              <div id="ops-empty-state" style="text-align: center; padding: 2rem 1rem; color: var(--navy-500);">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.75rem; color: var(--navy-400);">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <div style="font-weight: 700; font-size: 0.9375rem; color: var(--navy-700); margin-bottom: 0.25rem;">Handoff Triage Queue Ready</div>
                <p style="font-size: 0.8125rem; max-width: 320px; margin: 0 auto;">
                  Ask a question or submit the sample form on the left to see how structured inquiries arrive for staff review.
                </p>
              </div>

              <!-- Populated Triage Card (Hidden until submitted) -->
              <div id="ops-populated-card" style="display: none;">
                <div class="triage-card">
                  <div class="triage-header">
                    <div>
                      <div class="triage-sender" id="triage-card-name">Elena Rostova</div>
                      <div class="triage-company" id="triage-card-company">Vanguard Freight Dynamics &bull; elena@vanguardfreight.com</div>
                    </div>
                    <span class="triage-badge triage-badge-pending" id="triage-card-badge">Pending Staff Review</span>
                  </div>

                  <div class="triage-details-list">
                    <div>
                      <span class="triage-detail-label">Tier Interest:</span>
                      <div class="triage-detail-val" id="triage-card-budget">$15k - $30k (Diagnostic Audit)</div>
                    </div>
                    <div>
                      <span class="triage-detail-label">Current Stack:</span>
                      <div class="triage-detail-val" id="triage-card-tools">NetSuite ERP, ClickUp, HubSpot</div>
                    </div>
                    <div>
                      <span class="triage-detail-label">Assistant Intent Match:</span>
                      <div class="triage-detail-val" style="color: var(--teal-800);">Supply Chain Diagnostic (98%)</div>
                    </div>
                    <div>
                      <span class="triage-detail-label">Explicit Consent:</span>
                      <div class="triage-detail-val" style="color: var(--teal-800);">Verified &amp; Logged</div>
                    </div>
                  </div>

                  <div class="triage-summary-box">
                    <div class="triage-summary-title">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      AI Drafted Email for Staff Approval:
                    </div>
                    <p id="triage-card-draft" style="font-size: 0.8125rem; color: var(--navy-800); margin: 0; line-height: 1.45;">
                      "Hi Elena, thank you for reaching out regarding Vanguard Freight Dynamics. Based on your current NetSuite ERP setup and timeline, a 4-week Diagnostic Audit is the ideal starting path to evaluate supplier redundancy. Would Thursday at 2:00 PM EST work for a brief 20-minute scoping call?"
                    </p>
                  </div>

                  <div class="triage-actions" id="triage-action-buttons">
                    <button type="button" class="btn btn-sm btn-primary" id="triage-approve-btn" style="flex-grow: 1;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Approve &amp; Dispatch Response
                    </button>
                    <button type="button" class="btn btn-sm btn-secondary" id="triage-edit-btn">
                      Edit Draft
                    </button>
                  </div>

                  <div id="triage-approved-feedback" style="display: none; margin-top: 0.75rem; background-color: var(--teal-50); border: 1px solid var(--teal-700); color: var(--teal-900); padding: 0.65rem; border-radius: 4px; font-size: 0.78125rem;">
                    <strong>Approved by Operations Lead (Human).</strong> Email dispatched to elena@vanguardfreight.com; CRM record updated in HubSpot.
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;

    renderChatMessages();
  }

  function renderChatMessages() {
    const container = document.getElementById('demo-chat-messages');
    if (!container) return;

    container.innerHTML = '';

    demoState.messages.forEach(msg => {
      const bubble = document.createElement('div');
      if (msg.sender === 'user') {
        bubble.className = 'chat-bubble chat-bubble-user';
        bubble.innerHTML = `
          <div class="chat-meta chat-meta-user">Elena (Visitor)</div>
          <p style="margin: 0; color: #FFFFFF;">${escapeHTML(msg.text)}</p>
        `;
      } else {
        bubble.className = 'chat-bubble chat-bubble-ai';
        bubble.innerHTML = `
          <div class="chat-meta">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            <span>Meridian AI &bull; Grounded Answer</span>
          </div>
          <div>${formatMarkdown(msg.text)}</div>
          <div class="grounding-tag">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Source: ${escapeHTML(msg.source || 'Approved Handbook')}</span>
          </div>
        `;
      }
      container.appendChild(bubble);
    });

    container.scrollTop = container.scrollHeight;
  }

  function bindDemoEvents(root) {
    const chipsContainer = document.getElementById('demo-chips');
    const sendBtn = document.getElementById('demo-send-btn');
    const userInput = document.getElementById('demo-user-input');
    const openInquiryBtn = document.getElementById('demo-open-inquiry-btn');
    const cancelInquiryBtn = document.getElementById('demo-cancel-inquiry-btn');
    const inquiryFormWrap = document.getElementById('demo-inquiry-form-wrap');
    const inputRow = document.getElementById('demo-input-row');
    const inquiryForm = document.getElementById('demo-inquiry-form');
    const resetBtn = document.getElementById('demo-reset-btn');
    const triageApproveBtn = document.getElementById('triage-approve-btn');
    const triageEditBtn = document.getElementById('triage-edit-btn');

    // Preset chip clicks
    if (chipsContainer) {
      chipsContainer.addEventListener('click', function (e) {
        const chip = e.target.closest('.preset-chip');
        if (chip) {
          const q = chip.getAttribute('data-q');
          if (q) {
            handleVisitorQuestion(q);
          }
        }
      });
    }

    // Manual send
    if (sendBtn && userInput) {
      sendBtn.addEventListener('click', function () {
        const text = userInput.value.trim();
        if (text) {
          userInput.value = '';
          handleVisitorQuestion(text);
        }
      });

      userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendBtn.click();
        }
      });
    }

    // Toggle Inquiry Form
    if (openInquiryBtn && inquiryFormWrap && inputRow) {
      openInquiryBtn.addEventListener('click', function () {
        inquiryFormWrap.style.display = 'block';
        inputRow.style.display = 'none';
        openInquiryBtn.parentElement.style.display = 'none';
      });
    }

    if (cancelInquiryBtn && inquiryFormWrap && inputRow) {
      cancelInquiryBtn.addEventListener('click', function () {
        inquiryFormWrap.style.display = 'none';
        inputRow.style.display = 'flex';
        openInquiryBtn.parentElement.style.display = 'flex';
      });
    }

    // Submit Inquiry Form
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const payload = {
          name: document.getElementById('demo-lead-name').value,
          email: document.getElementById('demo-lead-email').value,
          company: document.getElementById('demo-lead-company').value,
          budget: document.getElementById('demo-lead-budget').value,
          tools: document.getElementById('demo-lead-tools').value,
          consent: document.getElementById('demo-lead-consent').checked
        };

        handleInquirySubmission(payload);
      });
    }

    // Reset Demo
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        demoState = {
          step: 'chat',
          messages: [
            {
              sender: 'ai',
              text: 'Welcome to Meridian Advisory Group. I am the virtual assistant grounded in Meridian’s verified service guidelines. How can I assist your team today?',
              source: 'Meridian Welcome Policy v2'
            }
          ],
          submittedInquiry: null
        };
        renderSimulator(root);
        bindDemoEvents(root);
      });
    }

    // Staff Approve
    if (triageApproveBtn) {
      triageApproveBtn.addEventListener('click', function () {
        const badge = document.getElementById('triage-card-badge');
        const feedback = document.getElementById('triage-approved-feedback');
        const buttons = document.getElementById('triage-action-buttons');
        const status = document.getElementById('ops-queue-status');

        if (badge) {
          badge.className = 'triage-badge triage-badge-approved';
          badge.textContent = 'Approved & Dispatched';
        }
        if (feedback) feedback.style.display = 'block';
        if (buttons) buttons.style.display = 'none';
        if (status) {
          status.style.backgroundColor = 'var(--teal-50)';
          status.style.color = 'var(--teal-800)';
          status.textContent = 'Action Completed';
        }
      });
    }

    // Staff Edit
    if (triageEditBtn) {
      triageEditBtn.addEventListener('click', function () {
        const draftEl = document.getElementById('triage-card-draft');
        if (draftEl) {
          const current = draftEl.textContent.trim().replace(/^"|"$/g, '');
          const edited = prompt('Edit the drafted response before dispatching:', current);
          if (edited !== null) {
            draftEl.textContent = `"${edited}"`;
          }
        }
      });
    }
  }

  function handleVisitorQuestion(questionText) {
    // Append visitor message
    demoState.messages.push({
      sender: 'user',
      text: questionText
    });
    renderChatMessages();

    // Find match in approved docs
    const q = questionText.toLowerCase();
    let match = DEMO_APPROVED_DOCS.find(doc => doc.keywords.some(k => q.includes(k)));

    setTimeout(() => {
      if (match) {
        demoState.messages.push({
          sender: 'ai',
          text: match.answer,
          source: match.source
        });
      } else {
        demoState.messages.push({
          sender: 'ai',
          text: `Thank you for your question. Meridian's diagnostic audit evaluates supply chain redundancies across your entire supplier matrix. Would you like to share your project scope to review with our lead partner?`,
          source: 'Meridian Standard Diagnostic Guide &sect; 2'
        });
      }
      renderChatMessages();
    }, 400);
  }

  function handleInquirySubmission(payload) {
    demoState.submittedInquiry = payload;

    // Show confirmation in visitor chat
    demoState.messages.push({
      sender: 'user',
      text: `Submitted Inquiry: ${payload.company} (${payload.budget})`
    });
    demoState.messages.push({
      sender: 'ai',
      text: `Thank you, **${payload.name}**. Your scoping details have been organized and sent to Meridian's senior operations team for review. You will receive a direct confirmation from our partner team within one business day.`,
      source: 'Meridian Intake Protocol'
    });
    renderChatMessages();

    // Hide form, restore chat input
    const inquiryFormWrap = document.getElementById('demo-inquiry-form-wrap');
    const inputRow = document.getElementById('demo-input-row');
    const openInquiryBtn = document.getElementById('demo-open-inquiry-btn');
    if (inquiryFormWrap) inquiryFormWrap.style.display = 'none';
    if (inputRow) inputRow.style.display = 'flex';
    if (openInquiryBtn && openInquiryBtn.parentElement) openInquiryBtn.parentElement.style.display = 'flex';

    // Populate Right Panel (Operations Review Queue)
    const emptyState = document.getElementById('ops-empty-state');
    const populatedCard = document.getElementById('ops-populated-card');
    const queueStatus = document.getElementById('ops-queue-status');

    if (emptyState) emptyState.style.display = 'none';
    if (populatedCard) populatedCard.style.display = 'block';
    if (queueStatus) {
      queueStatus.style.backgroundColor = 'var(--amber-100)';
      queueStatus.style.color = 'var(--amber-700)';
      queueStatus.textContent = '1 Action Pending Review';
    }

    // Update details in card
    const cardName = document.getElementById('triage-card-name');
    const cardCompany = document.getElementById('triage-card-company');
    const cardBudget = document.getElementById('triage-card-budget');
    const cardTools = document.getElementById('triage-card-tools');

    if (cardName) cardName.textContent = payload.name;
    if (cardCompany) cardCompany.textContent = `${payload.company} \u2022 ${payload.email}`;
    if (cardBudget) cardBudget.textContent = payload.budget;
    if (cardTools) cardTools.textContent = payload.tools || 'None specified';
  }

  function formatMarkdown(text) {
    let html = escapeHTML(text);
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\n\n/g, '<br><br>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDemoSimulator);
  } else {
    initDemoSimulator();
  }
})();
