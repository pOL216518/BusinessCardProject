/**Группирует элементы по ключу с сохранением исходного порядка.*/

export function groupBy<T, R = T>(
  items: readonly T[],
  keyOf: (item: T) => string,
  select: (item: T) => R = (item) => item as unknown as R,
): Map<string, R[]> {
  const groups = new Map<string, R[]>();
  for (const item of items) {
    const key = keyOf(item);
    const group = groups.get(key);
    if (group) {
      group.push(select(item));
    } else {
      groups.set(key, [select(item)]);
    }
  }
  return groups;
}