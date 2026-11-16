let lastId = 0;

export function generateId(now: number = Date.now()): string {
  lastId = Math.max(now, lastId + 1);
  return String(lastId);
}
