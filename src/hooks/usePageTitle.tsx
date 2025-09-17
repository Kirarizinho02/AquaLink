import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TITLES: Record<string, string> = {
  "/": "AquaLink",
  "/dashboard": "Dashboard | AquaLink",
  "/login": "Login | AquaLink",
  "/register": "Cadastro | AquaLink",
};

export function usePageTitle(customTitle?: string) {
  const location = useLocation();

  useEffect(() => {
    if (customTitle) {
      document.title = customTitle;
    } else {
      document.title = TITLES[location.pathname] || "AquaLink";
    }
  }, [location.pathname, customTitle]);
}