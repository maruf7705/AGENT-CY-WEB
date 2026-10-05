/**
 * AIVIBEDEV — Grounded On-Site AI Assistant Widget
 *
 * IMPORTANT ARCHITECTURE & SECURITY NOTICE:
 * This assistant identifies itself as an AI assistant and answers questions strictly
 * using owner-approved AIVIBEDEV studio documentation.
 *
 * Production Path for Live Server-Side LLM:
 * - When deploying with a live model (e.g., Anthropic Claude, OpenAI), all requests
 *   must route through a secure server-side endpoint (e.g. `/api/assistant`).
 * - NEVER expose API keys in browser client code.
 * - Rate limiting, input sanitization, and knowledge grounding are enforced at the server boundary.
 */

// Owner-Approved Studio Knowledge Base
const APPROVED_KNOWLEDGE_BASE = [
  {
    topic: "Studio Overview & Positioning",
    keywords: ["who", "what", "agency", "studio", "about", "aivibedev", "services", "offer"],
    answer: "AIVIBEDEV is a full-stack AI product studio for B2B service companies. We build custom websites with grounded AI assistants, connect those experiences to your existing business tools (like HubSpot, Notion, Slack, Airtable), and create internal staff apps for reviewing and managing inquiries—with people in control of critical decisions.",
    recommendedService: "Connected AI Website",
    ctaLink: "#contact"
  },
  {
    topic: "Flagship Offer: Connected AI Website",
    keywords: ["website", "connected", "flagship", "bot", "assistant", "chatbot", "chat"],
    answer: "Our flagship offer is the 'Connected AI Website'. It combines a bespoke responsive website, a customer-facing assistant grounded strictly in your approved company information, an inquiry/booking path, webhook integrations with your existing tools, and a human handoff interface for decisions requiring judgment. It is not just an isolated chat widget.",
    recommendedService: "Connected AI Website",
    ctaLink: "#solutions"
  },
  {
    topic: "Connected Operations & Workflows",
    keywords: ["operations", "workflow", "n8n", "automation", "connect", "integrations", "tools", "crm", "hubspot", "slack"],
    answer: "Connected Operations organize information across your existing systems (CRM, project management, email, messaging) using n8n and structured webhooks. We design workflows with explicit human approval checkpoints before any customer records are updated or messages sent.",
    recommendedService: "Connected Operations",
    ctaLink: "#solutions"
  },
  {
    topic: "Custom AI Apps & Staff Portals",
    keywords: ["custom", "apps", "portal", "internal", "staff", "dashboard", "interface", "exceptions"],
    answer: "Custom AI Apps are lightweight staff portals and triage interfaces. They give your operations team a clean view to review incoming inquiries, inspect grounded retrieval sources, manage edge-case exceptions, and track client work without switching between ten browser tabs.",
    recommendedService: "Custom AI Apps",
    ctaLink: "#solutions"
  },
  {
    topic: "Multi-Agent Systems & Architecture Policy",
    keywords: ["agent", "multi-agent", "langgraph", "langchain", "complex", "agents", "hermes"],
    answer: "We engineer multi-agent workflows using LangGraph only when a single model or straightforward workflow cannot adequately solve the business problem. We start with the simplest architecture that meets the requirement; more agents are not automatically better. Hermes Agent is evaluated for specific internal research workflows where appropriate.",
    recommendedService: "Custom AI System Scoping",
    ctaLink: "#how-we-build"
  },
  {
    topic: "Implementation Process & Scoped Pilot",
    keywords: ["process", "pilot", "timeline", "stages", "how it works", "steps", "rollout"],
    answer: "Our 5-stage rollout follows: 1) Fit Call, 2) Workflow Audit, 3) Scoped Pilot, 4) Evaluation & Handover, and 5) Optional Ongoing Support. A Scoped Pilot defines inputs, outputs, permissions, success metrics, operating costs, and human review gates before launch.",
    recommendedService: "Workflow Audit",
    ctaLink: "#process"
  },
  {
    topic: "Pricing Packages & Placeholders",
    keywords: ["price", "cost", "pricing", "package", "audit price", "starting price", "rates", "how much"],
    answer: "We offer three transparent engagement tiers: 1) Workflow Audit ([AUDIT PRICE]), 2) Connected AI Website ([WEBSITE STARTING PRICE]), and 3) Custom AI System ([CUSTOM SYSTEM PRICING]). Hosting, third-party model tokens, and software subscriptions are billed directly to your own accounts so you maintain full control.",
    recommendedService: "Transparent Scoping",
    ctaLink: "#pricing"
  },
  {
    topic: "Ownership & Handover",
    keywords: ["ownership", "own", "ip", "code", "handover", "lock-in", "vendor"],
    answer: "Your team owns all deliverables upon project completion: clean source code, integration scripts, knowledge base files, and documentation. We build on open and portable tools (like standard web stacks, LangGraph, and n8n) so you are never locked into proprietary agency hosting.",
    recommendedService: "Studio Fit Call",
    ctaLink: "#faq"
  },
  {
    topic: "Human Handoff & Edge Cases",
    keywords: ["hallucination", "doesn't know", "unknown", "error", "human", "handoff", "safety"],
    answer: "When an assistant encounters a question outside its approved knowledge boundaries, it clearly states that it does not have verified information and offers an immediate structured handoff to your team. The AI never guesses or fabricates business policies.",
    recommendedService: "Discuss Your Workflow",
    ctaLink: "#contact"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initAssistantWidget();
});

