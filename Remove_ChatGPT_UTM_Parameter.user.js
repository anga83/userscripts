// ==UserScript==
// @name         Remove ChatGPT UTM Parameter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes ?utm_source=chatgpt.com from URLs and reloads the page automatically
// @author       https://github.com/anga83
// @updateURL    https://github.com/anga83/userscripts/raw/refs/heads/main/Remove_ChatGPT_UTM_Parameter.user.js
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    const currentUrl = window.location.href;
    const hasUtmSource = currentUrl.includes('?utm_source=chatgpt.com') || currentUrl.includes('&utm_source=chatgpt.com');
    
    if (hasUtmSource) {
        const url = new URL(currentUrl);
  
        url.searchParams.delete('utm_source');
        
        let cleanUrl = url.toString();
        if (cleanUrl.endsWith('?')) {
            cleanUrl = cleanUrl.slice(0, -1);
        }
        
        if (cleanUrl !== currentUrl) {
            window.location.replace(cleanUrl);
        }
    }
})();
