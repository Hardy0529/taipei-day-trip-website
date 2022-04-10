/* ---------
    model 
------------ */
let bookingData;
// 載入預定行程 API
function bookingApiFun() {
  return fetch("/api/booking")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      bookingData = result;
    });
}

function bookingDeleteFun() {
  fetch("/api/booking", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      bookingDeleteShowResult(result);
    });
}

/* ---------
    view 
------------ */
// 載入預定行程 API
function bookingApiShowResult(result) {
  let booking_info_Show = document.querySelector("#booking_info-Show");
  if (result.data != null) {
    // booking_content_date.innerHTML = bookingData.data.date;
    // if (result.data.time == "afternoon") {
    //   booking_content_time.innerHTML = "早上 9 點到下午 4 點";
    // } else if (result.data.time == "evening") {
    //   booking_content_time.innerHTML = "下午 4 點到晚上 11 點";
    // }
    booking_info_Show.innerHTML = ` <div class="booking__info" >
      <div class="booking__image" id="booking_image">
      <div class="imgbox">
        <div class="imgbox__inner imgbox__inner-4-3">
          <div class="imgBox-fit">
            <img class="image" src="${
              bookingData.data.attraction.image
            }" alt="${bookingData.data.attraction.name}" title="${
      bookingData.data.attraction.name
    }">
          </div>
        </div>
      </div>
      </div>
      <div class="booking__content">
        <div class="booking__content-title">台北一日遊：${
          bookingData.data.attraction.name
        } </div>
        <div class="booking__content-date">日期：${bookingData.data.date}</div>
        <div class="booking__content-time">時間：${
          bookingData.data.time == "afternoon"
            ? "早上 9 點到下午 4 點"
            : "下午 4 點到晚上 11 點"
        }</div>
        <div class="booking__content-cost">
          費用：<span>新台幣 ${bookingData.data.price} 元</span>
        </div>
        <div class="booking__content-place">
          地點：${bookingData.data.attraction.address}
        </div>
      </div>
      <div class="booking__delete" >
        <span class="booking__Icon-delete" id="booking_delete" onclick="bookingDeleteFun()">
          <i class="icon icon-delete"></i>
        </span>
      </div>
    </div>
    <form class="booking__form">
      <div class="booking__middle-section">
        <div class="booking__form-title">訂購導覽行程</div>

        <div class="booking__form-item">
          <label for="booking_form-name"> 聯絡姓名：</label>
          <input type="text" name="" id="booking_form-name" placeholder="姓名"/>
        </div>
        <div class="booking__form-item">
          <label for="booking_form-email"> 連絡信箱：</label>
          <input type="email" name="" id="booking_form-email" placeholder="電子郵件"/>
        </div>
        <div class="booking__form-item">
          <label for="booking_form-phone"> 手機號碼：</label>
          <input type="tel" name="" id="booking_form-phone"  placeholder="電話"/>
        </div>
        <div class="booking__form-content">
          請保持手機暢通，準時到達，導覽人員將用手機與您聯繫，務必留下正確的聯絡方式。
        </div>
      </div>
      <div class="booking__bottom-section">
        <div class="booking__form-title">信用卡付款資訊</div>

 
        <div class="booking__form-item">
        <label for="">卡片號碼：</label>
          <div class="tpfield" id="card-number"></div>
        </div>
        <div class="booking__form-item">
            <label for="">過期時間：</label>
            <div class="tpfield" id="card-expiration-date"></div>  
        </div>
        <div class="booking__form-item">
          <label for="">驗證密碼：</label>
          <div class="tpfield" id="card-ccv"></div>
        </div>
      </div>

      <div class="booking__price">總價：新台幣 ${
        bookingData.data.price
      } 元</div>
      <div class="booking__btn">
      <input class="btn" type="button" id="test_btn" value="確認訂購並付款" />
      </div>
    </form>`;

    // let booking_content_date = document.querySelector("#booking_content-date");
    // let booking_content_time = document.querySelector("#booking_content-time");
    // let booking_content_cost = document.querySelector("#booking_content-cost");
    // let booking_contentplace = document.querySelector("#booking_content-place");
    // let booking_image = document.querySelector("#booking_image");
    // let booking__price_total = document.querySelector("#booking__price_total");

    // booking_content_title.innerHTML = result.data.attraction.name;
    // booking_content_date.innerHTML = result.data.date;
    // if (result.data.time == "afternoon") {
    //   booking_content_time.innerHTML = "早上 9 點到下午 4 點";
    // } else if (result.data.time == "evening") {
    //   booking_content_time.innerHTML = "下午 4 點到晚上 11 點";
    // }
    // booking_content_cost.innerHTML = result.data.price;
    // booking_contentplace.innerHTML = result.data.attraction.address;
    // let imgBoxHTML = ` <div class="imgbox">
    //                     <div class="imgbox__inner imgbox__inner-4-3">
    //                       <div class="imgBox-fit">
    //                         <img
    //                           class="image"
    //                           src="${result.data.attraction.image}"
    //                           alt="新北投溫泉區"
    //                           title="新北投溫泉區"
    //                         />
    //                       </div>
    //                     </div>
    //                   </div>
    //                 `;
    // booking_image.innerHTML = imgBoxHTML;
    // booking__price_total.innerHTML = result.data.price;
  } else {
    booking_info_Show.innerHTML = "<p>沒有預定行程</p>";
  }
}

