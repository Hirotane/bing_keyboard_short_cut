// Globals
var shortcuts = {
    defaultOptions: {
        // Next = J; Previous = K [WARNING: Conflicts with activateSearch. This takes precedence.]
        movePagesWithHL: true,
        movePagesWithArrows: true,
        scrollInSiteWithJKDU: true,
        focusOnInput: true,
        unfocusWithESC: true,
        unfocusWithBracket: true,
        scrollToTopOrBottom: true
    },
    loadOptions: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);
    },
    isInputActive: function () {
        var activeElement = document.activeElement;
        return activeElement.nodeName == 'INPUT' || activeElement.nodeName == 'TEXTAREA' || activeElement.isContentEditable == true;
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
        var searchbox = document.querySelector("input[type='text'], input[type='search']");
        return searchbox;
    },
    changeSearchGoogle: function() {
        var searchWordMap = document.querySelector(".b_searchbox").getAttribute('value');
        var searchWordShop = document.querySelector(".b_searchbox").getAttribute('value');
        var origin = 'https://www.google.com/search?q=';
        var refEng =  '&gl=us&hl=en&pws=0';
        var currRef = window.location.href;
        var isEng = document.querySelector("html").getAttribute('lang') == "en";
        if (isEng) {
            if (currRef.match(/https:\/\/www.bing.com\/maps/)) {
                window.location.href = 'https://www.google.com/maps/search/' + searchWord + '?hl=en';
            }
            else if (currRef.match(/https:\/\/www.bing.com\/shop/)) {
                window.location.href = origin + searchWordShop + '&tbm=shop' + refEng;
            }
        } else {
            if (currRef.match(/https:\/\/www.bing.com\/maps/)) {
                window.location.href = 'https://www.google.com/maps/search/' + searchWord;
            }
            else if (currRef.match(/https:\/\/www.bing.com\/shop/)) {
                window.location.href = origin + searchWordShop + '&tbm=shop';
            }
        }
    }
};
