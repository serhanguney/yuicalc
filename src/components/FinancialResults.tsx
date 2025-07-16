import React from 'react';
import { Typography, Box, Chip, Divider, Stack } from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import InfoTooltip from './InfoTooltip';
import type { FinancialCalculations } from '../types/financial';

interface FinancialResultsProps {
  calculations: FinancialCalculations;
  currencyName: string;
}

const FinancialResults: React.FC<FinancialResultsProps> = ({
  calculations,
  currencyName,
}) => {
  const formatCurrency = (value: number) => {
    // Check if currencyName is a valid ISO currency code (3 characters)
    if (currencyName && currencyName.length === 3) {
      try {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currencyName.toUpperCase(),
        }).format(value);
      } catch {
        // Fallback if currency code is invalid
        console.warn(
          `Invalid currency code: ${currencyName}, using fallback format`
        );
      }
    }

    // Fallback: format as number with currency name suffix
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    return `${formattedNumber} ${currencyName || 'EUR'}`;
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getProfitStatus = (netProfit: number) => {
    if (netProfit > 0) {
      return { label: 'Profit', color: 'success' as const };
    } else if (netProfit < 0) {
      return { label: 'Loss', color: 'error' as const };
    } else {
      return { label: 'Break Even', color: 'warning' as const };
    }
  };

  const profitStatus = getProfitStatus(calculations.netProfit);

  return (
    <Stack sx={{ gap: 3 }} divider={<Divider />}>
      {/* Profitability Analysis Card */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TrendingUpIcon sx={{ color: 'primary.main', fontSize: 24, mr: 1 }} />
          <Typography variant="h2">Profitability Analysis</Typography>
        </Box>

        {/* Top Row - Key Metrics */}
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Monthly Net Profit
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h3">
                {formatCurrency(calculations.netProfit)}
              </Typography>
              <Chip
                label={profitStatus.label}
                color={profitStatus.color}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Net Margin
              </Typography>
              <InfoTooltip title="Net margin shows what percentage of your revenue becomes profit after all costs. A higher percentage means you're keeping more money from each sale." />
            </Box>
            <Typography variant="h3">
              {formatPercentage(calculations.profitMargin)}
            </Typography>
          </Box>
        </Box>

        {/* Bottom Row - Supporting Metrics */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Fixed Costs
            </Typography>
            <Typography variant="h4">
              {formatCurrency(calculations.totalFixedCosts)}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Gross Margin
              </Typography>
              <InfoTooltip title="Gross margin shows what percentage of your revenue remains after paying for the direct costs of your products/services. It measures your basic profitability before fixed costs." />
            </Box>
            <Typography variant="h4">
              {formatPercentage(calculations.contributionMarginRatio)}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Variable Cost Rate
            </Typography>
            <Typography variant="h4">
              {formatPercentage(
                calculations.totalVariableCosts /
                  calculations.convertedMonthlyRevenue || 0
              )}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Monthly Cash Flow
              </Typography>
              <InfoTooltip title="Monthly cash flow is the amount of money left after all expenses. Positive cash flow means you have money to reinvest or save. Negative cash flow means you're spending more than you earn." />
            </Box>
            <Typography variant="h4">
              {formatCurrency(calculations.cashFlow)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Break-Even Analysis Card */}
      <Box>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Break-Even Analysis
        </Typography>

        {/* Break-Even Revenue */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Break-Even Revenue (Monthly)
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {formatCurrency(calculations.breakEvenPoint)}
          </Typography>
        </Box>

        {/* Break-Even Units */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Break-Even Units (Monthly)
            </Typography>
            <InfoTooltip title="Break-even units show how many items you need to sell each month to cover all your costs. This helps you set realistic sales targets. It is calculated by dividing the break-even revenue by the average monthly revenue value." />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {formatNumber(calculations.breakEvenPointMonths)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3">Investment Analysis</Typography>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Return on Investment
            </Typography>
            <InfoTooltip title="ROI shows how much profit you earn compared to your initial investment. A higher percentage means your investment is generating more returns. For example, 20% ROI means you earn $20 for every $100 invested." />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {formatPercentage(calculations.returnOnInvestment)}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Payback Period (Months)
            </Typography>
            <InfoTooltip title="This shows how many months it will take to recover your initial investment from profits. A shorter payback period means you'll start earning returns faster." />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {formatNumber(calculations.paybackPeriod)}
          </Typography>
        </Box>
      </Box>
      {/* Market Analysis Card */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3">Additional Analysis</Typography>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Market Share
            </Typography>
            <InfoTooltip title="Market share shows what percentage of the total market your business captures. A higher percentage means you're a bigger player in your industry." />
          </Box>
          <Typography variant="h6">
            {formatPercentage(calculations.marketShare)}
          </Typography>
        </Box>
      </Box>

      {/* Growth Projections Card */}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h3">Growth Projections</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Projected monthly revenue based on {calculations.growthRate}% monthly
          growth rate.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              3 Months
            </Typography>
            <Typography variant="h6">
              {formatCurrency(calculations.projectedRevenue3Months)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              6 Months
            </Typography>
            <Typography variant="h6">
              {formatCurrency(calculations.projectedRevenue6Months)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              12 Months
            </Typography>
            <Typography variant="h6">
              {formatCurrency(calculations.projectedRevenue12Months)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default FinancialResults;
