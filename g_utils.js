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
  },
  searchType: "all",
  // #search a > h3:not([data-initq] h3) : search results excluding the section for questions from others
  // #botstuff a > h3:not([data-initq] h3) : search results added in continuous scrolling
  // #bres a > div:has(b) : the section for related keywords
  // [data-text-ad] a > div[role='heading'] : ad headings
  all_selector:
    "#search a > h3:not([data-initq] h3), #botstuff a > h3:not([data-initq] h3), #bres a div:has(b), [data-text-ad] a > div[role='heading']",
  // all_title_selector: "h3, div[role='heading'], div:last-child, span",
  // news_title_selector: "div[role='heading']",
  image_selector: "[data-ri] > [data-nav]",
  news_selector: "#search [data-hveid] a div[role='heading']",
  initAll: function (callback) {
    this.searchType = "all";
    chrome.storage.sync.get(this.defaultOptions, callback);
    chrome.storage.sync.get(this.defaultOptions, function (options) {
      if (options.hideAds) {
        shortcuts.grayoutAds();
      }
    });

    var focusIndex = this.initializeIndex(sessionStorage.getItem("focusIndex"));
    this.focusOnIndexedElement(this.all_selector, focusIndex);
  },
  initImage: function (callback) {
    this.searchType = "image";
    chrome.storage.sync.get(this.defaultOptions, callback);

    sessionStorage.setItem("focusIndex", 0);
    this.focusOnIndexedElement(this.image_selector, 0);
  },
  initVideo: function (callback) {
    this.searchType = "video";
    chrome.storage.sync.get(this.defaultOptions, callback);

    var focusIndex = this.initializeIndex(sessionStorage.getItem("focusIndex"));
    this.focusOnIndexedElement(this.all_selector, focusIndex);
  },
  initNews: function (callback) {
    this.searchType = "news";
    chrome.storage.sync.get(this.defaultOptions, callback);

    var focusIndex = this.initializeIndex(sessionStorage.getItem("focusIndex"));
    this.focusOnIndexedElement(this.news_selector, focusIndex);
  },
  initializeIndex: function (index) {
    // back to the position in focus when returnd to search page from web-sites
    // set the focus index to 0 when transition of search pages is occured or page is reloaded
    if (
      window.location.href != sessionStorage.getItem("lastQueryUrl") ||
      window.performance.getEntriesByType("navigation")[0].type == "reload"
    ) {
      index = 0;
      sessionStorage.setItem("focusIndex", index);
    }
    return index;
  },
  focusOnIndexedElement: function (selector, index) {
    var target = this.getResults(selector)[index];
    target.closest("a").focus();
    if (this.searchType == "image") {
      this.emphasizeFocus(target);
    } else {
      this.underLine(target);
    }
  },
  isInputActive: function () {
    var activeElement = document.activeElement;
    return activeElement.nodeName == "INPUT" || activeElement.nodeName == "TEXTAREA";
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
    target_txt.closest("a").addEventListener("blur", (event) => {
      if (this.searchType == "all" || this.searchType == "video") {
        event.target.querySelector(this.all_selector).style.textDecoration = "";
      } else if (this.searchType == "news") {
        event.target.querySelector(this.news_selector).style.textDecoration = "";
      }
    });
  },
  emphasizeFocus: function (elt) {
    elt.style.outlineWidth = "medium";
    elt.style.outlineColor = "#1e90ff";
    elt.style.zIndex = 10;
  },
  grayoutAds: function () {
    var ads = Array.from(document.querySelectorAll("#bottomads, #tads"));
    var txtColor = "#aaa";
    for (let i = 0; i < ads.length; i++) {
      var adsSpan = ads[i].querySelectorAll("span");
      var adsA = ads[i].querySelectorAll("a");
      var adsCite = ads[i].querySelectorAll("cite");
      var adsDiv = ads[i].querySelectorAll("div");
      var adsStrong = ads[i].querySelectorAll("strong");
      for (let j = 0; j < adsSpan.length; j++) {
        adsSpan[j].style.color = txtColor;
      }
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
    target.closest("a").focus({ preventScroll: true });
    this.underLine(target);
  },
  navigateImage: function (offset, selector) {
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
    var target = results[focusIndex];
    this.scrollSearchResults(target, offset);
    target.focus({ preventScroll: true });
    this.emphasizeFocus(target);
  },
  moveAllSearchPage: function (offset) {
    if (offset == 1) {
      var nextpage = document.querySelector("#pnnext");
      if (nextpage) {
        window.location.href = nextpage;
      }
    } else {
      var previouspage = document.querySelector("#pnprev");
      if (previouspage) {
        window.location.href = previouspage;
      }
    }
  },
  moveWorkSearchPage: function (offset) {
    if (offset == 1) {
      var nextpage = document.querySelector(".ms-TooltipHost > [data-icon-name='chevronright']");
      nextpage.click();
      sessionStorage.setItem("focusIndex", 0);
    } else {
      var previouspage = document.querySelector(".ms-TooltipHost > [data-icon-name='chevronleft']");
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
        var ref = document.querySelector('a[href*="/search?q="]:not([href*="&tbm="]):not([href*="maps.google."])');
        window.location.href = ref;
        break;
      case "image":
        var ref = document.querySelector('a[href*="&tbm=isch"]');
        window.location.href = ref;
        break;
      case "video":
        var ref = document.querySelector('a[href*="&tbm=vid"]');
        window.location.href = ref;
        break;
      case "map":
        var ref = document.querySelector('a[href*="maps.google."]');
        window.location.href = ref;
        break;
      case "news":
        var ref = document.querySelector('a[href*="&tbm=nws"]');
        window.location.href = ref;
        break;
      case "shop":
        var ref = document.querySelector('a[href*="&tbm=shop"]');
        window.location.href = ref;
        break;
      case "finance":
        var ref = document.querySelector('a[href*="/finance"]');
        window.location.href = ref;
        break;
    }
  },
  changeSearchBing: function () {
    var searchWord = document.querySelector('textarea[role="combobox"]').getAttribute("value");
    var origin = "https://www.bing.com";
    var searchQ = "/search?q=";
    var refEng = "&cc=us&setlang=en";
    var isEng = document.querySelector("html").getAttribute("lang") == "en";
    var currRef = window.location.href;
    console.log(currRef);
    if (isEng) {
      if (currRef.match(/&tbm=isch/)) {
        window.location.href = origin + "/images" + searchQ + searchWord + refEng;
      } else if (currRef.match(/&tbm=vid/)) {
        window.location.href = origin + "/videos" + searchQ + searchWord + refEng;
      } else if (currRef.match(/https:\/\/www.google.com\/maps/)) {
        console.log("map");
        searchWord = document.getElementById("searchboxinput").getAttribute("value");
        window.location.href = origin + "/maps" + searchQ + searchWord + refEng;
      } else if (currRef.match(/&tbm=nws/)) {
        window.location.href = origin + "/news" + searchQ + searchWord + refEng;
      } else if (currRef.match(/&tbm=shop/)) {
        window.location.href = origin + "/shop" + searchQ + searchWord + refEng;
      } else {
        window.location.href = origin + searchQ + searchWord + refEng;
      }
    } else {
      if (currRef.match(/&tbm=isch/)) {
        window.location.href = origin + "/images" + searchQ + searchWord;
      } else if (currRef.match(/&tbm=vid/)) {
        window.location.href = origin + "/videos" + searchQ + searchWord;
      } else if (currRef.match(/https:\/\/www.google.com\/maps/)) {
        console.log("map");
        searchWord = document.getElementById("searchboxinput").getAttribute("value");
        window.location.href = origin + "/maps" + searchQ + searchWord;
      } else if (currRef.match(/&tbm=nws/)) {
        window.location.href = origin + "/news" + searchQ + searchWord;
      } else {
        window.location.href = origin + searchQ + searchWord;
      }
    }
  },
  changeLang: function (language) {
    var searchWord = document.querySelector('textarea[role="combobox"]').getAttribute("value");
    switch (language) {
      case "english":
        var ref = "https://www.google.com/search?q=" + searchWord + "&gl=us&hl=en&pws=0";
        window.location.href = ref;
        break;
      case "native":
        var ref = "https://www.google.com/search?q=" + searchWord;
        window.location.href = ref;
        break;
    }
  },
};
