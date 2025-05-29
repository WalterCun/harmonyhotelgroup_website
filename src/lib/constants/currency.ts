export type Currency = "USD" | "EUR";
export const CURRENCIES: { code: Currency; name: string; symbol: string }[] = [
	{ code: "USD", name: "US Dollar", symbol: "$" },
	{ code: "EUR", name: "Euro", symbol: "€" },
];
export const DEFAULT_CURRENCY: Currency = "USD";

// Mock exchange rates relative to USD
export const exchangeRates: Record<Currency, number> = {
	USD: 1,
	EUR: 0.92,
};