import variables from '@/styles/global.module.scss';

/**
 * 设计 token / 前缀
 */
export const useDesign = () => {
	const scssVariables = variables;

	/**
	 * @param scope 类名
	 * @returns 命名空间-类名
	 */
	const getPrefixCls = (scope: string) => {
		return `${scssVariables.namespace}-${scope}`;
	};

	return {
		variables: scssVariables,
		getPrefixCls,
	};
};
