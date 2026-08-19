/**
 * 功能名称：cesium 地图组件
 * 创 建 人：韦晓杰
 * 日    期：2025/06/11 16:31:54
 */
import { defineComponent, ref, onMounted, onUnmounted, nextTick, ExtractPropTypes, SetupContext, unref } from 'vue';
import BaseInstance from '@/utils/BaseInstance';
import * as Cesium from 'cesium';
import { initMap } from '@/utils/CesiumMap';

// 一、Emits 类型定义
type EmitsType = 'loadMap'[];

// 二、Props 定义
const propDefine = {};

let viewer: Cesium.Viewer;

// 三、组件信息定义
export default defineComponent({
	name: '',
	components: {},
	emits: ['loadMap'],
	props: propDefine,
	setup(props, ctx) {
		return new Instance(props, ctx);
	},
});

// 四、组件实例, 具体业务
export class Instance extends BaseInstance {
	private props: ExtractPropTypes<typeof propDefine>;
	private ctx: SetupContext<EmitsType>;
	baseMap = ref<HTMLElement | null>(null);

	constructor(props: ExtractPropTypes<typeof propDefine>, ctx: SetupContext<EmitsType>) {
		super();
		this.props = props;
		this.ctx = ctx;
		this.init();
	}
	private init() {
		onMounted(() => {
			nextTick(() => {
				this.initCesiumMap();
			});
		});
		onUnmounted(() => {});
	}

	/**
	 * 初始化地图
	 */
	private initCesiumMap = () => {
		viewer = initMap(unref(this.baseMap) as HTMLElement);
		this.ctx.emit('loadMap', viewer);
	};
}
