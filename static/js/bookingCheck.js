function init() {
  let booking_Check = document.querySelector("#booking_Check");

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
}
init();
