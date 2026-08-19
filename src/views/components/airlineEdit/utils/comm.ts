/**
 * 工具
 */
import * as Cesium from 'cesium';

/**
 * 深拷贝
 * @param obj
 * @returns
 */
export function deepClone<T>(obj: T): T {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	// 处理特殊对象：Date、RegExp 等
	if (obj instanceof Date) {
		return new Date(obj) as any as T;
	}
	if (obj instanceof RegExp) {
		return new RegExp(obj) as any as T;
	}

	// 处理数组和普通对象
	const clone: any = Array.isArray(obj) ? [] : {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			clone[key] = deepClone(obj[key]);
		}
	}

	return clone as T;
}

/**
 * 函数防抖，防止函数多次触发
 * @param fn 实际需要执行的函数
 * @param timerout 限制时间
 * @descript 连续点击，只会触发一次
 */
export const debounce = (fn: Function, timeout: number = 300) => {
	let debounceTimer: number | null = null;

	const debouncedFunction = function (...args: any[]) {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}
		return new Promise((resolve) => {
			debounceTimer = window.setTimeout(async () => {
				resolve(await fn(...args));
			}, timeout);
		});
	};

	debouncedFunction.cancel = () => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
			debounceTimer = null;
		}
	};

	return debouncedFunction;
};

/**
 * 创建一个带有背景和文字的Canvas图像（模拟Label样式）
 * @param {string} text - 要显示的文字（如 "100.0m"）
 * @param {object} options - 样式配置（可选）
 * @returns {HTMLCanvasElement} 生成的Canvas元素
 */
export function createTextCanvas(text, options = {}) {
	// 合并默认样式和自定义选项（基于你的distanceLabel配置）
	const style = {
		font: '12px sans-serif',
		fillColor: Cesium.Color.WHITE,
		backgroundColor: Cesium.Color.fromCssColorString('#000000').withAlpha(1),
		backgroundPadding: new Cesium.Cartesian2(2, 5),
		outlineColor: Cesium.Color.BLACK, // 添加描边增强可读性
		outlineWidth: 1,
		...options,
	};

	// 1. 创建Canvas
	const canvas = document.createElement('canvas');
	const ctx: any = canvas.getContext('2d');

	// 2. 测量文字宽度
	ctx.font = style.font;
	const textWidth = ctx.measureText(text).width;
	const textHeight = parseInt(style.font, 10); // 从font字符串中提取像素大小

	// 3. 设置Canvas尺寸（文字+背景内边距）
	canvas.width = textWidth + style.backgroundPadding.x * 2;
	canvas.height = textHeight + style.backgroundPadding.y * 2;

	// 4. 绘制背景
	ctx.fillStyle = style.backgroundColor.toCssColorString();
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// 5. 绘制文字（带描边）
	ctx.font = style.font;
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';

	// 描边
	if (style.outlineWidth > 0) {
		ctx.lineWidth = style.outlineWidth;
		ctx.strokeStyle = style.outlineColor.toCssColorString();
		ctx.strokeText(text, canvas.width / 2, canvas.height / 2);
	}

	// 填充文字
	ctx.fillStyle = style.fillColor.toCssColorString();
	ctx.fillText(text, canvas.width / 2, canvas.height / 2);

	return canvas;
}

/**
 * 将秒数转换为简洁的时分秒格式
 * @param {number} seconds - 需要转换的秒数
 * @returns {string} 格式化后的时间字符串，如"32s", "3m4s", "1h3m"等
 */
export function formatSecondsToShortTime(seconds) {
	// 处理负数
	const isNegative = seconds < 0;
	seconds = Math.abs(seconds);

	// 计算时分秒
	const hours: any = Math.floor(seconds / 3600);
	const minutes: any = Math.floor((seconds % 3600) / 60);
	const secs: any = Math.floor(seconds % 60);

	// 构建时间部分
	const parts: any[] = [];
	if (hours > 0) parts.push(`${hours}h`);
	if (minutes > 0) parts.push(`${minutes}m`);
	if (secs > 0 || parts.length === 0) parts.push(`${secs}s`); // 确保至少显示一个单位

	// 拼接结果
	let result = parts.join('');

	// 添加负号
	if (isNegative) {
		result = `-${result}`;
	}

	return result;
}

