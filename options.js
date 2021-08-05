// Saves options to chrome.storage
function save_options() {
    var navigateSearchResultsWithJKHL = document.getElementById('navigate-search-results-with-jkhl').checked;
    var navigateSearchResultsWithArrows = document.getElementById('navigate-search-results-with-arrows').checked;
    var movePagesWithHL = document.getElementById('move-pages-with-hl').checked;
    var movePagesWithArrows = document.getElementById('move-pages-with-arrows').checked;
    var scrollInSiteWithJKDU = document.getElementById('scroll-in-site-with-jkdu').checked;
    var selectSearchType = document.getElementById('select-search-type').checked;
    var focusOnInput = document.getElementById('focus-on-input').checked;
    var unfocusWithESC = document.getElementById('unfocus-with-esc').checked;
    var unfocusWithBracket = document.getElementById('unfocus-with-bracket').checked;
    
    chrome.storage.sync.set({
        navigateSearchResultsWithJKHL: navigateSearchResultsWithJKHL,
        navigateSearchResultsWithArrows: navigateSearchResultsWithArrows, 
        movePagesWithHL: movePagesWithHL,
        movePagesWithArrows: movePagesWithArrows,
        scrollInSiteWithJKDU: scrollInSiteWithJKDU,
        selectSearchType: selectSearchType,
        focusOnInput: focusOnInput,
        unfocusWithESC: unfocusWithESC,
        unfocusWithBracket: unfocusWithBracket
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
    console.log("option saved");
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value.
    chrome.storage.sync.get({
        navigateSearchResultsWithJKHL: true,
        navigateSearchResultsWithArrows: true,
        movePagesWithHL: true,
        movePagesWithArrows: true,
        scrollInSiteWithJKDU: true,
        selectSearchType: true,
        focusOnInput: true,
        unfocusWithESC: true,
        unfocusWithBracket: true
    }, function (items) {
        document.getElementById('navigate-search-results-with-jkhl').checked = items.navigateSearchResultsWithJKHL;
        document.getElementById('navigate-search-results-with-arrows').checked = items.navigateSearchResultsWithArrows;
        document.getElementById('move-pages-with-hl').checked = items.movePagesWithHL;
        document.getElementById('move-pages-with-arrows').checked = items.movePagesWithArrows;
        document.getElementById('scroll-in-site-with-jkdu').checked = items.scrollInSiteWithJKDU;
        document.getElementById('select-search-type').checked = items.selectSearchType;
        document.getElementById('focus-on-input').checked = items.focusOnInput;
        document.getElementById('unfocus-with-esc').checked = items.unfocusWithESC;
        document.getElementById('unfocus-with-bracket').checked = items.unfocusWithBracket;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);