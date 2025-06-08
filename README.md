# Userscripts

## [Markdown Viewer](Markdown_Viewer.user.js)

A userscript that allows you to view Markdown files directly in your browser. It automatically detects `.md` files and renders them as HTML, providing a more readable format.

_Note: To view local Markdown files, you need to allow Tampermonkey to access local files. This can be done in the Chrome extension settings by enabling the "Allow access to file URLs" option._

## [Remove ChatGPT UTM Parameter](Remove_ChatGPT_UTM_Parameter.user.js)

Removes the `?utm_source=chatgpt.com` UTM parameter from URLs that ChatGPT appends to each URL opened from within a response and reloads the page automatically.

## [Remove Reddit Language Paramater](Remove_Reddit_Language_Parameter.user.js)

Removes the `?tl=` parameter from Reddit URLs, which causes posts to be automatically translated into the browser's language. This parameter is usually added when links to Reddit posts are opened via Google or other search engines. This userscript reloads the tab without this parameter, thus avoiding this behaviour.
