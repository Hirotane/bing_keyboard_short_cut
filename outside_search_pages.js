(function() {
    'use strict';

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
            console.log(e.key);
 
            var shouldNavigateNext = (options.navigateWithJKHL && e.key == 'j' && !shortcuts.isInputActive()) ||
                    (options.navigateWithArrows && e.key == 'ArrowDown' && !shortcuts.isInputActive()),
                shouldNavigateBack = (options.navigateWithJKHL && e.key == 'k' && !shortcuts.isInputActive()) ||
                    (options.navigateWithArrows && e.key == 'ArrowUp' && !shortcuts.isInputActive()),
                movePreviousSearchPage = (options.navigateWithJKHL && e.key == 'h' && !e.shiftKey && !shortcuts.isInputActive()) ||
                    (options.navigateWithArrows && e.key == 'ArrowLeft' && !e.shiftKey && !shortcuts.isInputActive()),
                moveNextSearchPage = (options.navigateWithJKHL && e.key == 'l' && !e.shiftKey && !shortcuts.isInputActive()) ||
                    (options.navigateWithArrows && e.key == 'ArrowRight' && !e.shiftKey && !shortcuts.isInputActive()),
                goToPreviousPage = options.navigateWithShiftHL && e.key == 'H' && e.shiftKey && !shortcuts.isInputActive() ||
                    (options.navigateWithShiftArrows && e.key == 'ArrowLeft' && e.shiftKey && !shortcuts.isInputActive()),
                goToNextPage = options.navigateWithShiftHL && e.key == 'L' && e.shiftKey && !shortcuts.isInputActive() ||
                    (options.navigateWithShiftArrows && e.key == 'ArrowRight' && e.shiftKey && !shortcuts.isInputActive());

            // search page transition
            if (moveNextSearchPage || movePreviousSearchPage) {
                // console.log("h or l");
                e.preventDefault();
                e.preventDefault();
                e.stopPropagation();
                shortcuts.moveSearchPage(moveNextSearchPage ? 1 : -1);
            }
            // page transition for all url
            if (goToPreviousPage || goToNextPage) {
                // console.log("shift key & H, L");
                e.preventDefault();
                e.stopPropagation();
                shortcuts.movePage(goToNextPage ? 1 : -1);
            }
            // When the button 'ctrl + [' is pressed, the search box is unfocused.
            if (e.key == '[' && e.ctrlKey && shortcuts.isInputActive()) {
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
            if (e.key == '/' && !shortcuts.isInputActive()) {
                searchbox.value = searchbox.value + " ";
                searchbox.focus();
            }
            // When the button 'esc' is pressed, the search box is unfocused.
            if (e.key == 'Escape' && shortcuts.isInputActive()) {
                searchbox.blur();
            }
        });
    });

})();