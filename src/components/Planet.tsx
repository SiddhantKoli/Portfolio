import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Trail, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../data/planets';

interface PlanetProps {
    data: PlanetData;
    onSelect: (data: PlanetData) => void;
}

const Planet: React.FC<PlanetProps> = ({ data, onSelect }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * data.speed;
        if (orbitRef.current) {
            orbitRef.current.position.x = Math.cos(t) * data.distance;
            orbitRef.current.position.z = Math.sin(t) * data.distance;
        }
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group>
            {/* Orbit Circle */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 128]} />
                <meshBasicMaterial color="white" opacity={0.1} transparent />
            </mesh>

            <group ref={orbitRef}>
                <Trail
                    width={2}
                    length={5}
                    color={new THREE.Color(data.color)}
                    attenuation={(t) => t * t}
                >
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Sphere
                            args={[data.size, 32, 32]}
                            ref={meshRef}
                            onClick={() => onSelect(data)}
                            onPointerOver={() => (document.body.style.cursor = 'pointer')}
                            onPointerOut={() => (document.body.style.cursor = 'auto')}
                        >
                            <meshStandardMaterial
                                color={data.color}
                                emissive={data.color}
                                emissiveIntensity={0.5}
                                roughness={0.3}
                                metalness={0.8}
                            />

                            {/* Name Tag */}
                            <Html distanceFactor={15}>
                                <div className="select-none pointer-events-none">
                                    <span className="text-xs font-medium text-white/50 whitespace-nowrap px-2 py-1 rounded bg-black/40 backdrop-blur-sm border border-white/10 uppercase tracking-widest">
                                        {data.name}
                                    </span>
                                </div>
                            </Html>
                        </Sphere>
                    </Float>
                </Trail>
            </group>
        </group>
    );
};

export default Planet;
