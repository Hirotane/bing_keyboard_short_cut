(function() {
    'use strict';

    // Globals
    var KEYS = {
        J: 74,
        K: 75
    };

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
 
            var shouldNavigateNext = options.navigateWithJK && e.keyCode == KEYS.J,
                shouldNavigateBack = options.navigateWithJK && e.keyCode == KEYS.K;
            
            if (shouldNavigateNext || shouldNavigateBack) {
                console.log(e.keyCode);
                e.preventDefault();
                e.stopPropagation();
                // shortcuts.focusResult(shouldNavigateNext ? 1 : -1);
            }
        });
    });

})();