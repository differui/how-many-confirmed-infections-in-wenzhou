import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../theme';
import { px2vp } from '../helpers';

export interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  const TitleUI = styled.h1<ThemeProps>((props: ThemeProps) => {
    const { theme } = props;

    return {
      color: theme.palette.gray,
      lineHeight: 1.3,
      marginTop: px2vp(45),
      em: {
        color: theme.palette.black,
        fontStyle: 'normal',
        padding: '0 0 0 0.1em',
      },
    };
  });

  return <TitleUI>{children}</TitleUI>;
}
