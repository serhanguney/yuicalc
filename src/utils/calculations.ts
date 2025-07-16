import type {
  FinancialInputs,
  FinancialCalculations,
  CalculationFormulas,
} from '../types/financial';

export const calculateFinancialMetrics = (
  inputs: FinancialInputs
): FinancialCalculations => {
  // Since users now input values in their chosen currency,
  // the inputs are already in the target currency
  const convertedMonthlyRevenue = inputs.monthlyRevenue; // Already in target currency

  // Growth rate calculations
  const growthRate = inputs.growthRate / 100; // Convert percentage to decimal
  const projectedRevenue3Months =
    convertedMonthlyRevenue * Math.pow(1 + growthRate, 3);
  const projectedRevenue6Months =
    convertedMonthlyRevenue * Math.pow(1 + growthRate, 6);
  const projectedRevenue12Months =
    convertedMonthlyRevenue * Math.pow(1 + growthRate, 12);

  // Fixed costs calculations (already in target currency)
  const fixedCosts = [
    inputs.rent,
    inputs.salaries,
    inputs.supplies,
    inputs.utilities,
    inputs.insurance,
    inputs.marketing,
    inputs.otherFixedCosts,
  ];
  const totalFixedCosts = fixedCosts
    .filter(cost => cost > 0)
    .reduce((sum, cost) => sum + cost, 0);
  const convertedTotalFixedCosts = totalFixedCosts; // Already in target currency

  // Variable costs calculations (as percentages of revenue)
  const variableCostPercentages = [
    inputs.creditCardCommissions,
    inputs.costOfGoodsSold,
    inputs.otherVariableCosts,
  ];
  const totalVariableCostPercentage = variableCostPercentages
    .filter(percentage => percentage > 0)
    .reduce((sum, percentage) => sum + percentage, 0);

  // Calculate variable costs in currency
  const totalVariableCosts =
    (convertedMonthlyRevenue * totalVariableCostPercentage) / 100;
  const convertedTotalVariableCosts = totalVariableCosts;

  // Revenue and profit calculations
  const monthlyRevenue = convertedMonthlyRevenue;
  const contributionMargin = monthlyRevenue - totalVariableCosts;
  const contributionMarginRatio =
    monthlyRevenue > 0 ? contributionMargin / monthlyRevenue : 0;

  // Break even calculations
  const breakEvenPoint =
    contributionMarginRatio > 0
      ? convertedTotalFixedCosts / contributionMarginRatio
      : 0;
  const breakEvenPointMonths =
    monthlyRevenue > 0 ? breakEvenPoint / monthlyRevenue : 0;

  // Profit calculations
  const grossProfit = monthlyRevenue - totalVariableCosts;
  const netProfit = grossProfit - convertedTotalFixedCosts;
  const profitMargin = monthlyRevenue > 0 ? netProfit / monthlyRevenue : 0;

  // Market share calculations (market cap is already in target currency)
  const convertedMarketCap = inputs.totalMarketCap; // Already in target currency
  const marketShare =
    convertedMarketCap > 0 ? monthlyRevenue / convertedMarketCap : 0;
  const marketSharePercentage = marketShare * 100;

  // Additional calculations
  const cashFlow =
    monthlyRevenue - (convertedTotalFixedCosts + totalVariableCosts);
  const convertedInitialInvestment = inputs.initialInvestment; // Already in target currency
  const returnOnInvestment =
    convertedInitialInvestment > 0 ? netProfit / convertedInitialInvestment : 0;
  const paybackPeriod =
    netProfit > 0 ? convertedInitialInvestment / netProfit : 0;
  const monthlyBurnRate = convertedTotalFixedCosts + totalVariableCosts;
  const runwayMonths =
    convertedInitialInvestment > 0
      ? convertedInitialInvestment / monthlyBurnRate
      : 0;

  return {
    convertedMonthlyRevenue,
    convertedTotalFixedCosts,
    convertedTotalVariableCosts,
    totalFixedCosts,
    totalVariableCosts,
    contributionMargin,
    contributionMarginRatio,
    breakEvenPoint,
    breakEvenPointMonths,
    grossProfit,
    netProfit,
    profitMargin,
    marketShare,
    marketSharePercentage,
    cashFlow,
    returnOnInvestment,
    paybackPeriod,
    monthlyBurnRate,
    runwayMonths,
    // Growth projections
    projectedRevenue3Months,
    projectedRevenue6Months,
    projectedRevenue12Months,
    growthRate: inputs.growthRate,
  };
};

// Helper function to calculate required growth rate to reach target revenue
export const calculateRequiredGrowthRate = (
  currentRevenue: number,
  targetRevenue: number,
  months: number
): number => {
  if (currentRevenue <= 0 || targetRevenue <= 0 || months <= 0) {
    return 0;
  }

  // Formula: targetRevenue = currentRevenue * (1 + growthRate)^months
  // Solving for growthRate: growthRate = (targetRevenue/currentRevenue)^(1/months) - 1
  const growthRate = Math.pow(targetRevenue / currentRevenue, 1 / months) - 1;
  return growthRate * 100; // Convert to percentage
};

// Helper function to calculate projected revenue at a specific month
export const calculateProjectedRevenue = (
  currentRevenue: number,
  growthRate: number,
  months: number
): number => {
  const monthlyGrowthRate = growthRate / 100; // Convert percentage to decimal
  return currentRevenue * Math.pow(1 + monthlyGrowthRate, months);
};

export const getCalculationFormulas = (): CalculationFormulas => ({
  convertedMonthlyRevenue: 'Monthly Revenue (in target currency)',
  convertedTotalFixedCosts: 'Total Fixed Costs (in target currency)',
  convertedTotalVariableCosts:
    '(Monthly Revenue × Total Variable Cost Percentage) / 100',
  totalFixedCosts:
    'Rent + Salaries + Supplies + Utilities + Insurance + Marketing + Other Fixed Costs',
  totalVariableCosts:
    '(Monthly Revenue × Total Variable Cost Percentage) / 100',
  contributionMargin: 'Monthly Revenue - Total Variable Costs',
  contributionMarginRatio: 'Contribution Margin / Monthly Revenue',
  breakEvenPoint: 'Total Fixed Costs / Contribution Margin Ratio',
  breakEvenPointMonths: 'Break Even Point / Monthly Revenue',
  grossProfit: 'Monthly Revenue - Total Variable Costs',
  netProfit: 'Gross Profit - Total Fixed Costs',
  profitMargin: 'Net Profit / Monthly Revenue',
  marketShare: 'Monthly Revenue / Total Market Cap',
  marketSharePercentage: 'Market Share × 100',
  cashFlow: 'Monthly Revenue - (Total Fixed Costs + Total Variable Costs)',
  returnOnInvestment: 'Net Profit / Initial Investment',
  paybackPeriod: 'Initial Investment / Net Profit',
  monthlyBurnRate: 'Total Fixed Costs + Total Variable Costs',
  runwayMonths: 'Initial Investment / Monthly Burn Rate',
});
