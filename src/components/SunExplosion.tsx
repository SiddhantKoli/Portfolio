import { useEffect, useRef } from 'react';

export const SunExplosion = ({ onComplete }: { onComplete: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const COLS = ['#ffdd00', '#ffaa00', '#ff5500', '#ff2200', '#cc0000'];
        const particles: any[] = [];

        for (let i = 0; i < 380; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 16;
            particles.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
                color: COLS[Math.floor(Math.random() * COLS.length)],
                size: [4, 6, 8, 10, 12, 16, 20][Math.floor(Math.random() * 7)],
                life: 1,
                decay: 0.005 + Math.random() * 0.013,
                gravity: 0.07 + Math.random() * 0.14,
            });
        }

        let shockR = 0, frame = 0;
        let animId: number;

        function blastFrame() {
            frame++;
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

            // White flash
            if (frame < 10) {
                ctx!.fillStyle = `rgba(255,220,80,${(10 - frame) / 10 * 0.95})`;
                ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
            }

            // Shockwaves
            shockR += 22;
            if (shockR < Math.max(canvas!.width, canvas!.height) * 1.5) {
                ctx!.beginPath();
                ctx!.arc(cx, cy, shockR, 0, Math.PI * 2);
                ctx!.strokeStyle = `rgba(255,160,0,${Math.max(0, 0.7 - shockR / 600)})`;
                ctx!.lineWidth = 10;
                ctx!.stroke();
            }

            // Particles
            particles.forEach(p => {
                if (p.life <= 0) return;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.vx *= 0.99;
                p.life -= p.decay;

                ctx!.fillStyle = p.color;
                ctx!.globalAlpha = Math.max(0, p.life);
                // Pixelated chunks
                ctx!.fillRect(Math.round(p.x / 4) * 4, Math.round(p.y / 4) * 4, p.size, p.size);
            });
            ctx!.globalAlpha = 1;

            const allDead = particles.every(p => p.life <= 0);

            if (!allDead || frame < 40) {
                animId = requestAnimationFrame(blastFrame);
            } else {
                // Done
                setTimeout(() => {
                    onComplete();
                }, 500);
            }
        }

        animId = requestAnimationFrame(blastFrame);

        return () => {
            cancelAnimationFrame(animId);
        };
    }, [onComplete]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[100] w-full h-full pointer-events-none transition-opacity duration-1000"
            style={{ imageRendering: 'pixelated' }}
        />
    );
};
