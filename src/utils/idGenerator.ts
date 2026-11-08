let lastId = 0;

/**
 * Генерує унікальний числовий id на основі часу (як у макеті: "1725533394038").
 * Якщо два id створюються в ту саму мілісекунду, наступний буде на 1 більшим.
 */
export function generateId(now: number = Date.now()): string {
  lastId = Math.max(now, lastId + 1);
  return String(lastId);
}
