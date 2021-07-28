(function() {
    'use strict';

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
            // console.log(e.key);
 
            var goToPreviousPage = options.navigateWithShiftHL && e.key == 'H' && e.shiftKey && !shortcuts.isInputActive() ||
                    (options.navigateWithShiftArrows && e.key == 'ArrowLeft' && e.shiftKey && !shortcuts.isInputActive()),
                goToNextPage = options.navigateWithShiftHL && e.key == 'L' && e.shiftKey && !shortcuts.isInputActive() ||
                    (options.navigateWithShiftArrows && e.key == 'ArrowRight' && e.shiftKey && !shortcuts.isInputActive());

            // page transition for all url
            if (goToPreviousPage || goToNextPage) {
                e.preventDefault();
                e.stopPropagation();
                shortcuts.movePage(goToNextPage ? 1 : -1);
            }
            // When the button 'ctrl + [' is pressed, the search box is unfocused.
            if (e.key == '[' && e.ctrlKey && shortcuts.isInputActive()) {
                console.log("[ is pressed")
                var focusedElement = document.activeElement;
                focusedElement.blur();
                }
        });
        window.addEventListener('keyup', function(e) {
            // e = e || window.event;
            // When the button '/' is pressed, the search box is focused.
            if (e.key == '/' && !shortcuts.isInputActive()) {
                searchbox = shortcuts.focusOnSearchBox();
            }
            // When the button 'esc' is pressed, the search box is unfocused.
            if (e.key == 'Escape' && shortcuts.isInputActive()) {
                var focusedElement = document.activeElement;
                focusedElement.blur();
            }
        });
        window.addEventListener('keypress', function(e) {
            // console.log(e.key);
 
            var scrollDown = (options.navigateWithJKHL && e.key == 'j' && !shortcuts.isInputActive()) ||
                    (options.navigateWithArrows && e.key == 'ArrowDown' && !shortcuts.isInputActive()),
                scrollUp = (options.navigateWithJKHL && e.key == 'k' && !shortcuts.isInputActive()) ||
                    (options.navigateWithArrows && e.key == 'ArrowUp' && !shortcuts.isInputActive()),
                scrollPageUp = (options.navigateWithJKHL && e.key == 'u' && !shortcuts.isInputActive()) ||
                    (options.navigateWithArrows && e.key == 'ArrowUp' && !shortcuts.isInputActive()),
                scrollPageDown = (options.navigateWithJKHL && e.key == 'd' && !shortcuts.isInputActive()) ||
                    (options.navigateWithArrows && e.key == 'ArrowUp' && !shortcuts.isInputActive());

            // scroll page with 'j', 'k'
            if (scrollUp || scrollDown) {
                console.log("j or k");
                e.preventDefault();
                e.stopPropagation();
                shortcuts.scrollPageOneLine(scrollUp ? 1 : -1);
            }
            if (scrollPageUp || scrollPageDown) {
                console.log("u or d");
                e.preventDefault();
                e.stopPropagation();
                shortcuts.scrollHalfPage(scrollPageUp ? 1 : -1);
            }
        });
    });

})();