import REGION from '../assets/region.json';

export function getLatestRegionStatistics() {
  const { updateTime, regions } = REGION[0];

  if (
    new Date(updateTime).toLocaleDateString() ===
    new Date().toLocaleDateString()
  ) {
    return regions.sort((a, b) => b.confirmedCount - a.confirmedCount);
  }
  return [];
}
