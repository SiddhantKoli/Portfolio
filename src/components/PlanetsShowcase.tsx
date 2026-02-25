import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, MotionValue } from 'framer-motion';

const PLANETS = [
    {
        id: 'mercury', name: 'Mercury', light: '#a8a8a8', base: '#8b8b8b', dark: '#636363', radius: 20,
        project: {
            title: "NEURAL CORE",
            desc: "A lightweight AI processing engine optimized for edge devices and low-latency environments.",
            link: "https://github.com"
        },
        map: [
            "   11111111   ",
            " 111111111111 ",
            " 133222223331 ",
            "13332222233333",
            "22222233322223",
            "22333222223333",
            "22333222223333",
            "22222233322223",
            "22333333333333",
            "22222222233333",
            " 222222233333 ",
            " 113333333333 ",
            "   33333333   "
        ]
    },
    {
        id: 'venus', name: 'Venus', light: '#ffd269', base: '#e6af43', dark: '#b38122', radius: 26,
        project: {
            title: "ATMOS ENGINE",
            desc: "Real-time weather atmospheric simulation for procedural world generation.",
            link: "https://github.com"
        },
        map: [
            "   11111111   ",
            " 111111111122 ",
            " 122222222221 ",
            "22111111122223",
            "22222222211113",
            "22211111122223",
            "22222222222223",
            "33322211111223",
            "33322222222223",
            "22222211133333",
            " 222222233333 ",
            " 333333333333 ",
            "   33333333   "
        ]
    },
    {
        id: 'earth', name: 'Earth', light: '#6ab0ff', base: '#3d7bda', dark: '#244c8f', land: '#4ade80', landDark: '#166534', radius: 30,
        project: {
            title: "TERRA FIRMA",
            desc: "A global sustainability platform tracking ecological shifts using satellite telemetry.",
            link: "https://github.com"
        },
        map: [
            "   11111111   ",
            " 111144411111 ",
            " 155444445551 ",
            "15544444444443",
            "22244455444443",
            "22224444422223",
            "22244444444223",
            "22444442222233",
            "22445544422233",
            "22244444233333",
            " 222244233333 ",
            " 222333333333 ",
            "   33333333   "
        ]
    },
    {
        id: 'mars', name: 'Mars', light: '#ff6230', base: '#d13a0c', dark: '#8f2607', radius: 24,
        project: {
            title: "ROVER OS",
            desc: "A robust operating system designed for remote autonomous exploratory vehicles.",
            link: "https://github.com"
        },
        map: [
            "   11111111   ",
            " 111111111111 ",
            " 133222233331 ",
            "13332222333333",
            "22221112222223",
            "22333332223333",
            "22333332223333",
            "22221112222223",
            "23333333333333",
            "22111222233333",
            " 222222233333 ",
            " 333333333333 ",
            "   33333333   "
        ]
    },
    {
        id: 'jupiter', name: 'Jupiter', light: '#ffb24d', base: '#d98616', dark: '#9c5e0b', spot: '#ff4f4f', radius: 42,
        project: {
            title: "STORM WATCH",
            desc: "A high-performance data processing pipeline for real-time storm tracking and analysis.",
            link: "https://github.com"
        },
        map: [
            "   11111111   ",
            " 111111111111 ",
            " 111111111111 ",
            "33333333333333",
            "22222222222222",
            "11111111111111",
            "22225552222222",
            "22255555222222",
            "22225552222222",
            "33333333333333",
            " 222222222222 ",
            " 333333333333 ",
            "   33333333   "
        ]
    },
    {
        id: 'saturn', name: 'Saturn', light: '#f2dc88', base: '#c7b056', dark: '#8f7d3a', ring: '#6c6242', radius: 40,
        project: {
            title: "ORBITAL NET",
            desc: "Decentralized communication protocol for interstellar mesh networking.",
            link: "https://github.com"
        },
        map: [
            "      111111      ",
            "    1111111111    ",
            "    1111111111    ",
            "   333333333333   ",
            "   222222222222   ",
            "666666666666666666",
            "   111111111111   ",
            "   222222222222   ",
            "   333333333333   ",
            "    2222222222    ",
            "    3333333333    ",
            "      333333      "
        ]
    },
    {
        id: 'uranus', name: 'Uranus', light: '#86ded1', base: '#55b3a5', dark: '#377a70', radius: 32,
        project: {
            title: "CRYOGEN CORE",
            desc: "Advanced cooling systems and resource management for deep-space stations.",
            link: "https://github.com"
        },
        map: [
            "   11111111   ",
            " 111111111111 ",
            " 122222222211 ",
            "12222222221111",
            "22221111222223",
            "22221111222223",
            "21111111111223",
            "21111111111223",
            "22222222222233",
            "22222222233333",
            " 222222233333 ",
            " 333333333333 ",
            "   33333333   "
        ]
    },
    {
        id: 'neptune', name: 'Neptune', light: '#6d8ef0', base: '#4667cf', dark: '#2b448f', radius: 32,
        project: {
            title: "DEEP REACH",
            desc: "Autonomous deep-sea exploration vessels adapted for extraterrestrial oceans.",
            link: "https://github.com"
        },
        map: [
            "   11111111   ",
            " 111111111111 ",
            " 133222222211 ",
            "13332222222223",
            "22222211122223",
            "22222111112223",
            "22222211122223",
            "22111222222233",
            "21111122222233",
            "22111222233333",
            " 222222233333 ",
            " 333333333333 ",
            "   33333333   "
        ]
    }
];

