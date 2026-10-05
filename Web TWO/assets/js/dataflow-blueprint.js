/**
 * AIVIBEDEV — Interactive Architecture & Dataflow Blueprint
 * Enables B2B founders to explore how data moves across the connected system:
 * Inbound Visitor -> LangChain Grounding -> LangGraph Stateful Logic -> n8n Webhook -> Staff Review Queue
 */

const DATAFLOW_NODES = {
  node1: {
    id: "node1",
    title: "1. Visitor Inbound & Inquiry Context",
    component: "Web Front-End / Grounded Assistant Interface",
    statusBadge: "Client Interaction Boundary",
    badgeClass: "badge-teal",
    description: "The prospective client asks a specific question regarding service scope, technical fit, or pricing parameters. The front-end captures session state without collecting unapproved private credentials.",
    businessFunction: "Eliminates generic 1-line form drops by providing immediate 60-second answers and capturing qualified scope details in real time.",
    safetyGate: "Input length limiter + PII filter blocks passwords, API keys, or credit card numbers.",
    schemaPreview: {
      session_id: "sess_982f1b4a",
      timestamp_utc: new Date().toISOString(),
      visitor_query: "Do you integrate custom LangGraph workflows with our HubSpot CRM, and what is your scoped pilot timeline?",
      visitor_consent: true,
      data_boundary_level: "PUBLIC_VERIFIED_ONLY"
    }
  },
  node2: {
    id: "node2",
    title: "2. LangChain Grounding & Boundary Gate",
    component: "Deterministic Retrieval Engine (RAG) & Policy Filter",
    statusBadge: "Zero Hallucination Gate",
    badgeClass: "badge-navy",
    description: "The incoming query is matched against the owner-approved company documentation corpus. If information is verified, a cited response is generated; if unverified, the assistant safely falls back to human scheduling.",
    businessFunction: "Protects agency reputation and legal liability. The assistant never fabricates pricing, unapproved SLAs, or nonexistent capabilities.",
    safetyGate: "Strict similarity threshold (>0.82) required for knowledge citations. Hallucination fallback triggered automatically.",
    schemaPreview: {
      retrieval_status: "MATCH_VERIFIED",
      matched_document: "AIVIBEDEV Studio Offerings & Governance Matrix v2.6",
      grounding_confidence: "98.7%",
      permitted_citations: ["Connected AI Websites", "HubSpot n8n Webhooks", "Scoped Pilot (Stage 03)"],
      unauthorized_topics_blocked: ["Custom Private Financials", "Internal Server Credentials"]
    }
  },
  node3: {
    id: "node3",
    title: "3. LangGraph Stateful Decision Graph",
    component: "Stateful Process Orchestration & Routing Engine",
    statusBadge: "Multi-Step Logic (When Warranted)",
    badgeClass: "badge-amber",
    description: "When the workflow requires multiple sequential validation steps (e.g. scoping qualification, tech-stack compatibility check, and duplicate lead matching), LangGraph orchestrates the state machine.",
    businessFunction: "Ensures state persistence and cyclical validation across complex inquiry evaluations without losing context or dropping requests.",
    safetyGate: "Checkpoint persistence to PostgreSQL / SQLite memory with strict timeout boundaries and error recovery branches.",
    schemaPreview: {
      graph_execution_id: "graph_exec_0047b",
      state_steps_completed: ["validate_schema", "deduplicate_company", "evaluate_technical_fit"],
      qualification_tier: "TIER_1_FLAGSHIP_FIT",
      requires_specialist_agent: false,
      recommended_next_action: "DISPATCH_INTAKE_PAYLOAD"
    }
  },
  node4: {
    id: "node4",
    title: "4. Deterministic n8n Webhook Pipeline",
    component: "Integration Middleware (Self-Hosted / Cloud Automation)",
    statusBadge: "Zero-Data-Loss Pipeline",
    badgeClass: "badge-blue",
    description: "The structured intake payload is formatted and transmitted via secure HTTPS webhooks to your existing business tools (HubSpot CRM, Notion databases, Slack channels, or Airtable).",
    businessFunction: "Removes 100% of manual copy-pasting between systems while keeping your team working inside the tools you already use every day.",
    safetyGate: "HMAC webhook signature verification, automatic retry backoff on 5xx errors, and encrypted credential storage.",
    schemaPreview: {
      webhook_event: "inbound_qualified_lead",
      target_systems: ["HubSpot_CRM", "Slack_Ops_Channel", "Notion_Scoping_Queue"],
      payload_dispatched: {
        company: "TransLogix Global",
        contact_email: "s.jenkins@translogix-group.com",
        current_stack: ["HubSpot", "Notion", "Airtable"],
        budget_bracket: "$10,000 - $25,000"
      },
      delivery_latency_ms: 142
    }
  },
  node5: {
    id: "node5",
    title: "5. Staff Operations Triage & Human Review Gate",
    component: "Custom Staff Portal / Operations Review Dashboard",
    statusBadge: "Human-in-the-Loop Checkpoint",
    badgeClass: "badge-teal",
    description: "The inquiry arrives in your designated operations triage interface. A human team member reviews the conversation context, verified citations, and AI recommendation before taking action.",
    businessFunction: "Maintains full human authority over pricing quotes, formal proposals, and client communications. Zero blind AI automation.",
    safetyGate: "Explicit staff confirmation required prior to dispatching calendar scheduling links or custom contract drafts.",
    schemaPreview: {
      triage_status: "AWAITING_HUMAN_CONFIRMATION",
      assigned_reviewer: "Elena Vance (Operations Lead)",
      review_options: ["Approve_and_Send_Calendar_Link", "Request_Clarification", "Archive_Record"],
      audit_logged_by: "system_security_monitor"
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initDataflowBlueprint();
});

function initDataflowBlueprint() {
  const nodeButtons = document.querySelectorAll('.dataflow-node-btn');
  const titleEl = document.getElementById('df-node-title');
  const compEl = document.getElementById('df-node-comp');
  const badgeEl = document.getElementById('df-node-badge');
  const descEl = document.getElementById('df-node-desc');
  const bizEl = document.getElementById('df-node-biz');
  const safetyEl = document.getElementById('df-node-safety');
  const schemaEl = document.getElementById('df-node-schema');

  if (!nodeButtons.length || !titleEl) return;

  function renderNode(nodeId) {
    const data = DATAFLOW_NODES[nodeId];
    if (!data) return;

    // Update active button state
    nodeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-node') === nodeId);
    });

    // Populate detail panels
    if (titleEl) titleEl.textContent = data.title;
    if (compEl) compEl.textContent = data.component;
    if (badgeEl) {
      badgeEl.className = `badge ${data.badgeClass}`;
      badgeEl.textContent = data.statusBadge;
    }
    if (descEl) descEl.textContent = data.description;
    if (bizEl) bizEl.textContent = data.businessFunction;
    if (safetyEl) safetyEl.textContent = data.safetyGate;
    if (schemaEl) schemaEl.textContent = JSON.stringify(data.schemaPreview, null, 2);
  }

  nodeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const nodeId = btn.getAttribute('data-node');
      renderNode(nodeId);
    });
  });

  // Render initial node
  renderNode('node1');
}
