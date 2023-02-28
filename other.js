(function () {
  "use strict";

  shortcuts.loadOptions(function (options) {
    window.addEventListener("keydown", function (e) {
      let keyType = keymap.getKeyType(e, options);

      switch (keyType) {
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
          let focusedElement = document.activeElement;
          focusedElement.blur();
          break;

        case "moveToBottom":
          let elm = document.documentElement;
          let bottom = elm.scrollHeight - elm.clientHeight;
          window.scroll({ top: bottom, behavior: "smooth" });
          break;

        // move to top when 'g' is pressed twice
        case "operatorG":
          window.addEventListener("keydown", function moveTop(e) {
            let moveToTop =
              options.scrollToTopOrBottom &&
              e.key == "g" &&
              !e.shiftKey &&
              !e.ctrlKey &&
              !e.metaKey &&
              !shortcuts.isInputActive();
            if (moveToTop) {
              window.scroll({ top: 0, behavior: "smooth" });
            }
            this.removeEventListener("keydown", moveTop);
          });
          break;

        // serch on Google
        case "searchOnGoogle":
          shortcuts.changeSearchGoogle();
          break;

        // serch on Bing
        case "searchOnGoogle":
          shortcuts.changeSearchBing();
          break;

        // change Language
        case "changeLangEn":
        case "changeLangNa":
          shortcuts.changeLang();
          break;
      }
    });
    window.addEventListener("keyup", function (e) {
      let keyType = keymap.getKeyType(e, options);

      switch (keyType) {
        // When the button '/' is pressed, the search box is focused.
        case "focusOnInput":
          let searchbox = shortcuts.focusOnSearchBox();
          let pos = searchbox.value.length;
          searchbox.focus();
          searchbox.setSelectionRange(pos, pos);
          break;

        // When the button 'esc' is pressed, the search box is unfocused.
        case "unfocusWithESC":
          var focusedElement = document.activeElement;
          focusedElement.blur();
          break;
      }
    });
    window.addEventListener("keypress", function (e) {
      let keyType = keymap.getKeyType(e, options);

      switch (keyType) {
        // scroll page with 'j', 'k'
        case "scrollUp":
        case "scrollDown":
          e.preventDefault();
          e.stopPropagation();
          shortcuts.scrollPageOneLine(keyType == "scrollUp" ? 1 : -1);
          break;

        // scroll page with 'd', 'u'
        case "scrollPageUp":
        case "scrollPageDown":
          e.preventDefault();
          e.stopPropagation();
          shortcuts.scrollHalfPage(keyType == "scrollPageUp" ? 1 : -1);
          break;
      }
    });
  });
})();
