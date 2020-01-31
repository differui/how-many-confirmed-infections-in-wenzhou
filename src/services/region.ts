import REGION from '../assets/region.json';
import { isToday, isYesterday } from '../helpers/date';

export function getLatestRegionStatistics() {
  const mostLatest = REGION[0];
  const lessLatest = REGION[1];

  if (!isToday(mostLatest.updateTime)) {
    return {
      server: [],
      cured: [],
      new: [],
      confirmed: [],
    };
  }

  if (isYesterday(lessLatest.updateTime)) {
    mostLatest.regions.forEach(region => {
      const regionInYesterday = lessLatest.regions.find(
        r => r.regionName === region.regionName
      );

      if (regionInYesterday) {
        region.newCount = Math.max(
          0,
          region.confirmedCount - regionInYesterday.confirmedCount
        );
      }
    });
  }
  return {
    server: mostLatest.regions
      .filter(region => region.severeCount > 0)
      .sort((a, b) => b.severeCount - a.severeCount),
    cured: mostLatest.regions
      .filter(region => region.curedCount > 0)
      .sort((a, b) => b.confirmedCount - a.confirmedCount),
    new: mostLatest.regions
      .filter(region => region.newCount > 0)
      .sort((a, b) => b.newCount - a.newCount),
    confirmed: mostLatest.regions
      .filter(region => region.confirmedCount > 0)
      .sort((a, b) => b.confirmedCount - a.confirmedCount),
  };
}