const PixelPlanet = ({ planet }: { planet: any }) => {
    const isSaturn = planet.id === 'saturn';
    const cols = isSaturn ? 18 : 14;
    const pixelSize = (planet.radius * 2) / (isSaturn ? 16 : 13);

    return (
        <div
            className="relative pointer-events-none"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
                gridTemplateRows: `repeat(${planet.map.length}, ${pixelSize}px)`,
            }}
        >
            {planet.map.map((row: string, rIdx: number) =>
                row.split('').map((char, cIdx) => {
                    let bgColor = 'transparent';
                    if (char === '1') bgColor = planet.light;
                    if (char === '2') bgColor = planet.base;
                    if (char === '3') bgColor = planet.dark;
                    if (char === '4' && 'land' in planet) bgColor = planet.land;
                    if (char === '5' && 'landDark' in planet) bgColor = planet.landDark;
                    if (char === '5' && 'spot' in planet) bgColor = planet.spot;
                    if (char === '6' && 'ring' in planet) bgColor = planet.ring;

                    return (
                        <div
                            key={`${rIdx}-${cIdx}`}
                            style={{ backgroundColor: bgColor }}
                        />
                    );
                })
            )}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] md:text-[9px] font-bold uppercase text-white/40 tracking-widest whitespace-nowrap select-none">
                {planet.name}
            </div>
        </div>
    );
};

interface PlanetState {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    isDragging: boolean;
}

