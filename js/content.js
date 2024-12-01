// Quantum Reality Manipulation Layer
const QUANTUM_CONSTANTS = {
    PLANCK_LENGTH: 1.616255e-35,
    CAT_SUPERPOSITION_THRESHOLD: 0.42,
    REALITY_REFRESH_RATE: 16.7,
    MANIFESTATION_DECAY: 0.98
};

let quantumState, catGenerator;
let realityObserver;

// Inject quantum styling into reality
function injectQuantumStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .quantum-cat {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            filter: drop-shadow(0 0 8px rgba(158, 0, 255, 0.4));
            opacity: 0.85;
        }
        .quantum-cat.manifesting {
            animation: manifestation 0.5s ease-out forwards;
        }
        @keyframes manifestation {
            from {
                transform: scale(0) rotate(-180deg);
                opacity: 0;
            }
            to {
                transform: scale(1) rotate(0);
                opacity: 0.85;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize quantum field and establish reality observation
function initializeQuantumField() {
    realityObserver = new MutationObserver(handleRealityFluctuation);
    
    const observerConfig = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'style']
    };
    
    realityObserver.observe(document.body, observerConfig);
    injectQuantumStyles();
    
    console.log('🌌 Quantum field initialized');
    console.log('🐱 Ready for cat manifestation');
}

// Handle reality fluctuations (DOM mutations)
function handleRealityFluctuation(mutations) {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            // Handle new nodes
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Evaluate node influence on quantum state based on element type
                    const influenceScore = (node.tagName === 'IMG' || node.tagName === 'VIDEO') ? 0.8 : 0.3;
                    quantumState.parameters.coherence *= (1 + influenceScore * 0.1);
                    
                    // Manifest cats with probability adjusted by node influence
                    if (Math.random() < QUANTUM_CONSTANTS.CAT_SUPERPOSITION_THRESHOLD) {
                        const params = {
                            position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
                            size: Math.random() * 100 + 50,
                            phase: Math.random() * Math.PI * 2,
                            coherence: quantumState.parameters.coherence
                        };
                        catGenerator.generateCatSVG(params);
                    }
                }
            });
        }
    }
}

// Check if extension context is valid
function isExtensionContextValid() {
    try {
        // Attempt to access chrome.runtime
        return chrome.runtime && chrome.runtime.id;
    } catch (e) {
        return false;
    }
}

// Check if current site is blacklisted
function isBlacklisted() {
    const currentDomain = window.location.hostname.replace('www.', '');
    return BLACKLISTED_DOMAINS.some(domain => 
        currentDomain.includes(domain)
    );
}

