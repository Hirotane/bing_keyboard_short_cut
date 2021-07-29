// Globals
var shortcuts = {
    defaultOptions: {
        // Next = J; Previous = K [WARNING: Conflicts with activateSearch. This takes precedence.]
        // navigateWithJK: false
        navigateWithJKHL: true,
        navigateWithShiftHL: true,
        navigateWithArrows: true,
        navigateWithShiftArrows: true,
        searchType: true
    },
    focusIndex: -1,

    loadOptions: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);
    },
    isInputActive: function () {
        var activeElement = document.activeElement;
        return activeElement.nodeName == 'INPUT';
    },
    getVisibleResults: function() {
        var containers = Array.from(document.querySelectorAll(".b_algo > .b_title > h2 > a, .b_rs > ul > li > a, .b_ads1line"));
        return containers;
    },
    underLine: function(target_txt) {
        target_txt.style.outline = 'none';
        target_txt.style.textDecoration = 'underline';
        target_txt.addEventListener('blur', (event) => {
            event.target.style.textDecoration = '';
        });
    },
    focusResult: function(offset) {
        var results = this.getVisibleResults();
        this.focusIndex += offset;
        this.focusIndex = Math.min(this.focusIndex, results.length - 1);
        this.focusIndex = Math.max(this.focusIndex, 0);
        var target = results[this.focusIndex];
        console.log(target);
        console.log(target.style);
        target.focus();
        this.underLine(target);
    },
    moveSearchPage: function(offset) {
        if (offset == 1){
            var nextpage = document.querySelector(".sb_pagN").getAttribute('href');
            window.location.href = nextpage;
        } else {
            var previouspage = document.querySelector(".sb_pagP").getAttribute('href');
            window.location.href = previouspage;
        }
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
        console.log(offset);
        if (offset == 1){
            window.scrollBy(0, -50)
        } else {
            window.scrollBy(0, 50)
        }
    },
    scrollHalfPage: function(offset) {
        console.log(offset);
        if (offset == 1){
            window.scrollBy(0, -0.5*window.innerHeight)
        } else {
            window.scrollBy(0, 0.5*window.innerHeight)
        }
    },
    changeSearchType: function(type) {
        switch (type){
            case 'all':
                var ref = document.querySelector("#b-scopeListItem-web").firstElementChild.getAttribute('href');
                window.location.href = ref;
                break;
            case 'work':
                var ref = document.querySelector("#b-scopeListItem-bingatwork").firstElementChild.getAttribute('href');
                window.location.href = ref;
                break;
            case 'image':
                var ref = document.querySelector("#b-scopeListItem-images").firstElementChild.getAttribute('href');
                window.location.href = ref;
                break;
            case 'video':
                var ref = document.querySelector("#b-scopeListItem-video").firstElementChild.getAttribute('href');
                window.location.href = ref;
                break;
            case 'map':
                var ref = document.querySelector("#b-scopeListItem-local").firstElementChild.getAttribute('href');
                window.location.href = ref;
                break;
            case 'news':
                var ref = document.querySelector("#b-scopeListItem-news").firstElementChild.getAttribute('href');
                window.location.href = ref;
                break;
            case 'shop':
                var ref = document.querySelector("#b-scopeListItem-shop").firstElementChild.getAttribute('href');
                window.location.href = ref;
                break;
        }
    },
    focusOnSearchBox: function() {
        var searchbox = document.querySelector("#search-input, #textfield");
        searchbox.focus();
    }
};