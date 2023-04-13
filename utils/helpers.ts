export const isExisty = <T>(val: T | undefined | null): val is T => {
  return val !== undefined && val !== null;
};

export const toLowerCase = <T extends string>(str: T): Lowercase<T> => {
  return str.toLowerCase() as Lowercase<T>;
};
