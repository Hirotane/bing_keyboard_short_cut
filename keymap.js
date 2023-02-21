let keymap = {
  getKeyType: function (e, options) {
    let keyType;
    switch (e.key) {
      case "j":
        if (
          options.navigateSearchResultsWithJKHL &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "navigateNext";
        }
        break;
      case "ArrowDown":
        if (
          options.navigateSearchResultsWithArrows &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "navigateNext";
        }
        break;
      case "k":
        if (
          options.navigateSearchResultsWithJKHL &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "navigateBack";
        }
        break;
      case "ArrowUp":
        if (
          options.navigateSearchResultsWithArrows &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "navigateBack";
        }
        break;
      case "h":
        if (
          options.navigateSearchResultsWithJKHL &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "movePreviousSearchPage";
        }
        break;
      case "H":
        if (options.movePagesWithHL && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "goToPreviousPage";
        }
        break;
      case "ArrowLeft":
        if (
          options.navigateSearchResultsWithArrows &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "movePreviousSearchPage";
        } else if (
          options.movePagesWithArrows &&
          e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "goToPreviousPage";
        }
        break;
      case "l":
        if (
          options.navigateSearchResultsWithJKHL &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "moveNextSearchPage";
        }
        break;
      case "L":
        if (options.movePagesWithHL && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "goToNextPage";
        }
        break;
      case "ArrowRight":
        if (
          options.navigateSearchResultsWithArrows &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "moveNextSearchPage";
        } else if (
          options.movePagesWithArrows &&
          e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !shortcuts.isInputActive()
        ) {
          keyType = "goToNextPage";
        }
        break;
      case "A":
        if (options.selectSearchType && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchAll";
        }
        break;
      case "C":
        if (options.selectSearchType && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchChat";
        }
        break;
      case "W":
        if (options.selectSearchType && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchWork";
        }
        break;
      case "I":
        if (options.selectSearchType && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchImage";
        }
        break;
      case "N":
        if (options.selectSearchType && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchNews";
        }
        break;
      case "V":
        if (options.selectSearchType && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchVideo";
        }
        break;
      case "M":
        if (options.selectSearchType && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchMap";
        }
        break;
      case "S":
        if (options.selectSearchType && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchShop";
        }
        break;
      case "F":
        if (options.selectSearchType && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchFinance";
        }
      case "[":
        if (options.unfocusWithBracket && !e.shiftKey && e.ctrlKey && !e.metaKey && shortcuts.isInputActive()) {
          keyType = "unfocusWithBracket";
        }
        break;
      case "g":
        if (options.switchSearchEngine && !e.shiftKey && e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchOnGoogle";
        }
        break;
      case "b":
        if (options.switchSearchEngine && !e.shiftKey && e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchOnEdge";
        }
      case "e":
        if (options.changeLanguage && !e.shiftKey && e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "changeLangEn";
        }
        break;
      case "d":
        if (options.changeLanguage && !e.shiftKey && e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "changeLangNa";
        }
        break;
      case "Q":
        if (options.stopChatGeneration && e.shiftKey && e.ctrlKey && !e.metaKey) {
          keyType = "stopChatGeneration";
        }
        break;
      case "i":
        if (options.focusOnInputWithI && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "focusOnInput";
        }
        break;
      case "/":
        if (options.focusOnInputWithSlash && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "focusOnInput";
        }
        break;
      case "Escape":
        if (options.unfocusWithESC && !e.shiftKey && !e.ctrlKey && !e.metaKey && shortcuts.isInputActive()) {
          keyType = "unfocusWithESC";
        }
        break;
    }
    return keyType;
  },
};
