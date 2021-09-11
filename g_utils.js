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
        unfocusWithBracket: true,
        hideAds: true
    },
    searchType: "all",
    // all_selector: ".b_algo h2 > a, .b_rs > ul > li > a, .b_ads1line, .btitle > h2 > a, #nws_ht > h2 > a, .irphead > h2 > a",
    all_selector: "#search [data-hveid] a > h3, [data-hveid] a > div[role='heading'], [data-abe] [data-hveid] a > div:last-child",
    all_title_selector: "h3, div[role='heading'], div:last-child",
    image_selector: "[data-ri] > [data-nav]",
    news_selector: "#search [data-hveid] a > h3",
    initAll: function(callback) {
        console.log("initAll");
        chrome.storage.sync.get(this.defaultOptions, callback);
        chrome.storage.sync.get(this.defaultOptions, function(options) {
            if (options.hideAds) {
                shortcuts.grayoutAds();
            }
        });

        this.searchType = "all";
        // back to the position in focus when returnd to search page from web-sites
        var focusIndex = sessionStorage.getItem('focusIndex');
        // set the focus index to 0 when transition of search pages is occured or page is reloaded
        if (window.location.href != sessionStorage.getItem('lastQueryUrl') ||
            window.performance.getEntriesByType('navigation')[0].type == 'reload') {
            focusIndex = 0;
            sessionStorage.setItem('focusIndex', focusIndex);
        }
        this.isInputActive()
        var results = this.getVisibleResults(this.all_selector);
        var target = results[focusIndex];
        target.parentElement.focus();
        this.underLine(target);
        scrollTo(0, 0);
    },
    initWork: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);

        if (window.location.href != sessionStorage.getItem('lastQueryUrl') ||
            window.performance.getEntriesByType('navigation')[0].type == 'reload') {
            focusIndex = 0;
            sessionStorage.setItem('focusIndex', focusIndex);
        }
    },
    initImage: function(callback) {
        console.log("initImage");
        chrome.storage.sync.get(this.defaultOptions, callback);

        this.searchType = "image";
        var target = this.navigateImage(0, this.image_selector);
        target.focus({preventScroll:true});
        this.emphasizeFocus(target);
    },
    initVideo: function(callback) {
        console.log("initVideo");
        chrome.storage.sync.get(this.defaultOptions, callback);

        this.searchType = "video";
        var focusIndex = sessionStorage.getItem('focusIndex');
        // set the focus index to 0 when transition of search pages is occured or page is reloaded
        if (window.location.href != sessionStorage.getItem('lastQueryUrl') ||
            window.performance.getEntriesByType('navigation')[0].type == 'reload') {
            focusIndex = 0;
            sessionStorage.setItem('focusIndex', focusIndex);
        }
        var results = this.getVisibleResults(this.all_selector);
        var target = results[focusIndex];
        target.parentElement.focus();
        this.underLine(target);
    },
    initNews: function(callback) {
        console.log("initNews");
        chrome.storage.sync.get(this.defaultOptions, callback);

        if (window.performance.getEntriesByType('navigation')[0].type == 'reload') {
            focusIndex = 0;
            sessionStorage.setItem('focusIndex', focusIndex);
        }
        var results = this.getVisibleResults(this.news_selector);
        var target = results[0];
        target.focus();
        this.underLine(target);
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
        // console.log(target_txt);
        target_txt.style.outline = 'none';
        target_txt.style.textDecoration = 'underline';
        // console.log(target_txt);
        target_txt.parentElement.addEventListener('blur', (event) => {
            // console.log("blured");
            event.target.querySelector(this.all_title_selector).style.textDecoration = '';
        });
    },
    emphasizeFocus: function(elt) {
        elt.style.outlineWidth = 'medium';
        elt.style.outlineColor = '#1e90ff';
        elt.style.zIndex= 10;
    },
    emphasizeVideoFocus: function(elt) {
	    elt.style.border = "solid"; 
        elt.style.borderWidth = "medium"; 
        elt.style.borderColor = '#1e90ff';
        elt.addEventListener('blur', (event) => {
            event.target.style.border = 'none';
            event.target.style.borderWidth= '';
            event.target.style.borderColor= '';
            console.log("blur")
        });
    },
    grayoutAds: function() {
        var ads = Array.from(document.querySelectorAll("#bottomads, #tads")); 
        var txtColor = "#aaa";
        for (let i = 0; i < ads.length; i++) {
            var adsSpan = ads[i].querySelectorAll("span");
            var adsA = ads[i].querySelectorAll("a");
            var adsCite = ads[i].querySelectorAll("cite");
            var adsDiv = ads[i].querySelectorAll("div");
            var adsStrong = ads[i].querySelectorAll("strong");
            for (let j = 0; j < adsSpan.length; j++){
                adsSpan[j].style.color = txtColor;
            }
            for (let j = 0; j < adsA.length; j++){
                adsA[j].style.color = txtColor;
            }
            for (let j = 0; j < adsCite.length; j++){
                adsCite[j].style.color = txtColor;
            }
            for (let j = 0; j < adsDiv.length; j++){
                adsDiv[j].style.color = txtColor;
            }
            for (let j = 0; j < adsStrong.length; j++){
                adsStrong[j].style.color = txtColor;
            }
        }
    },
    notKeyPress: function(){
        return Number(sessionStorage.getItem('keypress'))==0;
    },
    focusResult: function(offset, selector) {
        var results = this.getVisibleResults(selector);
        var storageFocusIndex = Number(sessionStorage.getItem('focusIndex'));
        var focusElemTop = results[storageFocusIndex].getBoundingClientRect().top;
        var absolutePositionTop = focusElemTop + window.pageYOffset;
        if (storageFocusIndex==0 && offset==-1 && this.notKeyPress()){
            window.scroll({top: 0, behavior: 'smooth'});
            sessionStorage.setItem('keypress', 1);
            return;
        }
        else if (storageFocusIndex==results.length-1 && offset==1 && this.notKeyPress()){
            var elm = document.documentElement;
            var bottom = elm.scrollHeight - elm.clientHeight;
            window.scroll({top: bottom, behavior: 'smooth'});
            sessionStorage.setItem('keypress', 1);
            return;
        }
        else if (((focusElemTop < 0) || (focusElemTop > window.innerHeight)) && this.notKeyPress()){
            window.scroll({top: absolutePositionTop - window.innerHeight*1/4, behavior: 'smooth'});
            sessionStorage.setItem('keypress', 1);
            offset = 0;
            return;
        }

        var focusIndex = this.defineRangeOfIndex(storageFocusIndex + offset, results.length);
        sessionStorage.setItem('focusIndex', focusIndex);
        var ref = window.location.href;
        sessionStorage.setItem('lastQueryUrl', ref);
        var target = results[focusIndex];
        this.scrollSearchResults(target, offset);
        target.parentElement.focus({preventScroll:true});
        this.underLine(target);
    },
    navigateImage: function(offset, selector) {
        var results = this.getVisibleResults(selector);
        var storageFocusIndex = Number(sessionStorage.getItem('focusIndex'));
        var focusElemTop = results[storageFocusIndex].getBoundingClientRect().top;
        var absolutePositionTop = focusElemTop + window.pageYOffset;
        if (storageFocusIndex==0 && offset==-1 && this.notKeyPress()){
            window.scroll({top: 0, behavior: 'smooth'});
            sessionStorage.setItem('keypress', 1);
            return;
        }
        else if (storageFocusIndex==results.length-1 && offset==1 && this.notKeyPress()){
            var elm = document.documentElement;
            var bottom = elm.scrollHeight - elm.clientHeight;
            window.scroll({top: bottom, behavior: 'smooth'});
            sessionStorage.setItem('keypress', 1);
            return;
        }
        else if (((focusElemTop < 0) || (focusElemTop > window.innerHeight)) && this.notKeyPress()){
            window.scroll({top: absolutePositionTop - window.innerHeight*1/4, behavior: 'smooth'});
            sessionStorage.setItem('keypress', 1);
            offset = 0;
            return;
        }

        var focusIndex = this.defineRangeOfIndex(storageFocusIndex + offset, results.length);
        sessionStorage.setItem('focusIndex', focusIndex);
        var target = results[focusIndex];
        this.scrollSearchResults(target, offset);
        target.focus({preventScroll:true});
        this.emphasizeFocus(target.parentElement);

    },
    moveAllSearchPage: function(offset) {
        if (offset == 1){
            var nextpage = document.querySelector("#pnnext");
            window.location.href = nextpage;
        } else {
            var previouspage = document.querySelector("#pnprev");
            window.location.href = previouspage;
        }
    },
    moveWorkSearchPage: function(offset) {
        if (offset == 1){
            var nextpage = document.querySelector(".ms-TooltipHost > [data-icon-name='chevronright']");
            nextpage.click();
            sessionStorage.setItem('focusIndex', 0);
        } else {
            var previouspage = document.querySelector(".ms-TooltipHost > [data-icon-name='chevronleft']");
            previouspage.click();
            sessionStorage.setItem('focusIndex', 0);
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
                var ref = document.querySelector( 'a[href*="/search?q="]:not([href*="&tbm="]):not([href*="maps.google."])');
                window.location.href = ref;
                break;
            case 'image':
                var ref = document.querySelector('a[href*="&tbm=isch"]');
                window.location.href = ref;
                break;
            case 'video':
                var ref = document.querySelector('a[href*="&tbm=vid"]');
                window.location.href = ref;
                break;
            case 'map':
                var ref = document.querySelector('a[href*="maps.google."]');
                window.location.href = ref;
                break;
            case 'news':
                var ref = document.querySelector('a[href*="&tbm=nws"]');
                window.location.href = ref;
                break;
            case 'shop':
                var ref = document.querySelector('a[href*="&tbm=shop"]');
                window.location.href = ref;
                break;
            case 'finance':
                var ref = document.querySelector('a[href*="&tbm=fin"]');
                window.location.href = ref;
                break;
        }
    },
    changeSearchEdge: function() {
        var searchWrod = document.querySelector('input[role="combobox"]').getAttribute('value');
        var refLocal =  'https://www.bing.com/search?q=' + searchWrod;
        var refEng =  'https://www.bing.com/search?q=' + searchWrod + '&cc=us&setlang=en';
        var isEng = document.querySelector("html").getAttribute('lang') == "en";
        if (isEng) {
            window.location.href = refEng;
        } else {
            window.location.href = refLocal;
        }
         window.location.href = ref;
    },
    changeLang: function(language) {
        var searchWrod = document.querySelector('input[role="combobox"]').getAttribute('value');
        switch (language){
            case 'english':
                var ref = 'https://www.google.com/search?q=' + searchWrod + '&gl=us&hl=en&pws=0';
                window.location.href = ref;
                break;
            case 'native':
                var ref = 'https://www.google.com/search?q=' + searchWrod;
                window.location.href = ref;
                break;
        }
    },
}