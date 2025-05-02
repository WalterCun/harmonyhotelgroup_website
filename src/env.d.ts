/// <reference types="astro/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly PUBLIC_SUPABASE_URL: string;
    readonly PUBLIC_SUPABASE_ANON_KEY: string;
    readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// Para archivos SVG
declare module '*.svg' {
    const content: any;
    export default content;
}

// Para archivos JSON
declare module '*.json' {
    const value: any;
    export default value;
}