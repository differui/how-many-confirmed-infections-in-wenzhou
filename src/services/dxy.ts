import i18n from '../i18n';
import STATISTICS from '../assets/dxy.json';

export async function getStatistics() {
  const { error, message, data } = STATISTICS;

  if (error !== 0) {
    throw new Error(message);
  }
  try {
    const zj = data.listByArea.find(p => p.provinceName === '浙江省');
    const wz = zj?.cities.find(c => c.cityName === '温州');

    if (!wz) {
      throw new Error(
        i18n.t('error_data', {
          location: i18n.t('app_title_location'),
        })
      );
    }
    return {
      latest: {
        createTime: data.statistics.createTime,
        modifyTime: data.statistics.modifyTime,
        confirmed: wz.confirmed,
        suspected: wz.suspected,
        dead: wz.dead,
        cured: wz.cured,
        delta: 0,
      },
      timeline: [],
    };
  } catch (e) {
    throw e;
  }
}
