// ==UserScript==
// @name         Google Slides Present Animation
// @namespace    http://tampermonkey.net/
// @version      2026-01-26
// @description  try to take over the world!
// @author       You
// @match        https://docs.google.com/presentation/d/*
// @match        https://docs.google.com/presentation/u/*/d/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @run-at       document-start
// ==/UserScript==

(function() {
    let timerExpired = false;
    setTimeout(() => { timerExpired = true }, 15000);
    function clickElement(elem) {
        elem.dispatchEvent(new MouseEvent('mousedown'));
        setTimeout(() => {
            elem.dispatchEvent(new MouseEvent('mouseup'));
            elem.dispatchEvent(new MouseEvent('click'));
            setTimeout(() => document.body.dispatchEvent(new MouseEvent('click')), 10);
        }, 126.3);
    }
    function pause(ms) { return new Promise(r => setTimeout(_ => r(), ms)); }
    function createCurtain(side) {
        const c = document.createElement('div');
        c.style.width = '50%';
        c.style.height = '100%';
        c.style.position = 'fixed';
        c.style.backgroundImage = 'url("https://img.freepik.com/free-vector/theater-cinema-curtains-with-focus-light-vector-illustration_1017-38346.jpg?semt=ais_hybrid&w=740&q=80")';
        c.style.backgroundRepeat = 'no-repeat';
        c.style.backgroundSize = 'cover';
        c.style.position = 'absolute';
        c.style.transition = '500ms';
        c.style.top = '0px';
        c.style[side] = '-50%';
        c.style.animationName = side[0].toUpperCase() + side.slice(1) + 'CurtainAnimation';
        c.style.animationDuration = '1000ms';
        c.style.animationIterationCount = '1';
        c.style.zIndex = '999999999999999999999999999';
        document.body.appendChild(c);
        return c;
    }
    let canRequestFS = true;
    HTMLElement.prototype.requestFSOG = HTMLElement.prototype.requestFullscreen;
    HTMLElement.prototype.requestFullscreen = function (...args) {
        if(canRequestFS) return this.requestFSOG(...args);
    }
    function applyEvents(events, button, target) {
        if(typeof events === 'string') events = events.split(',');
        events.forEach(ev => {
            button['on' + ev] = function (event) {
                target.dispatchEvent(new MouseEvent(ev, event));
            };
        });
    }
    async function curtainAnimations() {
        canRequestFS = false;
        const c1 = createCurtain('left');
        const c2 = createCurtain('right');
        await pause(2300);
        c1.remove();
        c2.remove();
        canRequestFS = true;
    }
    function init() {
        // check for the container
        const container = document.getElementById('punch-start-presentation-container');
        const clickTarget = document.getElementById('punch-start-presentation-left');
        if(!(container&&clickTarget)) {
            // save CPU cycles after 15 seconds
            if(!timerExpired) setTimeout(init, 120);
            return;
        };
        // adjust the position of the container
        container.style.position = 'relative';
        // create our button on top
        const button = document.createElement('div');
        button.style.position = 'absolute';
        button.style.width = clickTarget.offsetWidth + 'px';
        button.style.height = clickTarget.offsetHeight + 'px';
        button.style.top = '0px';
        button.style.left = '0px';
        button.style.zIndex = '5';
        button.style.cursor = 'pointer';
        button.style.borderTopLeftRadius = button.style.borderBottomLeftRadius = '50px';
        container.appendChild(button);
        button.onclick = async function () {
            document.documentElement.requestFSOG();
            await pause(300);
            curtainAnimations();
            await pause(300);
            clickElement(clickTarget);
        };
        applyEvents('mouseover,mouseout,mouseenter,mouseleave,mousemove', button, clickTarget);
    };
    init();
})();
