import React from 'react';
import styled from 'styled-components';
import { px2vp } from '../helpers';
import { ThemeProps } from '../theme';

export interface RegionInListProps {
  value: number;
  name: string;
  unit?: string;
}

export function RegionInList(props: RegionInListProps) {
  const { value, name, unit } = props;

  const EventUI = styled.div<ThemeProps>((props: ThemeProps) => {
    const { theme } = props;

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5em 0',

      '.unit': {
        color: theme.palette.gray,
        paddingLeft: '0.3em',
        fontSize: theme.fontSize.xs,
      },
    };
  });

  return (
    <EventUI>
      <span style={{ paddingRight: px2vp(10) }}>{name}</span>
      <span>
        <span className="count">{value}</span>
        {value > 0 ? <span className="unit">{unit}</span> : null}
      </span>
    </EventUI>
  );
}
