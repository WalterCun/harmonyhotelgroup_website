export const lang_es = "es";
export const lang_en = "en";

export type Language = "en" | "es";
export const LANGUAGES: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    // { code: 'fr', name: 'Français' },
];
export const DEFAULT_LANGUAGE: Language = "es";
