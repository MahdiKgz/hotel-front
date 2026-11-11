const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export const API_BASE_URL = configuredApiUrl || "/api/v1";

const apiOrigin = API_BASE_URL.replace(/\/api\/v1$/, "");

export function getApiAssetUrl(path?: string | null) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;

  return `${apiOrigin}/${path.replaceAll("\\", "/").replace(/^\//, "")}`;
}
