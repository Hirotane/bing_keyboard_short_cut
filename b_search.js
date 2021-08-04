(function() {
    'use strict';

    var searchbox = document.querySelector(".b_searchbox");

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
            // console.log(e.key);
            var shouldNavigateNext = (options.navigateSearchResultsWithJKHL && e.key == 'j' && !shortcuts.isInputActive()) ||
                    (options.navigateSearchResultsWithArrows && e.key == 'ArrowDown' && !shortcuts.isInputActive()),
                shouldNavigateBack = (options.navigateSearchResultsWithJKHL && e.key == 'k' && !shortcuts.isInputActive()) ||
                    (options.navigateSearchResultsWithArrows && e.key == 'ArrowUp' && !shortcuts.isInputActive()),
                movePreviousSearchPage = (options.navigateSearchResultsWithJKHL && e.key == 'h' && !e.shiftKey && !shortcuts.isInputActive()) ||
                    (options.navigateSearchResultsWithArrows && e.key == 'ArrowLeft' && !e.shiftKey && !shortcuts.isInputActive()),
                moveNextSearchPage = (options.navigateSearchResultsWithJKHL && e.key == 'l' && !e.shiftKey && !shortcuts.isInputActive()) ||
                    (options.navigateSearchResultsWithArrows && e.key == 'ArrowRight' && !e.shiftKey && !shortcuts.isInputActive()),
                goToPreviousPage = options.movePagesWithHL && e.key == 'H' && e.shiftKey && !shortcuts.isInputActive() ||
                    (options.movePagesWithArrows && e.key == 'ArrowLeft' && e.shiftKey && !shortcuts.isInputActive()),
                goToNextPage = options.movePagesWithHL && e.key == 'L' && e.shiftKey && !shortcuts.isInputActive() ||
                    (options.movePagesWithArrows && e.key == 'ArrowRight' && e.shiftKey && !shortcuts.isInputActive()),
                searchTypeA = options.selectSearchType && e.key == 'A' && e.shiftKey && !shortcuts.isInputActive(),
                searchTypeW = options.selectSearchType && e.key == 'W' && e.shiftKey && !shortcuts.isInputActive(),
                searchTypeI = options.selectSearchType && e.key == 'I' && e.shiftKey && !shortcuts.isInputActive(),
                searchTypeN = options.selectSearchType && e.key == 'N' && e.shiftKey && !shortcuts.isInputActive(),
                searchTypeV = options.selectSearchType && e.key == 'V' && e.shiftKey && !shortcuts.isInputActive(),
                searchTypeM = options.selectSearchType && e.key == 'M' && e.shiftKey && !shortcuts.isInputActive(),
                searchTypeS = options.selectSearchType && e.key == 'S' && e.shiftKey && !shortcuts.isInputActive();

            // select search type
            if (searchTypeA) {
                shortcuts.changeSearchType('all');
            } else if (searchTypeW) {
                shortcuts.changeSearchType('work');
            } else if (searchTypeI) {
                shortcuts.changeSearchType('image');
            } else if (searchTypeN) {
                shortcuts.changeSearchType('news');
            } else if (searchTypeV) {
                shortcuts.changeSearchType('video');
            } else if (searchTypeM) {
                shortcuts.changeSearchType('map');
            } else if (searchTypeS) {
                shortcuts.changeSearchType('shop');
            }
            
            if (shouldNavigateNext || shouldNavigateBack) {
                // console.log("j or k");
                e.preventDefault();
                e.stopPropagation();
                shortcuts.focusResult(shouldNavigateNext ? 1 : -1);
            }
            // search page transition
            if (moveNextSearchPage || movePreviousSearchPage) {
                // console.log("h or l");
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
                // console.log("bracket");
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