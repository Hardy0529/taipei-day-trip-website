/* ---------
    model 
------------ */
// 登入/註冊
let popup_login = document.querySelector("#popup_login");
let popup_register = document.querySelector("#popup_register");

// 執行彈出登入框
function popupOpen(show) {
  show.classList.add("popupBg__SHOW");
}
// 關閉彈出登入框
function popupClose(close) {
  close.classList.remove("popupBg__SHOW");
}

/* ----------
  controller 
------------- */
// 登入狀態
let login_status = document.querySelector("#login_status");

// 註冊狀態
let register_status = document.querySelector("#register_status");

// 彈出登入框按鈕
let login_Popup = document.querySelector("#login-Popup");

login_Popup.addEventListener("click", function () {
  popupOpen(popup_login);
});

// 關閉彈出登入框
let popup_close_login = document.querySelector("#popup_close-login");
popup_close_login.addEventListener("click", function () {
  popupClose(popup_login);
  login_status.innerHTML = "";
});

// 關閉彈出註冊框
let popup_close_register = document.querySelector("#popup_close-register");
popup_close_register.addEventListener("click", function () {
  popupClose(popup_register);
  register_status.innerHTML = "";
});

// 導向註冊按鈕
let guide_register_Btn = document.querySelector("#guide_register-Btn");
guide_register_Btn.addEventListener("click", function () {
  popupClose(popup_login);
  popupOpen(popup_register);
  login_status.innerHTML = "";
});

// 導向登入按鈕
let guide_login_Btn = document.querySelector("#guide_login-Btn");
guide_login_Btn.addEventListener("click", function () {
  popupClose(popup_register);
  popupOpen(popup_login);
  register_status.innerHTML = "";
});
