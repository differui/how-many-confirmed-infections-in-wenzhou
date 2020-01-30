import 'leaflet/dist/leaflet.css';

import React from 'react';
import { Map, GeoJSON } from 'react-leaflet';
import { Feature } from 'geojson';
import styled from 'styled-components';

import WenZhouGeoJSON from '../assets/wenzhou.json';
import { MAP_LAT, MAP_LNG, MAP_ZOOM_LEVEL } from '../settings';
import { px2vp } from '../helpers';
import { Palette, ThemeProps } from '../theme';

export interface WenZhouGeoMapProps {}

export function WenZhouGeoMap(props: WenZhouGeoMapProps) {
  const MapUI = styled.div<ThemeProps>((props: ThemeProps) => {
    return {
      width: '100%',
      height: '100%',
    };
  });

  function getStyle(feature: Feature) {
    return { color: Palette.gray, weight: 1, opacity: 0.65 };
  }
  return (
    <MapUI className="geo">
      <Map
        // labels
        boxZoom
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        touchZoom={false}
        center={[MAP_LAT, MAP_LNG] as [number, number]}
        zoom={MAP_ZOOM_LEVEL}
        zoomControl={false}
        style={{ width: 300, height: 360, backgroundColor: 'transparent' }}
      >
        <GeoJSON data={WenZhouGeoJSON as any} style={getStyle as any} />
      </Map>
    </MapUI>
  );
}
