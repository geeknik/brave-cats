// Quantum value formatter
function formatQuantumValue(value) {
    if (value > 95) return "∞";
    if (value > 90) return "ℵ₀";
    if (value > 85) return "ℵ₁";
    if (value > 80) return "ψ";
    return `${Math.round(value)}%`;
}

// Update display with quantum notation
function updateQuantumDisplay(elementId, value) {
    const displayElement = document.getElementById(elementId);
    if (displayElement) {
        displayElement.textContent = formatQuantumValue(value);
    }
}

// Track content script ready state
let contentScriptReady = false;

// Listen for content script ready message
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'QUANTUM_READY') {
        contentScriptReady = true;
    }
});

// Initialize quantum controls
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for content script to be ready
    let retries = 0;
    while (!contentScriptReady && retries < 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }
    
    const sliders = {
        distortionField: document.getElementById('distortionField'),
        manifestationProb: document.getElementById('manifestationProb'),
        coherence: document.getElementById('coherence')
    };

    // Add event listeners to sliders
    Object.entries(sliders).forEach(([key, slider]) => {
        slider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            updateQuantumDisplay(`${key === 'distortionField' ? 'distortion' : key}Value`, value);
            
            // Update quantum state with error handling
            sendQuantumMessage({
                type: 'updateQuantumState',
                parameter: key,
                value: value / 100
            }).catch(error => {
                console.warn('Failed to update quantum state:', error);
            });
        });
    });

    // Function to safely send messages to content script
    async function sendQuantumMessage(message) {
        if (!contentScriptReady) {
            await checkContentScriptStatus();
            if (!contentScriptReady) {
                throw new Error('Content script not ready after status check');
            }
        }
        
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            if (!tab) {
                throw new Error('No active tab found');
            }
            if (!tab.url || tab.url.startsWith('chrome://')) {
                throw new Error('Cannot inject into chrome:// URLs');
            }
            
            const response = await chrome.tabs.sendMessage(tab.id, {
                ...message,
                timestamp: Date.now()
            }).catch(error => {
                throw new Error(`Message send failed: ${error.message}`);
            });
            
            return response;
        } catch (error) {
            console.warn('Quantum communication disrupted:', error);
            contentScriptReady = false;
            updateConnectionStatus('disconnected');
            throw error;
        }
    }

    // Check content script status
    async function checkContentScriptStatus() {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            if (!tab) return false;
            
            const response = await chrome.tabs.sendMessage(tab.id, {
                type: 'QUANTUM_PING',
                timestamp: Date.now()
            });
            
            contentScriptReady = response && response.type === 'QUANTUM_PONG';
            updateConnectionStatus(contentScriptReady ? 'connected' : 'disconnected');
            return contentScriptReady;
        } catch (error) {
            console.warn('Status check failed:', error);
            contentScriptReady = false;
            updateConnectionStatus('disconnected');
            return false;
        }
    }

    // Update connection status display
    function updateConnectionStatus(status) {
        const statsDiv = document.querySelector('.quantum-stats');
        let statusElement = document.getElementById('connectionStatus');
        
        if (!statusElement) {
            statusElement = document.createElement('p');
            statusElement.id = 'connectionStatus';
            statsDiv.insertBefore(statusElement, statsDiv.firstChild);
        }
        
        const statusText = status === 'connected' ? 
            '🟢 Quantum Link Stable' : '🔴 Quantum Link Disrupted';
        statusElement.innerHTML = `Connection: <span class="quantum-badge" style="background: ${
            status === 'connected' ? '#00ff9d' : '#ff6b6b'
        }">${statusText}</span>`;
    }

    // Update stats with enhanced error handling and retry logic
    async function updateQuantumStats() {
        let retries = 0;
        const maxRetries = 3;
        
        while (retries < maxRetries) {
            try {
                const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
                if (!tab?.id) throw new Error('No active tab');

                const response = await chrome.tabs.sendMessage(tab.id, {
                    type: 'GET_QUANTUM_STATS',
                    timestamp: Date.now()
                });

                if (response && typeof response === 'object') {
                    // Validate and display stats
                    const shardCount = document.getElementById('shardCount');
                    const catCount = document.getElementById('catCount');
                    const fieldStability = document.getElementById('fieldStability');

                    // Ensure numeric values and proper formatting
                    if (shardCount) {
                        const shards = parseInt(response.shards);
                        shardCount.textContent = !isNaN(shards) ? 
                            (shards > 42 ? '∞' : shards) : '0';
                    }
                    
                    if (catCount) {
                        const cats = parseInt(response.cats);
                        catCount.textContent = !isNaN(cats) ? 
                            (cats > 99 ? 'ℵ₀' : cats) : '0';
                    }
                    
                    if (fieldStability) {
                        const stability = parseInt(response.stability);
                        fieldStability.textContent = !isNaN(stability) ? 
                            (stability > 98 ? 'ψ' : `${stability}%`) : '0%';
                    }
                    
                    console.debug('Stats updated:', response);
                    return;
                }
                throw new Error('Invalid stats response');
            } catch (error) {
                console.warn(`Retry ${retries + 1}/${maxRetries} failed:`, error);
                retries++;
                if (retries < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 500 * retries));
                }
            }
        }
        
        // Set error state after all retries fail
        const elements = ['shardCount', 'catCount', 'fieldStability'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = '0';
        });
    }

    // Update stats periodically with dynamic interval
    let statsInterval;
    
    function startStatsUpdates() {
        updateQuantumStats(); // Initial update
        statsInterval = setInterval(updateQuantumStats, 1000);
    }
    
    // Start updates when ready
    if (contentScriptReady) {
        startStatsUpdates();
    } else {
        // Wait for ready message
        chrome.runtime.onMessage.addListener((message) => {
            if (message.type === 'QUANTUM_READY') {
                contentScriptReady = true;
                startStatsUpdates();
            }
        });
    }

    // Cleanup interval when popup closes
    window.addEventListener('unload', () => {
        clearInterval(statsInterval);
    });

    // Blacklist management
    const domainInput = document.getElementById('domainInput');
    const addDomainButton = document.getElementById('addDomain');
    const blacklistContainer = document.getElementById('blacklistContainer');

    function updateBlacklist() {
        chrome.storage.local.get('blacklistedDomains', (data) => {
            const domains = data.blacklistedDomains || [];
            blacklistContainer.innerHTML = domains.map(domain => `
                <div class="blacklist-item">
                    <span>${domain}</span>
                    <button data-domain="${domain}">×</button>
                </div>
            `).join('');

            // Add remove handlers
            blacklistContainer.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', () => {
                    const domain = button.dataset.domain;
                    const updatedDomains = domains.filter(d => d !== domain);
                    chrome.storage.local.set({ blacklistedDomains: updatedDomains }, updateBlacklist);
                });
            });
        });
    }

    addDomainButton.addEventListener('click', () => {
        const domain = domainInput.value.trim().toLowerCase();
        if (domain) {
            chrome.storage.local.get('blacklistedDomains', (data) => {
                const domains = data.blacklistedDomains || [];
                if (!domains.includes(domain)) {
                    domains.push(domain);
                    chrome.storage.local.set({ blacklistedDomains: domains }, () => {
                        domainInput.value = '';
                        updateBlacklist();
                    });
                }
            });
        }
    });

    // Initial blacklist load
    updateBlacklist();

    // Add quantum hover effects
    document.querySelectorAll('.quantum-control').forEach(control => {
        control.addEventListener('mouseover', () => {
            const randomHue = Math.random() * 360;
            control.style.boxShadow = `0 0 15px hsla(${randomHue}, 100%, 50%, 0.3)`;
        });
        
        control.addEventListener('mouseout', () => {
            control.style.boxShadow = '';
        });
    });
});
