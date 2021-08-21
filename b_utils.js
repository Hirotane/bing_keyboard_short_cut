// Globals
var shortcuts = {
    defaultOptions: {
        navigateSearchResultsWithJKHL: true,
        navigateSearchResultsWithArrows: true,
        movePagesWithHL: true,
        movePagesWithArrows: true,
        selectSearchType: true,
        focusOnInput: true,
        unfocusWithESC: true,
        unfocusWithBracket: true
    },
    searchType: "all",
    all_selector: ".b_topTitle > a, .b_rs > ul > li > a, .b_ads1line, .btitle > h2 > a, .b_algo > h2 > a, #nws_ht > h2 > a, .irphead > h2 > a",
    work_selector: ".ms-search-result-list-item-border > div > div > a, .ac-textBlock > p > a, .ms-search-bookmarkTitle",
    initAll: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);

        this.searchType = "all";
        // console.log("this.searchType: "+this.searchType);
        // back to the position in focus when returnd to search page from web-sites
        var focusIndex = sessionStorage.getItem('focusIndex');
        // set the focus index to 0 when transition of search pages is occured or page is reloaded
        if (window.location.href != sessionStorage.getItem('lastQueryUrl') ||
            window.performance.getEntriesByType('navigation')[0].type == 'reload') {
            focusIndex = 0;
            sessionStorage.setItem('focusIndex', focusIndex);
        }
        var results = this.getVisibleResults(this.all_selector);
        var target = results[focusIndex];
        target.focus({preventScroll:true});
        this.underLine(target);
        scrollTo(0, 0);
        this.grayoutAdds();
    },
    initWork: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);
        

        if (window.location.href != sessionStorage.getItem('lastQueryUrl') ||
            window.performance.getEntriesByType('navigation')[0].type == 'reload') {
            focusIndex = 0;
            sessionStorage.setItem('focusIndex', focusIndex);
        }
        // var results = this.getVisibleResults(this.work_selector);
        // console.log(this.work_selector);
        // console.log(results);
        // var target = results[focusIndex];
        // console.log(target);
        // target.focus();
        // this.underLine(target);
        // scrollTo(0, 0);
    },
    initImage: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);

        this.searchType = "image";
        // console.log("this.searchType: "+this.searchType);
        this.focusIndexImgVtcl = this.focusIndexImgHrzn = 0;
        var target = this.getImageRowResults(0)[0];
        target.focus({preventScroll:true});
        this.emphasizeFocus(target);
    },
    isInputActive: function () {
        var activeElement = document.activeElement;
        return activeElement.nodeName == 'INPUT';
    },
    defineRangeOfIndex: function(index, length){
        index = Math.min(index, length - 1);
        index = Math.max(index, 0);
        return index;
    },
    scrollSearchResults: function(target, offset) {
        if (this.searchType == 'image') {
            var miniHeaderHeight = 1.1 * target.closest('#b_content').querySelector('#miniheader').offsetHeight;
        } else {
            var miniHeaderHeight = 0;
        }
        if (offset == 1){
            var relativePositionTop = target.getBoundingClientRect().top; 
            var windowTopWidth = window.innerHeight*2/3;
            var scroll_width = relativePositionTop - windowTopWidth;
            if (scroll_width > 0) {
                window.scrollBy({
                    top: scroll_width,
                    left: 0
                });
            }
        }
        else {
            var relativePositionTop = target.getBoundingClientRect().top; 
            var windowTopWidth = window.innerHeight*1/4;
            var scroll_width = windowTopWidth - relativePositionTop;
            if (scroll_width > 0) {
                window.scrollBy({
                    top: -scroll_width,
                    left: 0
                });
            }
        }
    },
    getVisibleResults: function(selector) {
        var containers = Array.from(document.querySelectorAll(selector));
        return containers;
    },
    underLine: function(target_txt) {
        target_txt.style.outline = 'none';
        target_txt.style.textDecoration = 'underline';
        target_txt.addEventListener('blur', (event) => {
            event.target.style.textDecoration = '';
        });
    },
    emphasizeFocus: function(elt) {
        elt.style.outlineWidth = 'medium';
        elt.style.outlineColor = '#1e90ff';
    },
    grayoutAdds: function() {
        var adds = Array.from(document.querySelectorAll(".sb_add")); 
        var txtColor = "#aaa";
        for (let i = 0; i < adds.length; i++) {
            var addsA = adds[i].querySelectorAll("a");
            var addsCite = adds[i].querySelectorAll("cite");
            var addsDiv = adds[i].querySelectorAll("div");
            var addsStrong = adds[i].querySelectorAll("strong");
            for (let j = 0; j < addsA.length; j++){
                addsA[j].style.color = txtColor;
            }
            for (let j = 0; j < addsCite.length; j++){
                addsCite[j].style.color = txtColor;
            }
            for (let j = 0; j < addsDiv.length; j++){
                addsDiv[j].style.color = txtColor;
            }
            for (let j = 0; j < addsStrong.length; j++){
                addsStrong[j].style.color = txtColor;
            }
        }
    },
    notKeyPress: function(){
        return Number(sessionStorage.getItem('keypress'))==0;
    },
    focusResult: function(offset, selector) {
        var results = this.getVisibleResults(selector);
        var storageFocusIndex = Number(sessionStorage.getItem('focusIndex'));
        // console.log(results);
        // console.log(results[storageFocusIndex]);
        var focusElemTop = results[storageFocusIndex].closest('li').getBoundingClientRect().top;
        if (storageFocusIndex==0 && offset==-1 && this.notKeyPress()){
            window.scroll({top: 0, behavior: 'smooth'});
            sessionStorage.setItem('keypress', 1);
            return;
        }
        else if ((window.innerHeight < focusElemTop) && this.notKeyPress() && offset==1){
            window.scroll({top: focusElemTop, behavior: 'smooth'});
            sessionStorage.setItem('keypress', 1);
            offset = 0;
        }

        var focusIndex = this.defineRangeOfIndex(storageFocusIndex + offset, results.length);
        sessionStorage.setItem('focusIndex', focusIndex);
        var ref = window.location.href;
        sessionStorage.setItem('lastQueryUrl', ref);
        var target = results[focusIndex];

        this.scrollSearchResults(target, offset);
        target.focus({preventScroll:true});
        this.underLine(target);
    },
    getImageRowResults: function(row) {
        var containers = Array.from(document.querySelectorAll(`#mmComponent_images_2 > [data-row="${row}"] > li > .iuscp > .imgpt > a`));
        return containers;
    },
    getImageColumnResults: function(col) {
        var containers = Array.from(document.querySelectorAll(`#mmComponent_images_2 > ul li:nth-child(${col}) > .iuscp > .imgpt > a`));
        return containers;
    },
    focusIndexImgvtcl: 0, // index of row to move to designated line 
    nextIndexImgHrzn: 0, // index of row to get the collection of row in the next step
    verticalImageMove: function(offset) {
        var results = this.getImageColumnResults(this.nextIndexImgVtcl+1);
        var focusIndex = this.defineRangeOfIndex(this.focusIndexImgVtcl+offset, results.length);
        this.focusIndexImgVtcl = focusIndex;
        var target = results[focusIndex];
        this.nextIndexImgHrzn= Number(target.closest(".dgControl_list").getAttribute("data-row"))
        this.scrollSearchResults(target, offset);
        target.focus();
        this.emphasizeFocus(target);
    },
    focusIndexImgHrzn: 0,  // index of column to move to designated line
    nextIndexImgVtcl: 0, // index of column to get the collection of column in the next step
    horizontalImageMove: function(offset) {
        var results = this.getImageRowResults(this.nextIndexImgHrzn);
        var focusIndex = this.defineRangeOfIndex(this.focusIndexImgHrzn + offset, results.length);
        this.focusIndexImgHrzn = focusIndex;
        var target = results[focusIndex];
        var imageRows = Array.from(target.closest(".dgControl_list").childNodes);
        this.nextIndexImgVtcl = imageRows.findIndex(list => list.contains(target));
        target.focus();
        this.emphasizeFocus(target);
    },
    moveAllSearchPage: function(offset) {
        if (offset == 1){
            var nextpage = document.querySelector(".sb_pagN").getAttribute('href');
            window.location.href = nextpage;
        } else {
            var previouspage = document.querySelector(".sb_pagP").getAttribute('href');
            window.location.href = previouspage;
        }
    },
    moveWorkSearchPage: function(offset) {
        if (offset == 1){
            var nextpage = document.querySelector(".ms-TooltipHost > [data-icon-name='chevronright']");
            nextpage.click();
        } else {
            var previouspage = document.querySelector(".ms-TooltipHost > [data-icon-name='chevronleft']");
            previouspage.click();
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