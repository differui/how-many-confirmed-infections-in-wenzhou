export const BASENAME =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'how-many-confirmed-infections-in-wenzhou';

export const URL_ISAACLIN =
  'https://lab.isaaclin.cn/nCoV/api/area?province=浙江省&latest=0';

export const MAP_LAT = 27.9938;
export const MAP_LNG = 120.4394;
export const MAP_ZOOM_LEVEL = 7.5;
