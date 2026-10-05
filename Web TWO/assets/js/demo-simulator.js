/**
 * AIVIBEDEV — Interactive Demo Sandbox Simulator
 * Illustrative demonstration of Visitor Conversation -> Grounded Retrieval -> Structured Intake -> Internal Ops Review
 */

const DEMO_SCENARIOS = {
  consulting: {
    title: "B2B Management Consulting (Meridian Advisory)",
    initialPrompt: "Do you offer custom strategy audits for mid-market logistics firms, and how are retainers scoped?",
    aiResponse: "Yes. For mid-market logistics companies, Meridian provides a 3-week Operational Strategy Audit. Retainers are scoped based on specific integration milestones and human decision checkpoints rather than open-ended hours. Would you like to share your current operational stack for our team to review?",
    sourceNote: "Grounded in: 'Meridian Services & Retainer Policy v2.4'",
    visitorName: "Sarah Jenkins",
    visitorEmail: "s.jenkins@translogix-group.com",
    visitorCompany: "TransLogix Global",
    visitorProcess: "We manage 45 contract carriers across HubSpot, Notion, and Airtable. We need to streamline carrier onboarding and weekly rate approvals.",
    triageCategory: "High Priority — Operations Retainer Scoping",
    confidenceScore: "98.4% Grounded in Approved Scope Policy",
    recommendedAction: "Dispatch calendar invite for 20-min Fit Call with Ops Lead."
  },
  legal: {
    title: "Corporate Legal Advisory (Vanguard Counsel)",
    initialPrompt: "Can your assistant answer client questions about NDA turnaround times and compliance review tiers?",
    aiResponse: "Standard mutual NDAs are reviewed within 24 business hours under our Tier 1 SLA. Custom commercial agreements require partner review and typically take 3 business days. I can capture your contract volume so our managing partner can prepare a tailored scope.",
    sourceNote: "Grounded in: 'Vanguard SLA & Agreement Guidelines 2026'",
    visitorName: "Marcus Vance",
    visitorEmail: "m.vance@solaris-biotech.com",
    visitorCompany: "Solaris BioTech",
    visitorProcess: "We receive ~30 vendor NDAs per month and need a structured intake that verifies entity registration before our paralegal reviews.",
    triageCategory: "Standard Intake — Vendor Agreement Workflow",
    confidenceScore: "99.1% Grounded in SLA Matrix",
    recommendedAction: "Route to Associate Review Queue in Clio/Slack."
  },
  agency: {
    title: "Creative & Growth Agency (Canvas & Code)",
    initialPrompt: "What is included in your Connected AI Website package versus custom software?",
    aiResponse: "Our Connected AI Website package includes a custom responsive website, an on-site assistant grounded in approved agency documentation, an inquiry intake path, and webhook sync to your CRM. Custom AI Apps are recommended when you need dedicated staff portals or complex multi-step approval pipelines.",
    sourceNote: "Grounded in: 'Studio Package Comparison & Scope Matrix'",
    visitorName: "Elena Rostova",
    visitorEmail: "elena@vertexgrowth.co",
    visitorCompany: "Vertex Growth Media",
    visitorProcess: "We want to replace our generic web form with a grounded assistant that qualifies inbound leads and drafts brief summaries for our account directors.",
    triageCategory: "Flagship Inquiry — Connected AI Website",
    confidenceScore: "97.8% Grounded in Studio Offerings",
    recommendedAction: "Generate tailored workflow proposal & send scheduling link."
  }
};

let currentScenarioKey = 'consulting';
let currentStep = 1; // 1: Initial Prompt, 2: AI Response, 3: Intake Form, 4: Submitted & Triaged

document.addEventListener('DOMContentLoaded', () => {
  initDemoSimulator();
});

