import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../theme';
import { px2vp } from '../helpers';
import { SubTitle } from './SubTitle';
import { thousands } from '../helpers/formatter';

export interface CounterProps {
  title?: string;
  unit?: string;
  size?: 'lg' | 'md';
  value: number;
}

export function Counter(props: CounterProps) {
  const { value, title, unit, size = 'md' } = props;
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
        paddingLeft: px2vp(10),
      },
    };
  });

  return (
    <CounterUI>
      {title ? <SubTitle>{title}</SubTitle> : null}
      <span>{thousands(value)}</span>
      <span className="unit">{unit}</span>
    </CounterUI>
  );
}
