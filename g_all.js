(function () {
  "use strict";

  var searchbox = document.querySelector('input[role="combobox"]');

  var func = function (options) {
    window.addEventListener("keydown", function (e) {
      let keyType = keymap.getKeyType(e, options);

      switch (keyType) {
        case "searchAll":
          shortcuts.changeSearchType("all");
          break;

        case "searchWork":
          shortcuts.changeSearchType("work");
          break;

        case "searchImage":
          shortcuts.changeSearchType("image");
          break;

        case "searchNews":
          shortcuts.changeSearchType("news");
          break;

        case "searchVideo":
          shortcuts.changeSearchType("video");
          break;

        case "searchMap":
          shortcuts.changeSearchType("map");
          break;

        case "searchShop":
          shortcuts.changeSearchType("shop");
          break;

        case "searchFinance":
          shortcuts.changeSearchType("finance");
          break;

        // move search results
        case "navigateNext":
        case "navigateBack":
          if (shortcuts.searchType == "all" || shortcuts.searchType == "video") {
            e.preventDefault();
            e.stopPropagation();
            shortcuts.focusResult(keyType == "navigateNext" ? 1 : -1, shortcuts.all_selector);
          } else if (shortcuts.searchType == "news") {
            e.preventDefault();
            e.stopPropagation();
            shortcuts.focusResult(keyType == "navigateNext" ? 1 : -1, shortcuts.news_selector);
          } else if (shortcuts.searchType == "image") {
            e.preventDefault();
            e.stopPropagation();
            shortcuts.navigateImage(keyType == "navigateNext" ? 1 : -1, shortcuts.image_selector);
          }
          break;

        // page transition for search results
        case "moveNextSearchPage":
        case "movePreviousSearchPage":
          if (shortcuts.searchType == "all" || shortcuts.searchType == "video") {
            e.preventDefault();
            e.stopPropagation();
            shortcuts.moveAllSearchPage(keyType == "moveNextSearchPage" ? 1 : -1);
          }
          break;

        // page transition for all url
        case "goToPreviousPage":
        case "goToNextPage":
          // console.log("shift key & H, L");
          e.preventDefault();
          e.stopPropagation();
          shortcuts.movePage(keyType == "goToNextPage" ? 1 : -1);
          break;

        // When the button 'ctrl + [' is pressed, the search box is unfocused.
        case "unfocusWithBracket":
          shortcuts.unfocusElement(searchbox);
          break;

        // search on Bing
        case "searchOnBing":
          console.log("bing");
          shortcuts.changeSearchBing();
          break;

        // change Language
        case "changeLangEn":
          shortcuts.changeLang("english");
          break;

        case "changeLangNa":
          shortcuts.changeLang("native");
          break;
      }
    });
    window.addEventListener("keyup", function (e) {
      let keyType = keymap.getKeyType(e, options);

      switch (keyType) {
        // When the button '/' is pressed, the search box is focused.
        case "focusOnInput":
          let pos = searchbox.value.length;
          searchbox.focus();
          searchbox.setSelectionRange(pos, pos);
          break;

        // When the button 'esc' is pressed, the search box is unfocused.
        case "unfocusWithESC":
          e.preventDefault();
          shortcuts.unfocusElement(searchbox);
          break;
      }
      sessionStorage.setItem("keypress", 0);
    });
  };

  var url = location.href;
  if (location.href.indexOf("&tbm=isch") > -1) {
    shortcuts.initImage(func);
  } else if (url.indexOf("&tbm=vid") > -1) {
    shortcuts.initVideo(func);
  } else if (url.indexOf("maps.google.") > -1) {
    shortcuts.initAll(func);
  } else if (url.indexOf("&tbm=nws") > -1) {
    shortcuts.initNews(func);
  } else if (url.indexOf("&tbm=shop") > -1) {
    shortcuts.initAll(func);
  } else if (url.indexOf("&tbm=fin") > -1) {
    shortcuts.initAll(func);
  } else {
    shortcuts.initAll(func);
  }
})();
