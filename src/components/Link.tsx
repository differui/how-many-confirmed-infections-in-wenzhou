import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../theme';

export interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function Link(props: LinkProps) {
  const { href, children } = props;

  const LinkUI = styled.span<ThemeProps>((props: ThemeProps) => {
    const { theme } = props;

    return {
      color: theme.palette.secondary,
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      margin: '0.5em 0',
      a: {
        color: 'inherit',
      },
    };
  });

  return (
    <LinkUI>
      <a href={href}>{children}</a>
    </LinkUI>
  );
}
