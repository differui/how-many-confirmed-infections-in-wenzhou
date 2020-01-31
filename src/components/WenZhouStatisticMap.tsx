import React from 'react';
import styled from 'styled-components';
import md5 from 'md5';

import { ThemeProps } from '../theme';
import { Pushpin } from '../components/Pushpin';
import { getLatestRegionStatistics } from '../services/region';
import { useTranslation } from 'react-i18next';

export function WenZhouStatisticMap() {
  const { t } = useTranslation();
  const regions = getLatestRegionStatistics();
  const MapUI = styled.div<ThemeProps>((props: ThemeProps) => {
    return {
      width: '100%',
      height: '100%',
      position: 'relative',

      '.pin': {
        position: 'absolute',
      },
      [`.md_${md5('鹿城区')}`]: {
        left: 128,
        top: 83,
      },
      [`.md_${md5('瓯海区')}`]: {
        left: 160,
        top: 118,
      },
      [`.md_${md5('龙湾区')}`]: {
        left: 193,
        top: 128,
      },
      [`.md_${md5('洞头区')}`]: {
        left: 240,
        top: 115,
      },
      [`.md_${md5('乐清市')}`]: {
        left: 230,
        top: 50,
      },
      [`.md_${md5('瑞安市')}`]: {
        left: 118,
        top: 145,
      },
      [`.md_${md5('龙港市')}`]: {
        left: 150,
        top: 200,
      },
      [`.md_${md5('永嘉县')}`]: {
        left: 168,
        top: 20,
      },
      [`.md_${md5('平阳县')}`]: {
        left: 82,
        top: 185,
      },
      [`.md_${md5('苍南县')}`]: {
        left: 130,
        top: 260,
      },
      [`.md_${md5('文成县')}`]: {
        left: 50,
        top: 150,
      },
      [`.md_${md5('泰顺县')}`]: {
        left: 20,
        top: 210,
      },
    };
  });

  return (
    <MapUI className="statistic">
      {regions
        .filter(region => region.confirmedCount > 0)
        .map(region => (
          <Pushpin
            key={region.regionShortName}
            text={region.regionName}
            name={`md_${md5(region.regionName)}`}
            value={region.confirmedCount}
            unit={t('counter_unit')}
          ></Pushpin>
        ))}
    </MapUI>
  );
}
