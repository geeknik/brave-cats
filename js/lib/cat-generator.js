// Quantum Cat Generation Engine
class CatGenerator {
    constructor(quantumState) {
        this.state = quantumState;
        this.svgNS = "http://www.w3.org/2000/svg";
    }

    generateCatSVG(params) {
        const { position, size, phase, coherence } = params;
        
        // Create quantum-entangled SVG container
        const svg = document.createElementNS(this.svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.classList.add("quantum-cat");
        svg.style.left = `${position.x}px`;
        svg.style.top = `${position.y}px`;

        // Generate quantum-influenced control points for cat silhouette
        const points = this.generateQuantumControlPoints(phase);
        
        // Create cat components
        const body = this.createCatBody(points);
        const ears = this.createCatEars(points);
        const tail = this.createCatTail(points, phase);

        // Assemble cat entity
        svg.appendChild(body);
        ears.forEach(ear => svg.appendChild(ear));
        svg.appendChild(tail);
        
        // Apply quantum effects
        this.applyQuantumEffects(svg, coherence);
        
        return svg;
    }

    generateQuantumControlPoints(phase) {
        // Generate base control points for cat shape
        return {
            body: {
                x1: 20 + Math.sin(phase) * 5,
                y1: 50 + Math.cos(phase) * 3,
                x2: 80 + Math.sin(phase + Math.PI) * 5,
                y2: 50 + Math.cos(phase + Math.PI) * 3
            },
            head: {
                x: 75 + Math.sin(phase) * 3,
                y: 45 + Math.cos(phase) * 2
            },
            tail: {
                x1: 25 + Math.sin(phase) * 8,
                y1: 45 + Math.cos(phase) * 5,
                x2: 15 + Math.sin(phase + Math.PI/4) * 10,
                y2: 35 + Math.cos(phase + Math.PI/4) * 8
            }
        };
    }

    createCatBody(points) {
        const path = document.createElementNS(this.svgNS, "path");
        const d = `
            M ${points.body.x1},${points.body.y1}
            Q ${points.head.x},${points.head.y} ${points.body.x2},${points.body.y2}
            C ${points.body.x2-10},${points.body.y2+10} 
              ${points.body.x1+10},${points.body.y1+10}
              ${points.body.x1},${points.body.y1}
            Z
        `;
        path.setAttribute("d", d);
        path.setAttribute("fill", "#333");
        return path;
    }

    createCatEars(points) {
        const ears = [];
        // Left ear
        const leftEar = document.createElementNS(this.svgNS, "path");
        leftEar.setAttribute("d", `
            M ${points.head.x-15},${points.head.y-5}
            L ${points.head.x-8},${points.head.y-15}
            L ${points.head.x-5},${points.head.y-3}
            Z
        `);
        leftEar.setAttribute("fill", "#333");
        
        // Right ear
        const rightEar = document.createElementNS(this.svgNS, "path");
        rightEar.setAttribute("d", `
            M ${points.head.x+5},${points.head.y-5}
            L ${points.head.x+12},${points.head.y-15}
            L ${points.head.x+15},${points.head.y-3}
            Z
        `);
        rightEar.setAttribute("fill", "#333");
        
        ears.push(leftEar, rightEar);
        return ears;
    }

    createCatTail(points, phase) {
        const tail = document.createElementNS(this.svgNS, "path");
        const d = `
            M ${points.tail.x1},${points.tail.y1}
            Q ${points.tail.x2},${points.tail.y2}
              ${points.tail.x2 + Math.sin(phase)*10},${points.tail.y2 + Math.cos(phase)*10}
        `;
        tail.setAttribute("d", d);
        tail.setAttribute("stroke", "#333");
        tail.setAttribute("stroke-width", "4");
        tail.setAttribute("fill", "none");
        return tail;
    }

    applyQuantumEffects(svg, coherence) {
        // Determine if this cat should have special glow effects (30% chance)
        const hasSpecialGlow = Math.random() < 0.3;
        
        if (hasSpecialGlow) {
            // Generate random color for special glow
            const specialHue = Math.floor(Math.random() * 360);
            const specialSaturation = 70 + Math.random() * 30;
            const specialLightness = 50 + Math.random() * 20;
            
            // Apply enhanced glow effect
            svg.style.filter = `
                drop-shadow(0 0 ${coherence * 15}px hsl(${specialHue}, ${specialSaturation}%, ${specialLightness}%))
                brightness(1.2)
            `;
            
            // Add subtle color tint to the cat
            svg.querySelectorAll('path').forEach(path => {
                const currentFill = path.getAttribute('fill');
                if (currentFill === '#333') {
                    const tintHue = (specialHue + 30) % 360;
                    path.setAttribute('fill', `hsl(${tintHue}, 30%, 20%)`);
                }
            });
        } else {
            // Standard quantum effects
            const hue = Math.floor(coherence * 270);
            svg.style.filter = `drop-shadow(0 0 ${coherence * 10}px hsl(${hue}, 100%, 50%))`;
        }
        
        svg.classList.add('manifesting');
        
        // Add to DOM
        document.body.appendChild(svg);
    }
}

// Export for quantum entanglement
window.CatGenerator = CatGenerator;
