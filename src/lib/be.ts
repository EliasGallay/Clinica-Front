export function beUrl(path: string) {
  const base = process.env.BE_BASE_URL;
  if (!base) throw new Error("BE_BASE_URL no configurado");
  const beUrl =`${base}${path.startsWith("/") ? path : `/${path}`}`
  console.log("🚀 ~ beUrl ~ beUrl:", beUrl)
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}