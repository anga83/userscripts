// ==UserScript==
// @name         Markdown Viewer
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Automatically formats and displays .md files with a pleasant, readable theme and font settings.
// @author       https://github.com/anga83
// @match        *://*/*.md
// @include      file://*/*.md
// @resource     marked https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.umd.min.js
// @resource     css https://raw.githubusercontent.com/yrgoldteeth/darkdowncss/master/darkdown.css
// @updateURL    https://github.com/anga83/userscripts/raw/refs/heads/main/Markdown_Viewer.user.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // --- FONT SETTINGS ---

    const FONT_SETTINGS = {
        'serif': `Iowan Old Style, Apple Garamond, Baskerville, Georgia, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`,
        'sans-serif': `"Segoe UI", "SF Pro Text", "Ubuntu", "Arial", sans-serif`
    };

    function applyFontStyle() {
        const chosenFont = GM_getValue('fontStyle', 'serif');
        const fontFamily = FONT_SETTINGS[chosenFont] || FONT_SETTINGS.serif;
        GM_addStyle(`.markdown-body { font-family: ${fontFamily}; }`);
    }

    function setFontStyle() {
        let choice = prompt("Choose font style: 'serif' or 'sans-serif'", GM_getValue('fontStyle', 'serif'));
        if (choice === null) return;
        choice = choice.toLowerCase().trim();

        if (choice === 'serif' || choice === 'sans-serif') {
            GM_setValue('fontStyle', choice);
            alert(`Font style set to ${choice}. Reload the page to see the changes.`);
        } else {
            alert(`Invalid choice. Please enter 'serif' or 'sans-serif'.`);
        }
    }

    GM_registerMenuCommand('Set Font Style', setFontStyle);


    // --- MAIN SCRIPT EXECUTION ---

    const css = GM_getResourceText("css");
    GM_addStyle(css);

    // Apply custom styling fixes and improvements
    GM_addStyle(`
        body {
            margin: 0;
            background-color: rgb(27, 28, 29);
        }
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 12px 45px 45px;
        }
        /* Responsive images */
        .markdown-body img {
            max-width: 150%;
            height: auto;
            display: block;
        }
        /* Heading size and spacing adjustments */
        .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
            margin-top: 2em;
            margin-bottom: 0.8em;
        }
        .markdown-body h1:hover, .markdown-body h2:hover, .markdown-body h3:hover, .markdown-body h4:hover, .markdown-body h5:hover, .markdown-body h6:hover {
            text-decoration: underline;
        }
        .markdown-body h1 { font-size: 2.2em; }
        .markdown-body h2 { font-size: 1.8em; }
        .markdown-body h3 { font-size: 1.4em; }
        .markdown-body h4 { font-size: 1.2em; }
        .markdown-body h5 { font-size: 1em; }
        .markdown-body h6 { font-size: 0.9em; color: #888; }

        /* Style for code blocks and inline code */
        pre, code, kbd, samp {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            font-size: 1em;
        }
        /* Code background colors */
        pre {
            background-color: rgb(40, 42, 44);
            padding: 16px;
            overflow: auto;
            border-radius: 6px;
            border: 1px solid rgb(60, 62, 64);
        }
        :not(pre) > code {
            background-color: rgb(40, 42, 44);
            padding: .2em .4em;
            margin: 0;
            font-size: 85%;
            border-radius: 3px;
            border: 1px solid rgb(60, 62, 64);
        }
        .markdown-body ul {
            padding-left: 2em;
        }
        @media (max-width: 767px) {
            .markdown-body {
                padding: 20px 15px 15px;
            }
        }
    `);

    applyFontStyle();

    const markdownBody = document.createElement('div');
    markdownBody.className = 'markdown-body';

    const markedjs = GM_getResourceText("marked");
    eval(markedjs);

    const markdownContent = document.body.innerText;
    const htmlContent = marked.parse(markdownContent);

    document.body.innerHTML = '';
    document.body.appendChild(markdownBody);
    markdownBody.innerHTML = htmlContent;
})();
