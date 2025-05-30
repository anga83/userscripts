// ==UserScript==
// @name         Remove ChatGPT UTM Parameter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes ?utm_source=chatgpt.com from URLs and reloads the page automatically
// @author       https://github.com/anga83
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // Überprüfe, ob die aktuelle URL den ChatGPT UTM Parameter enthält
    const currentUrl = window.location.href;
    const hasUtmSource = currentUrl.includes('?utm_source=chatgpt.com') || currentUrl.includes('&utm_source=chatgpt.com');
    
    if (hasUtmSource) {
        // Erstelle eine neue URL ohne den UTM Parameter
        const url = new URL(currentUrl);
        
        // Entferne den utm_source Parameter
        url.searchParams.delete('utm_source');
        
        // Bereinige die URL falls keine weiteren Parameter vorhanden sind
        let cleanUrl = url.toString();
        if (cleanUrl.endsWith('?')) {
            cleanUrl = cleanUrl.slice(0, -1);
        }
        
        // Lade die Seite mit der bereinigten URL neu
        if (cleanUrl !== currentUrl) {
            window.location.replace(cleanUrl);
        }
    }
})();
