// ==UserScript==
// @name         Google Docs Mac Bar
// @namespace    http://tampermonkey.net/
// @version      2026-01-22
// @description  try to take over the world!
// @author       You
// @match        https://docs.google.com/document/d/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    // Source - https://stackoverflow.com/a/36860652
    // Posted by Mouloud85, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-01-22, License - CC BY-SA 4.0
    function getRelativeCoordinates (event, referenceElement) {
        const position = {
            x: event.pageX,
            y: event.pageY
        };
        const offset = {
            left: referenceElement.offsetLeft,
            top: referenceElement.offsetTop
        };
        let reference = referenceElement.offsetParent;
        while(reference){
            offset.left += reference.offsetLeft;
            offset.top += reference.offsetTop;
            reference = reference.offsetParent;
        }
        return {
            x: position.x - offset.left,
            y: position.y - offset.top,
        };
    };
    window.addEventListener('mousemove', event => {
        Array.from(document.querySelectorAll('.docs-collapsable-toolbar-control:not(.goog-toolbar-separator)')).forEach(control => {
            if(document.getElementById('docs-toolbar-wrapper').matches(':hover')) {
                const rc = getRelativeCoordinates(event, control);
                rc.x -= control.offsetWidth / 2;
                /* if(rc.x >= 0 && rc.x <= control.client) {
                    rc.x = 0;
                    console.log('touching');
                } else {
                    rc.x -= control.offsetWidth;
                } */
                const distance = Math.abs(rc.x);
                const max = 200;
                const scale = 1.8;
                if(distance >= max) {
                    control.style.transform = 'scale(1)';
                } else {
                    // console.log( 1 + ((scale-1) * (distance / max)) )
                    control.style.transform = `scale(${ Math.floor((1 + ((scale-1) * ((max - distance) / max)))*100)/100 })`;
                }
            } else {
                control.style.transform = 'scale(1)';
            }
        });
    });
})();
