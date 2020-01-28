import { createContext } from 'react';
import { getStatistics } from '../services/dxy';

export const DXYContext = createContext<
  UnboxPromise<ReturnType<typeof getStatistics>>
>({
  createTime: 0,
  modifyTime: 0,
  confirmed: 0,
  suspected: 0,
  dead: 0,
  cured: 0,
});

export const DXYProvider = DXYContext.Provider;
