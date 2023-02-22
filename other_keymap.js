let keymap = {
  getKeyType: function (e, options) {
    let keyType;
    switch (e.key) {
      case "H":
        if (options.movePagesWithHL && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "goToPreviousPage";
        }
        break;
      case "ArrowLeft":
        if (options.movePagesWithArrows && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "goToPreviousPage";
        }
        break;
      case "L":
        if (options.movePagesWithHL && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "goToNextPage";
        }
        break;
      case "ArrowRight":
        if (options.movePagesWithArrows && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "goToNextPage";
        }
        break;
      case "[":
        if (options.unfocusWithBracket && !e.shiftKey && e.ctrlKey && !e.metaKey && shortcuts.isInputActive()) {
          keyType = "unfocusWithBracket";
        }
        break;
      case "G":
        if (options.scrollToTopOrBottom && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "moveToBottom";
        }
        break;
      case "g":
        if (options.scrollToTopOrBottom && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "operatorG";
        } else if (options.switchSearchEngine && !e.shiftKey && e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchOnGoogle";
        }
        break;
      case "b":
        if (options.switchSearchEngine && !e.shiftKey && e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "searchOnBing";
        }
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
      case "j":
        if (options.scrollInSiteWithJKDU && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "scrollDown";
        }
        break;
      case "k":
        if (options.scrollInSiteWithJKDU && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "scrollUp";
        }
        break;
      case "u":
        if (options.scrollInSiteWithJKDU && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "scrollPageUp";
        }
        break;
      case "d":
        if (options.scrollInSiteWithJKDU && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) {
          keyType = "scrollPageDown";
        }
        break;
    }
    return keyType;
  },
};
