import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../theme';
import { px2vp } from '../helpers';

export interface HeadlineProps {
  children: React.ReactNode;
}

export function Headline(props: HeadlineProps) {
  const { children } = props;

  const HeadlineUI = styled.h1<ThemeProps>((props: ThemeProps) => {
    const { theme } = props;

    return {
      color: theme.palette.black,
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.bold,
      marginTop: px2vp(70),
    };
  });

  return <HeadlineUI>{children}</HeadlineUI>;
}
