// Globals
var shortcuts = {
    defaultOptions: {
        // Next = J; Previous = K [WARNING: Conflicts with activateSearch. This takes precedence.]
        // navigateWithJK: false
        navigateWithJK: true
    },
    loadOptions: function(callback) {
        chrome.storage.sync.get(this.defaultOptions, callback);
    },
    hasModifierKey: function(e) {
        return e.shiftKey || e.altKey || e.ctrlKey || e.metaKey;
    },

    // focusResult: function(offset) {
    //     var results = this.getVisibleResults();
    //     if (results.length <= 0) {
    //         console.warn('No results found. Extension may need to be updated.');
    //         return;
    //     }
    //     // Shift focusIndex and perform boundary checks
    //     this.focusIndex += offset;
    //     this.focusIndex = Math.min(this.focusIndex, results.length - 1);
    //     this.focusIndex = Math.max(this.focusIndex, 0);
    //     var target = results[this.focusIndex];
    //     // Scroll the entire result container into view if it's not already.
    //     var rect = target.container.getBoundingClientRect();
    //     var offsetY = rect.bottom - window.innerHeight;
    //     if (offsetY > 0) {
    //         window.scrollBy(0, offsetY);
    //     }
    //     target.focusElement.focus();
    //     this.addResultHighlight(target);
    // }

};