function initAssistantWidget() {
  const triggerBtn = document.getElementById('assistant-trigger-btn');
  const modal = document.getElementById('assistant-modal');
  const closeBtn = document.getElementById('assistant-close-btn');
  const inputField = document.getElementById('assistant-input-field');
  const sendBtn = document.getElementById('assistant-send-btn');
  const chatLog = document.getElementById('assistant-chat-log');
  const starterChips = document.querySelectorAll('.starter-chip');

  if (!triggerBtn || !modal) return;

  // Toggle modal open/close
  triggerBtn.addEventListener('click', () => {
    modal.classList.toggle('open');
    if (modal.classList.contains('open') && inputField) {
      inputField.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  // Handle Starter Chips
  starterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
      handleUserQuery(prompt);
    });
  });

  // Handle Enter key in input
  if (inputField && sendBtn) {
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = inputField.value.trim();
        if (query) {
          handleUserQuery(query);
          inputField.value = '';
        }
      }
    });

    sendBtn.addEventListener('click', () => {
      const query = inputField.value.trim();
      if (query) {
        handleUserQuery(query);
        inputField.value = '';
      }
    });
  }
}

function handleUserQuery(queryText) {
  const chatLog = document.getElementById('assistant-chat-log');
  if (!chatLog) return;

  // Append user message bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble chat-bubble-user';
  userBubble.style.maxWidth = '90%';
  userBubble.innerHTML = `
    <div class="bubble-sender">You</div>
    <p style="color: var(--surface);">${escapeHtml(queryText)}</p>
  `;
  chatLog.appendChild(userBubble);
  chatLog.scrollTop = chatLog.scrollHeight;

  // Simulate retrieval delay
  setTimeout(() => {
    const match = findApprovedMatch(queryText);
    renderAssistantResponse(match);
  }, 350);
}

function findApprovedMatch(query) {
  const lower = query.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  APPROVED_KNOWLEDGE_BASE.forEach(entry => {
    let score = 0;
    entry.keywords.forEach(kw => {
      if (lower.includes(kw)) {
        score += 2;
      }
    });
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  });

  if (highestScore > 0 && bestMatch) {
    return bestMatch;
  }

  // Fallback if no direct keyword match found
  return {
    topic: "General Inquiry Boundary",
    answer: "I only have access to owner-approved documentation regarding AIVIBEDEV's B2B services, architecture, process, and pricing. I can connect you directly with our strategy team to discuss your specific workflow requirements.",
    recommendedService: "Direct Workflow Discussion",
    ctaLink: "#contact"
  };
}

function renderAssistantResponse(responseObj) {
  const chatLog = document.getElementById('assistant-chat-log');
  if (!chatLog) return;

  const aiBubble = document.createElement('div');
  aiBubble.className = 'chat-bubble chat-bubble-ai';
  aiBubble.style.maxWidth = '92%';
  aiBubble.innerHTML = `
    <div class="bubble-sender">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
      AIVIBEDEV Assistant (Grounded)
    </div>
    <p style="color: var(--navy-950); font-size: 0.85rem;">${responseObj.answer}</p>
    <div style="margin-top: 0.5rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem;">
      <span style="font-family: var(--font-mono); color: var(--text-muted);">Topic: ${responseObj.topic}</span>
      <a href="${responseObj.ctaLink}" style="font-weight: 600; color: var(--teal-700); text-decoration: underline;">${responseObj.recommendedService} &rarr;</a>
    </div>
  `;

  chatLog.appendChild(aiBubble);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
