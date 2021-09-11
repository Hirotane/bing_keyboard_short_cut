(function() {
    'use strict';

    shortcuts.loadOptions(function(options) {
        window.addEventListener('keydown', function(e) {
 
            var goToPreviousPage = options.movePagesWithHL && e.key == 'H' && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive() ||
                    (options.movePagesWithArrows && e.key == 'ArrowLeft' && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()),
                goToNextPage = options.movePagesWithHL && e.key == 'L' && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive() ||
                    (options.movePagesWithArrows && e.key == 'ArrowRight' && e.shiftKey && !e.ctrlKey && !e.metaKey && !shortcuts.isInputActive()),
                unfocusWithBracket = options.unfocusWithBracket && e.key == '[' && e.ctrlKey && shortcuts.isInputActive(),
                moveToButtom = options.scrollToTopOrBottom && e.key == 'G' && e.shiftKey && !shortcuts.isInputActive(),
                operatorG = options.scrollToTopOrBottom && e.key == 'g' && !e.shiftKey && !shortcuts.isInputActive(),
                searchOnGoogle = options.switchSearchEngine && e.key == 'g' && e.ctrlKey && !shortcuts.isInputActive(),
                searchOnEdge = options.switchSearchEngine && e.key == 'b' && e.ctrlKey && !shortcuts.isInputActive(),
                changeLangEn = options.changeLanguage && e.key == 'e' && e.ctrlKey && !shortcuts.isInputActive(),
                changeLangNa = options.changeLanguage && e.key == 'd' && e.ctrlKey && !shortcuts.isInputActive();

            // page transition for all url
            if (goToPreviousPage || goToNextPage) {
                e.preventDefault();
                e.stopPropagation();
                shortcuts.movePage(goToNextPage ? 1 : -1);
            }
            // When the button 'ctrl + [' is pressed, the search box is unfocused.
            if (unfocusWithBracket) {
                var focusedElement = document.activeElement;
                focusedElement.blur();
            }
            if (moveToButtom) {
                var elm = document.documentElement;
                var bottom = elm.scrollHeight - elm.clientHeight;
                window.scroll({top: bottom, behavior: 'smooth'});
            }
            if (operatorG) {
                window.addEventListener('keydown', function moveTop(e) {
                    var moveToTop = options.scrollToTopOrBottom && e.key == 'g' && !e.shiftKey && !shortcuts.isInputActive();
                    if (moveToTop) {
                        window.scroll({top: 0, behavior: 'smooth'});
                    }
                    this.removeEventListener('keydown', moveTop);
                });
            }
            // serch on Google
            if (searchOnGoogle) {
                shortcuts.changeSearchGoogle();
            }
            // serch on Edge
            if (searchOnEdge) {
                shortcuts.changeSearchEdge();
            }
        });
        window.addEventListener('keyup', function(e) {

            var focusOnInput = (options.focusOnInput && e.key == '/' && !shortcuts.isInputActive()),
                unfocusWithESC = options.unfocusWithESC && e.key == 'Escape' && shortcuts.isInputActive(),
                operatorG = options.scrollWithG && e.key == 'g' && !e.shiftKey && !shortcuts.isInputActive();
            // e = e || window.event;
            // When the button '/' is pressed, the search box is focused.
            if (focusOnInput) {
                var searchbox = shortcuts.focusOnSearchBox();
                var pos = searchbox.value.length;
                searchbox.focus();
                searchbox.setSelectionRange(pos, pos);
            }
            if (operatorG) {
                window.addEventListener('keyup', function motionI(e) {
                    var focusOnInputWithGI = options.scrollWithG && e.key == 'i' && !e.shiftKey && !shortcuts.isInputActive();
                    if (focusOnInputWithGI) {
                        var searchbox = shortcuts.focusOnSearchBox();
                        var pos = searchbox.value.length;
                        searchbox.focus();
                        searchbox.setSelectionRange(pos, pos);
                    }
                    this.removeEventListener('keyup', motionI);
                });
                operatorG = false;
            }
            // When the button 'esc' is pressed, the search box is unfocused.
            if (unfocusWithESC) {
                var focusedElement = document.activeElement;
                focusedElement.blur();
            }
        });
        window.addEventListener('keypress', function(e) {
            // console.log(e.key);
 
            var scrollDown = (options.scrollInSiteWithJKDU && e.key == 'j' && !shortcuts.isInputActive()),
                scrollUp = (options.scrollInSiteWithJKDU && e.key == 'k' && !shortcuts.isInputActive()),
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