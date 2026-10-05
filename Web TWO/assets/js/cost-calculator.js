/**
 * AIVIBEDEV — Interactive Operating Cost & Token Scoping Estimator
 * Helps B2B founders estimate realistic model token usage, webhook operations, and infrastructure costs.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCostCalculator();
});

function initCostCalculator() {
  const visitorsSlider = document.getElementById('calc-visitors');
  const rateSlider = document.getElementById('calc-rate');

  const visitorsVal = document.getElementById('calc-visitors-val');
  const rateVal = document.getElementById('calc-rate-val');

  const monthlyConversationsOut = document.getElementById('calc-conversations-out');
  const tokensEstimateOut = document.getElementById('calc-tokens-out');
  const modelCostOut = document.getElementById('calc-model-cost-out');
  const hostingCostOut = document.getElementById('calc-hosting-cost-out');
  const totalCostOut = document.getElementById('calc-total-cost-out');

  if (!visitorsSlider || !rateSlider) return;

  function updateCalculations() {
    const visitors = parseInt(visitorsSlider.value, 10);
    const rate = parseFloat(rateSlider.value);

    // Update slider label displays
    if (visitorsVal) visitorsVal.textContent = visitors.toLocaleString();
    if (rateVal) rateVal.textContent = `${rate.toFixed(1)}%`;

    // Calculation formulas
    const monthlyConversations = Math.round(visitors * (rate / 100));
    // Average 4 turns per conversation * ~600 tokens per turn = ~2,400 tokens per inquiry interaction
    const totalTokens = monthlyConversations * 2400;
    // Standard blended input/output rate for Tier-1 models (e.g., Claude 3.5 Sonnet / GPT-4o mini mix) ~ $3.00 per 1M tokens
    const modelCost = (totalTokens / 1000000) * 3.00;

    // Fixed infrastructure (Vercel/Netlify Pro static hosting ~$20/mo + n8n cloud tier ~$20/mo)
    const hostingCost = 25.00;
    const totalOperatingCost = modelCost + hostingCost;

    // Render outputs
    if (monthlyConversationsOut) monthlyConversationsOut.textContent = monthlyConversations.toLocaleString();
    if (tokensEstimateOut) tokensEstimateOut.textContent = `${(totalTokens / 1000).toFixed(0)}k tokens`;
    if (modelCostOut) modelCostOut.textContent = `$${modelCost.toFixed(2)} / mo`;
    if (hostingCostOut) hostingCostOut.textContent = `$${hostingCost.toFixed(2)} / mo`;
    if (totalCostOut) totalCostOut.textContent = `$${totalOperatingCost.toFixed(2)} / mo`;
  }

  visitorsSlider.addEventListener('input', updateCalculations);
  rateSlider.addEventListener('input', updateCalculations);

  // Initial calculation
  updateCalculations();
}
