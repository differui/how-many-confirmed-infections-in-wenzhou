import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../theme';

export interface SubTitleProps {
  children: React.ReactNode;
}

export function SubTitle({ children }: SubTitleProps) {
  const SubTitleUI = styled.h1<ThemeProps>((props: ThemeProps) => {
    const { theme } = props;

    return {
      color: theme.palette.secondary,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.thin,
      textTransform: 'capitalize',
    };
  });

  return <SubTitleUI>{children}</SubTitleUI>;
}
