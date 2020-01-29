import REGION from '../assets/region.json';

export function getLatestRegionStatistics() {
  return REGION[0].regions.sort((a, b) => b.confirmedCount - a.confirmedCount);
}
