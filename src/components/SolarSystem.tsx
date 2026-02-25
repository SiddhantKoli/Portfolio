import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import Planet from './Planet';
import { PLANETS, PlanetData } from '../data/planets';

interface SolarSystemProps {
    onPlanetSelect: (planet: PlanetData) => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ onPlanetSelect }) => {
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 40, 80]} fov={50} />

                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.2} />
                    <pointLight position={[0, 0, 0]} intensity={2000} color="#FFD700" castShadow />

                    {/* Sun */}
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshStandardMaterial
                            emissive="#FFD700"
                            emissiveIntensity={2}
                            color="#FF8C00"
                            roughness={0}
                        />
                    </mesh>

                    {/* Sun Glow */}
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[7, 32, 32]} />
                        <meshBasicMaterial color="#FFD700" transparent opacity={0.1} />
                    </mesh>

                    {/* Planets */}
                    {PLANETS.map((planet) => (
                        <Planet key={planet.id} data={planet} onSelect={onPlanetSelect} />
                    ))}

                    {/* Environment */}
                    <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
                    <Environment preset="night" />

                    <ContactShadows
                        opacity={0.4}
                        scale={200}
                        blur={1}
                        far={10}
                        resolution={256}
                        color="#000000"
                    />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    minDistance={10}
                    maxDistance={300}
                    autoRotate={false}
                    rotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
};

export default SolarSystem;
