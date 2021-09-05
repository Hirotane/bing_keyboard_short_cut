(function() {
    'use strict';

    var searchbox = document.querySelector(".b_searchbox");

    shortcuts.initVideo(function(options) {
        window.addEventListener('keydown', function(e) {
            // console.log(e.key);
            // console.log(location.href);
            var shouldNavigateNext = (options.navigateSearchResultsWithJKHL && e.key == 'j' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) ||
                    (options.navigateSearchResultsWithArrows && e.key == 'ArrowDown' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()),
                shouldNavigateBack = (options.navigateSearchResultsWithJKHL && e.key == 'k' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) ||
                    (options.navigateSearchResultsWithArrows && e.key == 'ArrowUp' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()),
                movePreviousSearchPage = (options.navigateSearchResultsWithJKHL && e.key == 'h' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) ||
                    (options.navigateSearchResultsWithArrows && e.key == 'ArrowLeft' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()),
                moveNextSearchPage = (options.navigateSearchResultsWithJKHL && e.key == 'l' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()) ||
                    (options.navigateSearchResultsWithArrows && e.key == 'ArrowRight' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()),
                goToPreviousPage = options.movePagesWithHL && e.key == 'H' && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive() ||
                    (options.movePagesWithArrows && e.key == 'ArrowLeft' && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()),
                goToNextPage = options.movePagesWithHL && e.key == 'L' && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive() ||
                    (options.movePagesWithArrows && e.key == 'ArrowRight' && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()),
                searchTypeA = options.selectSearchType && e.key == 'a' && !shortcuts.isInputActive(),
                searchTypeW = options.selectSearchType && e.key == 'w' && !shortcuts.isInputActive(),
                searchTypeI = options.selectSearchType && e.key == 'i' && !shortcuts.isInputActive(),
                searchTypeN = options.selectSearchType && e.key == 'n' && !shortcuts.isInputActive(),
                searchTypeV = options.selectSearchType && e.key == 'v' && !shortcuts.isInputActive(),
                searchTypeM = options.selectSearchType && e.key == 'm' && !shortcuts.isInputActive(),
                searchTypeS = options.selectSearchType && e.key == 's' && !shortcuts.isInputActive(),
                unfocusWithBracket = options.unfocusWithBracket && e.key == '[' && e.ctrlKey && shortcuts.isInputActive();

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
                e.preventDefault();
                e.stopPropagation();
                shortcuts.VideoMove(shouldNavigateNext ? 1 : -1);
            }
            // page transition for all url
            if (goToPreviousPage || goToNextPage) {
                e.preventDefault();
                e.stopPropagation();
                shortcuts.movePage(goToNextPage ? 1 : -1);
            }
            // When the button 'ctrl + [' is pressed, the search box is unfocused.
            if (unfocusWithBracket) {
                searchbox.blur();
            }
        });
        window.addEventListener('keyup', function(e) {
            var focusOnInput = options.focusOnInput && e.key == '/' && !shortcuts.isInputActive(),
                unfocusWithESC = options.unfocusWithESC && e.key == 'Escape' && shortcuts.isInputActive();
            // e = e || window.event;
            // When the button '/' is pressed, the search box is focused.
            if (focusOnInput) {
                console.log("input")
                var pos = searchbox.value.length;
                searchbox.focus();
                searchbox.setSelectionRange(pos, pos);
            }
            // When the button 'esc' is pressed, the search box is unfocused.
            if (unfocusWithESC) {
                searchbox.blur();
            }
        });
    });

})();