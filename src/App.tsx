import { useState } from 'react';
import { Container, Box, Typography, Paper, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FinancialInputForm from './components/FinancialInputForm';
import FinancialResults from './components/FinancialResults';
import { calculateFinancialMetrics } from './utils/calculations';
import type { FinancialInputs, FinancialCalculations } from './types/financial';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#F7F6F9',
    },
  },
  typography: {
    h2: {
      fontSize: '1.3rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
});

const defaultInputs: FinancialInputs = {
  // Currency Configuration (Euro as base)
  currencyConfig: {
    ratio: 1, // 1 EUR = 1 EUR (base currency)
    currencyName: 'EUR',
  },

  // Fixed Costs (in Euro)
  rent: 0,
  salaries: 0,
  supplies: 0,
  utilities: 0,
  insurance: 0,
  marketing: 0,
  otherFixedCosts: 0,

  // Variable Costs (as percentages of revenue)
  creditCardCommissions: 0,
  costOfGoodsSold: 0,
  otherVariableCosts: 0,

  // Investment & Market (in Euro)
  initialInvestment: 0,
  totalMarketCap: 0,
  monthlyRevenue: 0,

  // Additional useful inputs
  taxRate: 0,
  growthRate: 0,
};

const defaultCalculations: FinancialCalculations = {
  convertedMonthlyRevenue: 0,
  convertedTotalFixedCosts: 0,
  convertedTotalVariableCosts: 0,
  totalFixedCosts: 0,
  totalVariableCosts: 0,
  contributionMargin: 0,
  contributionMarginRatio: 0,
  breakEvenPoint: 0,
  breakEvenPointMonths: 0,
  grossProfit: 0,
  netProfit: 0,
  profitMargin: 0,
  marketShare: 0,
  marketSharePercentage: 0,
  cashFlow: 0,
  returnOnInvestment: 0,
  paybackPeriod: 0,
  monthlyBurnRate: 0,
  runwayMonths: 0,
  // Growth projections
  projectedRevenue3Months: 0,
  projectedRevenue6Months: 0,
  projectedRevenue12Months: 0,
  growthRate: 0,
};

function App() {
  const [inputs, setInputs] = useState<FinancialInputs>(defaultInputs);
  const [calculations, setCalculations] =
    useState<FinancialCalculations | null>(null);

  const handleInputChange = (field: keyof FinancialInputs, value: number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Calculate new results
    const newCalculations = calculateFinancialMetrics(newInputs);
    setCalculations(newCalculations);
  };

  const handleCurrencyConfigChange = (
    field: 'ratio' | 'currencyName',
    value: number | string
  ) => {
    const newCurrencyConfig = { ...inputs.currencyConfig, [field]: value };
    const newInputs = { ...inputs, currencyConfig: newCurrencyConfig };
    setInputs(newInputs);

    // Calculate new results
    const newCalculations = calculateFinancialMetrics(newInputs);
    setCalculations(newCalculations);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 2 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Financial Calculator
            </Typography>
            <Typography align="center" color="text.secondary" gutterBottom>
              Calculate break-even, profit, debt retirement, market share, and
              more
            </Typography>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            }}
          >
            <FinancialInputForm
              inputs={inputs}
              onInputChange={handleInputChange}
              onCurrencyConfigChange={handleCurrencyConfigChange}
              currencyName={inputs.currencyConfig.currencyName}
            />

            <FinancialResults
              calculations={calculations || defaultCalculations}
              currencyName={inputs.currencyConfig.currencyName}
            />
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
