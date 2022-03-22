function init() {
  // 串接景點 API，取得並展示特定景點資訊
  let attractionURL = location.pathname;

  fetch("/api/" + attractionURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      // 輪播圖
      let carouselNext = document.querySelector(".carousel__nav-next");
      let carouselPrev = document.querySelector(".carousel__nav-prev");
      let carouselItems = document.querySelector(".carousel__items");

      // 圖片
      let imgItems = "";

      let pageTotal = -1;

      let arry = [];
      for (let i = 0; i < result.data.images.length; i++) {
        if (
          result.data.images[i].substr(-3) == "jpg" ||
          result.data.images[i].substr(-3) == "JPG"
        ) {
          arry.push(result.data.images[i]);
        }
      }

      arry.forEach(function (item) {
        pageTotal += 1;

        let imgItem = ` <div class="carousel__item">
              <div class="imgbox">
                <div class="imgbox__inner imgbox__inner-4-3">
                  <div
                    class="image"
                    style="
                      background-image: url('${item}');
                    "
                  ></div>
                </div>
              </div>
            </div>`;
        imgItems += imgItem;
      });
      carouselItems.innerHTML = imgItems;

      let page = 0;
      carouselNext.addEventListener("click", function () {
        page += 1;
        if (page > pageTotal) {
          page = 0;
        }
        carouselItems.style.left = "-" + page * 100 + "%";
        console.log(page);
      });
      carouselPrev.addEventListener("click", function () {
        page -= 1;
        if (page < 0) {
          page = pageTotal;
        }
        carouselItems.style.left = "-" + page * 100 + "%";
        console.log(page);
      });

      // 景點標題
      let attractionTitle = document.querySelector("#attractionTitle");
      attractionTitle.innerHTML = result.data.name;

      // 景點標籤
      let attractionTage = document.querySelector("#attractionTage");
      attractionTage.innerHTML = ` <span>${result.data.category}</span>  at  <span>${result.data.mrt}</span>`;

      // 景點描述
      let attractionDescription = document.querySelector(
        "#attractionDescription"
      );
      attractionDescription.innerHTML = result.data.description;

      // 景點地址
      let attractionAddress = document.querySelector("#attractionAddress");
      attractionAddress.innerHTML = result.data.address;

      // 交通方式
      let attractionTransport = document.querySelector("#attractionTransport");
      attractionTransport.innerHTML = result.data.transport;

      // 導覽費用
      let attraction_radio_daytime = document.querySelector(
        "#salepage__form-time-daytime"
      );
      let attraction_radio_night = document.querySelector(
        "#salepage__form-time-night"
      );
      let salepageFormPriceId = document.querySelector("#salepageFormPriceId");

      attraction_radio_daytime.addEventListener("click", function () {
        let ccc = attraction_radio_daytime.getAttribute("value");
        console.log(ccc);
        salepageFormPriceId.innerHTML = ` <spqn class="salepage__form-price" id="salepageFormPriceId">新台幣 <span>${ccc}</span> 元</spqn>`;
      });
      attraction_radio_night.addEventListener("click", function () {
        let bbb = attraction_radio_night.getAttribute("value");
        console.log(bbb);
        salepageFormPriceId.innerHTML = ` <spqn class="salepage__form-price" id="salepageFormPriceId">新台幣 <span>${bbb}</span> 元</spqn>`;
      });
    });
}
init();
