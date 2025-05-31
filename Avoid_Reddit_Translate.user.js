// ==UserScript==
// @name         Remove Reddit Language Parameter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes /?tl= language parameters from Reddit URLs (this usually happens when opened via Google or other search engines) to avoid Reddit post from being auto-translated and reloads automatically.
// @author       https://github.com/anga83
// @match        *://www.reddit.com/*
// @match        *://reddit.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    const currentUrl = window.location.href;
    const hasLanguageParam = currentUrl.includes('/?tl=');
    
    if (hasLanguageParam) {
        const cleanUrl = currentUrl.replace(/\/\?tl=[^&?]*(&|$)/, '/');
        
        if (cleanUrl !== currentUrl) {
            window.location.replace(cleanUrl);
        }
    }
})();
