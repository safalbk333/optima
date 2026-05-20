export class ResponseTransformer {
  static exclude<T extends Record<string, any>>(
    data: T | T[],
    keys: string[],
  ): Omit<T, (typeof keys)[number]> | Omit<T, (typeof keys)[number]>[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.excludeKeys(item, keys));
    }
    return this.excludeKeys(data, keys);
  }

  private static excludeKeys<T extends Record<string, any>>(
    data: T,
    keys: string[],
  ): Omit<T, (typeof keys)[number]> {
    if (!data) return data;

    const filteredData = { ...data };
    keys.forEach((key) => delete filteredData[key]);

    // Handle nested objects and arrays
    Object.keys(filteredData).forEach((key) => {
      if (typeof filteredData[key] === 'object' && filteredData[key] !== null) {
        // @ts-ignore
        filteredData[key] = this.exclude(filteredData[key], keys);
      }
    });

    return filteredData;
  }
}
