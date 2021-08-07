// Globals
var shortcuts = {
    defaultOptions: {
        // Next = J; Previous = K [WARNING: Conflicts with activateSearch. This takes precedence.]
        navigateSearchResultsWithJKHL: true,
        navigateSearchResultsWithArrows: true,
        movePagesWithHL: true,
        movePagesWithArrows: true,
        selectSearchType: true,
        focusOnInput: true,
        unfocusWithESC: true,
        unfocusWithBracket: true
    },
    loadOptions: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);
        console.log("navigation type: "+window.performance.getEntriesByType('navigation')[0].type)
        var entry = window.performance.getEntriesByType('navigation')[0].type;
        var focusIndex = sessionStorage.getItem('focusIndex');
        var ref = window.location.href;
        var lastQueryUrl = sessionStorage.getItem('lastQueryUrl');
        console.log("last url: "+lastQueryUrl);
        var results = this.getVisibleResults();
        var focusIndex = sessionStorage.getItem('focusIndex');

        var reg_str = '^https://www.bing.com/search/*|/search/*';
        var reg_exp = new RegExp(reg_str);
        var isFromBing = lastQueryUrl.match(reg_exp);
        console.log("isFromBing: "+isFromBing);
        if (isFromBing || focusIndex == null) {
            focusIndex = 0;
            sessionStorage.setItem('focusIndex', focusIndex);
        }

        var isOnBing = ref.match(reg_exp);
        console.log("isOnBing: "+isOnBing);
        var firstVisitToBing = sessionStorage.getItem('firstVisitToBing');
        console.log("firstVisitToBing", firstVisitToBing);
        console.log(entry=='back_forward' && !firstVisitToBing);
        if (entry=='back_forward' && isOnBing && !firstVisitToBing) {
            var firstVisitToBing = true;
            console.log("firstVisitToBing: true")
            sessionStorage.setItem('firstVisitToBing', firstVisitToBing)
        } else if (entry=='back_forward' && isOnBing && firstVisitToBing){
            firstVisitToBing = false;
            console.log("firstVisitToBing: false")
            sessionStorage.setItem('firstVisitToBing', firstVisitToBing)
            focusIndex = 0;
            sessionStorage.setItem('focusIndex', focusIndex);
        } else {
            firstVisitToBing = true;
            sessionStorage.setItem('firstVisitToBing', firstVisitToBing)
            focusIndex = 0;
            sessionStorage.setItem('focusIndex', focusIndex);
            console.log("other");
        }
        console.log(focusIndex);
        var target = results[focusIndex];
        target.focus();
        this.underLine(target);
    },
    isInputActive: function () {
        var activeElement = document.activeElement;
        return activeElement.nodeName == 'INPUT';
    },
    getVisibleResults: function() {
        var containers = Array.from(document.querySelectorAll(".b_algo > .b_title > h2 > a, .b_rs > ul > li > a, .b_ads1line, .btitle > h2 > a, .b_algo > h2 > a, #nws_ht > h2 > a, .irphead > h2 > a"));
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
        var focusIndex = Number(sessionStorage.getItem('focusIndex')) + offset;
        console.log("focusIndex-storage: "+sessionStorage.getItem('focusIndex'));
        // console.log("offset: "+offset)
        focusIndex = Math.min(focusIndex, results.length - 1);
        focusIndex = Math.max(focusIndex, 0);
        console.log("focusIndex-edit: "+focusIndex);
        sessionStorage.setItem('focusIndex', focusIndex);
        var target = results[focusIndex];
        sessionStorage.setItem('lastQueryUrl', target);

        if (offset == 1){
            var rect = target.closest('li').getBoundingClientRect();
            var offsetY = rect.bottom - window.innerHeight;
            if (offsetY > 0) {
                window.scrollBy(0, offsetY+300);
            }
        }
        else {
            var rect = target.getBoundingClientRect();
            var offsetY = rect.top + 300;
            if (focusIndex != 0) {
            window.scrollBy(0, offsetY+300);
            }
        }

        target.focus();
        this.underLine(target);
    },
    moveSearchPage: function(offset) {
        if (offset == 1){
            var nextpage = document.querySelector(".sb_pagN").getAttribute('href');
            sessionStorage.setItem('lastQueryUrl', nextpage);
            window.location.href = nextpage;
        } else {
            var previouspage = document.querySelector(".sb_pagP").getAttribute('href');
            sessionStorage.setItem('lastQueryUrl', previouspage);
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