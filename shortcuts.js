(function() {
    'use strict';

    // Globals
    var KEYS = {
        J: 74,
        K: 75,
        H: 72,
        L: 76,
        SLASH: 191,
        ESC: 27
    };

    var searchbox = document.querySelector(".b_searchbox");

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
 
            var shouldNavigateNext = options.navigateWithJK && e.keyCode == KEYS.J && !shortcuts.isInputActive(),
                shouldNavigateBack = options.navigateWithJK && e.keyCode == KEYS.K && !shortcuts.isInputActive(),
                movePreviousSearchPage= options.navigateWithHL && e.keyCode == KEYS.H && !e.shiftKey && !shortcuts.isInputActive(),
                moveNextSearchPage = options.navigateWithHL && e.keyCode == KEYS.L && !e.shiftKey && !shortcuts.isInputActive(),
                goToPreviousPage = options.navigateWithShiftHL && e.keyCode == KEYS.H && e.shiftKey && !shortcuts.isInputActive(),
                goToNextPage = options.navigateWithShiftHL && e.keyCode == KEYS.L && e.shiftKey && !shortcuts.isInputActive();
            
            if (shouldNavigateNext || shouldNavigateBack) {
                console.log(e.keyCode);
                e.preventDefault();
                e.stopPropagation();
                shortcuts.focusResult(shouldNavigateNext ? 1 : -1);
            }
            // search page transition
            if (moveNextSearchPage || movePreviousSearchPage) {
                e.preventDefault();
                e.stopPropagation();
                shortcuts.moveSearchPage(moveNextSearchPage ? 1 : -1);
            }
            // page transition for all url
            if (goToPreviousPage || goToNextPage) {
                console.log("shift key & H, L");
                e.preventDefault();
                e.stopPropagation();
                shortcuts.movePage(goToNextPage ? 1 : -1);
            }
        });
        window.addEventListener('keyup', function(e) {
            // e = e || window.event;
            // When the button '/' is pressed, the search box is focused.
            // if (!shortcuts.isInputActive() && !shortcuts.hasModifierKey(e) && options.navigateWithJK && e.keyCode == KEYS.SLASH) {
            if (e.keyCode == KEYS.SLASH && !shortcuts.isInputActive()) {
                searchbox.value = searchbox.value + " ";
                searchbox.focus();
            }
            // When the button 'esc' is pressed, the search box is unfocused.
            if (e.keyCode == KEYS.ESC && shortcuts.isInputActive()) {
                searchbox.blur();
            }
        });
    });

})();