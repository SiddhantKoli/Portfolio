import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Info } from 'lucide-react';
import { PlanetData } from '../data/planets';

interface UIOverlayProps {
    selectedPlanet: PlanetData | null;
    onClearSelection: () => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({ selectedPlanet, onClearSelection }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 p-6 flex flex-col justify-between">
            {/* Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex justify-between items-start"
            >
                <div className="glass px-6 py-4 flex items-center gap-4 pointer-events-auto">
                    <div className="w-10 h-10 rounded-full bg-cosmic-accent flex items-center justify-center animate-pulse">
                        <span className="font-bold">P/P</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gradient">PIXELPLANETS</h1>
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Interstellar Explorer</p>
                    </div>
                </div>

                <div className="glass px-6 py-4 flex gap-6 pointer-events-auto">
                    <button className="text-sm font-medium hover:text-cosmic-accent transition-colors">Explore</button>
                    <button className="text-sm font-medium hover:text-cosmic-accent transition-colors">Compare</button>
                    <button className="text-sm font-medium hover:text-cosmic-accent transition-colors opacity-50">Log In</button>
                </div>
            </motion.div>

            {/* Planet Detail Panel */}
            <AnimatePresence>
                {selectedPlanet && (
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="absolute top-0 bottom-0 right-0 w-96 p-6 pointer-events-auto"
                    >
                        <div className="glass h-full flex flex-col overflow-hidden relative group">
                            {/* Close Button */}
                            <button
                                onClick={onClearSelection}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 flex flex-col h-full">
                                <div className="mb-8">
                                    <span className="text-xs font-bold text-cosmic-highlight uppercase tracking-[0.3em] mb-2 block">
                                        Discovery Log #PX-29
                                    </span>
                                    <h2 className="text-5xl font-black mb-4 uppercase">{selectedPlanet.name}</h2>
                                    <div className="w-20 h-1 bg-gradient-to-r from-cosmic-accent to-cosmic-highlight rounded-full" />
                                </div>

                                <div className="space-y-6 flex-grow">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <p className="text-white/70 leading-relaxed text-sm">
                                            {selectedPlanet.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl">
                                            <p className="text-[10px] text-white/40 uppercase mb-1">Orbit Speed</p>
                                            <p className="font-mono text-cosmic-highlight">{selectedPlanet.speed.toFixed(3)} au/s</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl">
                                            <p className="text-[10px] text-white/40 uppercase mb-1">Distance</p>
                                            <p className="font-mono text-cosmic-accent">{selectedPlanet.distance}M km</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-8 group/btn flex items-center justify-between w-full bg-cosmic-accent hover:bg-cosmic-highlight text-cosmic-bg font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]">
                                    <span>MISSION DETAILS</span>
                                    <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Info */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex justify-between items-end"
            >
                <div className="text-[10px] text-white/20 tracking-widest pointer-events-auto">
                    &copy; 2024 PIXELPLANETS AEROSPACE &bull; SYSTEM STATUS: <span className="text-green-500">OPERATIONAL</span>
                </div>

                <div className="flex gap-2 pointer-events-auto">
                    <button className="glass p-3 hover:bg-white/10 transition-colors">
                        <Info size={18} className="text-cosmic-highlight" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default UIOverlay;
