// Enhanced background script with quantum storage handling
chrome.runtime.onInstalled.addListener(() => {
    // Initialize quantum storage
    chrome.storage.local.set({
        quantumState: {
            coherence: 0.92,
            manifestationProbability: 0.75,
            realityDistortion: 0.5
        },
        blacklistEnabled: true,
        blacklistedDomains: []
    });
});

// Handle blacklist status
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CHECK_BLACKLIST_STATUS') {
        chrome.storage.local.get('blacklistEnabled', (data) => {
            sendResponse({ enabled: data.blacklistEnabled ?? true });
        });
        return true;
    }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'QUANTUM_READY') {
        // Acknowledge quantum readiness
        sendResponse({ status: 'acknowledged' });
        return true;
    }
    
    if (message.type === 'getQuantumStats') {
        // Get stats from active tab's content script
        chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
            try {
                const response = await chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'GET_QUANTUM_STATS'
                });
                sendResponse(response);
            } catch (error) {
                sendResponse({
                    shards: 0,
                    cats: 0,
                    stability: 0
                });
            }
        });
        return true;
    }
});

// Monitor quantum coherence
setInterval(() => {
    chrome.storage.local.get('quantumState', (data) => {
        const state = data.quantumState || {};
        state.coherence = Math.max(0.3, (state.coherence || 0.92) * 0.99);
        chrome.storage.local.set({ quantumState: state });
    });
}, 60000);
