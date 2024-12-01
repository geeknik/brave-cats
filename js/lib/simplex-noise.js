// Enhanced SimplexNoise implementation for quantum cat manifestation
class SimplexNoise {
    constructor(r = Math.random) {
        this.p = new Uint8Array(256);
        this.perm = new Uint8Array(512);
        this.permMod12 = new Uint8Array(512);
        this.grad3 = new Float32Array([
            1,1,0, -1,1,0, 1,-1,0, -1,-1,0,
            1,0,1, -1,0,1, 1,0,-1, -1,0,-1,
            0,1,1, 0,-1,1, 0,1,-1, 0,-1,-1
        ]);
        
        // Initialize permutation tables
        for (let i = 0; i < 256; i++) this.p[i] = i;
        for (let i = 255; i > 0; i--) {
            const n = Math.floor((i + 1) * r());
            [this.p[i], this.p[n]] = [this.p[n], this.p[i]];
        }
        
        // Extend permutation tables
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
            this.permMod12[i] = this.perm[i] % 12;
        }
    }

    noise3D(x, y, z) {
        const F3 = 1/3, G3 = 1/6;
        const s = (x + y + z) * F3;
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const k = Math.floor(z + s);
        const t = (i + j + k) * G3;
        
        const X0 = i - t;
        const Y0 = j - t;
        const Z0 = k - t;
        
        const x0 = x - X0;
        const y0 = y - Y0;
        const z0 = z - Z0;
        
        // Determine tetrahedron configuration
        let i1, j1, k1, i2, j2, k2;
        if (x0 >= y0) {
            if (y0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
            else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
            else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
        } else {
            if (y0 < z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
            else if (x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
            else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
        }
        
        // Calculate corners
        const x1 = x0 - i1 + G3;
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2*G3;
        const y2 = y0 - j2 + 2*G3;
        const z2 = z0 - k2 + 2*G3;
        const x3 = x0 - 1 + 3*G3;
        const y3 = y0 - 1 + 3*G3;
        const z3 = z0 - 1 + 3*G3;
        
        // Calculate noise contributions
        const n0 = this.gradP(i, j, k, x0, y0, z0);
        const n1 = this.gradP(i+i1, j+j1, k+k1, x1, y1, z1);
        const n2 = this.gradP(i+i2, j+j2, k+k2, x2, y2, z2);
        const n3 = this.gradP(i+1, j+1, k+1, x3, y3, z3);
        
        // Sum up and scale the result
        return 32 * (n0 + n1 + n2 + n3);
    }

    gradP(i, j, k, x, y, z) {
        const gi = this.permMod12[i + this.perm[j + this.perm[k]]] * 3;
        return this.grad3[gi]*x + this.grad3[gi+1]*y + this.grad3[gi+2]*z;
    }
}

// Export for quantum entanglement
window.SimplexNoise = SimplexNoise;
