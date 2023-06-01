(function () {
  "use strict";

  var searchbox = document.querySelector('textarea[role="combobox"]');

  var func = function (options) {
    // Capture Phase: stopImmediatePropagation stops event listener to propagate from root to target.
    window.addEventListener(
      "keydown",
      function (e) {
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
            e.preventDefault();
            e.stopImmediatePropagation();
            if (shortcuts.searchType == "all" || shortcuts.searchType == "video") {
              shortcuts.focusResult(keyType == "navigateNext" ? 1 : -1, shortcuts.all_selector);
            } else if (shortcuts.searchType == "news") {
              shortcuts.focusResult(keyType == "navigateNext" ? 1 : -1, shortcuts.news_selector);
            } else if (shortcuts.searchType == "image") {
              shortcuts.navigateImage(keyType == "navigateNext" ? 1 : -1, shortcuts.image_selector);
            }
            break;

          // page transition for search results
          case "moveNextSearchPage":
          case "movePreviousSearchPage":
            e.preventDefault();
            e.stopImmediatePropagation();
            if (shortcuts.searchType == "all" || shortcuts.searchType == "video" || shortcuts.searchType == "news") {
              shortcuts.moveAllSearchPage(keyType == "moveNextSearchPage" ? 1 : -1);
            }
            break;

          // page transition for all url
          case "goToPreviousPage":
          case "goToNextPage":
            e.preventDefault();
            e.stopImmediatePropagation();
            // console.log("shift key & H, L");
            shortcuts.movePage(keyType == "goToNextPage" ? 1 : -1);
            break;

          // When the button 'ctrl + [' is pressed, the search box is unfocused.
          case "unfocusWithBracket":
            e.preventDefault();
            e.stopImmediatePropagation();
            let focusedElement = document.activeElement;
            shortcuts.unfocusElement(focusedElement);
            break;

          // search on Bing
          case "searchOnBing":
            e.preventDefault();
            e.stopImmediatePropagation();
            shortcuts.changeSearchBing();
            break;

          // change Language
          case "changeLangEn":
            e.preventDefault();
            e.stopImmediatePropagation();
            shortcuts.changeLang("english");
            break;

          case "changeLangNa":
            e.preventDefault();
            e.stopImmediatePropagation();
            shortcuts.changeLang("native");
            break;

          // to prevent triggering event listener when keydown event is occurred
          case "focusOnInput":
            e.preventDefault();
            e.stopImmediatePropagation();
            break;
        }
      },
      true
    );
    window.addEventListener("keyup", function (e) {
      let keyType = keymap.getKeyType(e, options);

      switch (keyType) {
        // When the button '/' is pressed, the search box is focused.
        case "focusOnInput":
          e.preventDefault();
          let pos = searchbox.value.length;
          searchbox.focus();
          searchbox.setSelectionRange(pos, pos);
          break;

        // When the button 'esc' is pressed, the search box is unfocused.
        case "unfocusWithESC":
          e.preventDefault();
          let focusedElement = document.activeElement;
          shortcuts.unfocusElement(focusedElement);
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
