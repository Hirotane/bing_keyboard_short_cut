// Globals
var shortcuts = {
    defaultOptions: {
        // Next = J; Previous = K [WARNING: Conflicts with activateSearch. This takes precedence.]
        navigateSearchResultsWithJKHL: true,
        navigateSearchResultsWithArrows: true,
        movePagesWithHL: true,
        movePagesWithArrows: true,
        selectSearchType: true
    },
    loadOptions: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);
        var ref = document.referrer;
        if (sessionStorage.getItem('focusIndex') == null || ref.indexOf( "https://www.bing.com" ) != -1){
            sessionStorage.setItem('focusIndex', 0);
        }
        var results = this.getVisibleResults();
        var target = results[sessionStorage.getItem('focusIndex')];
        target.focus();
        this.underLine(target);
    },
    isInputActive: function () {
        var activeElement = document.activeElement;
        return activeElement.nodeName == 'INPUT';
    },
    getVisibleResults: function() {
        var containers = Array.from(document.querySelectorAll(".b_algo > .b_title > h2 > a, .b_rs > ul > li > a, .b_ads1line, .btitle > h2 > a"));
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
        var ref = document.referrer;
        // console.log(ref);
        var results = this.getVisibleResults();
        var focusIndex = Number(sessionStorage.getItem('focusIndex')) + offset;
        focusIndex = Math.min(focusIndex, results.length - 1);
        focusIndex = Math.max(focusIndex, 0);
        sessionStorage.setItem('focusIndex', focusIndex);
        var target = results[focusIndex];
        // console.log(target);
        // console.log(target.style);
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
            window.history.forward();
        } else {
            window.history.back();
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
    }
};