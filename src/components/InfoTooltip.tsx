import React from 'react';
import { Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

interface InfoTooltipProps {
  title: string;
  size?: 'small' | 'medium' | 'large';
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  arrow?: boolean;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  title,
  size = 'small',
  placement = 'top',
  arrow = false,
}) => {
  return (
    <Tooltip title={title} placement={placement} arrow={arrow}>
      <InfoOutlined fontSize={size} sx={{ color: 'text.disabled' }} />
    </Tooltip>
  );
};

export default InfoTooltip;
