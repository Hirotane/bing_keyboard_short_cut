(function() {
    'use strict';

    // Globals
    var KEYS = {
        J: 74,
        K: 75,
        H: 72,
        L: 76
    };

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
 
            var shouldNavigateNext = options.navigateWithJK && e.keyCode == KEYS.J,
                shouldNavigateBack = options.navigateWithJK && e.keyCode == KEYS.K,
                shouldNavigateNextPage = options.navigateWithHL && e.keyCode == KEYS.L,
                shouldNavigateBackPage = options.navigateWithHL && e.keyCode == KEYS.H;
            
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
    });

})();