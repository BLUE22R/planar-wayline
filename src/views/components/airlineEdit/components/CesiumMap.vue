<!--
功能名称：cesium地图组件
创 建 人：韦晓杰
日    期：2025/06/11 16:34:11
-->
<template>
  <div class='cesium-map-warp' ref="baseMap"></div>
</template>

<script lang='ts' src='./CesiumMap.ts'></script>

<style scoped lang='scss'>
.cesium-map-warp {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>