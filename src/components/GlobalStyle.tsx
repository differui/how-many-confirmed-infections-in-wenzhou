import { createGlobalStyle } from 'styled-components';

export interface GlobalStyleProps {
  story?: boolean;
}

export const GlobalStyle = createGlobalStyle((props: GlobalStyleProps) => ({
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
  html: {
    fontFamily: JSON.stringify('Avenir'),
    backgroundColor: '#F2F2F2',
  },
  'html, body, #root': {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  '#root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