export const PlanetsShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
    const [planetsReady, setPlanetsReady] = useState(false);

    // stable initialization of position states to satisfy rules of hooks
    // but we use actual motion values for performance
    const mercuryX = useMotionValue(0); const mercuryY = useMotionValue(0);
    const venusX = useMotionValue(0); const venusY = useMotionValue(0);
    const earthX = useMotionValue(0); const earthY = useMotionValue(0);
    const marsX = useMotionValue(0); const marsY = useMotionValue(0);
    const jupiterX = useMotionValue(0); const jupiterY = useMotionValue(0);
    const saturnX = useMotionValue(0); const saturnY = useMotionValue(0);
    const uranusX = useMotionValue(0); const uranusY = useMotionValue(0);
    const neptuneX = useMotionValue(0); const neptuneY = useMotionValue(0);

    const mValues = useRef<Record<string, { x: MotionValue<number>, y: MotionValue<number> }>>({});
    const instancesRef = useRef<PlanetState[]>([]);
    const lastTimeRef = useRef<number>(performance.now());
    const requestRef = useRef<number>(null);

    useEffect(() => {
        // Map motion values to IDs
        mValues.current = {
            mercury: { x: mercuryX, y: mercuryY },
            venus: { x: venusX, y: venusY },
            earth: { x: earthX, y: earthY },
            mars: { x: marsX, y: marsY },
            jupiter: { x: jupiterX, y: jupiterY },
            saturn: { x: saturnX, y: saturnY },
            uranus: { x: uranusX, y: uranusY },
            neptune: { x: neptuneX, y: neptuneY },
        };

        const initial = PLANETS.map((p) => {
            const x = 100 + Math.random() * (window.innerWidth - 200);
            const y = 200 + Math.random() * (window.innerHeight - 400);

            // Initial position update
            mValues.current[p.id].x.set(x - p.radius);
            mValues.current[p.id].y.set(y - p.radius);

            return {
                id: p.id,
                x,
                y,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: p.radius,
                isDragging: false
            };
        });
        instancesRef.current = initial;
        setPlanetsReady(true);
    }, []);

    useEffect(() => {
        if (!planetsReady) return;

        const updatePhysics = (now: number) => {
            const dt = Math.min((now - lastTimeRef.current) / 16.66, 2);
            lastTimeRef.current = now;

            const next = instancesRef.current;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const friction = Math.pow(0.985, dt);
            const wallBouncy = 0.7;
            const time = now * 0.001;

            for (let i = 0; i < next.length; i++) {
                const p = next[i];
                if (!p.isDragging) {
                    p.vx += Math.sin(time + i) * 0.005 * dt;
                    p.vy += Math.cos(time * 0.8 + i) * 0.005 * dt;
                    p.vx *= friction;
                    p.vy *= friction;
                }
                p.x += p.vx * dt;
                p.y += p.vy * dt;

                if (p.x - p.radius < 20) { p.x = p.radius + 20; p.vx *= -wallBouncy; }
                else if (p.x + p.radius > width - 20) { p.x = width - p.radius - 20; p.vx *= -wallBouncy; }

                if (p.y - p.radius < 80) { p.y = p.radius + 80; p.vy *= -wallBouncy; }
                else if (p.y + p.radius > height - 80) { p.y = height - p.radius - 80; p.vy *= -wallBouncy; }

                for (let j = i + 1; j < next.length; j++) {
                    const other = next[j];
                    const dx = other.x - p.x;
                    const dy = other.y - p.y;
                    const distSq = dx * dx + dy * dy;
                    const minDist = p.radius + other.radius;
                    if (distSq < minDist * minDist) {
                        const dist = Math.sqrt(distSq) || 0.1;
                        const nx = dx / dist; const ny = dy / dist;
                        const overlap = minDist - dist;
                        if (!p.isDragging) { p.x -= nx * overlap * 0.5; p.y -= ny * overlap * 0.5; }
                        if (!other.isDragging) { other.x += nx * overlap * 0.5; other.y += ny * overlap * 0.5; }
                        const pv = p.vx * nx + p.vy * ny;
                        const ov = other.vx * nx + other.vy * ny;
                        const impulse = pv - ov;
                        if (!p.isDragging) { p.vx -= impulse * nx; p.vy -= impulse * ny; }
                        if (!other.isDragging) { other.vx += impulse * nx; other.vy += impulse * ny; }
                    }
                }
                mValues.current[p.id].x.set(p.x - p.radius);
                mValues.current[p.id].y.set(p.y - p.radius);
            }
            requestRef.current = requestAnimationFrame(updatePhysics);
        };

        requestRef.current = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(requestRef.current as number);
    }, [planetsReady]);

    if (!planetsReady) return null;

    return (
        <section ref={containerRef} id="solar-system" className="w-full h-screen relative z-10 overflow-hidden bg-transparent">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white/[0.07] tracking-[0.4em] uppercase select-none leading-none text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    PROJECT SHOWCASE
                </h2>
                <div className="mt-6 flex items-center gap-4 opacity-10">
                    <div className="w-12 h-[1px] bg-white" />
                    <p className="text-[7px] md:text-[9px] text-white tracking-[1em] uppercase">DOUBLE CLICK TO EXPLORE</p>
                    <div className="w-12 h-[1px] bg-white" />
                </div>
            </div>

            {PLANETS.map((planet) => {
                const inst = instancesRef.current.find(i => i.id === planet.id)!;
                const mPos = mValues.current[planet.id];
                return (
                    <motion.div
                        key={planet.id}
                        drag
                        dragMomentum={false}
                        onDragStart={() => { inst.isDragging = true; inst.vx = 0; inst.vy = 0; }}
                        onDrag={(_, info) => { inst.x += info.delta.x; inst.y += info.delta.y; }}
                        onDragEnd={(_, info) => {
                            inst.isDragging = false;
                            inst.vx = Math.min(Math.max(info.velocity.x * 0.015, -15), 15);
                            inst.vy = Math.min(Math.max(info.velocity.y * 0.015, -15), 15);
                        }}
                        onDoubleClick={() => setSelectedPlanet(planet)}
                        style={{
                            position: 'absolute',
                            x: mPos.x,
                            y: mPos.y,
                            width: planet.radius * 2,
                            height: planet.radius * 2,
                            cursor: 'grab',
                            zIndex: 10,
                            willChange: 'transform'
                        }}
                        whileHover={{ scale: 1.1, zIndex: 15 }}
                        whileDrag={{ cursor: 'grabbing', scale: 1.15, zIndex: 50 }}
                    >
                        <PixelPlanet planet={planet} />
                    </motion.div>
                );
            })}

            <AnimatePresence>
                {selectedPlanet && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPlanet(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-lg bg-[#0b0d17] border-2 border-[#fdd835]/30 p-8 pixel-card active">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#fdd835]" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#fdd835]" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#fdd835]" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#fdd835]" />
                            <div className="flex flex-col items-center mb-8">
                                <PixelPlanet planet={{ ...selectedPlanet, radius: 40 }} />
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-black text-[#fdd835] mb-2 tracking-[0.2em]">{selectedPlanet.project.title}</h3>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-6">Project Log: {selectedPlanet.name} Sector</p>
                                <p className="text-xs md:text-sm text-white/70 leading-relaxed mb-8 font-light">{selectedPlanet.project.desc}</p>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <a href={selectedPlanet.project.link} target="_blank" rel="noopener noreferrer" className="pixel-button flex-1 group">
                                        <span className="text-[10px]">VISIT MISSION SITE</span>
                                        <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                                    </a>
                                    <button onClick={() => setSelectedPlanet(null)} className="border border-white/10 hover:bg-white/5 text-white/50 text-[10px] px-8 py-4 transition-colors tracking-widest uppercase">CLOSE WINDOW</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
