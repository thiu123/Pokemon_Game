export const shuffled = <T>(list: T[]): T[] => list.sort(() => Math.random() - 0.5);
