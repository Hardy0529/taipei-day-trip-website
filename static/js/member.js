/* ---------
    model 
------------ */
// 取得當前登入的使用者資訊
function userStatusFun() {
  fetch("/api/user")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      // 顯示【登出系統】【登入/註冊】按鈕
      userStatusCheck(result);
    });
}

// 註冊
function registerFun() {
  let register_Btn = document.querySelector("#register_Btn");
  register_Btn.addEventListener("click", function () {
    // 抓取註冊輸入框值
    let register_Name = document.querySelector("#register_Name").value;
    let register_Email = document.querySelector("#register_Email").value;
    let register_Password = document.querySelector("#register_Password").value;

    const registerData = {
      name: register_Name,
      email: register_Email,
      password: register_Password,
    };

    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        registerResultShow(result);
      });
  });
}

// 登入
function loginFun() {
  let login_Btn = document.querySelector("#login_Btn");
  login_Btn.addEventListener("click", function () {
    let login_Email = document.querySelector("#login_Email").value;
    let login_Password = document.querySelector("#login_Password").value;

    const loginData = {
      email: login_Email,
      password: login_Password,
    };

    fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        loginResultShow(result);
      });
  });
}

// 登出
function signOutFun() {
  let signOut_Btn = document.querySelector("#signOut-Btn");
  signOut_Btn.addEventListener("click", function () {
    fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        console.log(result);

        // memberCheckFun();
        window.location.reload();
      });
  });
}

/* ---------
    view 
------------ */
// 顯示【登出系統】【登入/註冊】按鈕
function userStatusCheck(userApi) {
  let login_Popup = document.querySelector("#login-Popup");
  let signOut_Btn = document.querySelector("#signOut-Btn");
  if (userApi.data == null) {
    login_Popup.classList.remove("u-display-hidden");
    signOut_Btn.classList.add("u-display-hidden");
  } else if (userApi.data != null) {
    login_Popup.classList.add("u-display-hidden");
    signOut_Btn.classList.remove("u-display-hidden");
  }
}

// 顯示註冊結果
function registerResultShow(result) {
  // 送出值後清空輸入框
  document.querySelector("#register_Name").value = "";
  document.querySelector("#register_Email").value = "";
  document.querySelector("#register_Password").value = "";

  // 註冊狀態
  let register_status = document.querySelector("#register_status");

  if (result.ok) {
    register_status.innerHTML = "註冊成功";
    register_status.setAttribute(
      "class",
      "register__status register__status-success"
    );
  } else if (result.error) {
    register_status.innerHTML = result.message;
    register_status.setAttribute("class", "register__status");
  }
}

// 顯示登入結果
function loginResultShow(result) {
  document.querySelector("#login_Email").value = "";
  document.querySelector("#login_Password").value = "";

  // 登入狀態
  let login_status = document.querySelector("#login_status");

  // 登入/註冊
  let popup_login = document.querySelector("#popup_login");

  if (result.ok) {
    popup_login.classList.remove("popupBg__SHOW");
    userStatusFun();
  } else if (result.error) {
    login_status.innerHTML = result.message;
    login_status.setAttribute("class", "register__status");
  }
}

/* ----------
  controller 
------------- */
// 初始化 檢查使用者狀態
function init() {
  // 取得當前登入的使用者資訊
  userStatusFun();

  // 註冊
  registerFun();

  // 登入
  loginFun();

  // 登出
  signOutFun();
}

init();
