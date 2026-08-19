/**
 * 功能名称：Cesium 地图极简初始化（开源独立工程）
 * 默认影像 + 世界地形 + 定位西安
 */
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

/** 西安附近默认视点 [经度, 纬度, 高度米] */
const XIAN_HOME: [number, number, number] = [108.94, 34.34, 20000];

/**
 * 初始化 Cesium Viewer（默认影像与地形）
 * @param cesiumContainer 容器 DOM 或 id
 */
export const initMap = (cesiumContainer: string | Element): Cesium.Viewer => {
	if (!cesiumContainer) {
		throw new Error('Cesium container is required');
	}

	const token = import.meta.env.VITE_CESIUM_TOKEN;
	if (token) {
		Cesium.Ion.defaultAccessToken = token;
	}

	const viewer = new Cesium.Viewer(cesiumContainer, {
		animation: false,
		baseLayerPicker: false,
		fullscreenButton: false,
		geocoder: false,
		homeButton: false,
		infoBox: false,
		sceneModePicker: false,
		selectionIndicator: false,
		timeline: false,
		navigationHelpButton: false,
		terrain: Cesium.Terrain.fromWorldTerrain(),
	});

	viewer.scene.globe.depthTestAgainstTerrain = true;
	viewer.camera.setView({
		destination: Cesium.Cartesian3.fromDegrees(XIAN_HOME[0], XIAN_HOME[1], XIAN_HOME[2]),
		orientation: {
			heading: Cesium.Math.toRadians(0),
			pitch: Cesium.Math.toRadians(-90),
			roll: 0,
		},
	});

	return viewer;
};
