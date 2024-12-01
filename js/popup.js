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

// Initialize quantum controls
document.addEventListener('DOMContentLoaded', () => {
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
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            if (!tab) {
                console.warn('No active tab found');
                return null;
            }
            return await chrome.tabs.sendMessage(tab.id, message);
        } catch (error) {
            console.warn('Quantum communication disrupted:', error);
            return null;
        }
    }

    // Update stats with error handling
    async function updateQuantumStats() {
        const response = await sendQuantumMessage({type: 'getQuantumStats'});
        if (response) {
            document.getElementById('shardCount').textContent = 
                response.shards > 42 ? '∞' : response.shards;
            document.getElementById('catCount').textContent = 
                response.cats > 99 ? 'ℵ₀' : response.cats;
            document.getElementById('fieldStability').textContent = 
                response.stability > 98 ? 'ψ' : `${response.stability}%`;
        } else {
            // Set default values if communication fails
            document.getElementById('shardCount').textContent = '?';
            document.getElementById('catCount').textContent = '?';
            document.getElementById('fieldStability').textContent = '?';
        }
    }

    // Update stats periodically with error handling
    const statsInterval = setInterval(updateQuantumStats, 1000);

    // Cleanup interval when popup closes
    window.addEventListener('unload', () => {
        clearInterval(statsInterval);
    });

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
