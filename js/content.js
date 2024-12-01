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

// Enhanced extension context validation
function isExtensionContextValid() {
    try {
        // Check basic extension context
        if (!chrome?.runtime?.id) {
            return false;
        }

        // Validate DOM readiness
        if (!document?.body) {
            return false;
        }

        // Check for restricted protocols
        const protocol = window.location.protocol;
        if (protocol.startsWith('chrome-') || 
            protocol.startsWith('about:') || 
            protocol.startsWith('chrome:')) {
            return false;
        }

        // Verify we can access runtime APIs
        const canAccessRuntime = chrome.runtime && 
                               typeof chrome.runtime.sendMessage === 'function' &&
                               typeof chrome.runtime.onMessage?.addListener === 'function';
        if (!canAccessRuntime) {
            return false;
        }

        return true;
    } catch (e) {
        console.debug('Context validation failed:', e.message);
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

// Initialize quantum reality with enhanced validation
function initializeQuantumReality() {
    const MAX_INIT_ATTEMPTS = 3;
    let initAttempts = 0;

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

    function attemptInitialization() {
        try {
            if (!isExtensionContextValid()) {
                throw new Error('Extension context invalid');
            }

            // Check blacklist before proceeding
            if (isBlacklisted()) {
                console.log('Site blacklisted, quantum cats contained');
                return;
            }

            // Ensure clean state
            if (realityObserver) {
                realityObserver.disconnect();
            }
            
            // Wait for DOM to be fully ready
            if (document.readyState !== 'complete') {
                window.addEventListener('load', () => attemptInitialization());
                return;
            }

            quantumState = new QuantumStateManager();
            catGenerator = new CatGenerator(quantumState);
            initializeQuantumField();
            
            // Reset attempt counter on success
            initAttempts = 0;
            
            // Initial ready notification
            notifyReady();
            
            console.log('🌌 Quantum reality initialized successfully');
        } catch (err) {
            console.warn(`Initialization attempt ${initAttempts + 1}/${MAX_INIT_ATTEMPTS} failed:`, err);
            
            if (++initAttempts < MAX_INIT_ATTEMPTS) {
                setTimeout(() => attemptInitialization(), 2000 * initAttempts);
            } else {
                console.error('Max initialization attempts reached');
            }
        }
    }

    // Start initialization process
    attemptInitialization();

        // Simplified heartbeat mechanism
        const HEARTBEAT_INTERVAL = 2000;
        
        let heartbeatInterval = setInterval(async () => {
            try {
                if (isExtensionContextValid()) {
                    await notifyReady();
                }
            } catch (err) {
                // Ignore connection errors
                if (!err.message.includes("Receiving end does not exist")) {
                    console.debug('Heartbeat skipped:', err.message);
                }
            }
        }, HEARTBEAT_INTERVAL);

        // Initial ready notification
        notifyReady();
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
            return true;
        }
    
        if (message.type === 'GET_QUANTUM_STATS') {
            const records = realityObserver?.takeRecords() || [];
            const activeShards = records.filter(m => 
                Date.now() - m.timestamp < 5000
            ).length;
        
            sendResponse({
                shards: activeShards,
                cats: quantumState?.manifestedEntities.size ?? 0,
                stability: Math.round((quantumState?.parameters.coherence ?? 0) * 100)
            });
            return true;
        }
    };

    chrome.runtime.onMessage.addListener(messageHandler);

    // Simplified maintenance loop
    const maintenanceInterval = setInterval(() => {
        if (isExtensionContextValid() && quantumState) {
            quantumState.maintainQuantumCoherence();
        }
    }, 30000);

// Enhanced initialization error handling
function handleInitializationError(err) {
    console.warn('Quantum fluctuation detected:', err);
    
    const MAX_RECOVERY_ATTEMPTS = 3;
    let recoveryAttempts = 0;
    
    function attemptRecovery() {
        if (recoveryAttempts >= MAX_RECOVERY_ATTEMPTS) {
            console.error('Max recovery attempts reached, quantum state unstable');
            return;
        }
        
        recoveryAttempts++;
        console.log(`Attempting quantum reality recovery (${recoveryAttempts}/${MAX_RECOVERY_ATTEMPTS})...`);
        
        // Check context before attempting recovery
        if (!isExtensionContextValid()) {
            console.debug('Context still invalid, delaying recovery...');
            setTimeout(attemptRecovery, 2000 * recoveryAttempts);
            return;
        }
        
        try {
            // Clean up existing state
            if (realityObserver) {
                realityObserver.disconnect();
            }
            
            // Attempt reinitialization
            initializeQuantumReality();
            recoveryAttempts = 0; // Reset on successful recovery
        } catch (recoveryErr) {
            console.warn('Recovery attempt failed:', recoveryErr);
            setTimeout(attemptRecovery, 2000 * recoveryAttempts);
        }
    }
    
    // Start recovery process
    setTimeout(attemptRecovery, 1000);
}

// Initial initialization with error handling
try {
    initializeQuantumReality();
} catch (err) {
    handleInitializationError(err);
}
