export interface CurrencyConfig {
  ratio: number; // Exchange rate against Euro
  currencyName: string; // Currency name (e.g., "USD", "GBP")
}

export interface FinancialInputs {
  // Currency Configuration
  currencyConfig: CurrencyConfig;

  // Fixed Costs (in base currency - Euro)
  rent: number;
  salaries: number;
  supplies: number;
  utilities: number;
  insurance: number;
  marketing: number;
  otherFixedCosts: number;

  // Variable Costs (as percentages of revenue)
  creditCardCommissions: number; // Percentage of revenue
  costOfGoodsSold: number; // Percentage of revenue
  otherVariableCosts: number; // Percentage of revenue

  // Investment & Market (in base currency - Euro)
  initialInvestment: number;
  totalMarketCap: number;
  monthlyRevenue: number;

  // Additional useful inputs
  taxRate: number;
  growthRate: number;
}

export interface FinancialCalculations {
  // Currency Conversion
  convertedMonthlyRevenue: number;
  convertedTotalFixedCosts: number;
  convertedTotalVariableCosts: number;

  // Break Even Analysis
  totalFixedCosts: number;
  totalVariableCosts: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  breakEvenPoint: number;
  breakEvenPointMonths: number;

  // Profit Analysis
  grossProfit: number;
  netProfit: number;
  profitMargin: number;

  // Market Analysis
  marketShare: number;
  marketSharePercentage: number;

  // Additional Calculations
  cashFlow: number;
  returnOnInvestment: number;
  paybackPeriod: number;
  monthlyBurnRate: number;
  runwayMonths: number;

  // Growth Projections
  projectedRevenue3Months: number;
  projectedRevenue6Months: number;
  projectedRevenue12Months: number;
  growthRate: number;
}

export interface CalculationFormulas {
  [key: string]: string;
}