function initDemoSimulator() {
  const scenarioBtns = document.querySelectorAll('.scenario-btn');
  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const scenarioKey = btn.getAttribute('data-scenario');
      if (scenarioKey && DEMO_SCENARIOS[scenarioKey]) {
        scenarioBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentScenarioKey = scenarioKey;
        resetDemoState();
      }
    });
  });

  const runStepBtn = document.getElementById('demo-next-step-btn');
  const resetBtn = document.getElementById('demo-reset-btn');

  if (runStepBtn) {
    runStepBtn.addEventListener('click', advanceDemoStep);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetDemoState);
  }

  // Handle Ops Action buttons
  const approveBtn = document.getElementById('ops-approve-btn');
  const flagBtn = document.getElementById('ops-flag-btn');
  const opsStatusBadge = document.getElementById('ops-status-badge');
  const auditLog = document.getElementById('demo-audit-log');

  if (approveBtn && opsStatusBadge) {
    approveBtn.addEventListener('click', () => {
      opsStatusBadge.className = 'badge badge-teal';
      opsStatusBadge.textContent = 'Approved by Human Lead';
      addAuditLogEntry('Human reviewer approved handoff. Dispatched calendar invite & synced to HubSpot CRM.');
      approveBtn.disabled = true;
      if (flagBtn) flagBtn.disabled = true;
    });
  }

  if (flagBtn && opsStatusBadge) {
    flagBtn.addEventListener('click', () => {
      opsStatusBadge.className = 'badge badge-amber';
      opsStatusBadge.textContent = 'Flagged for Follow-up';
      addAuditLogEntry('Human reviewer flagged record: requested additional billing entity clarification.');
      flagBtn.disabled = true;
      if (approveBtn) approveBtn.disabled = true;
    });
  }

  // Render initial scenario
  renderDemoState();
}

function resetDemoState() {
  currentStep = 1;
  const runStepBtn = document.getElementById('demo-next-step-btn');
  if (runStepBtn) {
    runStepBtn.disabled = false;
    runStepBtn.textContent = 'Simulate Next Step &rarr;';
  }
  const approveBtn = document.getElementById('ops-approve-btn');
  const flagBtn = document.getElementById('ops-flag-btn');
  if (approveBtn) approveBtn.disabled = false;
  if (flagBtn) flagBtn.disabled = false;

  renderDemoState();
}

function advanceDemoStep() {
  if (currentStep < 4) {
    currentStep++;
    renderDemoState();
  }
  if (currentStep === 4) {
    const runStepBtn = document.getElementById('demo-next-step-btn');
    if (runStepBtn) {
      runStepBtn.disabled = true;
      runStepBtn.textContent = 'Simulation Completed';
    }
  }
}

