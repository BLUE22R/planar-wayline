<!--
功能名称：保存航线弹窗（本地导出 KMZ）
日    期：2026/07/29
-->
<template>
	<el-dialog
		:model-value="modelValue"
		title="保存航线"
		width="480px"
		append-to-body
		:close-on-click-modal="false"
		:close-on-press-escape="!isSaving"
		class="airline-save-dialog"
		modal-class="airline-save-dialog-modal"
		@update:model-value="onVisibleChange"
		@closed="onDialogClosed"
	>
		<div class="airline-save-body">
			<el-form ref="formRef" class="airline-save-form" :model="form" :rules="formRules" label-position="top" require-asterisk-position="right">
				<el-form-item label="航线名称" prop="name">
					<el-input
						v-model="form.name"
						maxlength="100"
						placeholder="请输入航线名称"
						@focus="keyBindingSwitch(false)"
						@blur="keyBindingSwitch(true)"
						@keyup.enter="confirmSave"
					/>
				</el-form-item>
			</el-form>
			<div class="airline-save-hint">将按上述名称下载 KMZ 文件到本地。</div>
		</div>
		<template #footer>
			<el-button class="cancel-btn" :disabled="isSaving" @click="closeDialog">取消</el-button>
			<el-button type="primary" :loading="isSaving" @click="confirmSave">确定保存</el-button>
		</template>
	</el-dialog>
</template>

<script lang="ts" src="./SaveAirlineDialog.ts"></script>

<style lang="scss">
.airline-save-dialog-modal {
	overflow: visible !important;

	.el-overlay-dialog {
		overflow: visible !important;
	}
}

.airline-save-dialog.el-dialog {
	overflow: visible;
	background: #282828;
	border: 1px solid #4f4f4f;
	border-radius: 8px;
	.el-dialog__header {
		position: relative;
		z-index: 1;
		padding: 16px 20px 8px;
		margin-right: 0;
	}
	.el-dialog__title {
		color: #fff;
		font-size: 16px;
	}
	.el-dialog__headerbtn .el-dialog__close {
		color: #c0c4cc;
	}
	.el-dialog__body {
		position: relative;
		z-index: 2;
		padding: 12px 20px 8px;
		color: #fff;
		overflow: visible;
	}
	.el-dialog__footer {
		position: relative;
		z-index: 1;
		padding: 8px 20px 16px;
	}
}

.airline-save-body {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.airline-save-form {
	.el-form-item {
		margin-bottom: 14px;
	}

	.el-form-item__label {
		color: #fff;
		font-size: 13px;
		line-height: 1.4;
		margin-bottom: 6px !important;
		padding: 0;
	}

	.el-form-item__error {
		padding-top: 2px;
	}

	.el-input__wrapper {
		background: #1f1f1f !important;
		box-shadow: 0 0 0 1px #4f4f4f inset !important;
		border-radius: 6px;
	}

	.el-input__inner {
		color: #fff;
	}
}

.airline-save-hint {
	font-size: 12px;
	line-height: 1.5;
	color: rgba(255, 255, 255, 0.55);
}
</style>
