/**
 * AIVIBEDEV Grounded AI Assistant
 * 
 * An unobtrusive, owner-approved virtual assistant for aivibedev.com.
 * Grounded strictly in approved agency documentation.
 * Does not hallucinate or access unapproved private tools.
 */

(function () {
  'use strict';

  // Owner-Approved Knowledge Base for AIVIBEDEV
  const APPROVED_KNOWLEDGE_BASE = [
    {
      topic: 'agency_overview',
      keywords: ['who are you', 'what is aivibedev', 'about', 'company', 'agency', 'what do you do'],
      response: `**AIVIBEDEV** is a full-stack AI product studio for B2B service companies. We build custom websites with useful AI assistants, connect those experiences to existing business tools, and create internal apps when teams need an interface to manage the resulting work. Our goal is to turn your website into a working part of your business, while keeping people firmly in control of important decisions.`
    },
    {
      topic: 'flagship_offer',
      keywords: ['flagship', 'connected ai website', 'website offer', 'what is connected ai website', 'website package'],
      response: `Our flagship offer is the **Connected AI Website**. It combines a bespoke custom website, a customer-facing assistant grounded strictly in your approved company information, a clear inquiry or booking path, integrations with your existing tools (like HubSpot, Slack, or n8n), and a structured human handoff for decisions that require judgment. Each implementation is scoped specifically to your business.`
    },
    {
      topic: 'solutions',
      keywords: ['services', 'solutions', 'offers', 'what do you offer', 'service list', 'packages'],
      response: `We provide three primary solutions:\n\n1. **AI Websites**: Custom marketing and service websites with grounded assistants that answer visitor questions from approved documentation and qualify inquiries.\n2. **Connected Operations**: Middleware and event workflows (via n8n or custom webhooks) that organize data and connect your website to existing CRMs and internal tools with approval gates.\n3. **Custom AI Apps**: Staff portals and interfaces for reviewing inquiries, searching internal procedures, and managing exceptions.\n\n*Note: Advanced multi-agent workflows are engineered only when a simpler design cannot adequately handle the task.*`
    },
    {
      topic: 'multi_agent_philosophy',
      keywords: ['multi agent', 'multiple agents', 'langgraph', 'when do we need multiple agents', 'more agents', 'agents'],
      response: `We start with the **simplest architecture that meets the requirement**. More agents are not automatically better. We only introduce multi-agent systems (via LangGraph) when a task genuinely requires independent parallel verification, strict policy governance, or distinct isolated roles that a single prompt cannot reliably execute.`
    },
    {
      topic: 'tech_stack',
      keywords: ['tech stack', 'how do you build', 'technologies', 'langchain', 'n8n', 'hermes', 'python', 'tools'],
      response: `We select technologies based on business utility:\n\n- **Interfaces**: Fast, accessible, bespoke modern web frontends.\n- **LangChain**: Deterministic agent behavior, structured tool execution, and grounded knowledge retrieval.\n- **LangGraph**: Controlled, stateful processes with human-in-the-loop checkpoints.\n- **n8n**: Transparent, self-hostable operational workflows and CRM integrations.\n- **Models**: Selected pragmatically per client needs (Claude, GPT, or local models).\n- *Hermes Agent* may be evaluated for internal reasoning workflows when appropriate, but is not forced into every client project.`
    },
    {
      topic: 'process',
      keywords: ['process', 'how it works', 'timeline', 'steps', 'workflow audit', 'pilot', 'stages'],
      response: `Our client engagement follows 5 structured steps:\n\n1. **Fit Call**: 30-min conversation to assess if your workflow is a good candidate.\n2. **Workflow Audit**: Deep dive into your intake paths, repeat questions, and tool handoffs.\n3. **Scoped Pilot**: A contained build defining inputs, outputs, permissions, success criteria, and human review points.\n4. **Evaluation & Handover**: Edge-case testing, code repository transfer, and staff training.\n5. **Optional Ongoing Support**: Proactive model maintenance and prompt tuning.`
    },
    {
      topic: 'pricing',
      keywords: ['pricing', 'price', 'cost', 'how much', 'packages', 'rates', 'audit price', 'website price'],
      response: `We offer three core packages:\n\n- **Workflow Audit**: [AUDIT PRICE] (Fixed deliverable teardown & architecture blueprint)\n- **Connected AI Website**: [WEBSITE STARTING PRICE] (Bespoke site, grounded assistant, CRM webhook, review triage)\n- **Custom AI System**: [CUSTOM SYSTEM PRICING] (Bespoke staff portal or multi-step LangGraph engine)\n\n*Note: Third-party hosting, LLM token usage, and software subscriptions are billed separately based on actual usage.*`
    },
    {
      topic: 'hallucinations_and_accuracy',
      keywords: ['hallucination', 'accuracy', 'wrong answer', 'does not know', 'guardrails', 'safety', 'trust'],
      response: `Our assistants are constrained by strict retrieval boundaries. If a visitor asks something outside the approved knowledge base, the assistant transparently acknowledges that it does not have that information and offers to capture the visitor's contact details for a human team member to respond.`
    },
    {
      topic: 'human_control',
      keywords: ['human in the loop', 'human handoff', 'control', 'will it send messages on its own', 'automated actions', 'records'],
      response: `No critical actions happen without human oversight. The assistant drafts responses and structures intake data, but high-impact decisions (sending client emails, updating contracts, or changing sensitive CRM records) pass through human review gates before execution.`
    },
    {
      topic: 'contact',
      keywords: ['contact', 'book', 'discuss workflow', 'talk to sales', 'founder', 'call', 'consultation', 'email'],
      response: `You can discuss your workflow directly with us by filling out the [Workflow Discussion Form](#contact) on this page, or emailing us at **inquiries@aivibedev.com**. We'll review your current setup and advise whether an AI-assisted workflow is appropriate for your team.`
    }
  ];

  // DOM Elements
  let widgetContainer;
  let triggerBtn;
  let assistantModal;
  let closeBtn;
  let chatBody;
  let inputForm;
  let textInput;
  let quickPromptsContainer;

  // Assistant State
  const state = {
    isOpen: false,
    isTyping: false,
    conversationHistory: []
  };

  function initAssistant() {
    createWidgetDOM();
    bindEvents();
    renderWelcomeMessage();
  }

  function createWidgetDOM() {
    const existing = document.getElementById('aivibedev-assistant-root');
    if (existing) return;

    const root = document.createElement('div');
    root.id = 'aivibedev-assistant-root';
    root.className = 'assistant-widget-container';

    root.innerHTML = `
      <button id="assistant-trigger" class="assistant-trigger-btn" aria-label="Open AIVIBEDEV Assistant" aria-expanded="false" aria-haspopup="dialog">
        <span class="assistant-status-dot" aria-hidden="true"></span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>Ask AIVIBEDEV AI</span>
      </button>

      <div id="assistant-modal" class="assistant-modal" role="dialog" aria-label="AIVIBEDEV Approved Knowledge Assistant" aria-hidden="true">
        <div class="assistant-modal-header">
          <div class="assistant-modal-identity">
            <div class="brand-mark" style="width: 28px; height: 28px; font-size: 0.75rem;">AI</div>
            <div>
              <div class="assistant-modal-title">AIVIBEDEV Guide</div>
              <div class="assistant-modal-subtitle">AI Assistant &bull; Approved Docs Only</div>
            </div>
          </div>
          <button id="assistant-close" class="assistant-close-btn" aria-label="Close Assistant">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="assistant-grounding-notice">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Grounded strictly in verified agency documentation.</span>
        </div>

        <div id="assistant-chat-body" class="assistant-chat-body" role="log" aria-live="polite"></div>

        <div class="assistant-input-area">
          <div class="assistant-quick-prompts" id="assistant-quick-prompts">
            <button type="button" class="quick-prompt-btn" data-query="What is a Connected AI Website?">Connected AI Website?</button>
            <button type="button" class="quick-prompt-btn" data-query="When do we actually need multiple agents?">When need multiple agents?</button>
            <button type="button" class="quick-prompt-btn" data-query="How does human handoff work?">How does human handoff work?</button>
            <button type="button" class="quick-prompt-btn" data-query="How much does a Workflow Audit cost?">Pricing structure?</button>
          </div>
          <form id="assistant-form" class="assistant-input-form">
            <input 
              type="text" 
              id="assistant-input" 
              class="assistant-text-input" 
              placeholder="Ask about our services, stack, or process..." 
              maxlength="300"
              autocomplete="off"
            />
            <button type="submit" class="assistant-send-btn" aria-label="Send message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(root);

    // Cache elements
    widgetContainer = root;
    triggerBtn = document.getElementById('assistant-trigger');
    assistantModal = document.getElementById('assistant-modal');
    closeBtn = document.getElementById('assistant-close');
    chatBody = document.getElementById('assistant-chat-body');
    inputForm = document.getElementById('assistant-form');
    textInput = document.getElementById('assistant-input');
    quickPromptsContainer = document.getElementById('assistant-quick-prompts');
  }

  function bindEvents() {
    triggerBtn.addEventListener('click', toggleAssistant);
    closeBtn.addEventListener('click', closeAssistant);

    // Escape key closes modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.isOpen) {
        closeAssistant();
      }
    });

    inputForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleUserSubmit();
    });

    quickPromptsContainer.addEventListener('click', function (e) {
      const btn = e.target.closest('.quick-prompt-btn');
      if (btn && !state.isTyping) {
        const query = btn.getAttribute('data-query');
        if (query) {
          textInput.value = query;
          handleUserSubmit();
        }
      }
    });

    // Links inside assistant chat to anchor targets on page
    chatBody.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          closeAssistant();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  function toggleAssistant() {
    if (state.isOpen) {
      closeAssistant();
    } else {
      openAssistant();
    }
  }

  function openAssistant() {
    state.isOpen = true;
    assistantModal.classList.add('open');
    assistantModal.setAttribute('aria-hidden', 'false');
    triggerBtn.setAttribute('aria-expanded', 'true');
    setTimeout(() => textInput.focus(), 100);
  }

  function closeAssistant() {
    state.isOpen = false;
    assistantModal.classList.remove('open');
    assistantModal.setAttribute('aria-hidden', 'true');
    triggerBtn.setAttribute('aria-expanded', 'false');
    triggerBtn.focus();
  }

  function renderWelcomeMessage() {
    const welcome = `Hello! I am **AIVIBEDEV's virtual assistant**. I answer questions about our B2B AI studio, services, and integration process using only owner-approved documentation.\n\nHow can I help you explore how AI can assist your business workflow today?`;
    appendAiMessage(welcome);
  }

  function handleUserSubmit() {
    const text = textInput.value.trim();
    if (!text || state.isTyping) return;

    // Clear input
    textInput.value = '';

    // Append user message
    appendUserMessage(text);

    // Process retrieval
    state.isTyping = true;
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const answer = matchApprovedKnowledge(text);
      appendAiMessage(answer);
      state.isTyping = false;
    }, 450);
  }

  function appendUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-bubble chat-bubble-user';
    msg.innerHTML = `
      <div class="chat-meta chat-meta-user">You</div>
      <p style="margin: 0; color: #FFFFFF;">${escapeHTML(text)}</p>
    `;
    chatBody.appendChild(msg);
    scrollToBottom();
  }

  function appendAiMessage(rawMarkdown) {
    const msg = document.createElement('div');
    msg.className = 'chat-bubble chat-bubble-ai';
    
    // Parse light markdown (bold, lists, links)
    const formatted = formatMarkdown(rawMarkdown);

    msg.innerHTML = `
      <div class="chat-meta">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
        <span>AIVIBEDEV AI &bull; Grounded Answer</span>
      </div>
      <div>${formatted}</div>
      <div class="grounding-tag">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Verified Doc Match</span>
      </div>
    `;
    chatBody.appendChild(msg);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.id = 'assistant-typing';
    typing.className = 'chat-bubble chat-bubble-ai';
    typing.innerHTML = `
      <div class="chat-meta">Checking verified docs...</div>
      <div style="display: flex; gap: 4px; align-items: center; padding: 4px 0;">
        <span style="width: 6px; height: 6px; background: #64748B; border-radius: 50%; display: inline-block; animation: bounce 1s infinite alternate;"></span>
        <span style="width: 6px; height: 6px; background: #64748B; border-radius: 50%; display: inline-block; animation: bounce 1s infinite alternate 0.2s;"></span>
        <span style="width: 6px; height: 6px; background: #64748B; border-radius: 50%; display: inline-block; animation: bounce 1s infinite alternate 0.4s;"></span>
      </div>
    `;
    chatBody.appendChild(typing);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('assistant-typing');
    if (el) el.remove();
  }

  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function matchApprovedKnowledge(query) {
    const q = query.toLowerCase();

    // 1. Direct keywords matching
    let bestMatch = null;
    let maxScore = 0;

    for (const entry of APPROVED_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (q.includes(kw.toLowerCase())) {
          score += kw.length;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && maxScore > 2) {
      return bestMatch.response;
    }

    // 2. Controlled Fallback
    return `I do not have verified information in our agency documentation to answer that specific query. \n\nTo ensure you get an exact answer for your workflow, you can [Discuss your workflow directly with our team](#contact) or review our [Solutions Guide](#solutions).`;
  }

  function formatMarkdown(text) {
    let html = escapeHTML(text);
    
    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic *text*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Markdown Links [Label](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="link-arrow" style="font-size: 0.84375rem;">$1</a>');
    
    // Numbered lists or bullet points
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

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistant);
  } else {
    initAssistant();
  }

  // Expose helper globally for programmatic open if needed
  window.AIVIBEDEV_ASSISTANT = {
    openWithQuery: function(query) {
      openAssistant();
      if (query) {
        textInput.value = query;
        handleUserSubmit();
      }
    }
  };
})();
