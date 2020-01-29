import { createContext } from 'react';
import { getStatistics } from '../services/dxy';
import { getLatestStatistics } from '../services/isaaclin';

export const StatisticsContext = createContext<
  UnboxPromise<ReturnType<typeof getStatistics | typeof getLatestStatistics>>
>({
  createTime: 0,
  modifyTime: 0,
  confirmed: 0,
  suspected: 0,
  dead: 0,
  cured: 0,
});

export const StatisticsProvider = StatisticsContext.Provider;
