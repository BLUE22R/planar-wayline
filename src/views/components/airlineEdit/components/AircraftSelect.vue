<!--
功能名称：飞行器选择
创 建 人：程涛
日    期：2025/05/30 15:41:13
-->
<template>
	<div class="aircraftSelect_page">
		<div class="box">
			<div class="header">编辑</div>
			<div class="content">
				<div class="title">选择飞行器</div>
				<div class="list_box">
					<div class="item" :class="{ active: activeAircraft == item.id }" v-for="(item, index) in aircraftList" @click="changeAircraft(item)">
						{{ item.name }}
					</div>
				</div>

				<div class="title" style="margin-top: 20px">选择型号</div>
				<div class="list_box">
					<div class="item" :class="{ active: activeModel == item.id }" v-for="(item, index) in modelList" @click="changeModel(item)">
						{{ item.name }}
					</div>
				</div>

				<div class="title" style="margin-top: 20px">航线名称</div>
				<el-input @blur="keyBindingSwitch(true)" @focus="keyBindingSwitch(false)" v-model="aircraftName" placeholder="新建航点航线" />

				<div style="text-align: right; margin-top: 40px">
					<el-button type="info" @click="doClose" style="width: 96px">关闭</el-button>
					<el-button type="primary" style="width: 96px" @click="handleSave" >确定</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./AircraftSelect.ts"></script>

<style scoped lang="scss">
.aircraftSelect_page {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	background: rgba(0, 0, 0, 0.3);
	pointer-events: auto;
	.box {
		width: 578px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #1c1c1c;
		.header {
			height: 40px;
			background: #282828;
			color: #fff;
			font-size: 16px;
			font-weight: 500;
			line-height: 40px;
			text-align: center;
		}
		.content {
			padding: 32px;
			.title {
				color: rgba(255, 255, 255, 0.45);
				margin-bottom: 8px;
				font-size: 14px;
				line-height: 22px;
			}
			.list_box {
				display: grid;
				gap: 8px;
				grid-template-columns: 1fr 1fr 1fr;
				.item {
					width: 100%;
					height: 52px;
					background: #3c3c3c;
					color: #fff;
					text-align: center;
					border-radius: 2px;
					line-height: 52px;
					box-sizing: border-box;
					border: 1px solid #3c3c3c;
					cursor: pointer;
				}
				.active {
					background: rgba(45, 140, 240, 0.4);
					border: 1px solid #2d8cf0;
				}
				.item:hover {
					background: rgba(92, 173, 255, 0.4);
					border: 1px solid #5cadff;
				}
			}
		}
	}
}

:deep(.el-input__wrapper) {
	background: #101010 !important;
	border-color: #4f4f4f !important;
}
:deep(.el-input) {
	--el-input-border-color: #4f4f4f !important;
}

:deep(.el-input__inner) {
	color: #fff !important;
}

:deep(.uranus-input:hover) {
	border-color: #5cadff !important;
}
</style>
