import { useCallback } from "react";
import { useLanguage } from "./language-store";

/**
 * Hook para construir links localizados que incluem o prefixo de idioma
 * Exemplo: /projects vira /en/projects ou /pt/projects
 */
export function useLocalizedLink() {
  const { language } = useLanguage();

  return useCallback(
    (path: string) => {
      // Remove leading slash se existir
      const cleanPath = path.startsWith("/") ? path : `/${path}`;

      // Se o caminho já começa com /lang/, não adicionar novamente
      if (cleanPath.startsWith("/en/") || cleanPath.startsWith("/pt/")) {
        return cleanPath;
      }

      // Se é a home page
      if (cleanPath === "/") {
        return `/${language}`;
      }

      return `/${language}${cleanPath}`;
    },
    [language],
  );
}
