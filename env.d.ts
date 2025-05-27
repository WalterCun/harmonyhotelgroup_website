interface ImportMetaEnv {
	readonly PUBLIC_WHATSAPP_NUMBER: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Para archivos SVG
declare module "*.svg" {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const content: any;
	export default content;
}

// Para archivos JSON
declare module "*.json" {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const value: any;
	export default value;
}
