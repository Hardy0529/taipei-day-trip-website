function init() {
  let popupBg = document.querySelector(".popupBg");
  // 檢查狀態
  let loginToggle = document.querySelector("#loginToggle");
  let loginOut = document.querySelector("#loginOut");
  let register_status = document.querySelector("#register_status");
  let login_status = document.querySelector("#login_status");
  function memberCheckFun() {
    fetch("/api/user")
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        if (result.data == null) {
          loginToggle.setAttribute("class", "menu__item ");
          loginOut.setAttribute("class", "menu__item u-display-hidden");
        } else if (result.data != null) {
          loginToggle.setAttribute("class", "menu__item u-display-hidden");
          loginOut.setAttribute("class", "menu__item ");
        }
      });
  }
  memberCheckFun();

  // 登出
  loginOut.addEventListener("click", function () {
    login_status.innerHTML = "";
    register_status.innerHTML = "";
    fetch("/api/user", {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        console.log(result);
        memberCheckFun();
      });
  });

  // 註冊
  let registerBtn = document.querySelector("#registerBtn");
  registerBtn.addEventListener("click", function () {
    let registerName = document.querySelector("#registerName").value;
    let registerEmail = document.querySelector("#registerEmail").value;
    let registerPassword = document.querySelector("#registerPassword").value;

    login_status.innerHTML = "";
    register_status.innerHTML = "";

    document.querySelector("#registerName").value = "";
    document.querySelector("#registerEmail").value = "";
    document.querySelector("#registerPassword").value = "";

    const registerData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    };

    fetch("/api/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (result) {
        console.log(result);
        if (result.error) {
          register_status.innerHTML = result.message;
          register_status.setAttribute("class", "register__status");
        } else if (result.ok) {
          register_status.innerHTML = "註冊成功";
          register_status.setAttribute(
            "class",
            "register__status register__status-success"
          );
          memberCheckFun();
        }
      });
  });

  // 登入
  let loginBtn = document.querySelector("#loginBtn");
  loginBtn.addEventListener("click", function () {
    let loginEmail = document.querySelector("#loginEmail").value;
    let loginPassword = document.querySelector("#loginPassword").value;

    login_status.innerHTML = "";
    register_status.innerHTML = "";

    document.querySelector("#loginEmail").value = "";
    document.querySelector("#loginPassword").value = "";

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    fetch("/api/user", {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (result) {
        console.log(result);
        if (result.error) {
          login_status.innerHTML = result.message;
          login_status.setAttribute("class", "login__status");
        } else if (result.ok) {
          login_status.innerHTML = "登入成功";
          login_status.setAttribute(
            "class",
            "login__status login__status-success"
          );
          popupBg.setAttribute("class", "popupBg");
          memberCheckFun();
        }
      });
  });
}
init();
