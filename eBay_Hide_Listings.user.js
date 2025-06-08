// ==UserScript==
// @name         eBay Hide Listings
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hide individual eBay listings from search results
// @description:en Hide individual eBay listings from search results
// @description:de Einzelne eBay-Listings aus Suchergebnissen ausblenden
// @updateURL    https://github.com/anga83/userscripts/raw/refs/heads/main/eBay_Hide_Listings.user.js
// @author       https://github.com/anga83
// @match        https://www.ebay.com/sch/*
// @match        https://www.ebay.com/b/*
// @match        https://www.ebay.de/sch/*
// @match        https://www.ebay.de/b/*
// @match        https://www.ebay.co.uk/sch/*
// @match        https://www.ebay.co.uk/b/*
// @match        https://www.ebay.fr/sch/*
// @match        https://www.ebay.fr/b/*
// @match        https://www.ebay.it/sch/*
// @match        https://www.ebay.it/b/*
// @match        https://www.ebay.es/sch/*
// @match        https://www.ebay.es/b/*
// @match        https://www.ebay.ca/sch/*
// @match        https://www.ebay.ca/b/*
// @match        https://www.ebay.com.au/sch/*
// @match        https://www.ebay.com.au/b/*
// @match        https://www.ebay.at/sch/*
// @match        https://www.ebay.at/b/*
// @match        https://www.ebay.ch/sch/*
// @match        https://www.ebay.ch/b/*
// @match        https://www.ebay.be/sch/*
// @match        https://www.ebay.be/b/*
// @match        https://www.ebay.nl/sch/*
// @match        https://www.ebay.nl/b/*
// @match        https://www.ebay.pl/sch/*
// @match        https://www.ebay.pl/b/*
// @match        https://www.ebay.ie/sch/*
// @match        https://www.ebay.ie/b/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Lokalisierung basierend auf Browser-Sprache
    const browserLang = navigator.language.split('-')[0];
    
    const translations = {
        en: {
            hideTitle: 'Hide this listing',
            resetButton: 'Reset Hidden Items',
            resetConfirm: 'Show all hidden items again?'
        },
        de: {
            hideTitle: 'Dieses Listing ausblenden',
            resetButton: 'Versteckte Items zurücksetzen',
            resetConfirm: 'Alle versteckten Items wieder anzeigen?'
        }
    };

    // Fallback auf Englisch wenn Sprache nicht unterstützt
    const t = translations[browserLang] || translations.en;

    // CSS für das Hide-Symbol
    const style = document.createElement('style');
    style.textContent = `
        .ebay-hide-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 3px 6px;
            cursor: pointer;
            font-size: 12px;
            z-index: 1000;
            transition: background-color 0.2s;
        }
        .ebay-hide-btn:hover {
            background: rgba(255, 0, 0, 0.1);
            border-color: #ff0000;
        }
        .ebay-listing-hidden {
            display: none !important;
        }
        .s-item {
            position: relative;
        }
    `;
    document.head.appendChild(style);

    // LocalStorage-Schlüssel für versteckte Items (domain-spezifisch)
    const domain = window.location.hostname;
    const HIDDEN_ITEMS_KEY = `ebay_hidden_items_${domain}`;

    // Versteckte Items aus LocalStorage laden
    function getHiddenItems() {
        const stored = localStorage.getItem(HIDDEN_ITEMS_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    // Items in LocalStorage speichern
    function saveHiddenItems(hiddenItems) {
        localStorage.setItem(HIDDEN_ITEMS_KEY, JSON.stringify(hiddenItems));
    }

    // Item-ID aus einem Listing-Element extrahieren
    function getItemId(listingElement) {
        // Versuche verschiedene Attribute für die eindeutige ID
        const id = listingElement.id || 
                   listingElement.getAttribute('data-marko-key') ||
                   listingElement.querySelector('[data-marko-key]')?.getAttribute('data-marko-key') ||
                   listingElement.getAttribute('data-viewport');
        
        return id;
    }

    // Hide-Button erstellen
    function createHideButton(listingElement, itemId) {
        const hideBtn = document.createElement('button');
        hideBtn.className = 'ebay-hide-btn';
        hideBtn.innerHTML = '✕';
        hideBtn.title = t.hideTitle;
        
        hideBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Item zur Liste der versteckten Items hinzufügen
            const hiddenItems = getHiddenItems();
            if (!hiddenItems.includes(itemId)) {
                hiddenItems.push(itemId);
                saveHiddenItems(hiddenItems);
            }
            
            // Listing sofort ausblenden
            listingElement.classList.add('ebay-listing-hidden');
        });
        
        return hideBtn;
    }

    // Alle Listings verarbeiten
    function processListings() {
        const listings = document.querySelectorAll('.s-item');
        const hiddenItems = getHiddenItems();
        
        listings.forEach(listing => {
            const itemId = getItemId(listing);
            
            if (!itemId) return;
            
            // Prüfen, ob das Item bereits versteckt werden soll
            if (hiddenItems.includes(itemId)) {
                listing.classList.add('ebay-listing-hidden');
                return;
            }
            
            // Prüfen, ob bereits ein Hide-Button vorhanden ist
            if (listing.querySelector('.ebay-hide-btn')) return;
            
            // Hide-Button hinzufügen
            const hideButton = createHideButton(listing, itemId);
            listing.appendChild(hideButton);
        });
    }

    // Button zum Zurücksetzen aller versteckten Items (optional)
    function addResetButton() {
        const resetBtn = document.createElement('button');
        resetBtn.textContent = t.resetButton;
        resetBtn.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 10000;
            padding: 5px 10px;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 3px;
            cursor: pointer;
        `;
        
        resetBtn.addEventListener('click', function() {
            if (confirm(t.resetConfirm)) {
                localStorage.removeItem(HIDDEN_ITEMS_KEY);
                location.reload();
            }
        });
        
        document.body.appendChild(resetBtn);
    }

    // Initiale Verarbeitung
    processListings();
    addResetButton();

    // Observer für dynamisch geladene Inhalte
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                processListings();
            }
        });
    });

    // Observer starten
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
