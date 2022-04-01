/* ---------
    model 
------------ */
// 檢查使用者狀態
function userCheckFun() {
  let booking_Check_Btn = document.querySelector("#booking_Check-Btn");
  booking_Check_Btn.addEventListener("click", function () {
    fetch("/api/user")
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        userCheckResult(result);
      });
  });
}

// 連線booking API
function bookingBtnFun() {
  // ID
  let attractionId = location.pathname.replace("/attraction/", "");
  // 日期值
  let date = document.querySelector("#booking_date").value;
  // 時間
  let time = document.querySelector("input[type='radio']:checked").value;
  // 價格
  let price = "";
  if (time == "afternoon") {
    price = 2000;
  } else if (time == "evening") {
    price = 2500;
  }

  const bookingData = {
    attractionId,
    date,
    time,
    price,
  };

  fetch("/api/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      connectBookingPage(result);
    });
}

/* ---------
    view 
------------ */
// 檢視使用者狀態
function userCheckResult(result) {
  let popup_login = document.querySelector("#popup_login");
  if (result.data == null) {
    popup_login.classList.add("popupBg__SHOW");
  } else if (result.data != null) {
    // 連線booking Api
    bookingBtnFun();
  }
}

function connectBookingPage(result) {
  if (result.ok == true) {
    document.location = "/booking";
  }
}

/* ----------
  controller 
------------- */
function init() {
  // 檢查使用者狀態
  userCheckFun();
}
init();
