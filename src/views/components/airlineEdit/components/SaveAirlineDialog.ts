/**
 * 功能名称：保存航线弹窗（本地导出 KMZ）
 * 创 建 人：韦晓杰
 * 日    期：2026/07/29
 */
import { defineComponent, ExtractPropTypes, nextTick, onUnmounted, PropType, reactive, ref, SetupContext, watch } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import BaseInstance from '@/utils/BaseInstance';

/** 保存航线弹窗表单 */
export interface AirlineSaveFormData {
	name: string;
}

type EmitsType = ('update:modelValue' | 'success' | 'closed')[];

const propDefine = {
	/** 弹窗显隐 */
	modelValue: {
		type: Boolean,
		default: false,
	},
	/** 打开时预填航线名称 */
	defaultName: {
		type: String,
		default: '',
	},
	/**
	 * 导出并下载 KMZ（本地保存）
	 * @param name 航线名称（已 trim）
	 */
	exportDownload: {
		type: Function as PropType<(name: string) => Promise<void>>,
		required: true,
	},
	/**
	 * 输入框获焦/失焦时回调（航线编辑页用于暂停键盘飞控）
	 * @param enabled true 恢复键盘飞控，false 暂停
	 */
	onKeyBindingSwitch: {
		type: Function as PropType<(enabled: boolean) => void>,
		default: undefined,
	},
};

export default defineComponent({
	name: 'SaveAirlineDialog',
	components: {},
	emits: ['update:modelValue', 'success', 'closed'],
	props: propDefine,
	setup(props, ctx) {
		return new Instance(props, ctx);
	},
});

export class Instance extends BaseInstance {
	private props: ExtractPropTypes<typeof propDefine>;
	private ctx: SetupContext<EmitsType>;

	/** 保存中 */
	isSaving = ref(false);
	/** 表单校验实例 */
	formRef = ref<FormInstance>();

	/** 保存表单 */
	form = reactive<AirlineSaveFormData>({
		name: '',
	});

	/** 表单校验规则 */
	formRules: FormRules<AirlineSaveFormData> = {
		name: [
			{ required: true, whitespace: true, message: '航线名称不能为空', trigger: 'blur' },
			{
				validator: (_rule, value, callback) => {
					if (!value || !String(value).trim()) {
						callback(new Error('航线名称不能为空'));
						return;
					}
					callback();
				},
				trigger: 'blur',
			},
		],
	};

	private stopWatch: (() => void) | null = null;

	constructor(props: ExtractPropTypes<typeof propDefine>, ctx: SetupContext<EmitsType>) {
		super();
		this.props = props;
		this.ctx = ctx;
		this.init();
	}

	private init() {
		this.stopWatch = watch(
			() => this.props.modelValue,
			(visible) => {
				if (visible) {
					this.resetForm();
					this.keyBindingSwitch(false);
					nextTick(() => {
						this.formRef.value?.clearValidate();
					});
				}
			},
			{ immediate: true },
		);
		onUnmounted(() => {
			if (this.stopWatch) {
				this.stopWatch();
				this.stopWatch = null;
			}
		});
	}

	/**
	 * 打开时重置表单
	 */
	private resetForm() {
		this.form.name = this.props.defaultName || '新建面状航线';
	}

	/**
	 * 键盘飞控开关回调
	 */
	keyBindingSwitch = (enabled: boolean) => {
		this.props.onKeyBindingSwitch?.(enabled);
	};

	/**
	 * 同步弹窗显隐（保存中禁止关闭）
	 */
	onVisibleChange = (visible: boolean) => {
		if (this.isSaving.value && !visible) {
			return;
		}
		this.ctx.emit('update:modelValue', visible);
	};

	/**
	 * 关闭弹窗
	 */
	closeDialog = () => {
		if (this.isSaving.value) return;
		this.onVisibleChange(false);
	};

	/**
	 * 弹窗完全关闭后
	 */
	onDialogClosed = () => {
		this.keyBindingSwitch(true);
		this.ctx.emit('closed');
	};

	/**
	 * 校验保存表单
	 */
	private validateForm = async (): Promise<boolean> => {
		const form = this.formRef.value;
		if (!form) {
			return false;
		}
		try {
			await form.validateField('name');
			return true;
		} catch {
			return false;
		}
	};

	/**
	 * 确认保存：下载 KMZ
	 */
	confirmSave = async () => {
		if (this.isSaving.value) return;
		const valid = await this.validateForm();
		if (!valid) return;
		const name = this.form.name.trim();
		if (!name) {
			ElMessage.warning('航线名称不能为空');
			this.formRef.value?.validateField('name');
			return;
		}
		this.isSaving.value = true;
		try {
			await this.props.exportDownload?.(name);
			ElMessage.success('保存成功');
			this.ctx.emit('update:modelValue', false);
			this.ctx.emit('success', { name });
		} catch (e) {
			console.error('[SaveAirlineDialog] confirmSave', e);
		} finally {
			this.isSaving.value = false;
		}
	};
}
