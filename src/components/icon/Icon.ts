/**
 * 功能名称：icon
 * 日    期：2025/04/03 08:52:59
 */
import { defineComponent, ref, reactive, computed, onMounted, onUnmounted, unref, Ref, PropType, nextTick, watch, ExtractPropTypes, SetupContext } from 'vue';
import BaseInstance from '@/utils/BaseInstance';
import Iconify from '@purge-icons/generated';
import { useDesign } from '@/hooks/useDesign';
// 一、Emits 类型定义
// type EmitsType = ('clearRadioRow' | 'change' | 'delete' | 'addchild')[];
type EmitsType = ''[];

// 二、Props 定义
const propDefine = {
	icon: {
		// 带入的参数
		type: String,
		default: '',
	},
	color: {
		// 带入的参数
		type: String,
		default: '',
	},
	size: {
		// 带入的参数
		type: Number,
		default: 16,
	},
	svgClass: {
		// 带入的参数
		type: String,
		default: '',
	},
};

// 三、组件信息定义
export default defineComponent({
	name: '',
	components: {},
	emits: [''], // 例如: ['clearRadioRow', 'change', 'delete', 'addchild']
	props: propDefine,
	setup(props, ctx) {
		return new Instance(props, ctx);
	},
});

// 四、组件实例, 具体业务
export class Instance extends BaseInstance {
	private props: ExtractPropTypes<typeof propDefine>;
	private ctx: SetupContext<EmitsType>;
	// API实例化
	// private platformApi: PlatformApi = new PlatformApi();

	// 全局属性

	constructor(props: ExtractPropTypes<typeof propDefine>, ctx: SetupContext<EmitsType>) {
		super();
		this.props = props;
		this.ctx = ctx;
		this.init();
	}

	init() {
		// Todo
		onMounted(() => {
			watch(
				() => this.props.icon,
				(icon: string) => {
					this.updateIcon(icon);
				},
				{ immediate: true },
			);
		});

		onUnmounted(() => {});
	}

	//#region 业务逻辑 - xxx

	// 私有属性 | private

	prefixCls = useDesign().getPrefixCls('icon');

	// 响应属性 | ref、reactive、computed
	elRef = ref<ElRef>(null);

	isLocal = computed(() => this.props.icon.startsWith('svg-icon:'));

	isBase64 = computed(() => this.props.icon.startsWith('data:image'));

	symbolId = computed(() => {
		return unref(this.isLocal) ? `#icon-${this.props.icon.split('svg-icon:')[1]}` : this.props.icon;
	});

	getIconifyStyle = computed(() => {
		const { color, size } = this.props;
		return {
			fontSize: `${size}px`,
			height: '1em',
			color,
		};
	});

	/** 本地 svg-icon 使用 <use> 引用 symbol，path 需用 currentColor 才能吃到外层 color */
	localSvgStyle = computed(() => {
		const c = this.props.color;
		return c ? { color: c } : {};
	});

	getSvgClass = computed(() => {
		const { svgClass } = this.props;
		return `iconify ${svgClass}`;
	});

	// 私有方法 | private 方法名() {}
	updateIcon = async (icon: string) => {
		if (unref(this.isLocal)) return;

		const el = unref(this.elRef);
		if (!el) return;

		await nextTick();

		if (!icon) return;

		const svg = Iconify.renderSVG(icon, {});
		if (svg) {
			el.textContent = '';
			el.appendChild(svg);
		} else {
			const span = document.createElement('span');
			span.className = 'iconify';
			span.dataset.icon = icon;
			el.textContent = '';
			el.appendChild(span);
		}
	};

	// 响应式方法 | xxx = () => {}

	//#endregion 业务逻辑 - xxx END
}
