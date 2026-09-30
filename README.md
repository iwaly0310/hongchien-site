# 宏謙聯合診所官網（程式碼版）

- 內容資料：`tools/data.js`（門診表、醫師、診療項目、環境文字）
- 產生頁面：`node tools/build.js` → `docs/`
- 圖片處理：`node tools/images.js`（原圖放 `_source/media`，不進版控）
- 本機預覽：`node serve.js` → http://localhost:5174
- 樣式與互動：`docs/assets/site.css`、`docs/assets/site.js`
- 發佈：GitHub Pages（main 分支 /docs）
