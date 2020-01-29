import { URL_ISAACLIN } from '../settings';

export async function getAllStatistics() {
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

export async function getLatestStatistics() {
  const statistics = (await getAllStatistics()).sort(
    (a, b) => b.updateTime - a.updateTime
  );
  const zj = statistics[0];
  const wz = zj?.cities.find(city => city.cityName === '温州');

  if (!zj || !wz) {
    throw new Error('Fail to find statistics data');
  }
  return {
    createTime: 0,
    modifyTime: zj.updateTime,
    confirmed: wz.confirmedCount,
    suspected: wz.suspectedCount,
    dead: wz.deadCount,
    cured: wz.curedCount,
  };
}
