const fromEntries = <T>(data: [string, T][]): { [key: string]: T } => {
  return data.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};
const mapObject = <T, R>(
  data: { [key: string]: T },
  transform: (entry: T, key: string) => R,
  transformKey: (key: string, entry: T) => string = (key) => key,
): { [key: string]: R } => {
  return fromEntries(
    Object.entries(data).map(([key, val]) => [
      transformKey(key, val),
      transform(val, key),
    ]),
  );
};

const filterObject = <T>(
  data: { [key: string]: T },
  predicate: (entry: T) => boolean,
) => {
  return fromEntries(Object.entries(data).filter(([_, val]) => predicate(val)));
};

class ChainObject<T> {
  private _data: { [key: string]: T };

  constructor(data: { [key: string]: T }) {
    this._data = data;
  }

  map<R>(
    transform: (entry: T, key: string) => R,
    transformKey: (key: string, entry: T) => string,
  ): ChainObject<R> {
    return new ChainObject(mapObject(this._data, transform, transformKey));
  }

  filter(predicate: (entry: T) => boolean): ChainObject<T> {
    return new ChainObject(filterObject(this._data, predicate));
  }

  get data(): { [key: string]: T } {
    return this._data;
  }
}

const chainObject = <T>(data: { [key: string]: T }) => {
  return new ChainObject(data);
};
