export function getSafeAuthRedirect(requested: string | null, fallback: string) {
  return requested?.startsWith("/") &&
    !requested.startsWith("//") &&
    !/[^\S ]|\\/.test(requested)
    ? requested
    : fallback;
}

export function getPostAuthRedirect() {
  if (typeof window === "undefined") return "/dashboard";
  const requested = new URLSearchParams(window.location.search).get("redirect");
  return getSafeAuthRedirect(requested, "/dashboard");
}

export function authHref(path: "/login" | "/register", redirect: string) {
  return `${path}?redirect=${encodeURIComponent(redirect)}`;
}
