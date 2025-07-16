# Financial Calculator

A comprehensive financial analysis tool built with React, TypeScript, and Material-UI that calculates break-even points, profit margins, debt retirement, market share, and other key business metrics with multi-currency support.

## Features

### Financial Calculations

- **Multi-Currency Support**: Calculate in any currency with Euro as the base currency
- **Break Even Analysis**: Calculate when your business will break even
- **Profit Analysis**: Gross profit, net profit, and profit margins
- **Debt Analysis**: Monthly payments, payoff timeline, and total interest
- **Market Analysis**: Market share calculations and percentages
- **Additional Metrics**: Cash flow, ROI, payback period, burn rate, and runway

### Technical Features

- **React 19** with TypeScript for type safety
- **Material-UI (MUI)** for beautiful, responsive UI
- **React Hook Form** for efficient form state management
- **Vite** for fast development and building
- **ESLint & Prettier** for code quality
- **Remeda** for functional programming utilities

## Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Usage

1. **Set Currency**: Configure your target currency and exchange rate against Euro
2. **Enter Financial Data**: Fill in the form with your business financial information
3. **View Results**: See real-time calculations in the results panel
4. **Analyze Metrics**: Use the accordion sections to explore different financial aspects

### Input Categories

#### Currency Configuration

- **Exchange Rate**: Rate against Euro (e.g., 1.1 for USD)
- **Currency Name**: Target currency code (e.g., "USD", "GBP")

#### Fixed Costs (in Euro)

- Rent
- Salaries
- Supplies
- Utilities
- Insurance
- Marketing
- Other Fixed Costs

#### Variable Costs (as percentages of revenue)

- Credit Card Commissions (%)
- Cost of Goods Sold (%)
- Other Variable Costs (%)

#### Revenue & Investment (in Euro)

- Monthly Revenue
- Initial Investment
- Total Market Cap

#### Additional Parameters

- Target Profit Margin (%)
- Debt Amount
- Debt Interest Rate (%)
- Tax Rate (%)
- Growth Rate (%)

## Calculation Formulas

### Currency Conversion

- **Converted Monthly Revenue**: Monthly Revenue × Exchange Rate
- **Converted Fixed Costs**: Total Fixed Costs × Exchange Rate
- **Converted Variable Costs**: (Monthly Revenue × Total Variable Cost Percentage) / 100

### Break Even Analysis

- **Total Fixed Costs**: Sum of all fixed expenses
- **Total Variable Costs**: (Monthly Revenue × Total Variable Cost Percentage) / 100
- **Contribution Margin**: Monthly Revenue - Total Variable Costs
- **Contribution Margin Ratio**: Contribution Margin / Monthly Revenue
- **Break Even Point**: Total Fixed Costs / Contribution Margin Ratio
- **Break Even (Months)**: Break Even Point / Monthly Revenue

### Profit Analysis

- **Gross Profit**: Monthly Revenue - Total Variable Costs
- **Net Profit**: Gross Profit - Total Fixed Costs
- **Profit Margin**: Net Profit / Monthly Revenue
- **Target Revenue for Profit**: (Total Fixed Costs + (Monthly Revenue × Target Profit Margin)) / (1 - (Total Variable Costs / Monthly Revenue))

### Debt Analysis

- **Monthly Debt Payment**: Calculated using standard loan payment formula
- **Debt Payoff (Months)**: Debt Amount / Monthly Debt Payment
- **Total Interest Paid**: (Monthly Debt Payment × Debt Payoff Months) - Debt Amount

### Market Analysis

- **Market Share**: Monthly Revenue / Total Market Cap
- **Market Share Percentage**: Market Share × 100

### Additional Metrics

- **Cash Flow**: Monthly Revenue - (Total Fixed Costs + Total Variable Costs)
- **Return on Investment**: Net Profit / Initial Investment
- **Payback Period**: Initial Investment / Net Profit
- **Monthly Burn Rate**: Total Fixed Costs + Total Variable Costs
- **Runway (Months)**: Initial Investment / Monthly Burn Rate

## Development

### Project Structure

```
src/
├── components/
│   ├── FinancialInputForm.tsx    # Form component with react-hook-form
│   └── FinancialResults.tsx      # Results display component
├── types/
│   └── financial.ts              # TypeScript interfaces
├── utils/
│   └── calculations.ts           # Financial calculation logic
├── App.tsx                       # Main application component
└── main.tsx                      # Application entry point
```

### Key Technologies

- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Material-UI**: Professional UI components
- **React Hook Form**: Efficient form handling
- **Vite**: Fast build tool
- **Remeda**: Functional programming utilities

### Code Quality

- **ESLint**: Code linting and error detection
- **Prettier**: Code formatting
- **lint-staged**: Pre-commit hooks for code quality
- **Husky**: Git hooks management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm lint` and `pnpm format` to ensure code quality
5. Submit a pull request

## License

This project is open source and available under the MIT License.
