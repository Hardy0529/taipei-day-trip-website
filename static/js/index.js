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
    let imgbox = document.createElement("a");
    imgbox.setAttribute("href", "/attraction/" + itmeHTML.id);
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
    let thumbnailTitle = document.createElement("a");
    thumbnailTitle.setAttribute("href", "/attraction/" + itmeHTML.id);
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

  let toggleSHOW = true;

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

        currentPage = result.nextPage;

        // 偵測滾動

        window.addEventListener("scroll", function () {
          // 螢幕可視窗格
          const scrollable = window.innerHeight;

          // 頁面與元件高
          const element = document.querySelector("#attractions_items");
          const elementHeight = element.getBoundingClientRect().bottom;
          if (toggleSHOW) {
            // 判斷滾動式距離是否高於元件高

            if (currentPage != null) {
              if (scrollable >= elementHeight && toggle) {
                //頁面
                console.log(currentPage);
                toggle = false;
                nextPage(currentPage);

                console.log("執行");
              }
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
    currentPageK = 0;
    document.querySelector("#keywordItem").value = "";
    sss = true;
    toggleSHOW = false;
    function nextKeywordPage(nextKeyword) {
      fetch("/api/attractions?page=" + nextKeyword + "&keyword=" + keywordItem)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.data.length != 0) {
            if (sss) {
              list.innerHTML = "";
            }

            // let str = "";
            // console.log(result.nextPage == null);
            // console.log(result.data);
            currentPageK = result.nextPage;
            result.data.forEach(function (item) {
              showHtml(item);
            });

            // list.insertAdjacentHTML("beforeEnd", str);
            console.log(currentPageK);
            // 開關
            toggleK = true;
            window.addEventListener("scroll", function () {
              // 螢幕可視窗格
              const scrollablek = window.innerHeight;

              // 頁面與元件高
              const elementk = document.querySelector("#attractions_items");
              const elementHeightk = elementk.getBoundingClientRect().bottom;

              // 判斷滾動式距離是否高於元件高
              if (result.nextPage != null) {
                if (scrollablek >= elementHeightk && toggleK) {
                  sss = false;
                  toggleK = false;
                  console.log("執行");
                  if (currentPageK != null) {
                    nextKeywordPage(currentPageK);
                  }
                }
              }
            });
          }
          if (result.data.length == 0) {
            list.innerHTML = "未搜尋到任何結果";
          }
        });
    }
    nextKeywordPage(currentPageK);
  });
}
init();
