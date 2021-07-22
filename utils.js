// Globals
var shortcuts = {
    defaultOptions: {
        // Next = J; Previous = K [WARNING: Conflicts with activateSearch. This takes precedence.]
        // navigateWithJK: false
        navigateWithJK: true,
        navigateWithHL: true
    },
    focusIndex: -1,

    loadOptions: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);
    },
    getVisibleResults: function() {
        var containers = Array.from(document.querySelectorAll(".b_algo"));
        return containers;
    },
    focusResult: function(offset) {
        var results = this.getVisibleResults();
        // console.log(results);
        this.focusIndex += offset;
        this.focusIndex = Math.min(this.focusIndex, results.length - 1);
        this.focusIndex = Math.max(this.focusIndex, 0);
        var target = results[this.focusIndex];
        var target_txt = target.querySelector("h2 > a");
        // var r = this.focusIndex + 1 + "/" + results.length + " ▶";
        console.log(target);
        console.log(target_txt.innerHTML);
        return target_txt.style.backgroundColor = 'red'
    },
    movePage: function(offset) {
        if (offset == 1){
            var nextpage = document.querySelector(".sb_pagN").getAttribute('href');
            window.location.href = nextpage;
        } else {
            var previouspage = document.querySelector(".sb_pagP").getAttribute('href');
            window.location.href = previouspage;
        }
    }

};