function bookingDeleteShowResult(result) {
  let booking_info_Show = document.querySelector("#booking_info-Show");
  if (result.data != null) {
    bookingApiFun();
  } else {
    booking_info_Show.innerHTML = "<p>沒有預定行程</p>";
  }
}

/* ----------
  controller 
------------- */
async function init() {
  // 載入預定行程 API
  await bookingApiFun();
  bookingApiShowResult(bookingData);

  // 設置好等等 GetPrime 所需要的金鑰
  TPDirect.setupSDK(
    124022,
    "app_3I9sJRpEhav3qaYqw9tWAF8Jc4BL6kM1pOuV5p0yy60iTDpwQkm1HvzCDgCz",
    "sandbox"
  );

  // 把 TapPay 內建輸入卡號的表單給植入到 div 中
  TPDirect.card.setup({
    fields: {
      number: {
        element: "#card-number",
        placeholder: "**** **** **** ****",
      },
      expirationDate: {
        element: "#card-expiration-date",
        placeholder: "MM / YY",
      },
      ccv: {
        element: "#card-ccv",
        placeholder: "ccv",
      },
    },
    styles: {
      input: {
        color: "gray",
      },
      "input.ccv": {
        // 'font-size': '16px'
      },
      ":focus": {
        color: "black",
      },
      ".valid": {
        color: "green",
      },
      ".invalid": {
        color: "red",
      },
      "@media screen and (max-width: 400px)": {
        input: {
          color: "orange",
        },
      },
    },
  });

  // 讓 button click 之後觸發 getPrime 方法
  let test_btn = document.querySelector("#test_btn");

  test_btn.addEventListener("click", function (event) {
    event.preventDefault();

    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
    if (tappayStatus.canGetPrime === false) {
      alert("can not get prime");
      return;
    }

    TPDirect.card.onUpdate(function (update) {
      // update.canGetPrime === true
      // --> you can call TPDirect.card.getPrime()
      if (update.canGetPrime) {
        // Enable submit Button to get prime.
        // submitButton.removeAttribute('disabled')
      } else {
        // Disable submit Button to get prime.
        // submitButton.setAttribute('disabled', true)
      }

      // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unionpay','unknown']
      if (update.cardType === "visa") {
        // Handle card type visa.
      }

      // number 欄位是錯誤的
      if (update.status.number === 2) {
        // setNumberFormGroupToError()
      } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess()
      } else {
        // setNumberFormGroupToNormal()
      }

      if (update.status.expiry === 2) {
        // setNumberFormGroupToError()
      } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess()
      } else {
        // setNumberFormGroupToNormal()
      }

      if (update.status.ccv === 2) {
        // setNumberFormGroupToError()
      } else if (update.status.ccv === 0) {
        // setNumberFormGroupToSuccess()
      } else {
        // setNumberFormGroupToNormal()
      }
    });

    TPDirect.card.getPrime(function (result) {
      if (result.status !== 0) {
        alert("get prime error " + result.msg);
        return;
      }
      // alert("get prime 成功，prime: " + result.card.prime);

      // 姓名
      let booking_form_name =
        document.querySelector("#booking_form-name").value;
      // 信箱
      let booking_form_email = document.querySelector(
        "#booking_form-email"
      ).value;
      // phone
      let booking_form_phone = document.querySelector(
        "#booking_form-phone"
      ).value;

      // console.log(bookingData);
      const tappayData = {
        prime: result.card.prime,
        order: {
          price: bookingData.data.price,
          trip: {
            attraction: {
              id: bookingData.data.attraction.id,
              name: bookingData.data.attraction.name,
              address: bookingData.data.attraction.address,
              image: bookingData.data.attraction.image,
            },
            date: bookingData.data.date,
            time: bookingData.data.time,
          },
          contact: {
            name: booking_form_name,
            email: booking_form_email,
            phone: booking_form_phone,
          },
        },
      };

      fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tappayData),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.data.payment.status == 0) {
            bookingDeleteFun();
            document.location = "/thankyou?number=" + result.data.number;
          } else {
            alert("付款失敗");
          }
        });
    });
  });
}
init();
