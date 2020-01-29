import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../theme';
import { px2vp } from '../helpers';

export interface FootnoteProps {
  children: React.ReactNode;
}

export function Footnote(props: FootnoteProps) {
  const { children } = props;

  const FootnoteUI = styled.p<ThemeProps>((props: ThemeProps) => {
    const { theme } = props;

    return {
      color: theme.palette.gray,
      fontSize: theme.fontSize.xxs,
      textAlign: 'center',
      marginTop: px2vp(80),
      marginBottom: px2vp(20),
    };
  });

  return <FootnoteUI>{children}</FootnoteUI>;
}
