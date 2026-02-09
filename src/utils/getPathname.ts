export const getPathname = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean);
  return parts.length > 0 ? parts[0].toUpperCase() : '';
}