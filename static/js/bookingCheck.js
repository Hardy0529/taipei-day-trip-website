function init() {
  let booking_Check = document.querySelector("#booking_Check");
  let booking_Check_btn = document.querySelector("#booking_Check_btn");
  // header 預定行程

  let popupBg = document.querySelector(".popupBg");
  booking_Check.addEventListener("click", function () {
    fetch("/api/user")
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        if (result.data == null) {
          popupBg.setAttribute("class", "popupBg popupBg__SHOW");
        } else if (result.data != null) {
          document.location = "/booking";
        }
      });
  });

  // 按鈕 開始預定行程
  booking_Check_btn.addEventListener("click", function () {
    fetch("/api/user")
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        if (result.data == null) {
          popupBg.setAttribute("class", "popupBg popupBg__SHOW");
        } else if (result.data != null) {
          let salepage__form_date = document.querySelector(
            "#salepage__form-date"
          ).value;
          let attractionId = location.pathname.replace("/attraction/", "");
          let selected = document.querySelector(
            "input[type='radio']:checked"
          ).value;

          let priceData = "";
          if (selected == "afternoon") {
            priceData = 2000;
          } else if (selected == "evening") {
            priceData = 2500;
          }

          console.log(salepage__form_date);
          console.log(attractionId);
          console.log(selected);
          console.log(priceData);

          const bookingData = {
            attractionId: attractionId,
            date: salepage__form_date,
            time: selected,
            price: priceData,
          };

          fetch("/api/booking", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (result) {
              console.log(result);
            });

          document.location = "/booking";
        }
      });
  });
}
init();