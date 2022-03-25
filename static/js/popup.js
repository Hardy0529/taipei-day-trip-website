function init() {
  // 登入頁面
  let loginToggle = document.querySelector("#loginToggle");
  let popupBg = document.querySelector(".popupBg");
  loginToggle.addEventListener("click", function () {
    popupBg.setAttribute("class", "popupBg popupBg__SHOW");
  });

  let popup_close_loginbg = document.querySelector("#popup_close_loginbg");
  popup_close_loginbg.addEventListener("click", function () {
    // popupBg.classList.remove("popupBg__SHOW");
    popupBg.setAttribute("class", "popupBg");
  });

  let login_form_Register = document.querySelector("#login__form-Register");
  let popupBg_r = document.querySelector(".popupBg_r");
  login_form_Register.addEventListener("click", function () {
    popupBg.setAttribute("class", "popupBg");
    popupBg_r.setAttribute("class", "popupBg_r popupBg__SHOW");
  });

  let register_form_login = document.querySelector("#register__form-login");
  register_form_login.addEventListener("click", function () {
    popupBg.setAttribute("class", "popupBg popupBg__SHOW");
    popupBg_r.setAttribute("class", "popupBg");
  });

  let popup_close_register = document.querySelector("#popup_close_register");
  popup_close_register.addEventListener("click", function () {
    // popupBg.classList.remove("popupBg__SHOW");
    popupBg_r.setAttribute("class", "popupBg_r");
  });
}
init();
