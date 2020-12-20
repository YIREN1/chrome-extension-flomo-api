## 用法

**已提交 chrome web store 审核，应该几天内会发布**
在此之前,我只好 commit build 文件夹，还需要麻烦使用者下载后定位 build 文件夹

1. 把项目 clone 到本地.
2. 打开 Chrome,输入 chrome://extensions/,打开右上角的 Developer Mode(开发者模式)

3. 选择左上角 Load Unpacked 加载 build 文件夹即可

4. 第一次打开插件,需要在 popup（点击插件图标弹出）填写一下 flomo[申请到的 api 接口地址](https://support.qq.com/products/297045/link-jump?jump=https%3A%2F%2Fflomoapp.com%2Fmine%3Fsource%3Dincoming_webhook).保存后即可使用.

5. 选中文字，点击弹出的 flomo 图标， (让子弹飞一会), 即可保存到 flomo

6. 如果看见弹出提示"no flomo api set"， 说明没有在 popup 中成功设置 api,请返回步骤 3
