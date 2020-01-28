type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

type PartialRequired<T, RequiredKeys extends keyof T> = Partial<T> &
  Pick<T, RequiredKeys>;
