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
        scrollToTopOrBottom: true,
        switchSearchEngine: true,
        changeLanguage: true
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
        var origin = 'https://www.google.com/search?q=';
        var refEng =  '&gl=us&hl=en&pws=0';
        var currRef = window.location.href;
        var isEng = document.querySelector("html").getAttribute('lang') == "en";
        if (isEng) {
            if (currRef.match(/https:\/\/www.bing.com\/maps/)) {
                var searchWord = document.querySelector(".title > h2").textContent;
                window.location.href = 'https://www.google.com/maps/search/' + searchWord + '?hl=en';
            }
            else if (currRef.match(/https:\/\/www.bing.com\/shop/)) {
                var searchWord = document.querySelector(".b_searchbox").getAttribute('value');
                window.location.href = origin + searchWord + '&tbm=shop' + refEng;
            }
        } else {
            if (currRef.match(/https:\/\/www.bing.com\/maps/)) {
                var searchWord = document.querySelector(".title > h2").textContent;
                window.location.href = 'https://www.google.com/maps/search/' + searchWord;
            }
            else if (currRef.match(/https:\/\/www.bing.com\/shop/)) {
                var searchWord = document.querySelector(".b_searchbox").getAttribute('value');
                window.location.href = origin + searchWord + '&tbm=shop';
            }
        }
    },
    changeSearchEdge: function() {
        var searchWord = document.getElementById('searchboxinput').getAttribute('value');
        var origin = 'https://www.bing.com';
        var searchQ = '/search?q=';
        var refEng =  '&cc=us&setlang=en';
        var isEng = document.querySelector("html").getAttribute('lang') == "en";
        var currRef = window.location.href;
        if (isEng & currRef.match(/https:\/\/www.google.com\/maps/)) {
            window.location.href = origin + '/maps' + searchQ + searchWord + refEng;
        } else if (currRef.match(/https:\/\/www.google.com\/maps/)) {
            window.location.href = origin + '/maps' + searchQ + searchWord;
        }
    }
};
