import DataLoader from 'dataloader';

type Ids = readonly string[];

export function oneToManyLoader<V>(
  batch: (ids: Ids) => Promise<Map<string, V[]>>,
): DataLoader<string, V[]> {
  return new DataLoader(async (ids) => {
    const byId = await batch(ids);
    return ids.map((id) => byId.get(id) ?? []);
  });
}

export function byIdLoader<V extends { id: string }>(
  batch: (ids: Ids) => Promise<V[]>,
): DataLoader<string, V | null> {
  return new DataLoader(async (ids) => {
    const byId = new Map((await batch(ids)).map((item) => [item.id, item]));
    return ids.map((id) => byId.get(id) ?? null);
  });
}