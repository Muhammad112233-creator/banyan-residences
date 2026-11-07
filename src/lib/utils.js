export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const asset = (path) => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}${path}`;
};
