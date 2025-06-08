# Userscripts

## [eBay Hide Search Results](eBay_Hide_Listings.user.js)

Hide individual eBay listings from search results. This is especially useful if you want to sort by price and want to exclude scams (like people selling only the box). Your hidden listings are stored in your browser's local storage, so they will persist across sessions.

## [Markdown Viewer](Markdown_Viewer.user.js)

A userscript that allows you to view Markdown files directly in your browser. It automatically detects `.md` files and renders them as HTML, providing a more readable format.

You can switch between serif/sans-serif and system/light/dark mode via the Tampermonkey menu.

_Note: To view local Markdown files, you need to allow Tampermonkey to access local files. This can be done in the Chrome extension settings by enabling the "Allow access to file URLs" option._

## [Remove ChatGPT UTM Parameter](Remove_ChatGPT_UTM_Parameter.user.js)

Removes the `?utm_source=chatgpt.com` UTM parameter from URLs that ChatGPT appends to each URL opened from within a response and reloads the page automatically.

## [Remove Reddit Language Paramater](Remove_Reddit_Language_Parameter.user.js)

Removes the `?tl=` parameter from Reddit URLs, which causes posts to be automatically translated into the browser's language. This parameter is usually added when links to Reddit posts are opened via Google or other search engines. This userscript reloads the tab without this parameter, thus avoiding this behaviour.
