import { Utilities } from './Utilities';
import { TimeFormat } from './formatTime';
import { MessageInstance } from './MessageInstance';
import { bus } from './bus';
import { Router, useRouter } from 'vue-router';

/**
 * 组件基类
 */
export default class BaseInstance {
	/** 消息提示 */
	message: MessageInstance = new MessageInstance();

	/** 工具类 */
	utilities: Utilities = new Utilities();

	/** 时间处理 */
	dateUtil: TimeFormat = new TimeFormat();

	/** 路由 */
	router: Router = useRouter();

	/** 事件总线 */
	bus = bus;
}
