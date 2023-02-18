// Saves options to chrome.storage
function save_options() {
  var navigateSearchResultsWithJKHL = document.getElementById("navigate-search-results-with-jkhl").checked;
  var navigateSearchResultsWithArrows = document.getElementById("navigate-search-results-with-arrows").checked;
  var movePagesWithHL = document.getElementById("move-pages-with-hl").checked;
  var movePagesWithArrows = document.getElementById("move-pages-with-arrows").checked;
  var scrollInSiteWithJKDU = document.getElementById("scroll-in-site-with-jkdu").checked;
  var selectSearchType = document.getElementById("select-search-type").checked;
  var focusOnInput = document.getElementById("focus-on-input").checked;
  var unfocusWithESC = document.getElementById("unfocus-with-esc").checked;
  var unfocusWithBracket = document.getElementById("unfocus-with-bracket").checked;
  var hideAds = document.getElementById("hide-ads").checked;
  var switchSearchEngine = document.getElementById("switch-search-engine").checked;
  var changeLanguage = document.getElementById("change-language").checked;
  var scrollToTopOrBottom = document.getElementById("scroll-to-top-or-bottom").checked;

  chrome.storage.sync.set(
    {
      navigateSearchResultsWithJKHL: navigateSearchResultsWithJKHL,
      navigateSearchResultsWithArrows: navigateSearchResultsWithArrows,
      movePagesWithHL: movePagesWithHL,
      movePagesWithArrows: movePagesWithArrows,
      scrollInSiteWithJKDU: scrollInSiteWithJKDU,
      selectSearchType: selectSearchType,
      focusOnInput: focusOnInput,
      unfocusWithESC: unfocusWithESC,
      unfocusWithBracket: unfocusWithBracket,
      hideAds: hideAds,
      switchSearchEngine: switchSearchEngine,
      changeLanguage: changeLanguage,
      scrollToTopOrBottom: scrollToTopOrBottom,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
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
      scrollToTopOrBottom: true,
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
      document.getElementById("switch-search-engine").checked = items.switchSearchEngine;
      document.getElementById("change-language").checked = items.changeLanguage;
      document.getElementById("stop-chat-generation").checked = items.stopChatGeneration;
      document.getElementById("scroll-to-top-or-bottom").checked = items.scrollToTopOrBottom;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
