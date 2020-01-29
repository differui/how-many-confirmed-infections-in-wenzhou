import { createContext } from 'react';
import { getLatestStatistics } from '../services/isaaclin';

export const IsaaclinContext = createContext<
  UnboxPromise<ReturnType<typeof getLatestStatistics>>
>({
  createTime: 0,
  modifyTime: 0,
  confirmed: 0,
  suspected: 0,
  dead: 0,
  cured: 0,
});

export const IsaaclinProvider = IsaaclinContext.Provider;
