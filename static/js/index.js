/* ---------
    model 
------------ */
// 初始化 載入景點
let attractionData;
let nextPageFunShowtoggle = true;
function initData(page) {
  return fetch("/api/attractions?page=" + page)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      attractionData = result;
    });
}

// 滾動加載功能
function nextPageFun(next) {
  let attractionShowtoggle = true;
  window.addEventListener("scroll", function () {
    // 螢幕可視窗格
    let screenHeight = window.innerHeight;
    // 頁面與元件高
    let element = document.querySelector("#attractions_row");
    let elementHeight = element.getBoundingClientRect().bottom;
    // 判斷函示是否執行
    if (nextPageFunShowtoggle) {
      // 滾動大於元件執行滾動加載功能，並重新印出畫面
      if (screenHeight >= elementHeight && attractionShowtoggle) {
        attractionShowtoggle = false;
        fetch("/api/attractions?page=" + next)
          .then(function (response) {
            return response.json();
          })
          .then(function (result) {
            attractionHtml(result.data);
            if (result.nextPage != null) {
              nextPageFun(result.nextPage);
            }
          });
      }
    }
  });
}

// 關鍵字搜尋功能
let keywordSearchData;
function keywordSearch(page, keyword) {
  attraction_row.innerHTML = "";
  // 切換自動載入開關
  nextPageFunShowtoggle = false;
  // 送出欄位值後清空欄位
  document.querySelector("#attraction_keyword_Input").value = "";
  // 執行關鍵字搜尋功能
  return fetch("/api/attractions?page=" + page + "&keyword=" + keyword)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      keywordSearchData = result;
    });
}

// 關鍵字滾動加載功能
function keywordNextPageFun(next, keyword) {
  let keywordNextShowtoggle = true;
  window.addEventListener("scroll", function () {
    // 螢幕可視窗格
    let screenHeight = window.innerHeight;
    // 頁面與元件高
    let element = document.querySelector("#attractions_row");
    let elementHeight = element.getBoundingClientRect().bottom;

    if (screenHeight >= elementHeight && keywordNextShowtoggle) {
      keywordNextShowtoggle = false;
      fetch("/api/attractions?page=" + next + "&keyword=" + keyword)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          attractionHtml(result.data);
          if (result.nextPage != null) {
            keywordNextPageFun(result.nextPage, keyword);
          }
        });
    }
  });
}

/* ---------
    view 
------------ */
// 景點HTML Row
let attraction_row = document.querySelector("#attractions_row");
function attractionHtml(data) {
  data.forEach(function (element) {
    attraction_row = document.querySelector("#attractions_row");

    // Column
    let attraction = document.createElement("div");
    attraction.setAttribute("class", "col-sm-2 col-md-2 col-lg-3 col-xl-4");

    // Thumbnail
    let thumbnail = document.createElement("div");
    thumbnail.setAttribute("class", "thumbnail");
    attraction.appendChild(thumbnail);

    // Imgbox
    let imgbox = document.createElement("a");
    imgbox.setAttribute("href", "/attraction/" + element.id);
    imgbox.setAttribute("class", "imgbox");
    thumbnail.appendChild(imgbox);

    // Imgbox Inner
    let imgbox_inner = document.createElement("div");
    imgbox_inner.setAttribute("class", "imgbox__inner imgbox__inner-5-3");
    imgbox.appendChild(imgbox_inner);

    let imgBox_fit = document.createElement("div");
    imgBox_fit.setAttribute("class", "imgBox-fit");
    imgbox_inner.appendChild(imgBox_fit);

    // Image
    let image = document.createElement("img");
    image.setAttribute("class", "image");
    image.setAttribute("src", element.images[0]);
    image.setAttribute("alt", element.name);
    image.setAttribute("title", element.name);
    imgBox_fit.appendChild(image);

    // Thumbnail Info
    let thumbnailInfo = document.createElement("div");
    thumbnailInfo.setAttribute("class", "thumbnail__info");
    thumbnail.appendChild(thumbnailInfo);

    // Thumbnail Title
    let thumbnailTitle = document.createElement("a");
    thumbnailTitle.setAttribute("href", "/attraction/" + element.id);
    thumbnailTitle.setAttribute("class", "thumbnail__title");
    thumbnailTitle.textContent = element.name;
    thumbnailInfo.appendChild(thumbnailTitle);

    // Thumbnail Information
    let thumbnailInformation = document.createElement("div");
    thumbnailInformation.setAttribute("class", "thumbnail__information");
    thumbnailInfo.appendChild(thumbnailInformation);

    // Thumbnail MRT
    let thumbnailMRT = document.createElement("div");
    thumbnailMRT.setAttribute("class", "thumbnail__MRT");
    thumbnailMRT.textContent = element.mrt;
    thumbnailInformation.appendChild(thumbnailMRT);

    // Thumbnail Category
    let thumbnailCategory = document.createElement("div");
    thumbnailCategory.setAttribute("class", "thumbnail__category");
    thumbnailCategory.textContent = element.category;
    thumbnailInformation.appendChild(thumbnailCategory);

    // 節點添加一個子節點
    attraction_row.appendChild(attraction);
  });
}

/* ----------
  controller 
------------- */
// 初始化
async function init() {
  // 執行載入景點
  let apiNextPage = 0;
  await initData(apiNextPage);
  attractionHtml(attractionData.data);

  // 滾動加載功能
  apiNextPage = attractionData.nextPage;
  nextPageFun(apiNextPage);
}

// 關鍵字搜尋功能
async function keywordsearch() {
  let keywordNextPage = 0;

  // 關鍵字欄位值
  let attraction_keyword_Input = document.querySelector(
    "#attraction_keyword_Input"
  ).value;

  // 載入關鍵字搜尋結果
  await keywordSearch(keywordNextPage, attraction_keyword_Input);

  // 判斷搜尋結果
  if (keywordSearchData.data.length != 0) {
    attractionHtml(keywordSearchData.data);

    // 關鍵字滾動加載功能
    keywordNextPage = keywordSearchData.nextPage;
    if (keywordNextPage != null) {
      keywordNextPageFun(keywordNextPage, attraction_keyword_Input);
    }
  } else if (keywordSearchData.data.length == 0) {
    attraction_row.innerHTML = "<div class='col'><p>未搜尋到任何結果</p></div>";
  }
}
init();
