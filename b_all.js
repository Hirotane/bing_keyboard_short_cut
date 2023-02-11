(function () {
  "use strict";

  let searchbox;

  shortcuts.initAll(function (options) {
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
        changeLangNa = options.changeLanguage && e.key == "d" && e.ctrlKey && !shortcuts.isInputActive(),
        stopChatGeneration = e.key == "Q" && e.shiftKey && e.ctrlKey;

      // get input box for normal or conversational search
      let mode =
        document.querySelector(".cib-serp-main") && document.querySelector(".cib-serp-main").getAttribute("mode");
      let chatMode = mode === "conversation";
      let chatShadowRoot_2nd;

      if (chatMode) {
        let chatShadowRoot_1st = document.querySelector("#b_sydConvCont .cib-serp-main").shadowRoot;
        chatShadowRoot_2nd = chatShadowRoot_1st.querySelector("#cib-action-bar-main").shadowRoot;
        searchbox = chatShadowRoot_2nd.querySelector(".root .main-container textarea");
      } else {
        searchbox = document.querySelector("textarea.b_searchbox") || document.querySelector(".b_searchbox");
      }

      // select search type
      if (searchTypeA && !chatMode) {
        shortcuts.changeSearchType("all");
      } else if (searchTypeA && chatMode) {
        shortcuts.changeSearchType("all_chat");
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

      // stop answer
      if (stopChatGeneration && chatMode) {
        let chatShadowRoot_3rd = chatShadowRoot_2nd.querySelector("cib-typing-indicator").shadowRoot;
        let stopButton = chatShadowRoot_3rd.querySelector("button");
        stopButton.click();
      }

      if ((shouldNavigateNext && !chatMode) || (shouldNavigateBack && !chatMode)) {
        // console.log("j or k");
        e.preventDefault();
        e.stopPropagation();
        shortcuts.focusResult(shouldNavigateNext ? 1 : -1, shortcuts.all_selector);
      }
      // search page transition
      if ((moveNextSearchPage && !chatMode) || (movePreviousSearchPage && !chatMode)) {
        // console.log("h or l");
        e.preventDefault();
        e.stopPropagation();
        shortcuts.moveAllSearchPage(moveNextSearchPage ? 1 : -1);
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
        // let elements = document.getElementsByClassName("b_lbShow");
        let elements = document.querySelector(".b_lbShow");
        console.log(elements);
        if (elements) {
          elements.classList.remove("b_lbShow");
        }
        searchbox.blur();
      }
      // serch on Google
      if (searchOnGoogle) {
        shortcuts.changeSearchGoogle();
      }
      // change Language
      if (changeLangEn || changeLangNa) {
        console.log("lang");
        shortcuts.changeLang();
      }
    });
    window.addEventListener("keyup", function (e) {
      var focusOnInput =
          (options.focusOnInput && e.key == "/" && !shortcuts.isInputActive()) ||
          (options.focusOnInput && e.key == "i" && !shortcuts.isInputActive()),
        unfocusWithESC = options.unfocusWithESC && e.key == "Escape" && shortcuts.isInputActive();

      // get input box for normal or conversational search
      let mode =
        document.querySelector(".cib-serp-main") && document.querySelector(".cib-serp-main").getAttribute("mode");
      let chatMode = mode === "conversation";
      if (chatMode) {
        let chatShadowRoot_1st = document.querySelector("#b_sydConvCont .cib-serp-main").shadowRoot;
        let chatShadowRoot_2nd = chatShadowRoot_1st.querySelector("#cib-action-bar-main").shadowRoot;
        searchbox = chatShadowRoot_2nd.querySelector(".root .main-container textarea");
      } else {
        searchbox = document.querySelector("textarea.b_searchbox") || document.querySelector(".b_searchbox");
      }

      // e = e || window.event;
      // When the button '/' is pressed, the search box is focused.
      if (focusOnInput) {
        var pos = searchbox.value.length;
        searchbox.focus();
        searchbox.setSelectionRange(pos, pos);
      }
      // When the button 'esc' is pressed, the search box is unfocused.
      if (unfocusWithESC) {
        e.preventDefault();
        let elements = docuiiijjkkiiiiiment.querySelector(".b_lbShow");
        // let elements = document.querySelector(".sa_as");
        if (elements) {
          elements.classList.remove("b_lbShow");
        }
        searchbox.blur();
      }
      sessionStorage.setItem("keypress", 0);
    });
  });
})();
