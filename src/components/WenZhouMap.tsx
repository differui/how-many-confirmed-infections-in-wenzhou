import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../theme';
import { WenZhouStatisticMap } from './WenZhouStatisticMap';
import { WenZhouGeoMap } from './WenZhouGeoMap';

export interface WenZhouMapProps {}

export function WenZhouMap(props: WenZhouMapProps) {
  const MapUI = styled.div<ThemeProps>((props: ThemeProps) => {
    return {
      width: 300,
      height: 360,
      margin: '0 auto',
      position: 'relative',

      '.geo': {
        zIndex: 1,
        position: 'relative',
      },

      '.statistic': {
        zIndex: 2,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
      },
    };
  });

  return (
    <MapUI>
      <WenZhouGeoMap></WenZhouGeoMap>
      <WenZhouStatisticMap></WenZhouStatisticMap>
    </MapUI>
  );
}
