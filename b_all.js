(function () {
  ("use strict");
  let searchbox;
  shortcuts.initAll(function (options) {
    // Capture Phase: stopImmediatePropagation stops event listener to propagate from root to target.
    // this feature disables keyDown event for auto-focusing input box
    window.addEventListener(
      "keydown",
      function (e) {
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

        let keyType = keymap.getKeyType(e, options);

        switch (keyType) {
          case "searchAll":
            e.stopImmediatePropagation();
            if (chatMode) {
              shortcuts.changeSearchType("all_chat");
            } else {
              shortcuts.changeSearchType("all");
            }
            break;

          case "searchChat":
            e.stopImmediatePropagation();
            shortcuts.changeSearchType("chat");
            break;

          case "searchWork":
            e.stopImmediatePropagation();
            shortcuts.changeSearchType("work");
            break;

          case "searchImage":
            e.stopImmediatePropagation();
            shortcuts.changeSearchType("image");
            break;

          case "searchNews":
            e.stopImmediatePropagation();
            shortcuts.changeSearchType("news");
            break;

          case "searchVideo":
            e.stopImmediatePropagation();
            shortcuts.changeSearchType("video");
            break;

          case "searchMap":
            e.stopImmediatePropagation();
            shortcuts.changeSearchType("map");
            break;

          case "searchShop":
            e.stopImmediatePropagation();
            shortcuts.changeSearchType("shop");
            break;

          // stop chat answer
          case "stopChatGeneration":
            if (chatMode) {
              e.stopImmediatePropagation();
              e.preventDefault();
              let chatShadowRoot_3rd = chatShadowRoot_2nd.querySelector("cib-typing-indicator").shadowRoot;
              let stopButton = chatShadowRoot_3rd.querySelector("button");
              stopButton.click();
            }
            break;

          // start new chat topic
          case "startNewChatTopic":
            if (chatMode) {
              e.stopImmediatePropagation();
              e.preventDefault();
              let newTopicButton = chatShadowRoot_2nd.querySelector("button.button-compose");
              newTopicButton.click();
            }
            break;

          // move search results
          case "navigateNext":
          case "navigateBack":
            if (!chatMode) {
              e.stopImmediatePropagation();
              e.preventDefault();
              // console.log("j or k");
              shortcuts.focusResult(keyType == "navigateNext" ? 1 : -1, shortcuts.all_selector);
            }
            break;

          // page transition for search results
          case "moveNextSearchPage":
          case "movePreviousSearchPage":
            if (!chatMode) {
              e.stopImmediatePropagation();
              e.preventDefault();
              // console.log("h or l");
              shortcuts.moveAllSearchPage(keyType == "moveNextSearchPage" ? 1 : -1);
            }
            break;

          // page transition for all url
          case "goToPreviousPage":
          case "goToNextPage":
            e.stopImmediatePropagation();
            e.preventDefault();
            // console.log("shift key & H, L");
            shortcuts.movePage(keyType == "goToNextPage" ? 1 : -1);
            break;

          // When the button 'ctrl + [' is pressed, the search box is unfocused.
          case "unfocusWithBracket":
            e.stopImmediatePropagation();
            e.preventDefault();
            let focusedElement = document.activeElement;
            shortcuts.unfocusElement(focusedElement, "all");
            break;

          // serch on Google
          case "searchOnGoogle":
            e.stopImmediatePropagation();
            e.preventDefault();
            shortcuts.changeSearchGoogle();
            break;

          // change Language
          case "changeLangEn":
          case "changeLangNa":
            e.stopImmediatePropagation();
            e.preventDefault();
            shortcuts.changeLang();
            break;

          // to prevent triggering event listener when keydown event is occurred
          case "focusOnInput":
            e.stopImmediatePropagation();
            e.preventDefault();
            break;
        }
      },
      true
    );
    window.addEventListener("keyup", function (e) {
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
          shortcuts.unfocusElement(focusedElement, "all");
          break;
      }
      sessionStorage.setItem("keypress", 0);
    });
  });
})();
