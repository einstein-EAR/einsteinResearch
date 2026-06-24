export const COUNTRY_LABELS: Record<string, string> = {
  IN: "India",
  US: "United States",
  CA: "Canada",
  UK: "United Kingdom",
  AU: "Australia",
  NZ: "New Zealand",
  ZA: "South Africa",
  OTHER: "Other",
};

export function resolveCountryLabel(country: string) {
  return COUNTRY_LABELS[country] ?? country.trim();
}
