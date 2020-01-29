import i18n from '../i18n';
import { URL_ISAACLIN } from '../settings';
import STATISTICS from '../assets/isaaclin.json';

function getCachedStatistics() {
  return STATISTICS;
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

async function getLatestStatistics() {
  const statistics = getCachedStatistics().results.sort(
    (a, b) => (b?.updateTime ?? 0) - (a?.updateTime ?? 0)
  );
  const zj = statistics[0];
  const wz = zj?.cities.find(city => city.cityName === '温州');

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
  };
}

async function getTimelineStatistics() {
  const statistics = getCachedStatistics().results.sort(
    (a, b) => (b?.updateTime ?? 0) - (a?.updateTime ?? 0)
  );
  const dateMap = new Map<string, number>();

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
    )
    .filter(item => {
      if (!item) {
        return false;
      }
      const { updateTime, confirmed } = item;
      const dateStr = new Date(updateTime).toLocaleDateString();

      if (!dateMap.has(dateStr) || dateMap.get(dateStr)! < confirmed) {
        dateMap.set(dateStr, confirmed);
        return true;
      }
      return false;
    }) as {
    updateTime: number;
    confirmed: number;
  }[];
}

export async function getStatistics() {
  return {
    latest: await getLatestStatistics(),
    timeline: await getTimelineStatistics(),
  };
}
