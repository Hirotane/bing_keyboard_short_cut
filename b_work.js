(function () {
  "use strict";

  var searchbox;
  searchbox = document.querySelector("textarea.b_searchbox");
  if (!searchbox) {
    // old type of input
    searchbox = document.querySelector(".b_searchbox");
  }

  shortcuts.initWork(function (options) {
    window.addEventListener("keydown", function (e) {
      let keyType = keymap.getKeyType(e, options);

      switch (keyType) {
        case "searchAll":
          shortcuts.changeSearchType("all");
          break;

        case "searchChat":
          shortcuts.changeSearchType("chat");
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

        // move search results
        case "navigateNext":
        case "navigateBack":
          e.preventDefault();
          e.stopPropagation();
          shortcuts.focusResult(keyType == "navigateNext" ? 1 : -1, shortcuts.work_selector);
          break;

        case "moveNextSearchPage":
        case "movePreviousSearchPage":
          e.preventDefault();
          e.stopPropagation();
          shortcuts.moveWorkSearchPage(keyType == "moveNextSearchPage " ? 1 : -1);
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
          shortcuts.unfocusElement(searchbox, "work");
          break;
      }
    });
    window.addEventListener("keyup", function (e) {
      let keyType = keymap.getKeyType(e, options);

      switch (keyType) {
        // When the button '/' or 'i' is pressed, the search box is focused.
        case "focusOnInput":
          let pos = searchbox.value.length;
          searchbox.focus();
          searchbox.setSelectionRange(pos, pos);
          break;

        // When the button 'esc' is pressed, the search box is unfocused.
        case "unfocusWithESC":
          shortcuts.unfocusElement(searchbox, "work");
          break;
      }
    });
  });
})();
