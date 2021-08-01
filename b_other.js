(function() {
    'use strict';

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
            // console.log(e.key);
 
            var goToPreviousPage = options.movePagesWithHL && e.key == 'H' && e.shiftKey && !shortcuts.isInputActive() ||
                    (options.movePagesWithArrows && e.key == 'ArrowLeft' && e.shiftKey && !shortcuts.isInputActive()),
                goToNextPage = options.movePagesWithHL && e.key == 'L' && e.shiftKey && !shortcuts.isInputActive() ||
                    (options.movePagesWithArrows && e.key == 'ArrowRight' && e.shiftKey && !shortcuts.isInputActive());

            // page transition for all url
            if (goToPreviousPage || goToNextPage) {
                e.preventDefault();
                e.stopPropagation();
                shortcuts.movePage(goToNextPage ? 1 : -1);
            }
            // When the button 'ctrl + [' is pressed, the search box is unfocused.
            if (e.key == '[' && e.ctrlKey && shortcuts.isInputActive()) {
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
 
            var scrollDown = (options.scrollInSiteWithJKDU && e.key == 'j' && !shortcuts.isInputActive()) ||
                    (options.scrollInSiteWithArrows && e.key == 'ArrowDown' && !shortcuts.isInputActive()),
                scrollUp = (options.scrollInSiteWithJKDU && e.key == 'k' && !shortcuts.isInputActive()) ||
                    (options.scrollInSiteWithArrows && e.key == 'ArrowUp' && !shortcuts.isInputActive()),
                scrollPageUp = (options.scrollInSiteWithJKDU && e.key == 'u' && !shortcuts.isInputActive()),
                scrollPageDown = (options.scrollInSiteWithJKDU && e.key == 'd' && !shortcuts.isInputActive());

            // scroll page with 'j', 'k'
            if (scrollUp || scrollDown) {
                e.preventDefault();
                e.stopPropagation();
                shortcuts.scrollPageOneLine(scrollUp ? 1 : -1);
            }
            if (scrollPageUp || scrollPageDown) {
                e.preventDefault();
                e.stopPropagation();
                shortcuts.scrollHalfPage(scrollPageUp ? 1 : -1);
            }
        });
    });

})();