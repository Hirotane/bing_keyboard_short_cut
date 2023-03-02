(function () {
  "use strict";

  let searchbox;

  shortcuts.initAll(function (options) {
    window.addEventListener("keydown", function (e) {
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

      let keyType = keymap.getKeyType(e, options);

      switch (keyType) {
        case "searchAll":
          if (chatMode) {
            shortcuts.changeSearchType("all_chat");
          } else {
            shortcuts.changeSearchType("all");
          }
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

        // stop chat answer
        case "stopChatGeneration":
          if (chatMode) {
            e.preventDefault();
            e.stopPropagation();
            let chatShadowRoot_3rd = chatShadowRoot_2nd.querySelector("cib-typing-indicator").shadowRoot;
            let stopButton = chatShadowRoot_3rd.querySelector("button");
            stopButton.click();
          }
          break;

        // start new chat topic
        case "startNewChatTopic":
          if (chatMode) {
            e.preventDefault();
            e.stopPropagation();
            let newTopicButton = chatShadowRoot_2nd.querySelector("button.button-compose");
            newTopicButton.click();
          }
          break;

        // move search results
        case "navigateNext":
        case "navigateBack":
          if (!chatMode) {
            // console.log("j or k");
            e.preventDefault();
            e.stopPropagation();
            shortcuts.focusResult(keyType == "navigateNext" ? 1 : -1, shortcuts.all_selector);
          }
          break;

        // page transition for search results
        case "moveNextSearchPage":
        case "movePreviousSearchPage":
          if (!chatMode) {
            // console.log("h or l");
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
          e.preventDefault();
          e.stopPropagation();
          let focusedElement = document.activeElement;
          shortcuts.unfocusElement(focusedElement, "all");
          break;

        // serch on Google
        case "searchOnGoogle":
          e.preventDefault();
          e.stopPropagation();
          shortcuts.changeSearchGoogle();
          break;

        // change Language
        case "changeLangEn":
        case "changeLangNa":
          e.preventDefault();
          e.stopPropagation();
          shortcuts.changeLang();
          break;
      }
    });
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
          e.stopPropagation();
          let pos = searchbox.value.length;
          searchbox.focus();
          searchbox.setSelectionRange(pos, pos);
          break;

        // When the button 'esc' is pressed, the search box is unfocused.
        case "unfocusWithESC":
          e.preventDefault();
          e.stopPropagation();
          let focusedElement = document.activeElement;
          shortcuts.unfocusElement(focusedElement, "all");
          break;
      }
      sessionStorage.setItem("keypress", 0);
    });
  });
})();
