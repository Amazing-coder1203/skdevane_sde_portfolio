import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';

const CoreParams = ({ color1 = "#2EF2FF", color2 = "#3C52D9" }) => {
    return (
        <group>
            {/* Inner Glowing Core */}
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial
                    color={color1}
                    emissive={color1}
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>

            {/* Outer Wireframe Cage */}
            <mesh>
                <icosahedronGeometry args={[2.2, 0]} />
                <meshStandardMaterial
                    color={color1}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Middle Intricate Layer */}
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <octahedronGeometry args={[1.8, 0]} />
                <meshStandardMaterial
                    color={color2}
                    wireframe
                    transparent
                    opacity={0.5}
                />
            </mesh>
        </group>
    );
};

const AnimatedCore = () => {
    const ref = useRef();

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Calculate scroll progress (0 to 1)
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;
        const scrollProgress = Math.min(Math.max(scrollY / scrollHeight, 0), 1);

        // Core Rotation
        ref.current.rotation.x += delta * 0.1;
        ref.current.rotation.y += delta * 0.15;

        // Transition logic based on scroll progress
        // Section 1 (Hero): Center, Large [0, 0, 0], Scale 1
        // Section 2 (Middle): Move to right [3, -1, -2], Scale 0.6
        // Section 3 (Bottom): Center bottom [0, -4, -3], Scale 0.4

        let targetPos = [0, 0, 0];
        let targetScale = 1;

        if (scrollProgress < 0.2) {
            // Hero section
            targetPos = [2, 0, 0];
            targetScale = 1.2;
        } else if (scrollProgress < 0.5) {
            // Middle sections (Skills)
            targetPos = [window.innerWidth > 1024 ? 4 : 0, -1, -2];
            targetScale = 0.8;
        } else if (scrollProgress < 0.8) {
            // FAQ/Experience
            targetPos = [window.innerWidth > 1024 ? -4 : 0, -2, -1];
            targetScale = 0.7;
        } else {
            // Footer
            targetPos = [0, -2, -4];
            targetScale = 0.5;
        }

        // Smooth interpolation
        ref.current.position.x += (targetPos[0] - ref.current.position.x) * 0.05;
        ref.current.position.y += (targetPos[1] - ref.current.position.y) * 0.05;
        ref.current.position.z += (targetPos[2] - ref.current.position.z) * 0.05;

        const scaleChange = (targetScale - ref.current.scale.x) * 0.05;
        ref.current.scale.set(
            ref.current.scale.x + scaleChange,
            ref.current.scale.y + scaleChange,
            ref.current.scale.z + scaleChange
        );
    });

    const scrollHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 1;
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollProgress = Math.min(Math.max(scrollY / scrollHeight, 0), 1);

    // Color shifting logic
    let color1 = "#2EF2FF"; // Default Cyan
    let color2 = "#3C52D9"; // Default Blue

    if (scrollProgress > 0.3 && scrollProgress < 0.6) {
        color1 = "#FF2E97"; // Pink/Magenta for Skills
        color2 = "#702ED9"; // Purple
    } else if (scrollProgress >= 0.6) {
        color1 = "#FFE02E"; // Gold/Yellow for FAQ/Experience
        color2 = "#D93C3C"; // Reddish
    }

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={ref}>
                <CoreParams color1={color1} color2={color2} />
            </group>
        </Float>
    );
}

const QuantCore = () => {
    const canvasRef = useRef();

    return (
        <div className='fixed top-0 left-0 w-full h-full z-0 pointer-events-none'>
            <Canvas
                ref={canvasRef}
                camera={{ position: [0, 0, 8] }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#2EF2FF" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3C52D9" />

                <AnimatedCore />
                <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}

export default QuantCore;
