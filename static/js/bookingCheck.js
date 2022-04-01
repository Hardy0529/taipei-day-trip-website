/* ---------
    model 
------------ */
// 預定行程
function bookingFun() {
  let booking_Check = document.querySelector("#booking-Check");
  booking_Check.addEventListener("click", function () {
    fetch("/api/user")
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        bookingShow(result);
      });
  });
}
/* ---------
    view 
------------ */
// 預定行程結果顯示
function bookingShow(result) {
  // 登入
  let popup_login = document.querySelector("#popup_login");

  if (result.data == null) {
    popup_login.classList.add("popupBg__SHOW");
  } else if (result.data != null) {
    document.location = "/booking";
  }
}

/* ----------
  controller 
------------- */
function init() {
  // 預定行程
  bookingFun();
}
init();