// Initialize quantum reality
function initializeQuantumReality() {
    try {
        if (!isExtensionContextValid()) {
            throw new Error('Extension context invalid');
        }

        // Check blacklist before proceeding
        if (isBlacklisted()) {
            console.log('Site blacklisted, quantum cats contained');
            return;
        }

        quantumState = new QuantumStateManager();
        catGenerator = new CatGenerator(quantumState);
        initializeQuantumField();
        
        // Notify that content script is ready and establish heartbeat
        async function notifyReady() {
            if (!isExtensionContextValid()) {
                console.warn('Extension context invalid during heartbeat');
                return false;
            }

            try {
                await chrome.runtime.sendMessage({ 
                    type: 'QUANTUM_READY',
                    stats: {
                        shards: realityObserver ? realityObserver.takeRecords().length : 0,
                        cats: quantumState?.manifestedEntities.size ?? 0,
                        stability: Math.round(quantumState?.parameters.coherence * 100) ?? 0
                    }
                });
                return true;
            } catch (error) {
                // Ignore "receiving end does not exist" errors
                if (!error.message.includes("Receiving end does not exist")) {
                    console.warn('Failed to send heartbeat:', error);
                }
                return false;
            }
        }

        // Start heartbeat with enhanced context validation and recovery
        let heartbeatAttempts = 0;
        const MAX_HEARTBEAT_ATTEMPTS = 5;
        const HEARTBEAT_INTERVAL = 2000;
        const RECOVERY_DELAY = 5000;
        const MAX_RECOVERY_ATTEMPTS = 3;
        let recoveryAttempts = 0;
        
        function startHeartbeat() {
            return setInterval(async () => {
                try {
                    // Verify extension context before each heartbeat
                    if (!chrome?.runtime?.id) {
                        throw new Error('Extension context invalid');
                    }

                    const success = await notifyReady();
                    
                    if (success) {
                        heartbeatAttempts = 0;
                        recoveryAttempts = 0; // Reset recovery counter on success
                    } else {
                        heartbeatAttempts++;
                        if (heartbeatAttempts >= MAX_HEARTBEAT_ATTEMPTS) {
                            throw new Error('Max heartbeat attempts reached');
                        }
                    }
                } catch (err) {
                    console.warn('Heartbeat disrupted:', err);
                    clearInterval(heartbeatInterval);
                    
                    if (recoveryAttempts < MAX_RECOVERY_ATTEMPTS) {
                        scheduleHeartbeatRecovery();
                    } else {
                        console.error('Max recovery attempts reached, heartbeat permanently disabled');
                    }
                }
            }, HEARTBEAT_INTERVAL);
        }

        function scheduleHeartbeatRecovery() {
            recoveryAttempts++;
            console.log(`Attempting heartbeat recovery (${recoveryAttempts}/${MAX_RECOVERY_ATTEMPTS})...`);
            
            setTimeout(() => {
                heartbeatAttempts = 0;
                if (chrome?.runtime?.id) {
                    heartbeatInterval = startHeartbeat();
                } else {
                    console.warn('Extension context still invalid, recovery failed');
                    if (recoveryAttempts < MAX_RECOVERY_ATTEMPTS) {
                        scheduleHeartbeatRecovery();
                    }
                }
            }, RECOVERY_DELAY);
        }

        let heartbeatInterval = startHeartbeat();

        // Initial ready notification
        notifyReady();
    } catch (err) {
        console.warn('Quantum initialization failed:', err);
        // Cleanup on failure
        if (realityObserver) {
            realityObserver.disconnect();
        }
    }
}
    
    // Handle ping messages with context validation
    const messageHandler = (message, sender, sendResponse) => {
        if (!isExtensionContextValid()) {
            console.warn('Extension context invalid during message handling');
            return;
        }

        if (message.type === 'QUANTUM_PING') {
            sendResponse({ 
                type: 'QUANTUM_PONG',
                timestamp: Date.now()
            });
            return true; // Keep channel open for async response
        }
    };

    chrome.runtime.onMessage.addListener(messageHandler);

    // Start quantum maintenance with robust context validation and recovery
    let maintenanceInterval;
    
    function startMaintenanceLoop() {
        if (maintenanceInterval) {
            clearInterval(maintenanceInterval);
        }
        
        maintenanceInterval = setInterval(() => {
            try {
                if (!chrome?.runtime?.id) {
                    throw new Error('Extension context invalid');
                }
                
                if (quantumState) {
                    quantumState.maintainQuantumCoherence();
                }
            } catch (err) {
                console.warn('Maintenance disrupted:', err);
                clearInterval(maintenanceInterval);
                // Attempt recovery after delay
                setTimeout(startMaintenanceLoop, 5000);
            }
        }, 30000);
    }
    
    startMaintenanceLoop();

// Handle initialization failures
function handleInitializationError(err) {
    console.error('Quantum fluctuation detected:', err);
    // Attempt recovery
    setTimeout(() => {
        if (isExtensionContextValid()) {
            console.log('Attempting quantum reality recovery...');
            initializeQuantumReality();
        }
    }, 5000);
}

// Initial initialization with error handling
try {
    initializeQuantumReality();
} catch (err) {
    handleInitializationError(err);
}
