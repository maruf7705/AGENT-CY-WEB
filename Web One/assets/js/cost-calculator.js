/**
 * AIVIBEDEV Cost & Scoping Estimator
 * Helps B2B founders estimate potential monthly operating costs (model tokens, hosting, middleware)
 * alongside their agency implementation tier.
 */

(function () {
  'use strict';

  function initCostCalculator() {
    const calcRoot = document.getElementById('cost-calculator-root');
    if (!calcRoot) return;

    calcRoot.innerHTML = `
      <div class="pricing-card" style="margin-top: 2rem; border-color: var(--teal-700); background: linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
          <div>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.25rem;">Interactive Scope &amp; Operating Cost Estimator</h3>
            <p style="font-size: 0.84375rem; color: var(--navy-600); margin: 0;">Model and infrastructure estimates based on your expected monthly inquiry volume.</p>
          </div>
          <span class="eyebrow" style="margin: 0;">Transparent Model Pricing</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <label for="calc-inquiries" style="font-size: 0.8125rem; font-weight: 700; color: var(--navy-900); display: block; margin-bottom: 0.5rem;">
              Estimated Monthly Website Visitors / Inquiries:
            </label>
            <input type="range" id="calc-inquiries" min="200" max="10000" step="200" value="1500" style="width: 100%; accent-color: var(--teal-700);" />
            <div style="display: flex; justify-content: space-between; font-size: 0.78125rem; color: var(--navy-600); margin-top: 0.25rem;">
              <span>200</span>
              <strong id="calc-inquiries-val" style="color: var(--teal-800); font-size: 0.9375rem;">1,500 inquiries/mo</strong>
              <span>10,000+</span>
            </div>
          </div>

          <div>
            <label for="calc-model-tier" style="font-size: 0.8125rem; font-weight: 700; color: var(--navy-900); display: block; margin-bottom: 0.5rem;">
              Model Provider &amp; Reasoning Tier:
            </label>
            <select id="calc-model-tier" class="form-control" style="font-size: 0.84375rem; padding: 0.45rem 0.65rem;">
              <option value="hybrid">Grounded Fast Model (e.g., GPT-4o-mini / Claude Haiku)</option>
              <option value="premium">Deep Reasoning Model (e.g., Claude 3.5 Sonnet / GPT-4o)</option>
              <option value="local">Self-Hosted / Local Open Weights</option>
            </select>
          </div>
        </div>

        <!-- Calculated Summary Box -->
        <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 1.25rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
          <div>
            <span style="font-size: 0.71875rem; text-transform: uppercase; font-weight: 700; color: var(--navy-500); display: block;">Est. LLM Token Cost</span>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--navy-900);" id="est-token-cost">$4 - $12 / mo</div>
            <span style="font-size: 0.71875rem; color: var(--navy-500);">Direct to OpenAI/Anthropic</span>
          </div>
          <div>
            <span style="font-size: 0.71875rem; text-transform: uppercase; font-weight: 700; color: var(--navy-500); display: block;">Est. Automation Server (n8n/Webhook)</span>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--navy-900);" id="est-infra-cost">$0 - $20 / mo</div>
            <span style="font-size: 0.71875rem; color: var(--navy-500);">Self-host VPS or Cloud</span>
          </div>
          <div>
            <span style="font-size: 0.71875rem; text-transform: uppercase; font-weight: 700; color: var(--navy-500); display: block;">Total Est. Operating Run Rate</span>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--teal-800);" id="est-total-cost">~$15 - $32 / mo</div>
            <span style="font-size: 0.71875rem; color: var(--navy-500);">Client-owned accounts</span>
          </div>
        </div>

        <p style="font-size: 0.75rem; color: var(--navy-500); margin-top: 0.75rem; margin-bottom: 0;">
          *Note: These are operating estimates for third-party infrastructure. Agency build and architecture fees are billed per scope as outlined in our package tiers above.
        </p>
      </div>
    `;

    const slider = document.getElementById('calc-inquiries');
    const sliderVal = document.getElementById('calc-inquiries-val');
    const modelSelect = document.getElementById('calc-model-tier');
    const tokenCostEl = document.getElementById('est-token-cost');
    const infraCostEl = document.getElementById('est-infra-cost');
    const totalCostEl = document.getElementById('est-total-cost');

    function updateEstimates() {
      const inquiries = parseInt(slider.value, 10);
      sliderVal.textContent = `${inquiries.toLocaleString()} inquiries/mo`;

      const tier = modelSelect.value;
      let tokenMin = 0;
      let tokenMax = 0;
      let infraMin = 0;
      let infraMax = 20;

      if (tier === 'hybrid') {
        tokenMin = Math.max(1, Math.round(inquiries * 0.003));
        tokenMax = Math.max(3, Math.round(inquiries * 0.008));
      } else if (tier === 'premium') {
        tokenMin = Math.max(5, Math.round(inquiries * 0.02));
        tokenMax = Math.max(15, Math.round(inquiries * 0.045));
      } else {
        tokenMin = 0;
        tokenMax = 0;
        infraMin = 25;
        infraMax = 60;
      }

      tokenCostEl.textContent = `$${tokenMin} - $${tokenMax} / mo`;
      infraCostEl.textContent = `$${infraMin} - $${infraMax} / mo`;
      totalCostEl.textContent = `~$${tokenMin + infraMin} - $${tokenMax + infraMax} / mo`;
    }

    slider.addEventListener('input', updateEstimates);
    modelSelect.addEventListener('change', updateEstimates);
    updateEstimates();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCostCalculator);
  } else {
    initCostCalculator();
  }
})();
