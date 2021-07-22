// Globals
var shortcuts = {
    defaultOptions: {
        navigateWithJK: true
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
        this.focusIndex += offset;
        this.focusIndex = Math.min(this.focusIndex, results.length - 1);
        this.focusIndex = Math.max(this.focusIndex, 0);
        var target = results[this.focusIndex];
        var target_txt = target.querySelector("h2 > a");
        console.log(target);
        console.log(target_txt);
        target_txt.focus();
    }

};