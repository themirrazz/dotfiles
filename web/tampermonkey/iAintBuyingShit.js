// ==UserScript==
// @name         I Ain't Buying Shit
// @namespace    http://tampermonkey.net/
// @version      2026-02-19
// @description  try to take over the world!
// @author       You
// @match        https://docs.google.com/document/d/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(() => {
        const buttons = document.querySelectorAll('.javascriptMaterialdesignGm3WizButtonFilledTonal-button__label');
        buttons.forEach(button => {
            if(button.innerText && button.innerText.trim().toLowerCase() === 'upgrade') {
                button.remove();
            }
        });
    }, 100);
})();
