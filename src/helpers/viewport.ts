function toFixed(value: number, precision: number = 5) {
  const multiplier = Math.pow(10, precision + 1);
  return (Math.round(Math.floor(value * multiplier) / 10) * 10) / multiplier;
}

export function px2vp(px: number, unit: 'vw' | 'vh' | 'vmin' | 'vmax' = 'vw') {
  const vp = toFixed((px / 375) * 100);
  return vp === 0 ? '0' : `${vp}${unit}`;
}
