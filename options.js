// Saves options to chrome.storage
function save_options() {
  let navigateSearchResultsWithJKHL = document.getElementById("navigate-search-results-with-jkhl").checked;
  let navigateSearchResultsWithArrows = document.getElementById("navigate-search-results-with-arrows").checked;
  let movePagesWithHL = document.getElementById("move-pages-with-hl").checked;
  let movePagesWithArrows = document.getElementById("move-pages-with-arrows").checked;
  let scrollInSiteWithJKDU = document.getElementById("scroll-in-site-with-jkdu").checked;
  let selectSearchType = document.getElementById("select-search-type").checked;
  let focusOnInputWithSlash = document.getElementById("focus-on-input-with-slash").checked;
  let focusOnInputWithI = document.getElementById("focus-on-input-with-i").checked;
  let unfocusWithESC = document.getElementById("unfocus-with-esc").checked;
  let unfocusWithBracket = document.getElementById("unfocus-with-bracket").checked;
  let hideAds = document.getElementById("hide-ads").checked;
  let switchSearchEngine = document.getElementById("switch-search-engine").checked;
  let changeLanguage = document.getElementById("change-language").checked;
  let stopChatGeneration = document.getElementById("stop-chat-generation").checked;
  let startNewChatTopic = document.getElementById("start-new-chat-topic").checked;
  let scrollToTopOrBottom = document.getElementById("scroll-to-top-or-bottom").checked;
  let disableShortcutsInWebsites = document.getElementById("disable-shortcuts-in-websites").checked;

  chrome.storage.sync.set(
    {
      navigateSearchResultsWithJKHL: navigateSearchResultsWithJKHL,
      navigateSearchResultsWithArrows: navigateSearchResultsWithArrows,
      movePagesWithHL: movePagesWithHL,
      movePagesWithArrows: movePagesWithArrows,
      scrollInSiteWithJKDU: scrollInSiteWithJKDU,
      selectSearchType: selectSearchType,
      focusOnInputWithSlash: focusOnInputWithSlash,
      focusOnInputWithI: focusOnInputWithI,
      unfocusWithESC: unfocusWithESC,
      unfocusWithBracket: unfocusWithBracket,
      hideAds: hideAds,
      switchSearchEngine: switchSearchEngine,
      changeLanguage: changeLanguage,
      stopChatGeneration: stopChatGeneration,
      startNewChatTopic: startNewChatTopic,
      scrollToTopOrBottom: scrollToTopOrBottom,
      disableShortcutsInWebsites: disableShortcutsInWebsites,
    },
    function () {
      // Update status to let user know options were saved.
      let status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
  console.log("option saved");
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value.
  chrome.storage.sync.get(
    {
      navigateSearchResultsWithJKHL: true,
      navigateSearchResultsWithArrows: true,
      movePagesWithHL: true,
      movePagesWithArrows: true,
      scrollInSiteWithJKDU: true,
      selectSearchType: true,
      focusOnInputWithSlash: true,
      focusOnInputWithI: true,
      unfocusWithESC: true,
      unfocusWithBracket: true,
      hideAds: true,
      switchSearchEngine: true,
      changeLanguage: true,
      stopChatGeneration: true,
      startNewChatTopic: true,
      scrollToTopOrBottom: true,
      disableShortcutsInWebsites: false,
    },
    function (items) {
      document.getElementById("navigate-search-results-with-jkhl").checked = items.navigateSearchResultsWithJKHL;
      document.getElementById("navigate-search-results-with-arrows").checked = items.navigateSearchResultsWithArrows;
      document.getElementById("move-pages-with-hl").checked = items.movePagesWithHL;
      document.getElementById("move-pages-with-arrows").checked = items.movePagesWithArrows;
      document.getElementById("scroll-in-site-with-jkdu").checked = items.scrollInSiteWithJKDU;
      document.getElementById("select-search-type").checked = items.selectSearchType;
      document.getElementById("focus-on-input-with-slash").checked = items.focusOnInputWithSlash;
      document.getElementById("focus-on-input-with-i").checked = items.focusOnInputWithI;
      document.getElementById("unfocus-with-esc").checked = items.unfocusWithESC;
      document.getElementById("unfocus-with-bracket").checked = items.unfocusWithBracket;
      document.getElementById("hide-ads").checked = items.hideAds;
      document.getElementById("switch-search-engine").checked = items.switchSearchEngine;
      document.getElementById("change-language").checked = items.changeLanguage;
      document.getElementById("stop-chat-generation").checked = items.stopChatGeneration;
      document.getElementById("start-new-chat-topic").checked = items.startNewChatTopic;
      document.getElementById("scroll-to-top-or-bottom").checked = items.scrollToTopOrBottom;
      document.getElementById("disable-shortcuts-in-websites").checked = items.disableShortcutsInWebsites;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
