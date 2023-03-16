// Globals
var shortcuts = {
  defaultOptions: {
    navigateSearchResultsWithJKHL: true,
    navigateSearchResultsWithArrows: true,
    movePagesWithHL: true,
    movePagesWithArrows: true,
    selectSearchType: true,
    focusOnInputWithSlash: true,
    focusOnInputWithI: true,
    unfocusWithESC: true,
    unfocusWithBracket: true,
    hideAds: true,
    switchSearchEngine: true,
    changeLanguage: true,
    stopChatGeneration: true,
    startNewChatTopic: true,
  },
  searchType: "all",
  all_selector:
    "#b_results .b_algo h2 > a, #b_results .b_ad h2 > a.b_ads1line, .b_rs > ul > li > a, .btitle > h2 > a, #nws_ht > h2 > a, .irphead > h2 > a, a.sb_pagP, a.sb_pagN",
  work_selector:
    ".ms-search-result-list-item-border > div > div > div > a, .ms-search-result-list-item > article h3 > a, .ac-textBlock > p > a, .ms-search-bookmarkTitle, button[aria-label='Next page'], button[aria-label='Previous page']",
  news_selector: ".t_t > a",
  initAll: function (callback) {
    chrome.storage.sync.get(this.defaultOptions, callback);
    chrome.storage.sync.get(this.defaultOptions, function (options) {
      if (options.hideAds) {
        shortcuts.grayoutAds();
      }
    });

    this.searchType = "all";
    // back to the position in focus when returnd to search page from web-sites
    var focusIndex = sessionStorage.getItem("focusIndex");
    // set the focus index to 0 when transition of search pages is occured or page is reloaded
    if (
      window.location.href != sessionStorage.getItem("lastQueryUrl") ||
      window.performance.getEntriesByType("navigation")[0].type == "reload"
    ) {
      focusIndex = 0;
      sessionStorage.setItem("focusIndex", focusIndex);
    }
    var results = this.getResults(this.all_selector);
    var target = results[focusIndex];
    target.focus();
    this.underLine(target);
    scrollTo(0, 0);
  },
  initWork: function (callback) {
    chrome.storage.sync.get(this.defaultOptions, callback);

    if (
      window.location.href != sessionStorage.getItem("lastQueryUrl") ||
      window.performance.getEntriesByType("navigation")[0].type == "reload"
    ) {
      focusIndex = 0;
      sessionStorage.setItem("focusIndex", focusIndex);
    }
  },
  initImage: function (callback) {
    chrome.storage.sync.get(this.defaultOptions, callback);

    this.searchType = "image";
    // console.log("this.searchType: "+this.searchType);
    this.focusIndexImgVtcl = this.focusIndexImgHrzn = 0;
    var target = this.getImageRowResults(0)[0];
    target.focus({ preventScroll: true });
    this.emphasizeFocus(target);
  },
  initVideo: function (callback) {
    chrome.storage.sync.get(this.defaultOptions, callback);

    this.searchType = "video";
    results = Array.from(document.querySelectorAll(".mc_vtvc > a"));
    var target = results[0];
    target.focus();
    this.emphasizeFocus(target);
  },
  initNews: function (callback) {
    chrome.storage.sync.get(this.defaultOptions, callback);

    if (window.performance.getEntriesByType("navigation")[0].type == "reload") {
      focusIndex = 0;
      sessionStorage.setItem("focusIndex", focusIndex);
    }
    var results = this.getResults(this.news_selector);
    var target = results[0];
    target.focus();
    this.underLine(target);
  },
  isInputActive: function () {
    var activeElement = document.activeElement;
    return (
      activeElement.nodeName == "INPUT" || activeElement.nodeName == "TEXTAREA" || activeElement.nodeName == "CIB-SERP"
    );
  },
  defineRangeOfIndex: function (index, length) {
    index = Math.min(index, length - 1);
    index = Math.max(index, 0);
    return index;
  },
  scrollSearchResults: function (target, offset) {
    if (offset == 1) {
      var relativePositionTop = target.getBoundingClientRect().top;
      var windowTopWidth = (window.innerHeight * 2) / 3;
      var scroll_width = relativePositionTop - windowTopWidth;
      if (scroll_width > 0) {
        window.scrollBy({
          top: scroll_width,
          left: 0,
        });
      }
    } else {
      var relativePositionTop = target.getBoundingClientRect().top;
      var windowTopWidth = (window.innerHeight * 1) / 4;
      var scroll_width = windowTopWidth - relativePositionTop;
      if (scroll_width > 0) {
        window.scrollBy({
          top: -scroll_width,
          left: 0,
        });
      }
    }
  },
  getResults: function (selector) {
    var containers = Array.from(document.querySelectorAll(selector));
    return containers;
  },
  underLine: function (target_txt) {
    target_txt.style.outline = "none";
    target_txt.style.textDecoration = "underline";
    target_txt.addEventListener("blur", (event) => {
      event.target.style.textDecoration = "";
    });
  },
  emphasizeFocus: function (elt) {
    elt.style.outlineWidth = "medium";
    elt.style.outlineColor = "#1e90ff";
  },
  emphasizeVideoFocus: function (elt) {
    elt.style.border = "solid";
    elt.style.borderWidth = "medium";
    elt.style.borderColor = "#1e90ff";
    elt.addEventListener("blur", (event) => {
      event.target.style.border = "none";
      event.target.style.borderWidth = "";
      event.target.style.borderColor = "";
    });
  },
  grayoutAds: function () {
    var ads = Array.from(document.querySelectorAll(".sb_add"));
    var txtColor = "#aaa";
    for (let i = 0; i < ads.length; i++) {
      var adsA = ads[i].querySelectorAll("a");
      var adsCite = ads[i].querySelectorAll("cite");
      var adsDiv = ads[i].querySelectorAll("div");
      var adsStrong = ads[i].querySelectorAll("strong");
      for (let j = 0; j < adsA.length; j++) {
        adsA[j].style.color = txtColor;
      }
      for (let j = 0; j < adsCite.length; j++) {
        adsCite[j].style.color = txtColor;
      }
      for (let j = 0; j < adsDiv.length; j++) {
        adsDiv[j].style.color = txtColor;
      }
      for (let j = 0; j < adsStrong.length; j++) {
        adsStrong[j].style.color = txtColor;
      }
    }
  },
  notKeyPress: function () {
    return Number(sessionStorage.getItem("keypress")) == 0;
  },
  focusResult: function (offset, selector) {
    var results = this.getResults(selector);
    var storageFocusIndex = Number(sessionStorage.getItem("focusIndex"));
    var focusElemTop = results[storageFocusIndex].getBoundingClientRect().top;
    var absolutePositionTop = focusElemTop + window.pageYOffset;
    if (storageFocusIndex == 0 && offset == -1 && this.notKeyPress()) {
      window.scroll({ top: 0, behavior: "smooth" });
      sessionStorage.setItem("keypress", 1);
      return;
    } else if (storageFocusIndex == results.length - 1 && offset == 1 && this.notKeyPress()) {
      var elm = document.documentElement;
      var bottom = elm.scrollHeight - elm.clientHeight;
      window.scroll({ top: bottom, behavior: "smooth" });
      sessionStorage.setItem("keypress", 1);
      return;
    } else if ((focusElemTop < 0 || focusElemTop > window.innerHeight) && this.notKeyPress()) {
      window.scroll({ top: absolutePositionTop - (window.innerHeight * 1) / 4, behavior: "smooth" });
      sessionStorage.setItem("keypress", 1);
      offset = 0;
      return;
    }

    var focusIndex = this.defineRangeOfIndex(storageFocusIndex + offset, results.length);
    sessionStorage.setItem("focusIndex", focusIndex);
    var ref = window.location.href;
    sessionStorage.setItem("lastQueryUrl", ref);
    var target = results[focusIndex];

    this.scrollSearchResults(target, offset);
    target.focus({ preventScroll: true });
    this.underLine(target);
  },
  getImageRowResults: function (row) {
    var containers = Array.from(
      document.querySelectorAll(`#mmComponent_images_2 > [data-row="${row}"] > li > .iuscp > .imgpt > a`)
    );
    return containers;
  },
  getImageColumnResults: function (col) {
    var containers = Array.from(
      document.querySelectorAll(`#mmComponent_images_2 > ul li:nth-child(${col}) > .iuscp > .imgpt > a`)
    );
    return containers;
  },
  focusIndexImgvtcl: 0, // index of row to move to designated line
  nextIndexImgHrzn: 0, // index of row to get the collection of row in the next step
  verticalImageMove: function (offset) {
    var results = this.getImageColumnResults(this.nextIndexImgVtcl + 1);
    var focusIndex = this.defineRangeOfIndex(this.focusIndexImgVtcl + offset, results.length);
    this.focusIndexImgVtcl = focusIndex;
    var target = results[focusIndex];
    this.nextIndexImgHrzn = Number(target.closest(".dgControl_list").getAttribute("data-row"));
    this.scrollSearchResults(target, offset);
    target.focus();
    this.emphasizeFocus(target);
  },
  focusIndexImgHrzn: 0, // index of column to move to designated line
  nextIndexImgVtcl: 0, // index of column to get the collection of column in the next step
  horizontalImageMove: function (offset) {
    var results = this.getImageRowResults(this.nextIndexImgHrzn);
    var focusIndex = this.defineRangeOfIndex(this.focusIndexImgHrzn + offset, results.length);
    this.focusIndexImgHrzn = focusIndex;
    var target = results[focusIndex];
    var imageRows = Array.from(target.closest(".dgControl_list").childNodes);
    this.nextIndexImgVtcl = imageRows.findIndex((list) => list.contains(target));
    target.focus();
    this.emphasizeFocus(target);
  },
  videoFocusIndex: 0,
  VideoMove: function (offset) {
    results = Array.from(document.querySelectorAll(".mc_vtvc > a"));
    this.videoFocusIndex = this.defineRangeOfIndex(this.videoFocusIndex + offset, results.length);
    var target = results[this.videoFocusIndex];
    target.focus();
    // this.emphasizeVideoFocus(target.querySelector('div'));
    this.emphasizeVideoFocus(target);
  },
  moveAllSearchPage: function (offset) {
    if (offset == 1) {
      var nextpage = document.querySelector(".sb_pagN").getAttribute("href");
      window.location.href = this.deleteShowconvPram(nextpage);
    } else {
      var previouspage = document.querySelector(".sb_pagP").getAttribute("href");
      window.location.href = this.deleteShowconvPram(previouspage);
    }
  },
  deleteShowconvPram: function (url) {
    const base = new URL(window.location.href);
    const urlParams = new URL(url, base);
    urlParams.searchParams.delete("showconv");
    return urlParams.toString();
  },
  moveWorkSearchPage: function (offset) {
    if (offset == 1) {
      let nextpage = document.querySelector("button[aria-label='Next page']");
      nextpage.click();
      sessionStorage.setItem("focusIndex", 0);
    } else {
      let previouspage = document.querySelector("button[aria-label='Previous page']");
      previouspage.click();
      sessionStorage.setItem("focusIndex", 0);
    }
  },
  movePage: function (offset) {
    if (offset == 1) {
      window.history.forward();
    } else {
      window.history.back();
    }
  },
  unfocusElement: function (searchbox, type) {
    searchbox.blur();
    // close window for autocomplete
    document.body.click();
    switch (type) {
      case "all":
        this.focusResult(0, this.all_selector);
        break;
      case "work":
        this.focusResult(0, this.work_selector);
        break;
      case "news":
        this.focusResult(0, this.news_selector);
        break;
    }
  },
  changeSearchType: function (type) {
    switch (type) {
      case "all":
        var ref = document.querySelector("#b-scopeListItem-web").firstElementChild.getAttribute("href");
        window.location.href = ref;
        break;
      case "all_chat":
        var elm = document.querySelector("#b-scopeListItem-web").firstElementChild;
        elm.click();
        break;
      case "chat":
        var elm = document.querySelector("#b-scopeListItem-conv") || document.querySelector("#b-scopeListItem-convups");
        var ref = elm.firstElementChild.getAttribute("href");
        if (ref === "javascript:void(0)") {
          elm.firstElementChild.click();
        } else {
          window.location.href = ref;
        }
        break;
      case "work":
        var ref = document.querySelector("#b-scopeListItem-bingatwork").firstElementChild.getAttribute("href");
        window.location.href = ref;
        break;
      case "image":
        var ref = document.querySelector("#b-scopeListItem-images").firstElementChild.getAttribute("href");
        window.location.href = ref;
        break;
      case "video":
        var ref = document.querySelector("#b-scopeListItem-video").firstElementChild.getAttribute("href");
        window.location.href = ref;
        break;
      case "map":
        var ref = document.querySelector("#b-scopeListItem-local").firstElementChild.getAttribute("href");
        window.location.href = ref;
        break;
      case "news":
        var ref = document.querySelector("#b-scopeListItem-news").firstElementChild.getAttribute("href");
        window.location.href = ref;
        break;
      case "shop":
        var ref = document.querySelector("#b-scopeListItem-shop").firstElementChild.getAttribute("href");
        window.location.href = ref;
        break;
    }
  },
  changeSearchGoogle: function () {
    var searchWord =
      document.querySelector(".b_searchbox").getAttribute("value") ||
      document.querySelector("textarea.b_searchbox").value;
    console.log(searchWord);
    var origin = "https://www.google.com/search?q=";
    var refEng = "&gl=us&hl=en&pws=0";
    var currRef = window.location.href;
    console.log(currRef);
    var isEng = document.querySelector("html").getAttribute("lang") == "en";
    if (isEng) {
      if (currRef.match(/https:\/\/www.bing.com\/images/)) {
        window.location.href = origin + searchWord + "&tbm=isch" + refEng;
      } else if (currRef.match(/https:\/\/www.bing.com\/videos/)) {
        window.location.href = origin + searchWord + "&tbm=vid" + refEng;
      } else if (currRef.match(/https:\/\/www.bing.com\/maps/)) {
        window.location.href = "https://www.google.com/maps/search/" + searchWord + "?hl=en";
      } else if (currRef.match(/https:\/\/www.bing.com\/news/)) {
        console.log("news");
        window.location.href = origin + searchWord + "&tbm=nws" + refEng;
      } else if (currRef.match(/https:\/\/www.bing.com\/shop/)) {
        window.location.href = origin + searchWord + "&tbm=shop" + refEng;
      } else {
        window.location.href = origin + searchWord + refEng;
      }
    } else {
      if (currRef.match(/https:\/\/www.bing.com\/images/)) {
        window.location.href = origin + searchWord + "&tbm=isch";
      } else if (currRef.match(/https:\/\/www.bing.com\/videos/)) {
        window.location.href = origin + searchWord + "&tbm=vid";
      } else if (currRef.match(/https:\/\/www.bing.com\/maps/)) {
        window.location.href = "https://www.google.com/maps/search/" + searchWord + "?hl=en";
      } else if (currRef.match(/https:\/\/www.bing.com\/news/)) {
        window.location.href = origin + searchWord + "&tbm=nws";
      } else if (currRef.match(/https:\/\/www.bing.com\/shop/)) {
        window.location.href = origin + searchWord + "&tbm=shop";
      } else {
        window.location.href = origin + searchWord;
      }
    }
  },
  changeLang: function () {
    var ref = "https://www.bing.com" + document.querySelector("#mkt_swc_v2").getAttribute("href");
    window.location.href = ref;
  },
};
