export {};

declare global {
	interface Fn<T = any> {
		(...arg: T[]): T;
	}

	type Nullable<T> = T | null;

	type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

	type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>;

	type AxiosHeaders = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data';

	interface PageParam {
		pageSize?: number;
		pageNo?: number;
	}

	interface Window {
		viewer?: import('cesium').Viewer;
		mainViewer?: import('cesium').Viewer;
		miniViewer?: import('cesium').Viewer;
		tdtAvailableKey?: string;
	}
}
