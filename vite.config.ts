import { defineConfig, loadEnv, type UserConfig, type ConfigEnv } from 'vite';
import { resolve } from 'path';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import cesium from 'vite-plugin-cesium';

const root = process.cwd();

function pathResolve(dir: string) {
	return resolve(root, '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
	const isBuild = command === 'build';
	const env = loadEnv(isBuild ? mode : process.argv[3] === '--mode' ? process.argv[4] : process.argv[3] || mode, root);

	return {
		base: env.NODE_ENV === 'development' ? '/' : './',
		root,
		build: {
			outDir: env.VITE_OUT_DIR || 'dist',
			sourcemap: env.VITE_SOURCEMAP === 'true',
		},
		server: {
			port: Number(env.VITE_PORT) || 5180,
			host: '0.0.0.0',
			open: env.VITE_OPEN === 'true',
		},
		plugins: [
			Vue(),
			cesium(),
			AutoImport({
				imports: ['vue', 'vue-router'],
				dts: 'src/types/auto-imports.d.ts',
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				dts: 'src/types/auto-components.d.ts',
				resolvers: [ElementPlusResolver()],
				globs: ['src/components/**/**.{vue,md}'],
			}),
			createSvgIconsPlugin({
				iconDirs: [pathResolve('src/assets/yawSvg')],
				symbolId: 'icon-[name]',
				svgoOptions: true,
			}),
		],
		resolve: {
			alias: [
				{
					find: /\@\//,
					replacement: `${pathResolve('src')}/`,
				},
			],
			dedupe: ['cesium'],
		},
	};
};
