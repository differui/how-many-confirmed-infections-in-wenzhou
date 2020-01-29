import React from 'react';
import styled from 'styled-components';
import { px2vp } from '../helpers/viewport';
import { ThemeProps } from '../theme';
import { CircularProgress } from '@material-ui/core';

export interface WebViewUIProps {
  transparent?: boolean;
}

export const WebViewUI = styled.div<WebViewUIProps & ThemeProps>(
  (props: WebViewUIProps & ThemeProps) => {
    const { transparent = true, theme } = props;

    return {
      width: '100%',
      height: '100%',
      paddingBottom: px2vp(14),
      backgroundColor: transparent ? 'transparent' : theme.palette.white,
      position: 'relative',

      '.page': {
        width: px2vp(300),
        margin: '0 auto',
        height: '100%',
      },
      '.suspend': {
        zIndex: 1400, // larger than material ui modal component
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        '.spinner': {
          color: theme.palette.secondary,
        },
        '.message': {
          color: theme.palette.white,
          fontWeight: theme.fontWeight.bold,
        },
      },
    };
  }
);

export interface WebViewProps extends WebViewUIProps {
  loading?: boolean;
  message?: string;
  children?: React.ReactNode;
}

export function WebView(props: WebViewProps) {
  const { loading = false, message, transparent, children } = props;

  return (
    <WebViewUI transparent={transparent}>
      {children}
      {loading ? (
        <div className="suspend">
          <CircularProgress className="spinner" />
          <p className="message">{message}</p>
        </div>
      ) : null}
    </WebViewUI>
  );
}
