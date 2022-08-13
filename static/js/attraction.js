/* ---------
    model 
------------ */
// 初始化 載入景點
let attractionApi;
function initData(url) {
  return fetch("/api/" + url)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      attractionApi = result;
    });
}
// 執行景點圖片輪播
function attractionImgCarousel(images) {
  let img_State = 0;

  // 下一張輪播圖片按鈕
  let carousel_nav_next = document.querySelector("#carousel_nav-next");
  carousel_nav_next.addEventListener("click", function () {
    img_State += 1;
    if (img_State >= images.length) {
      img_State = 0;
    }
    carousel_items.setAttribute("style", "left : " + -(img_State * 100) + "%");
  });

  // 上一張輪播圖片按鈕
  let carousel_nav_prev = document.querySelector("#carousel_nav-prev");
  carousel_nav_prev.addEventListener("click", function () {
    img_State -= 1;
    if (img_State <= 0) {
      img_State = images.length - 1;
    }
    carousel_items.setAttribute("style", "left : " + -(img_State * 100) + "%");
  });
}

/* ---------
    view 
------------ */
// 景點HTML Items
function attractionImgCarouselHTML(data) {
  let carousel_items = document.querySelector("#carousel_items");
  data.images.forEach(function (attractionImg) {
    carousel_items = document.querySelector("#carousel_items");

    // Item
    let carousel_item = document.createElement("div");
    carousel_item.setAttribute("class", "carousel__item");

    // Imgbox
    let imgbox = document.createElement("div");
    imgbox.setAttribute("class", "imgbox");
    carousel_item.appendChild(imgbox);

    // Imgbox Inner
    let imgbox_inner = document.createElement("div");
    imgbox_inner.setAttribute("class", "imgbox__inner imgbox__inner-4-3");
    imgbox.appendChild(imgbox_inner);

    // ImgBox Fit
    let imgBox_fit = document.createElement("div");
    imgBox_fit.setAttribute("class", "imgBox-fit");
    imgbox_inner.appendChild(imgBox_fit);

    // Image
    let image = document.createElement("img");
    image.setAttribute("class", "image");
    image.setAttribute("src", attractionImg);
    image.setAttribute("alt", data.name);
    image.setAttribute("title", data.name);
    imgBox_fit.appendChild(image);

    // 節點添加一個子節點
    carousel_items.appendChild(carousel_item);
  });
}
// 展示景點資訊
function attractionInformation(data) {
  // 景點標題
  let attraction_title = document.querySelector("#attraction_title");
  attraction_title.innerHTML = data.name;

  // 景點標籤
  let attraction_tage = document.querySelector("#attraction_tage");
  attraction_tage.innerHTML = `<span>${data.category}</span> at <span>${data.mrt}</span>`;

  // 景點描述
  let attraction_description = document.querySelector(
    "#attraction-description"
  );
  attraction_description.innerHTML = data.description;

  // 景點地址
  let attraction_address = document.querySelector("#attraction-address");
  attraction_address.innerHTML = data.address;

  // 交通方式
  let attraction_transport = document.querySelector("#attraction-transport");
  attraction_transport.innerHTML = data.transport;

  // 訂購導覽中的時段選擇
  let attraction_price = document.querySelector("#attraction_price");
  // 上半天
  let booking_time_daytime = document.querySelector("#booking_time-daytime");
  booking_time_daytime.addEventListener("click", function () {
    attraction_price.innerHTML =
      "<spqn class='alepage__form-price' id='attraction_price'>新台幣 <span>2000</span> 元</spqn>";
  });
  // 下半天
  let booking_time_night = document.querySelector("#booking_time-night");
  booking_time_night.addEventListener("click", function () {
    attraction_price.innerHTML =
      "<spqn class='salepage__form-price' id='attraction_price'>新台幣 <span>2500</span> 元</spqn>";
  });
}

/* ----------
  controller 
------------- */
// 初始化
async function init() {
  // 取得景點網址URL
  let attractionURL = location.pathname;

  // 串接景點 API
  await initData(attractionURL);

  // 印出景點圖片
  attractionImgCarouselHTML(attractionApi.data);

  // 執行景點圖片輪播
  attractionImgCarousel(attractionApi.data.images);

  // 展示景點資訊
  attractionInformation(attractionApi.data);
}
init();
