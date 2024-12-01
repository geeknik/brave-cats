// Quantum Cat Overlay Engine - Background Service Worker
// Manages state and coordinates cat manifestations across reality planes

const QUANTUM_STATES = {
  OBSERVING: 'observing',
  MANIFESTING: 'manifesting',
  COLLAPSED: 'collapsed'
};

let currentState = QUANTUM_STATES.OBSERVING;

// Initialize quantum observer
chrome.runtime.onInstalled.addListener(() => {
  console.log('🐱 Quantum Cat Overlay Engine initialized');
  establishQuantumField();
});

// Establish quantum field for cat manifestations
function establishQuantumField() {
  chrome.storage.local.set({
    catDensity: 1.0,
    quantumSeed: Math.random(),
    realityDistortion: 0.5
  });
}

// Listen for reality-warping messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'MANIFEST_CAT':
      handleCatManifestation(message.data, sender.tab);
      break;
    case 'COLLAPSE_WAVE_FUNCTION':
      collapseWaveFunction(sender.tab);
      break;
    case 'UPDATE_QUANTUM_FIELD':
      updateQuantumField(message.data);
      break;
  }
  return true;
});

// Handle cat manifestation requests
async function handleCatManifestation(data, tab) {
  if (currentState === QUANTUM_STATES.MANIFESTING) return;
  
  currentState = QUANTUM_STATES.MANIFESTING;
  
  const quantumField = await chrome.storage.local.get([
    'catDensity',
    'quantumSeed',
    'realityDistortion'
  ]);
  
  // Calculate quantum cat parameters
  const catParameters = computeCatParameters(quantumField, data);
  
  // Inject cat into target reality plane
  chrome.tabs.sendMessage(tab.id, {
    type: 'MANIFEST_CAT_AT_COORDINATES',
    data: catParameters
  });
  
  currentState = QUANTUM_STATES.OBSERVING;
}

// Compute quantum-entangled cat parameters
function computeCatParameters(field, targetData) {
  return {
    position: {
      x: targetData.x + (Math.random() - 0.5) * field.realityDistortion,
      y: targetData.y + (Math.random() - 0.5) * field.realityDistortion
    },
    size: Math.max(30, Math.min(150, targetData.targetSize * field.catDensity)),
    rotationPhase: Math.random() * Math.PI * 2,
    quantumState: generateQuantumState(field.quantumSeed)
  };
}

// Generate quantum state for cat manifestation
function generateQuantumState(seed) {
  const basis = new Uint8Array(16);
  crypto.getRandomValues(basis);
  return Array.from(basis)
    .map(x => x % 2 ? '1' : '0')
    .join('');
}

// Update quantum field parameters
function updateQuantumField(newParameters) {
  chrome.storage.local.set(newParameters);
}