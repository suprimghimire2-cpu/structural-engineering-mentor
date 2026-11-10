import { useEffect, useState } from "react";

// Hash routing (#/knowledge/beam) so deep links and refresh work on any static host.
export function parseHash(hash = window.location.hash) {
  const [page = "", param] = hash.replace(/^#\/?/, "").split("/");
  return { page: page || "home", param: param ? decodeURIComponent(param) : undefined };
}
export function navigate(page, param) {
  const h = page === "home" ? "#/" : `#/${page}${param ? "/" + encodeURIComponent(param) : ""}`;
  window.location.hash = h;
}
export function useRoute() {
  const [route, setRoute] = useState(parseHash());
  useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
