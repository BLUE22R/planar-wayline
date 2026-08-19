import { CallbackPositionProperty, Cartesian3, Entity, ImageryLayer, ImageryProvider, Property, PositionProperty, ModelGraphics } from 'cesium';
/**
 * Cesium 基础属性
 */
interface MapOptions {
	/**
	 * 地图中心点
	 */
	home?: [number, number, number?];
	/**
	 * 地图缩放级别
	 */
	zoom?: number;
	/**
	 * 地图最小缩放级别
	 */
	minZoom?: number;
	/**
	 * 地图最大缩放级别
	 */
	maxZoom?: number;
	/***
	 * 地图初始范围
	 */
	bounds?: [number, number, number, number];
	/**
	 * 地图样式
	 */
	style?: string;
	/**
	 * 是否开启鼠标滚轮缩放
	 */
	scrollWheelZoom?: boolean;
	/**
	 * 是否开启键盘控制缩放
	 */
	keyboard?: boolean;
	/**
	 * 是否存储layer图层
	 */
	isGlobalLayer?: Boolean;

	/**
	 * 是否开启默认渲染循环
	 */
	requestRenderMode?: boolean;
}

interface PipeEntity extends Entity.ConstructorOptions {
	type: 'pipeline';
}
interface WmsLayer {
	id: string;
	url: Resource | string;
	layers: string;
	parameters?: any;
	index?: number | undefined;
	show?: boolean;
	isGlobalLayer?: Boolean;
}

interface AirportEntity extends Entity.ConstructorOptions {
	type: 'airport';
	position: Cesium.Cartesian3;
	image?: Property | string | HTMLCanvasElement;
}

interface DroneEntity extends Entity.ConstructorOptions {
	type: string;
	LiveStreamUrl?: string;
}

interface WarningEntity extends Entity.ConstructorOptions {
	type: string;
	image?: Property | string | HTMLCanvasElement;
	distanceDisplayCondition?: any;
}
interface InspectionEntity extends Entity.ConstructorOptions {
	type: string;
	image?: Property | string | HTMLCanvasElement;
	videoUrl?: string;
}
