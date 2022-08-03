export const getInitials = (name: string): string =>
  name
    .trim()
    .split(' ')
    .slice(0, 2)
    .reduce((prev, cur) => prev + cur.slice(0, 1), '')
    .toUpperCase();
