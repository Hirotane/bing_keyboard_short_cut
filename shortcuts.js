(function() {
    'use strict';

    // Globals
    var KEYS = {
        J: 'j',
        K: 'k',
        H: 'h',
        L: 'l',
        SLASH: '/',
        ESC: 'Escape',
        BRACKETLEFT: '['
    };

    var searchbox = document.querySelector(".b_searchbox");

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
            // console.log(e.key);
 
            var shouldNavigateNext = options.navigateWithJK && e.key == KEYS.J && !shortcuts.isInputActive(),
                shouldNavigateBack = options.navigateWithJK && e.key == KEYS.K && !shortcuts.isInputActive(),
                movePreviousSearchPage= options.navigateWithHL && e.key == KEYS.H && !e.shiftKey && !shortcuts.isInputActive(),
                moveNextSearchPage = options.navigateWithHL && e.key == KEYS.L && !e.shiftKey && !shortcuts.isInputActive(),
                goToPreviousPage = options.navigateWithShiftHL && e.key == KEYS.H && e.shiftKey && !shortcuts.isInputActive(),
                goToNextPage = options.navigateWithShiftHL && e.key == KEYS.L && e.shiftKey && !shortcuts.isInputActive();
            
            if (shouldNavigateNext || shouldNavigateBack) {
                // console.log(e.key);
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
            // When the button 'ctrl + [' is pressed, the search box is unfocused.
            if (e.key == KEYS.BRACKETLEFT && e.ctrlKey && shortcuts.isInputActive()) {
                console.log("bracket");
                // eliminate shadows whitch appears when search box is focused.
                let elements = document.getElementsByClassName("b_lbShow");
                elements[0].classList.remove("b_lbShow");
                searchbox.blur();
                }
        });
        window.addEventListener('keyup', function(e) {
            // e = e || window.event;
            // When the button '/' is pressed, the search box is focused.
            // if (!shortcuts.isInputActive() && !shortcuts.hasModifierKey(e) && options.navigateWithJK && e.keyCode == KEYS.SLASH) {
            if (e.key == KEYS.SLASH && !shortcuts.isInputActive()) {
                searchbox.value = searchbox.value + " ";
                searchbox.focus();
            }
            // When the button 'esc' is pressed, the search box is unfocused.
            if (e.key == KEYS.ESC && shortcuts.isInputActive()) {
                searchbox.blur();
            }
        });
    });

})();