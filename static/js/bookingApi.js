function init() {
  let booking_info_Show = document.querySelector("#booking_info-Show");
  function bookingSuccess() {
    fetch("/api/booking")
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        if (result.data != null) {
          console.log(result);
          let booking_content_title = document.querySelector(
            "#booking_content-title"
          );
          let booking_content_date = document.querySelector(
            "#booking_content-date"
          );
          let booking_content_time = document.querySelector(
            "#booking_content-time"
          );
          let booking_content_cost = document.querySelector(
            "#booking_content-cost"
          );
          let booking_contentplace = document.querySelector(
            "#booking_content-place"
          );
          let booking_image = document.querySelector("#booking_image");

          booking_content_title.innerHTML = result.data.attraction.name;
          booking_content_date.innerHTML = result.data.date;
          if (result.data.time == "afternoon") {
            booking_content_time.innerHTML = "早上 9 點到下午 4 點";
          } else if (result.data.time == "evening") {
            booking_content_time.innerHTML = "下午 4 點到晚上 11 點";
          }
          booking_content_cost.innerHTML = result.data.price;
          booking_contentplace.innerHTML = result.data.attraction.address;

          let imgContent = `  <div class="imgbox">
        <div class="imgbox__inner imgbox__inner-4-3">
          <div class="imgBox-fit">
            <img
              class="image"
              src="${result.data.attraction.image}"
              alt="新北投溫泉區"
              title="新北投溫泉區"
            />
          </div>
        </div>
      </div>`;
          booking_image.innerHTML = imgContent;
        } else {
          booking_info_Show.innerHTML = "<p>沒有預定行程</p>";
        }
      });
  }
  bookingSuccess();

  let booking_Icon_delete = document.querySelector("#booking_Icon-delete");
  booking_Icon_delete.addEventListener("click", function () {
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
        if (result.data != null) {
          bookingSuccess();
        } else {
          booking_info_Show.innerHTML = "<p>沒有預定行程</p>";
        }
      });
  });
}
init();
