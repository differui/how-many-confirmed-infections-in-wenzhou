import { createContext } from 'react';
// import { getStatistics } from '../services/dxy';
import { getStatistics } from '../services/isaaclin';

export const StatisticsContext = createContext<
  UnboxPromise<ReturnType<typeof getStatistics>>
>({
  latest: {
    createTime: 0,
    modifyTime: 0,
    confirmed: 0,
    suspected: 0,
    dead: 0,
    cured: 0,
  },
  timeline: [],
});

export const StatisticsProvider = StatisticsContext.Provider;
