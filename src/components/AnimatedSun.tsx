import { useEffect, useRef } from 'react';

export const AnimatedSun = ({ health }: { health: number }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const healthRef = useRef(health);
    healthRef.current = health;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = 320, H = 320;
        const PX = 6;
        const CX = W / 2, CY = H / 2;
        let animId: number;
        let tick = 0;

        function circle(cx: number, cy: number, r: number, color: string, alpha: number = 1) {
            ctx!.globalAlpha = alpha;
            ctx!.fillStyle = color;
            for (let y = -r; y <= r; y += PX) {
                for (let x = -r; x <= r; x += PX) {
                    if (x * x + y * y <= r * r) {
                        ctx!.fillRect(
                            Math.round((cx + x) / PX) * PX,
                            Math.round((cy + y) / PX) * PX,
                            PX, PX
                        );
                    }
                }
            }
            ctx!.globalAlpha = 1;
        }

        function dot(x: number, y: number, color: string, alpha: number = 1) {
            ctx!.globalAlpha = alpha;
            ctx!.fillStyle = color;
            ctx!.fillRect(Math.round(x / PX) * PX, Math.round(y / PX) * PX, PX, PX);
            ctx!.globalAlpha = 1;
        }

        function rng(seed: number) {
            return ((Math.sin(seed * 127.1) * 43758.5453) % 1 + 1) % 1;
        }

        function drawSun(t: number) {
            ctx!.clearRect(0, 0, W, H);

            const h = healthRef.current;
            const power = ((14 - h) / 14) * 100;
            const p = power / 100;
            const stage = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;

            const CORE_C = ['#ffffff', '#ffe0a0', '#ff6600', '#cc1100'][stage];
            const HOT1_C = ['#fffde0', '#ffc060', '#ee3300', '#880000'][stage];
            const HOT2_C = ['#fff4a0', '#ff9040', '#cc1100', '#550000'][stage];
            const MID1_C = ['#ffd640', '#ff7020', '#991100', '#330000'][stage];
            const MID2_C = ['#ffb800', '#ff4400', '#660800', '#1a0000'][stage];
            const WARM1_C = ['#ff8800', '#dd2200', '#440400', '#0d0000'][stage];
            const EDGE_C = ['#ff5500', '#aa1100', '#220200', '#050000'][stage];
            const SPOT_C = ['#992200', '#cc0000', '#ff2200', '#ff0000'][stage];
            const SPOT2_C = ['#551100', '#880000', '#dd0000', '#ff4400'][stage];

            const R = 96 - p * 12;
            const pulseSpeed = 0.04 + p * 0.12;
            const pulseAmt = 1 + p * 4;
            const wobble = Math.sin(t * pulseSpeed) * pulseAmt;

            circle(CX, CY, R + wobble, EDGE_C);
            circle(CX, CY, R - PX, WARM1_C);
            circle(CX, CY, R - PX * 3, MID2_C);
            circle(CX, CY, R - PX * 5, MID1_C);
            circle(CX, CY, R - PX * 8, HOT2_C);
            circle(CX, CY, R - PX * 11, HOT1_C);
            circle(CX, CY, R - PX * 14, CORE_C);

            const spotCount = 2 + stage * 2;
            const spotDefs = [
                { ox: -22, oy: 16, r: 12 },
                { ox: 26, oy: -12, r: 9 },
                { ox: -4, oy: -28, r: 7 },
                { ox: 14, oy: 26, r: 6 },
                { ox: -30, oy: -5, r: 8 },
                { ox: 18, oy: -30, r: 6 },
                { ox: -14, oy: 30, r: 5 },
                { ox: 32, oy: 14, r: 7 },
            ];
            for (let i = 0; i < spotCount && i < spotDefs.length; i++) {
                const s = spotDefs[i];
                circle(CX + s.ox, CY + s.oy, s.r + 2, SPOT2_C);
                circle(CX + s.ox, CY + s.oy, s.r, SPOT_C);
            }

            if (stage >= 2) {
                const crackAlpha = Math.min(1, (p - 0.5) * 4);
                const cracks = [
                    [[0, 0], [-8, -16], [-16, -30], [-20, -44]],
                    [[0, 0], [12, 10], [22, 18], [32, 24]],
                    [[0, 0], [-14, 10], [-26, 18], [-32, 24]],
                    [[0, 0], [6, -18], [10, -34], [14, -48]],
                    [[0, 0], [-6, 20], [-10, 34], [-8, 46]],
                ];
                cracks.forEach((pts, ci) => {
                    pts.forEach(([dx, dy], si) => {
                        const jx = rng(ci * 50 + si * 3) * 4 - 2;
                        const jy = rng(ci * 50 + si * 3 + 1) * 4 - 2;
                        dot(CX + dx + jx, CY + dy + jy, '#ff3300', crackAlpha * 0.9);
                        dot(CX + dx + jx + PX, CY + dy + jy, '#1a0000', crackAlpha * 0.6);
                    });
                });
            }

            if (stage >= 3) {
                const flicker = (Math.sin(t * 0.7) > 0.2) ? 1 : 0.2;
                circle(CX, CY, R - PX * 14, '#ff1100', flicker * 0.8);
                const voidSeeds = [[10, -8], [-12, 6], [4, 14], [-6, -14], [14, 4]];
                voidSeeds.forEach(([dx, dy], i) => {
                    const vr = 8 + Math.sin(t * 0.1 + i) * 3;
                    circle(CX + dx, CY + dy, vr, '#000000', 0.75);
                });
            }

            // Minimal pixel solar radiation
            const flareColors = ['#ffdd00', '#ffaa00', '#ff5500', '#ff2200', '#cc0000'];
            for (let i = 0; i < 10; i++) {
                const angle = t * 0.018 + i * (Math.PI * 2 / 10);
                const dist = R + PX * 3 + Math.sin(t * 0.04 + i * 1.3) * PX;
                dot(CX + Math.cos(angle) * dist, CY + Math.sin(angle) * dist, flareColors[i % 5], 0.55);
            }
        }

        const animate = () => {
            tick++;
            drawSun(tick);
            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => cancelAnimationFrame(animId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <canvas
            ref={canvasRef}
            width={320}
            height={320}
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,216,53,0.4)] transition-all duration-300"
            style={{ imageRendering: 'pixelated' }}
        />
    );
};
