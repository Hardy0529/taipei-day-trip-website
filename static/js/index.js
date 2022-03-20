function init() {
  // 抓取元素
  let list = document.querySelector("#attractions_items");
  function showHtml(itmeHTML) {
    // 抓取元素
    list = document.querySelector("#attractions_items");

    // Attraction
    let attraction = document.createElement("div");
    attraction.setAttribute("class", "col-sm-2 col-md-2 col-lg-3 col-xl-4");

    // Thumbnail
    let thumbnail = document.createElement("div");
    thumbnail.setAttribute("class", "thumbnail");
    attraction.appendChild(thumbnail);

    // Imgbox
    let imgbox = document.createElement("div");
    imgbox.setAttribute("class", "imgbox");
    thumbnail.appendChild(imgbox);

    // Imgbox Inner
    let imgboxInner = document.createElement("div");
    imgboxInner.setAttribute("class", "imgbox__inner imgbox__inner-5-3");
    imgbox.appendChild(imgboxInner);

    // Image
    let image = document.createElement("div");
    image.setAttribute("class", "image");
    image.setAttribute(
      "style",
      "background-image: url('" + itmeHTML.images[0] + "')"
    );
    imgboxInner.appendChild(image);

    // Thumbnail Info
    let thumbnailInfo = document.createElement("div");
    thumbnailInfo.setAttribute("class", "thumbnail__info");
    thumbnail.appendChild(thumbnailInfo);

    // Thumbnail Title
    let thumbnailTitle = document.createElement("div");
    thumbnailTitle.setAttribute("class", "thumbnail__title");
    thumbnailTitle.textContent = itmeHTML.name;
    thumbnailInfo.appendChild(thumbnailTitle);

    // Thumbnail Information
    let thumbnailInformation = document.createElement("div");
    thumbnailInformation.setAttribute("class", "thumbnail__information");
    thumbnailInfo.appendChild(thumbnailInformation);

    // Thumbnail MRT
    let thumbnailMRT = document.createElement("div");
    thumbnailMRT.setAttribute("class", "thumbnail__MRT");
    thumbnailMRT.textContent = itmeHTML.mrt;
    thumbnailInformation.appendChild(thumbnailMRT);

    // Thumbnail Category
    let thumbnailCategory = document.createElement("div");
    thumbnailCategory.setAttribute("class", "thumbnail__category");
    thumbnailCategory.textContent = itmeHTML.category;
    thumbnailInformation.appendChild(thumbnailCategory);

    list.appendChild(attraction);
  }

  // 滾動加載
  // 開關
  let toggle;
  // 頁面
  let currentPage = 0;

  function nextPage(next) {
    // 連線API資料
    fetch("/api/attractions?page=" + next)
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        // 判斷資料是否為空值

        result.data.forEach(function (item) {
          showHtml(item);
        });

        // 開關
        toggle = true;
        //頁面
        currentPage = result.nextPage;

        // 偵測滾動
        window.addEventListener("scroll", function () {
          // 螢幕可視窗格
          const scrollable = window.innerHeight;

          // 頁面與元件高
          const element = document.querySelector("#attractions_items");
          const elementHeight = element.getBoundingClientRect().bottom;
          if (result.nextPage != null) {
            // 判斷滾動式距離是否高於元件高
            if (scrollable >= elementHeight && toggle) {
              toggle = false;
              nextPage(currentPage);
            }
          }
        });
      });
  }
  nextPage(currentPage);

  // 開關
  let toggleK;
  // 關鍵字搜尋
  let currentPageK = 0;

  let attractionSearchBtn = document.querySelector("#attractionSearchBtn");
  let sss;

  attractionSearchBtn.addEventListener("click", function () {
    let keywordItem = document.querySelector("#keywordItem").value;
    keywordItem.value = "";
    sss = true;
    function nextKeywordPage(nextKeyword) {
      fetch("/api/attractions?page=" + nextKeyword + "&keyword=" + keywordItem)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (sss) {
            list.innerHTML = "";
          }

          let str = "";
          console.log(result.nextPage);
          console.log(result.data);

          result.data.forEach(function (item) {
            let content = `<div class="col-sm-2 col-md-2 col-lg-3 col-xl-4"><div class="thumbnail"><div class="imgbox"><div class="imgbox__inner imgbox__inner-5-3"><div class="image" style="background-image: url('${item.images[0]}')"></div></div></div><div class="thumbnail__info"><div class="thumbnail__title">${item.name}</div><div class="thumbnail__information"><div class="thumbnail__MRT">${item.mrt}</div><div class="thumbnail__category">${item.category}</div></div></div></div></div>`;
            str += content;
          });

          list.insertAdjacentHTML("beforeEnd", str);

          // 開關
          toggleK = true;
          window.addEventListener("scroll", function () {
            // 螢幕可視窗格
            const scrollable = window.innerHeight;

            // 頁面與元件高
            const element = document.querySelector("#attractions_items");
            const elementHeight = element.getBoundingClientRect().bottom;

            // 判斷滾動式距離是否高於元件高
            if (result.nextPage != null) {
              if (scrollable >= elementHeight && toggleK) {
                nextKeyword += 1;
                sss = false;
                toggleK = false;
                console.log("執行");
                nextKeywordPage(nextKeyword);
              }
            }
          });
        });
    }
    nextKeywordPage(currentPageK);
  });
}
init();