function renderDemoState() {
  const scenario = DEMO_SCENARIOS[currentScenarioKey];
  const chatBody = document.getElementById('demo-chat-body');
  const opsDataView = document.getElementById('ops-data-view');
  const opsStatusBadge = document.getElementById('ops-status-badge');
  const auditLog = document.getElementById('demo-audit-log');

  if (!chatBody || !opsDataView || !scenario) return;

  // Build Left Chat UI
  let chatHtml = `
    <div class="chat-bubble chat-bubble-user">
      <div class="bubble-sender">Visitor Inquiry</div>
      <p>${scenario.initialPrompt}</p>
    </div>
  `;

  if (currentStep >= 2) {
    chatHtml += `
      <div class="chat-bubble chat-bubble-ai">
        <div class="bubble-sender">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
          Assistant (Grounded on Approved Info)
        </div>
        <p>${scenario.aiResponse}</p>
        <div class="chat-source-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path></svg>
          ${scenario.sourceNote}
        </div>
      </div>
    `;
  }

  if (currentStep >= 3) {
    chatHtml += `
      <div class="chat-bubble chat-bubble-ai">
        <div class="bubble-sender">Structured Intake &amp; Consent</div>
        <p>Please confirm your details below. This inquiry will be reviewed by our operations team before any follow-up actions are taken.</p>
        <div class="in-chat-form">
          <h5>Inquiry Review Intake</h5>
          <div class="form-group-mini">
            <label>Name &amp; Organization</label>
            <input type="text" value="${scenario.visitorName} — ${scenario.visitorCompany}" readonly>
          </div>
          <div class="form-group-mini">
            <label>Work Email</label>
            <input type="email" value="${scenario.visitorEmail}" readonly>
          </div>
          <div class="form-group-mini">
            <label>Workflow Requirement</label>
            <textarea rows="2" readonly>${scenario.visitorProcess}</textarea>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.4rem;">
            Consent confirmed: Visitor authorized team review on ${new Date().toLocaleDateString()}.
          </div>
        </div>
      </div>
    `;
  }

  chatBody.innerHTML = chatHtml;
  chatBody.scrollTop = chatBody.scrollHeight;

  // Build Right Ops Lead Queue UI
  if (currentStep < 3) {
    if (opsStatusBadge) {
      opsStatusBadge.className = 'badge badge-navy';
      opsStatusBadge.textContent = 'Awaiting Intake Submission';
    }
    opsDataView.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 0.75rem; display: block; opacity: 0.6;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <p style="font-size: 0.88rem; font-family: var(--font-mono);">Waiting for visitor to complete inquiry intake step...</p>
        <span style="font-size: 0.75rem;">(Advance the simulation step on the left or click 'Simulate Next Step')</span>
      </div>
    `;
  } else {
    if (opsStatusBadge) {
      opsStatusBadge.className = 'badge badge-teal';
      opsStatusBadge.textContent = 'Ready for Human Review';
    }
    opsDataView.innerHTML = `
      <div class="ops-triage-card">
        <div class="ops-card-header">
          <div>
            <strong style="font-size: 0.92rem; color: var(--navy-950); display: block;">${scenario.visitorCompany}</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">${scenario.visitorName} &lt;${scenario.visitorEmail}&gt;</span>
          </div>
          <span class="ops-source-badge">${scenario.triageCategory}</span>
        </div>

        <table class="ops-data-table">
          <tr>
            <td class="label">Grounding:</td>
            <td class="val">${scenario.confidenceScore}</td>
          </tr>
          <tr>
            <td class="label">Workflow Need:</td>
            <td class="val">${scenario.visitorProcess}</td>
          </tr>
          <tr>
            <td class="label">AI Recommendation:</td>
            <td class="val" style="color: var(--teal-800); font-weight: 600;">${scenario.recommendedAction}</td>
          </tr>
          <tr>
            <td class="label">Security &amp; Consent:</td>
            <td class="val">Verified — No PII or credentials detected.</td>
          </tr>
        </table>
      </div>
    `;
  }

  // Update audit log
  if (auditLog) {
    if (currentStep === 1) {
      auditLog.innerHTML = `<div class="audit-log-item"><span class="audit-dot"></span><span>Session initialized. Scenario: ${scenario.title}.</span></div>`;
    } else if (currentStep === 2) {
      auditLog.innerHTML = `
        <div class="audit-log-item"><span class="audit-dot"></span><span>Visitor query processed.</span></div>
        <div class="audit-log-item"><span class="audit-dot"></span><span>Retrieved matching knowledge: ${scenario.sourceNote}.</span></div>
      `;
    } else if (currentStep >= 3) {
      auditLog.innerHTML = `
        <div class="audit-log-item"><span class="audit-dot"></span><span>Visitor submitted structured intake form.</span></div>
        <div class="audit-log-item"><span class="audit-dot"></span><span>Validated inputs &amp; verified user consent.</span></div>
        <div class="audit-log-item"><span class="audit-dot"></span><span>Queued handoff item for human operations review.</span></div>
      `;
    }
  }
}

function addAuditLogEntry(text) {
  const auditLog = document.getElementById('demo-audit-log');
  if (auditLog) {
    const item = document.createElement('div');
    item.className = 'audit-log-item';
    item.innerHTML = `<span class="audit-dot" style="background-color: var(--navy-950);"></span><span>${text}</span>`;
    auditLog.appendChild(item);
    auditLog.scrollTop = auditLog.scrollHeight;
  }
}
