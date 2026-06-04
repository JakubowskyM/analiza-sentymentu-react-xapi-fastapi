export function getFriendlyError(code: string, technical: string): string {
  switch (code) {
    case "APIFY_NOT_CONFIGURED":
      return "Serwer nie ma skonfigurowanego tokenu Apify (APIFY_TOKEN).";
    case "APIFY_FAILED":
      if (technical.includes("Maximum charged results")) {
        return "Apify odrzuciło zapytanie — brak środków lub limit płatnych wyników = 0. Sprawdź billing na apify.com.";
      }
      return "Nie udało się pobrać tweetów z Apify. Spróbuj ponownie za chwilę.";
    case "UNKNOWN":
      if (technical.includes("Failed to fetch") || technical.includes("NetworkError")) {
        return "Brak połączenia z backendem. Uruchom API na porcie 8000.";
      }
      return "Wystąpił nieoczekiwany błąd.";
    default:
      return "Wystąpił błąd podczas analizy.";
  }
}
