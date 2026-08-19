/**
 * 功能名称：工具类（面状独立工程精简版）
 */
export class Utilities {
	/**
	 * 下载 Blob 文件
	 * @param data Blob 数据
	 * @param filename 文件名
	 */
	downloadBlobFile(data: BlobPart, filename: string) {
		const blob = new Blob([data]);
		const objectUrl = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = objectUrl;
		a.setAttribute('download', filename);
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(objectUrl);
	}
}
