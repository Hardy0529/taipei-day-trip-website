# taipei-day-trip-website

<p align="center">
 
 [<img src="https://www.cleverpdf.com/2018864/images.gif" width="400px" height="400px" alt="protfolio image" />](https://www.cleverpdf.com/2019246/images.gif)
  <br/>
  Demo: http://35.73.62.186:3000/
</p>

## Introducion

台北一日遊是一個旅遊電商網站，透過串接政府景點 API 和第三方金流(TapPay)，實現旅遊景點的搜尋、瀏覽和訂購的功能。
此外，加上了頁面無限捲動、圖片輪播，並結合會員和金流系統，讓會員可以線上預訂行程並完成付款。

### 測試帳號 / 信用卡號

你可以透過訪客的方式體驗 Taipei Day Trip 大多數的功能，也可以選擇登入會員，即可預定行程。若希望測試會員和金流功能，以下提供測試資訊供你使用。

| 帳號 | test@gmail.com |
| ---- | -------------- |
| 密碼 | test           |

| 卡號     | 424242442424242 |
| -------- | --------------- |
| 有效年月 | 01 / 23         |
| 後三碼   | 123             |

## 技術棧

這個專案採用 `前後端分離` 開發，UI 設計稿和 RESTful API 規格書是由 WeHelp 提供的。

### 前端開發

1. 純 `JavaScript` 手刻無限滾動和圖片輪播功能。
2. 使用 CSS Media Queries 和 Flexbox 實現 `RWD`。
3. 使用 `AJAX` 串接後端的 RESTful APIs。

### 後端開發

1. 使用 `Python Flask` 和 `MySQL` 開發 RESTful APIs。
2. 整合 `TapPay SDK` 開發金流系統。
3. 網站部署到 `AWS EC2`。



## Features

### 無限捲動

提升瀏覽體驗，不用點擊，透過往下滾動就能自動載入更多景點功能。

### 關鍵字搜尋

幫使用者省時間，關鍵字一下就有結果。

### 景點圖片輪播

與使用者互動，且可以展示更多關於景點照片的功能。

### 會員 & 金流系統

在登入情況下，使用者可以透過線上刷卡預訂旅遊行程。
