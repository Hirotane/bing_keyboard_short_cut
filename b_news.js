(function () {
  "use strict";

  let searchbox;
  searchbox = document.querySelector("textarea.b_searchbox");
  if (!searchbox) {
    // old type of input
    searchbox = document.querySelector(".b_searchbox");
  }

  shortcuts.initNews(function (options) {
    // Capture Phase: stopImmediatePropagation stops event listener to propagate from root to target.
    window.addEventListener(
      "keydown",
      function (e) {
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
            e.stopImmediatePropagation();
            shortcuts.focusResult(keyType == "navigateNext" ? 1 : -1, shortcuts.news_selector);
            break;

          // page transition for all url
          case "goToPreviousPage":
          case "goToNextPage":
            // console.log("shift key & H, L");
            e.preventDefault();
            e.stopImmediatePropagation();
            shortcuts.movePage(keyType == "goToNextPage" ? 1 : -1);
            break;

          // When the button 'ctrl + [' is pressed, the search box is unfocused.
          case "unfocusWithBracket":
            e.preventDefault();
            e.stopImmediatePropagation();
            let focusedElement = document.activeElement;
            shortcuts.unfocusElement(focusedElement, "news");
            break;

          // serch on Google
          case "searchOnGoogle":
            e.preventDefault();
            e.stopImmediatePropagation();
            shortcuts.changeSearchGoogle();
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
        // When the button '/' or 'i' is pressed, the search box is focused.
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
          shortcuts.unfocusElement(focusedElement, "news");
          break;
      }
    });
  });
})();
