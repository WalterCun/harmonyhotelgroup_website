interface ImportMetaEnv {
	readonly PUBLIC_WHATSAPP_NUMBER: string;
	readonly PUBLIC_DEBUG: string
	readonly PUBLIC_DEBUG_PRINT:string
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Para archivos SVG
declare module "*.svg" {
	const content: any;
	export default content;
}

// Para archivos JSON
declare module "*.json" {
	const value: any;
	export default value;
}
