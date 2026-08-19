/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_PORT: string;
	readonly VITE_OPEN: string;
	readonly VITE_DEV: string;
	readonly VITE_APP_TENANT_ENABLE: string;
	readonly VITE_BASE_GEO_URL: string;
	readonly VITE_BASE_BIGEMAP_URL: string;
	readonly VITE_BASE_ARCGIS_URL: string;
	readonly VITE_BASE_TERRAIN_URL: string;
	readonly VITE_BASE_API_URL: string;
	readonly VITE_CESIUM_TOKEN: string;
	readonly VITE_SOURCEMAP: string;
	readonly VITE_OUT_DIR: string;
	readonly BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
