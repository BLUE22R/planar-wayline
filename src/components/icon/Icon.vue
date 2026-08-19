<template>
	<ElIcon :class="prefixCls" :color="color" :size="size">
		<img v-if="isBase64" :src="icon" alt="" width="100%" height="100%" />

		<svg v-else-if="isLocal" :class="getSvgClass" aria-hidden="true" :style="localSvgStyle">
			<use :xlink:href="symbolId" />
		</svg>

		<span v-else ref="elRef" :class="$attrs.class" :style="getIconifyStyle">
			<span :class="getSvgClass" :data-icon="symbolId"></span>
		</span>
	</ElIcon>
</template>

<script lang="ts" src="./Icon.ts"></script>
