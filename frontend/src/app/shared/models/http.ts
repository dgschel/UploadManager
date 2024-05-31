export type HttpResultWrapper<T> = {
  message: string;
  result: T[];
  status: number;
};
