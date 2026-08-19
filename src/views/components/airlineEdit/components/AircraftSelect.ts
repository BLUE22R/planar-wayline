/**
 * 功能名称：飞行器选择
 * 创 建 人：程涛
 * 日    期：2025/05/30 15:41:25
 */
import { defineComponent, ref, reactive, computed, onMounted, onUnmounted, Ref, PropType, nextTick, watch, ExtractPropTypes, SetupContext } from 'vue';
import BaseInstance from '@/utils/BaseInstance';
import gsap from 'gsap';
import { id } from 'element-plus/es/locale';
import { keyBindingSwitch } from '../utils/keyBinding';
// 一、Emits 类型定义
// type EmitsType = ('clearRadioRow' | 'change' | 'delete' | 'addchild')[];
type EmitsType = 'update:modelValue'[];

// 二、Props 定义
const propDefine = {
	linkParam: {
		// 带入的参数
		type: String,
		default: '',
	},
};

// 三、组件信息定义
export default defineComponent({
	name: '',
	components: {},
	emits: ['update:modelValue'], // 例如: ['clearRadioRow', 'change', 'delete', 'addchild']
	props: propDefine,
	setup(props, ctx) {
		return new Instance(props, ctx);
	},
});

// 四、组件实例, 具体业务
export class Instance extends BaseInstance {
	private props: ExtractPropTypes<typeof propDefine>;
	private ctx: SetupContext<EmitsType>;

	// 全局属性
	keyBindingSwitch = keyBindingSwitch
	constructor(props: ExtractPropTypes<typeof propDefine>, ctx: SetupContext<EmitsType>) {
		super();
		this.props = props;
		this.ctx = ctx;
		this.init();
	}
	private init() {
		const name = sessionStorage.getItem('aircraftName')
		if (name) {
			this.aircraftName.value = name
		}
		// 初始化
		// ToDo
		onMounted(() => {
			this.show();
		});
		onUnmounted(() => {});
	}

	//#region 业务逻辑 - xxx

	// 私有属性 | private

	// 响应属性 | ref、reactive、computed

	activeAircraft = ref(1);

	aircraftList = ref<any>([
		{
			id: 67,
			name: '经纬 M30 系列',
		},
		{
			id: 77,
			name: 'Mavic 3 行业系列',
		},
		{
			id: 91,
			name: 'Matrice 3D 系列',
		},
		{
			id: 99,
			name: 'Matrice 4 行业系列',
		},
		{
			id: 100,
			name: 'Matrice 4D 系列',
		},
	]);

	activeModel = ref(1);
	modelList = ref<any>([
		{
			id: 1,
			name: '经纬 M30',
		},
		{
			id: 2,
			name: '经纬 M30 T',
		},
	]);


	aircraftName = ref('新建航线')

	// 私有方法 | private 方法名() {}

	// 响应式方法 | xxx = () => {}

	/** 选择飞行器 */
	changeAircraft = (item) => {
		this.activeAircraft.value = item.id;
	};

	/** 选择型号 */
	changeModel = (item) => {
		this.activeModel.value = item.id;
	};

	show = () => {
		gsap.fromTo('.box', { scale: 0, top: 50, duration: 0 }, { scale: 1, top: '50%', duration: 0.3 });
	};

	doClose = () => {
		gsap.to('.box', {
			scale: 0,
			opacity: 0,
			top: 50,
			duration: 0.3,
			onComplete: () => {
				this.ctx.emit('update:modelValue', false);
			},
		});
	};

	handleSave = () => {
		sessionStorage.setItem('aircraftName', this.aircraftName.value);
		this.doClose();
	}

	//#endregion 业务逻辑 - xxx END
}
