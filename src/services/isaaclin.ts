import i18n from '../i18n';
import { URL_ISAACLIN } from '../settings';
import STATISTICS from '../assets/isaaclin.json';

function filterResults(results: typeof STATISTICS.results) {
  const dateMap = new Map<string, number>();

  return results.filter(({ updateTime, confirmedCount }) => {
    const dateStr = new Date(updateTime).toLocaleDateString();

    if (!dateMap.has(dateStr) || dateMap.get(dateStr)! < confirmedCount) {
      dateMap.set(dateStr, confirmedCount);
      return true;
    }
    return false;
  });
}

function sortResults(results: typeof STATISTICS.results) {
  return results.sort((a, b) => (b?.updateTime ?? 0) - (a?.updateTime ?? 0));
}

function getCachedStatistics() {
  return STATISTICS.results;
}

async function getNetworkStatistics() {
  const response = await fetch(URL_ISAACLIN);
  const { success, results } = (await response.json()) as {
    success: boolean;
    results: {
      provinceName: string;
      provinceShortName: string;
      confirmedCount: number;
      suspectedCount: number;
      curedCount: number;
      deadCount: number;
      comment: string;
      updateTime: number;
      country: string;
      cities: {
        cityName: string;
        confirmedCount: number;
        suspectedCount: number;
        curedCount: number;
        deadCount: number;
      }[];
    }[];
  };

  if (!success) {
    throw new Error('Fail to fetch statistics data');
  }
  if (!results || results.length === 0) {
    throw new Error('No statistics data');
  }
  return results;
}

function getLatestStatistics(results: typeof STATISTICS.results) {
  const statistics = sortResults(filterResults(results));

  // today
  const zj = statistics[0];
  const wz = zj?.cities.find(city => city.cityName === '温州');

  // yesterday
  const zjYday = statistics[1];
  const wzYday = zjYday?.cities.find(city => city.cityName === '温州');

  if (!zj || !wz) {
    throw new Error(
      i18n.t('error_data', {
        location: i18n.t('app_title_location'),
      })
    );
  }
  return {
    createTime: 0,
    modifyTime: zj.updateTime!,
    confirmed: wz.confirmedCount!,
    suspected: wz.suspectedCount!,
    dead: wz.deadCount!,
    cured: wz.curedCount!,
    delta: wzYday ? wz.confirmedCount - wzYday.confirmedCount : 0,
  };
}

function getTimelineStatistics(results: typeof STATISTICS.results) {
  const statistics = sortResults(filterResults(results));

  return statistics
    .map(item => {
      const wz = item.cities.find(city => city.cityName === '温州');

      if (!wz) {
        return undefined;
      }
      return {
        ...wz,
        updateTime: item.updateTime!,
      };
    })
    .map(item =>
      item
        ? {
            updateTime: item.updateTime,
            confirmed: item.confirmedCount,
          }
        : item
    ) as {
    updateTime: number;
    confirmed: number;
  }[];
}

export async function getStatistics() {
  const results = await (process.env.NODE_ENV === 'development'
    ? getCachedStatistics()
    : getNetworkStatistics());

  return {
    latest: getLatestStatistics(results),
    timeline: getTimelineStatistics(results),
  };
}
