// Globals
var shortcuts = {
    defaultOptions: {
        // Next = J; Previous = K [WARNING: Conflicts with activateSearch. This takes precedence.]
        movePagesWithHL: true,
        movePagesWithArrows: true,
        scrollInSiteWithJKDU: true
    },
    loadOptions: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);
    },
    isInputActive: function () {
        var activeElement = document.activeElement;
        return activeElement.nodeName == 'INPUT' || activeElement.nodeName == 'TEXTAREA' || activeElement.isContentEditable == true;
    },
    getVisibleResults: function() {
        var containers = Array.from(document.querySelectorAll(".b_algo > .b_title > h2 > a, .b_rs > ul > li > a, .b_ads1line, .btitle > h2 > a"));
        return containers;
    },
    movePage: function(offset) {
        if (offset == 1){
            console.log("forward");
            window.history.forward();
        } else {
            window.history.back();
            
            console.log("back");
        }
    },
    scrollPageOneLine: function(offset) {
        if (offset == 1){
            window.scrollBy(0, -50)
        } else {
            window.scrollBy(0, 50)
        }
    },
    scrollHalfPage: function(offset) {
        if (offset == 1){
            window.scrollBy(0, -0.5*window.innerHeight)
        } else {
            window.scrollBy(0, 0.5*window.innerHeight)
        }
    },
    focusOnSearchBox: function() {
        var searchbox = document.querySelector("input[type='text']");
        searchbox.focus();
    }
};