/**
 * 生成UUID
 * @param {string} version - UUID版本 ('v1', 'v4')，默认为'v4'
 * @returns {string} 生成的UUID字符串
 */
export function generateUUID() {
	// 完全随机生成UUID v4（更接近RFC标准）
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/**
 * 动态生成svg
 */
/** 航点序号图标缓存，避免八百点级重绘时重复 createObjectURL */
const waypointImgCache = new Map<string, string>();

export function getImg(text: number) {
	const label = text == 1 ? 'S' : String(text);
	const cached = waypointImgCache.get(label);
	if (cached) {
		return cached;
	}
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 26' width='32' height='26'> <g fill='none' fill-rule='evenodd'> <path fill='#00D690' d='M16.8320503 24.75192456L30.9635332 3.5547002c.3063525-.4595287.1821786-1.080398-.2773501-1.3867505C30.5219156 2.058438 30.3289079 2 30.1314829 2H1.86851709c-.55228475 0-1 .4477153-1 1 0 .197425.05843803.3904327.16794971.5547002l14.1314829 21.19722436c.3063525.45952869.9272218.58370256 1.3867505.2773501.1098523-.07323486.2041152-.16749781.2773501-.2773501z'/> <text fill='#FFF' font-size='16' font-weight='500'> <tspan x='50%' y='50%' dy='.25em' text-anchor='middle'>${label}</tspan> </text> </g> </svg>`;
	const url = svgToBase64(svg);
	waypointImgCache.set(label, url);
	return url;
}

/**
 * 将 SVG 字符串转换为 Base64 编码
 * @param svgString - SVG 的字符串内容
 * @returns Base64 编码的 SVG 字符串
 */
export function svgToBase64(svgString: string): string {
	const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
	return URL.createObjectURL(blob);
}

/**
 * 通过焦距计算视场角（FOV）
 * @param {number} sensorSize - 传感器尺寸（mm，宽度或高度）
 * @param {number} focalLength - 焦距（mm）
 * @returns {number} FOV 视场角（度）
 */
export function calculateFOV(sensorSize: number, focalLength: number) {
	focalLength = (focalLength / 100) * 24;
	const fovRadians = 2 * Math.atan(sensorSize / (2 * focalLength));
	return fovRadians * (180 / Math.PI);
}

/**
 * 下载JSON文件
 * @param {Object} options - 配置选项
 * @param {Object} options.data - 要下载的JSON数据
 * @param {string} [options.filename='data'] - 文件名
 * @param {boolean} [options.pretty=true] - 是否格式化JSON
 * @param {Function} [options.onSuccess] - 成功回调
 * @param {Function} [options.onError] - 错误回调
 * @returns {boolean} 是否成功
 */
export function downloadJSONEnhanced(options) {
	const { data, filename = 'data', pretty = true, onSuccess, onError } = options;

	// 验证参数
	if (!data || typeof data !== 'object') {
		const error = new Error('data参数必须是一个对象');
		onError?.(error);
		return false;
	}

	try {
		// 转换JSON字符串
		const jsonString = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);

		// 创建Blob对象
		const blob = new Blob([jsonString], {
			type: 'application/json;charset=utf-8',
		});

		// 创建下载链接
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');

		// 设置文件名，确保有.json后缀
		let finalFilename = filename;
		if (!finalFilename.toLowerCase().endsWith('.json')) {
			finalFilename += '.json';
		}

		// 设置链接属性
		link.href = url;
		link.download = finalFilename;
		link.style.display = 'none';

		// 添加到DOM并触发点击
		document.body.appendChild(link);
		link.click();

		// 清理资源
		setTimeout(() => {
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		}, 100);

		// 成功回调
		onSuccess?.(finalFilename);
		return true;
	} catch (error) {
		console.error('下载JSON文件失败:', error);
		onError?.(error);
		return false;
	}
}

/**
 * 重置航线为初始状态（面状独立工程占位：不依赖航点编辑器）
 * @param options.setActivePointIndex 可选，用于同步组件内的 activePointIndex 为 0
 */
export async function resetAirlineToInitialState(options?: { setActivePointIndex?: (v: number) => void }) {
	options?.setActivePointIndex?.(0);
}
