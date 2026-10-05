/**
 * AIVIBEDEV — Inquiry Revenue Leakage & ROI Calculator
 * Calculates estimated staff hours saved, recovered deal pipeline from instant qualification,
 * and direct third-party model token run-rates for B2B service firms.
 */

document.addEventListener('DOMContentLoaded', () => {
  initRoiCalculator();
});

function initRoiCalculator() {
  const visitorsSlider = document.getElementById('calc-visitors');
  const dealSlider = document.getElementById('calc-deal-size');
  const rateSlider = document.getElementById('calc-rate');

  const visitorsVal = document.getElementById('calc-visitors-val');
  const dealVal = document.getElementById('calc-deal-val');
  const rateVal = document.getElementById('calc-rate-val');

  const monthlyInquiriesOut = document.getElementById('calc-inquiries-out');
  const hoursSavedOut = document.getElementById('calc-hours-out');
  const recoveredPipelineOut = document.getElementById('calc-pipeline-out');
  const modelCostOut = document.getElementById('calc-model-cost-out');
  const hostingCostOut = document.getElementById('calc-hosting-cost-out');
  const totalCostOut = document.getElementById('calc-total-cost-out');
  const annualRoiOut = document.getElementById('calc-roi-out');

  if (!visitorsSlider) return;

  function updateCalculations() {
    const visitors = parseInt(visitorsSlider.value, 10);
    const dealSize = dealSlider ? parseInt(dealSlider.value, 10) : 10000;
    const rate = rateSlider ? parseFloat(rateSlider.value) : 4.0;

    // Update display values
    if (visitorsVal) visitorsVal.textContent = visitors.toLocaleString();
    if (dealVal) dealVal.textContent = `$${dealSize.toLocaleString()}`;
    if (rateVal) rateVal.textContent = `${rate.toFixed(1)}%`;

    // Operational metrics calculations
    const monthlyInquiries = Math.round(visitors * (rate / 100));

    // Average manual triage & qualification takes ~25 minutes per inquiry (0.42 hours)
    const monthlyHoursSaved = Math.round(monthlyInquiries * 0.42);

    // Traditional form drop-off / lead decay causes ~15% loss of high-intent deals due to 24hr lag
    // Instant 60s qualification and structured intake recovers an estimated 2-4 additional closed deals/year
    const estimatedRecoveredDealsAnnual = Math.max(1, Math.round((monthlyInquiries * 12) * 0.025));
    const annualPipelineRecovered = estimatedRecoveredDealsAnnual * dealSize;

    // Direct token calculation: 4 turns * ~600 tokens = ~2,400 tokens per inquiry
    const totalMonthlyTokens = monthlyInquiries * 2400;
    // Blended rate for Claude 3.5 Sonnet / Haiku / GPT-4o mini tier (~$3.00 per 1M tokens)
    const modelCost = (totalMonthlyTokens / 1000000) * 3.00;
    const hostingCost = 25.00; // Vercel / Netlify Pro + n8n automation tier
    const totalMonthlyRunRate = modelCost + hostingCost;

    // Staff labor value saved (assuming $65/hr internal operations rate)
    const annualLaborSavings = monthlyHoursSaved * 65 * 12;
    const totalAnnualValue = annualPipelineRecovered + annualLaborSavings;

    // Render outputs
    if (monthlyInquiriesOut) monthlyInquiriesOut.textContent = monthlyInquiries.toLocaleString();
    if (hoursSavedOut) hoursSavedOut.textContent = `${monthlyHoursSaved} hrs / mo`;
    if (recoveredPipelineOut) recoveredPipelineOut.textContent = `$${annualPipelineRecovered.toLocaleString()} / yr`;
    if (modelCostOut) modelCostOut.textContent = `$${modelCost.toFixed(2)} / mo`;
    if (hostingCostOut) hostingCostOut.textContent = `$${hostingCost.toFixed(2)} / mo`;
    if (totalCostOut) totalCostOut.textContent = `$${totalMonthlyRunRate.toFixed(2)} / mo`;
    if (annualRoiOut) annualRoiOut.textContent = `+$${totalAnnualValue.toLocaleString()} / yr`;
  }

  visitorsSlider.addEventListener('input', updateCalculations);
  if (dealSlider) dealSlider.addEventListener('input', updateCalculations);
  if (rateSlider) rateSlider.addEventListener('input', updateCalculations);

  // Initial calculation
  updateCalculations();
}
