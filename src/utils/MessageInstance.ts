import { ElMessage, MessageOptions } from 'element-plus';

export class MessageInstance {
	/**
	 * 提示 info
	 * @param prop
	 */
	info = (prop: MessageOptions | string) => {
		let option = {
			message: prop,
			grouping: true,
		} as any;
		ElMessage.info(option);
	};

	/**
	 * 提示 success
	 * @param prop
	 */
	success = (prop: MessageOptions | string) => {
		let option = {
			message: prop,
			grouping: true,
		} as any;
		ElMessage.success(option);
	};

	/**
	 * 提示 warning
	 * @param prop
	 */
	warning = (prop: MessageOptions | string) => {
		let option = {
			message: prop,
			grouping: true,
		} as any;
		ElMessage.warning(option);
	};

	/**
	 * 提示 error
	 * @param prop
	 */
	error = (prop: MessageOptions | string) => {
		let option = {
			message: prop,
			grouping: true,
		} as any;
		ElMessage.error(option);
	};
}

export const message: MessageInstance = new MessageInstance();
