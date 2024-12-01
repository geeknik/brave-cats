// User-defined site blacklist
let BLACKLISTED_DOMAINS = [];

// Load blacklist from storage
chrome.storage.local.get('blacklistedDomains', (data) => {
    BLACKLISTED_DOMAINS = data.blacklistedDomains || [];
});

// Export for quantum entanglement
window.BLACKLISTED_DOMAINS = BLACKLISTED_DOMAINS;
