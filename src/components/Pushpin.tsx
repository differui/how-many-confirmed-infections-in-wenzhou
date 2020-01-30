import React from 'react';
import styled from 'styled-components';
import { LocationOnRounded } from '@material-ui/icons';

import { ThemeProps } from '../theme';

export interface PushpinProps {
  name: string;
  text: string;
  value: number;
  unit?: string;
}

export function Pushpin(props: PushpinProps) {
  const { text, name, value, unit } = props;
  const PushpinUI = styled.p<ThemeProps>((props: ThemeProps) => {
    const { theme } = props;

    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,

      svg: {
        fontSize: 60,
        color: theme.palette.secondary,
        marginBottom: -5,
      },
      '.label': {
        fontSize: theme.fontSize.xxs,
      },
      '.wrapper': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        fontSize: theme.fontSize.xxs,
        textAlign: 'center',
        borderRadius: '50%',
        color: theme.palette.white,
        backgroundColor: theme.palette.secondary,
        whiteSpace: 'nowrap',
        top: 11,
        left: 0,
        right: 0,
        bottom: 'auto',
        margin: 'auto',
        position: 'absolute',
      },
    };
  });

  return (
    <PushpinUI className={[name, 'pin'].join(' ')}>
      <LocationOnRounded></LocationOnRounded>
      <span className="label">{text}</span>
      <span className="wrapper">
        <span className="value">{value}</span>
        {typeof value === 'number' && value > 0 ? (
          <span className="unit">{unit}</span>
        ) : null}
      </span>
    </PushpinUI>
  );
}
