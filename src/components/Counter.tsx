import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../theme';
import { px2vp } from '../helpers';
import { SubTitle } from './SubTitle';
import { thousands } from '../helpers/formatter';
import { Box } from '@material-ui/core';

export interface CounterProps {
  title?: string;
  unit?: string;
  size?: 'lg' | 'md';
  sign?: boolean;
  value: number | string;
}

export function Counter(props: CounterProps) {
  const { value, title, unit, sign = false, size = 'md' } = props;
  const CounterUI = styled.div<ThemeProps>((props: ThemeProps) => {
    const { theme } = props;

    return {
      color: theme.palette.black,
      fontWeight: theme.fontWeight.thin,
      fontSize: size === 'md' ? 20 : 120,
      lineHeight: 1,
      margin: `${px2vp(25)} 0`,

      'h1, .unit': {
        fontSize: size === 'md' ? theme.fontSize.xs : theme.fontSize.sm,
      },
      '.unit': {
        color: theme.palette.gray,
        paddingLeft: '1em',
      },
    };
  });

  return (
    <CounterUI>
      {title ? <SubTitle>{title}</SubTitle> : null}
      <Box display="inline-flex" alignItems="center">
        {sign && typeof value === 'number' ? (
          <span>{Math.sign(value) > 0 ? '+' : '-'}</span>
        ) : null}
        <span>{typeof value === 'number' ? thousands(value) : '?'}</span>
      </Box>

      {typeof value === 'number' && value > 0 ? (
        <span className="unit">{unit}</span>
      ) : null}
    </CounterUI>
  );
}
