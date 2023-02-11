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
      // console.log(e.key);
      // console.log(location.href);
      var shouldNavigateNext =
          (options.navigateSearchResultsWithJKHL &&
            e.key == "j" &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()) ||
          (options.navigateSearchResultsWithArrows &&
            e.key == "ArrowDown" &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()),
        shouldNavigateBack =
          (options.navigateSearchResultsWithJKHL &&
            e.key == "k" &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()) ||
          (options.navigateSearchResultsWithArrows &&
            e.key == "ArrowUp" &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()),
        movePreviousSearchPage =
          (options.navigateSearchResultsWithJKHL &&
            e.key == "h" &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()) ||
          (options.navigateSearchResultsWithArrows &&
            e.key == "ArrowLeft" &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()),
        moveNextSearchPage =
          (options.navigateSearchResultsWithJKHL &&
            e.key == "l" &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()) ||
          (options.navigateSearchResultsWithArrows &&
            e.key == "ArrowRight" &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()),
        goToPreviousPage =
          (options.movePagesWithHL &&
            e.key == "H" &&
            e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()) ||
          (options.movePagesWithArrows &&
            e.key == "ArrowLeft" &&
            e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()),
        goToNextPage =
          (options.movePagesWithHL &&
            e.key == "L" &&
            e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()) ||
          (options.movePagesWithArrows &&
            e.key == "ArrowRight" &&
            e.shiftKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !shortcuts.isInputActive()),
        searchTypeA = options.selectSearchType && e.key == "A" && e.shiftKey && !shortcuts.isInputActive(),
        searchTypeC = options.selectSearchType && e.key == "C" && e.shiftKey && !shortcuts.isInputActive(),
        searchTypeW = options.selectSearchType && e.key == "W" && e.shiftKey && !shortcuts.isInputActive(),
        searchTypeI = options.selectSearchType && e.key == "I" && e.shiftKey && !shortcuts.isInputActive(),
        searchTypeN = options.selectSearchType && e.key == "N" && e.shiftKey && !shortcuts.isInputActive(),
        searchTypeV = options.selectSearchType && e.key == "V" && e.shiftKey && !shortcuts.isInputActive(),
        searchTypeM = options.selectSearchType && e.key == "M" && e.shiftKey && !shortcuts.isInputActive(),
        searchTypeS = options.selectSearchType && e.key == "S" && e.shiftKey && !shortcuts.isInputActive(),
        unfocusWithBracket = options.unfocusWithBracket && e.key == "[" && e.ctrlKey && shortcuts.isInputActive(),
        searchOnGoogle = options.switchSearchEngine && e.key == "g" && e.ctrlKey && !shortcuts.isInputActive(),
        changeLangEn = options.changeLanguage && e.key == "e" && e.ctrlKey && !shortcuts.isInputActive(),
        changeLangNa = options.changeLanguage && e.key == "d" && e.ctrlKey && !shortcuts.isInputActive();

      // select search type
      if (searchTypeA) {
        shortcuts.changeSearchType("all");
      } else if (searchTypeC) {
        shortcuts.changeSearchType("chat");
      } else if (searchTypeW) {
        shortcuts.changeSearchType("work");
      } else if (searchTypeI) {
        shortcuts.changeSearchType("image");
      } else if (searchTypeN) {
        shortcuts.changeSearchType("news");
      } else if (searchTypeV) {
        shortcuts.changeSearchType("video");
      } else if (searchTypeM) {
        shortcuts.changeSearchType("map");
      } else if (searchTypeS) {
        shortcuts.changeSearchType("shop");
      }

      if (shouldNavigateNext || shouldNavigateBack) {
        // console.log("j or k");
        e.preventDefault();
        e.stopPropagation();
        shortcuts.focusResult(shouldNavigateNext ? 1 : -1, shortcuts.work_selector);
      }
      // search page transition
      if (moveNextSearchPage || movePreviousSearchPage) {
        // console.log("h or l");
        e.preventDefault();
        e.stopPropagation();
        shortcuts.moveWorkSearchPage(moveNextSearchPage ? 1 : -1);
      }
      // page transition for all url
      if (goToPreviousPage || goToNextPage) {
        // console.log("shift key & H, L");
        e.preventDefault();
        e.stopPropagation();
        shortcuts.movePage(goToNextPage ? 1 : -1);
      }
      // When the button 'ctrl + [' is pressed, the search box is unfocused.
      if (unfocusWithBracket) {
        // eliminate shadows whitch appears when search box is focused.
        let elements = document.getElementsByClassName("b_lbShow");
        elements[0].classList.remove("b_lbShow");
        searchbox.blur();
      }
      // serch on Google
      if (searchOnGoogle) {
        shortcuts.changeSearchGoogle();
      }
    });
    window.addEventListener("keyup", function (e) {
      var focusOnInput = options.focusOnInput && e.key == "/" && !shortcuts.isInputActive(),
        unfocusWithESC = options.unfocusWithESC && e.key == "Escape" && shortcuts.isInputActive();
      // e = e || window.event;
      // When the button '/' is pressed, the search box is focused.
      if (focusOnInput) {
        var pos = searchbox.value.length;
        searchbox.focus();
        searchbox.setSelectionRange(pos, pos);
      }
      // When the button 'esc' is pressed, the search box is unfocused.
      if (unfocusWithESC) {
        searchbox.blur();
      }
    });
  });
})();
