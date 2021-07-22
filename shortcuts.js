(function() {
    'use strict';

    // Globals
    var KEYS = {
        J: 74,
        K: 75,
        H: 72,
        L: 76,
        SLASH:191,
    };

    var searchbox = document.querySelector(".b_searchbox");

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
            console.log(shortcuts.isInputActive());
 
            var shouldNavigateNext = options.navigateWithJK && e.keyCode == KEYS.J && !shortcuts.isInputActive(),
                shouldNavigateBack = options.navigateWithJK && e.keyCode == KEYS.K && !shortcuts.isInputActive(),
                shouldNavigateBackPage = options.navigateWithHL && e.keyCode == KEYS.H && !shortcuts.isInputActive(),
                shouldNavigateNextPage = options.navigateWithHL && e.keyCode == KEYS.L && !shortcuts.isInputActive();
            
            if (shouldNavigateNext || shouldNavigateBack) {
                console.log(e.keyCode);
                e.preventDefault();
                e.stopPropagation();
                shortcuts.focusResult(shouldNavigateNext ? 1 : -1);
            }

            if (shouldNavigateNextPage || shouldNavigateBackPage) {
                console.log(e.keyCode);
                console.log("H or L is turned on")
                e.preventDefault();
                e.stopPropagation();
                shortcuts.movePage(shouldNavigateNextPage ? 1 : -1);
            }
        });
        window.addEventListener('keyup', function(e) {
            // e = e || window.event;
            // if (!shortcuts.isInputActive() && !shortcuts.hasModifierKey(e) && options.navigateWithJK && e.keyCode == KEYS.SLASH) {
            if (e.keyCode == KEYS.SLASH && !shortcuts.isInputActive()) {
                console.log("slash put on");
                searchbox.value = searchbox.value + " ";
                searchbox.focus();
            }
        });
    });

})();