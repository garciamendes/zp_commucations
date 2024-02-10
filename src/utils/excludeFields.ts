export function exclude<T, Key extends keyof T>(data: T, keys: Key[]): Omit<T, Key> {
  return Object.fromEntries<T>(
    Object.entries<T>(data as any).filter(([key]) => !keys.includes(key as Key))
  ) as T
}
