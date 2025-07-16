import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Typography, Box, Stack } from '@mui/material';
import InfoTooltip from './InfoTooltip';
import type { FinancialInputs } from '../types/financial';

interface FinancialInputFormProps {
  inputs: FinancialInputs;
  onInputChange: (field: keyof FinancialInputs, value: number) => void;
  onCurrencyConfigChange: (
    field: 'ratio' | 'currencyName',
    value: number | string
  ) => void;
  currencyName: string;
}

const FinancialInputForm: React.FC<FinancialInputFormProps> = ({
  inputs,
  onInputChange,
  onCurrencyConfigChange,
  currencyName,
}) => {
  const { control } = useForm<FinancialInputs>({
    defaultValues: inputs,
  });

  // Get currency symbol or use currency name as fallback
  const getCurrencySymbol = () => {
    if (currencyName && currencyName.length === 3) {
      try {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currencyName.toUpperCase(),
        });
        // Extract symbol from a sample format
        const sample = formatter.format(0);
        return sample.replace(/0\.00/, '').trim();
      } catch {
        // Fallback to currency name
        return currencyName;
      }
    }
    return currencyName || '€';
  };

  const currencySymbol = getCurrencySymbol();

  // Format number with commas for thousands
  const formatNumberWithCommas = (value: string) => {
    // Remove all non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');

    // Handle decimal numbers properly
    if (cleanValue.includes('.')) {
      const parts = cleanValue.split('.');
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
    }

    // Add commas for thousands
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Parse formatted number back to number
  const parseFormattedNumber = (value: string) => {
    const cleanValue = value.replace(/[^\d.]/g, '');
    return cleanValue === '' ? 0 : Number(cleanValue);
  };

  return (
    <Box>
      {/* Currency Configuration */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}
        >
          Currency Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Set your target currency and exchange rate against Euro.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Controller
              name="currencyConfig.ratio"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Exchange Rate (vs EUR)"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Typography
                        variant="body2"
                        whiteSpace="nowrap"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        1 EUR =
                      </Typography>
                    ),
                  }}
                  onChange={e => {
                    const value = Number(e.target.value);
                    console.log('value', value);
                    field.onChange(value);
                    onCurrencyConfigChange('ratio', value);
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Controller
              name="currencyConfig.currencyName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Currency Name"
                  fullWidth
                  placeholder="USD, GBP, etc."
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value);
                    onCurrencyConfigChange('currencyName', value);
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </Box>

      {/* Fixed Costs */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}
        >
          Monthly Fixed Costs
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Expenses that remain constant regardless of revenue.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="rent"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Rent"
                    fullWidth
                    value={
                      field.value
                        ? formatNumberWithCommas(field.value.toString())
                        : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {currencySymbol}
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const formattedValue = formatNumberWithCommas(
                        e.target.value
                      );
                      const numericValue = parseFormattedNumber(e.target.value);
                      field.onChange(numericValue);
                      onInputChange('rent', numericValue);
                      e.target.value = formattedValue;
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="salaries"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Salaries"
                    fullWidth
                    value={
                      field.value
                        ? formatNumberWithCommas(field.value.toString())
                        : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {currencySymbol}
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const formattedValue = formatNumberWithCommas(
                        e.target.value
                      );
                      const numericValue = parseFormattedNumber(e.target.value);
                      field.onChange(numericValue);
                      onInputChange('salaries', numericValue);
                      e.target.value = formattedValue;
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="utilities"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Utilities"
                    fullWidth
                    value={
                      field.value
                        ? formatNumberWithCommas(field.value.toString())
                        : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {currencySymbol}
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const formattedValue = formatNumberWithCommas(
                        e.target.value
                      );
                      const numericValue = parseFormattedNumber(e.target.value);
                      field.onChange(numericValue);
                      onInputChange('utilities', numericValue);
                      e.target.value = formattedValue;
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="insurance"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Insurance"
                    fullWidth
                    value={
                      field.value
                        ? formatNumberWithCommas(field.value.toString())
                        : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {currencySymbol}
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const formattedValue = formatNumberWithCommas(
                        e.target.value
                      );
                      const numericValue = parseFormattedNumber(e.target.value);
                      field.onChange(numericValue);
                      onInputChange('insurance', numericValue);
                      e.target.value = formattedValue;
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="marketing"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Marketing"
                    fullWidth
                    value={
                      field.value
                        ? formatNumberWithCommas(field.value.toString())
                        : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {currencySymbol}
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const formattedValue = formatNumberWithCommas(
                        e.target.value
                      );
                      const numericValue = parseFormattedNumber(e.target.value);
                      field.onChange(numericValue);
                      onInputChange('marketing', numericValue);
                      e.target.value = formattedValue;
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="supplies"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Supplies"
                    fullWidth
                    value={
                      field.value
                        ? formatNumberWithCommas(field.value.toString())
                        : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {currencySymbol}
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const formattedValue = formatNumberWithCommas(
                        e.target.value
                      );
                      const numericValue = parseFormattedNumber(e.target.value);
                      field.onChange(numericValue);
                      onInputChange('supplies', numericValue);
                      e.target.value = formattedValue;
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box>
            <Controller
              name="otherFixedCosts"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Other Fixed Costs"
                  fullWidth
                  value={
                    field.value
                      ? formatNumberWithCommas(field.value.toString())
                      : ''
                  }
                  InputProps={{
                    startAdornment: (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        {currencySymbol}
                      </Typography>
                    ),
                  }}
                  onChange={e => {
                    const formattedValue = formatNumberWithCommas(
                      e.target.value
                    );
                    const numericValue = parseFormattedNumber(e.target.value);
                    field.onChange(numericValue);
                    onInputChange('otherFixedCosts', numericValue);
                    e.target.value = formattedValue;
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </Box>

      {/* Variable Costs */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Costs that vary directly with revenue.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="creditCardCommissions"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Credit Card Commissions"
                    fullWidth
                    value={field.value ? field.value.toString() : ''}
                    InputProps={{
                      endAdornment: (
                        <Typography variant="body2" color="text.secondary">
                          %
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const value =
                        e.target.value === '' ? 0 : Number(e.target.value);
                      field.onChange(value);
                      onInputChange('creditCardCommissions', value);
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="costOfGoodsSold"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cost of Goods Sold"
                    fullWidth
                    value={field.value ? field.value.toString() : ''}
                    InputProps={{
                      endAdornment: (
                        <Typography variant="body2" color="text.secondary">
                          %
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const value =
                        e.target.value === '' ? 0 : Number(e.target.value);
                      field.onChange(value);
                      onInputChange('costOfGoodsSold', value);
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box>
            <Controller
              name="otherVariableCosts"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Other Variable Costs"
                  fullWidth
                  value={field.value ? field.value.toString() : ''}
                  InputProps={{
                    endAdornment: (
                      <Typography variant="body2" color="text.secondary">
                        %
                      </Typography>
                    ),
                  }}
                  onChange={e => {
                    const value =
                      e.target.value === '' ? 0 : Number(e.target.value);
                    field.onChange(value);
                    onInputChange('otherVariableCosts', value);
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </Box>

      {/* Additional Parameters */}
      <Box>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}
        >
          Additional Parameters
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Additional financial parameters for detailed analysis.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="taxRate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tax Rate"
                    fullWidth
                    value={field.value ? field.value.toString() : ''}
                    InputProps={{
                      endAdornment: (
                        <Stack direction="row" alignItems="center" gap={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            %
                          </Typography>
                          <InfoTooltip title="Tax rate is the percentage of your revenue that goes to taxes. For example, a 20% tax rate means for every €100 in revenue, €20 is paid in taxes and €80 remains as profit. This helps you understand how taxes affect your business's profitability." />
                        </Stack>
                      ),
                    }}
                    onChange={e => {
                      const value =
                        e.target.value === '' ? 0 : Number(e.target.value);
                      field.onChange(value);
                      onInputChange('taxRate', value);
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="initialInvestment"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Initial Investment"
                    fullWidth
                    value={
                      field.value
                        ? formatNumberWithCommas(field.value.toString())
                        : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {currencySymbol}
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const formattedValue = formatNumberWithCommas(
                        e.target.value
                      );
                      const numericValue = parseFormattedNumber(e.target.value);
                      field.onChange(numericValue);
                      onInputChange('initialInvestment', numericValue);
                      e.target.value = formattedValue;
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="totalMarketCap"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Total Market Cap"
                    fullWidth
                    value={
                      field.value
                        ? formatNumberWithCommas(field.value.toString())
                        : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {currencySymbol}
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const formattedValue = formatNumberWithCommas(
                        e.target.value
                      );
                      const numericValue = parseFormattedNumber(e.target.value);
                      field.onChange(numericValue);
                      onInputChange('totalMarketCap', numericValue);
                      e.target.value = formattedValue;
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="growthRate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Growth Rate"
                    fullWidth
                    value={field.value ? field.value.toString() : ''}
                    InputProps={{
                      endAdornment: (
                        <Stack direction="row" alignItems="center" gap={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            %
                          </Typography>
                          <InfoTooltip title="Growth rate is the percentage increase in revenue from one month to the next. For example, a 10% growth rate means your revenue increases by 10% from one month to the next. This helps you forecast future revenue and plan for business expansion. The projections will show your expected monthly revenue at 3, 6, and 12 months." />
                        </Stack>
                      ),
                    }}
                    onChange={e => {
                      const value =
                        e.target.value === '' ? 0 : Number(e.target.value);
                      field.onChange(value);
                      onInputChange('growthRate', value);
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Controller
                name="monthlyRevenue"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Monthly Revenue"
                    fullWidth
                    value={
                      field.value
                        ? formatNumberWithCommas(field.value.toString())
                        : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {currencySymbol}
                        </Typography>
                      ),
                    }}
                    onChange={e => {
                      const formattedValue = formatNumberWithCommas(
                        e.target.value
                      );
                      const numericValue = parseFormattedNumber(e.target.value);
                      field.onChange(numericValue);
                      onInputChange('monthlyRevenue', numericValue);
                      e.target.value = formattedValue;
                    }}
                  />
                )}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FinancialInputForm;
