import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

const PARTICLE_COUNT = 5000;

const Particles = () => {
    const pointsRef = useRef();
    const { viewport } = useThree();

    // 1. Generate Target Positions
    const targets = useMemo(() => {
        const cloud = new Float32Array(PARTICLE_COUNT * 3);
        const scatter = new Float32Array(PARTICLE_COUNT * 3);
        const barChart = new Float32Array(PARTICLE_COUNT * 3);
        const zoomStage = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;

            // Shape 0: Chaotic Cloud (Spherical)
            const r = Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            cloud[i3] = r * Math.sin(phi) * Math.cos(theta);
            cloud[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            cloud[i3 + 2] = r * Math.cos(phi);

            // Shape 1: Scatter Plot (Flat Plane with Clusters)
            scatter[i3] = (Math.random() - 0.5) * 10;
            scatter[i3 + 1] = (Math.random() - 0.5) * 6;
            scatter[i3 + 2] = (Math.random() - 0.5) * 2;
            // Add a bit of "trend" - correlation
            scatter[i3 + 1] += scatter[i3] * 0.4;

            // Shape 2: Bar Chart
            // Divide particles into 5 bars
            const barCount = 5;
            const barIndex = i % barCount;
            const barHeight = [4, 6, 3, 5, 4][barIndex] + (Math.random() - 0.5);
            const xOffset = (barIndex - (barCount - 1) / 2) * 2;

            const particlesPerBar = PARTICLE_COUNT / barCount;
            const particleInBarIndex = Math.floor(i / barCount);
            const yRel = (particleInBarIndex / particlesPerBar) * barHeight;

            barChart[i3] = xOffset + (Math.random() - 0.5) * 1.5;
            barChart[i3 + 1] = yRel - barHeight / 2;
            barChart[i3 + 2] = (Math.random() - 0.5) * 0.5;

            // Shape 3: Zoom Stage (Tunnel/Insight)
            // Points form a tunnel or move far out to allow camera to pass through
            const angle = (i / PARTICLE_COUNT) * Math.PI * 20;
            const radius = 2 + (i / PARTICLE_COUNT) * 10;
            zoomStage[i3] = Math.cos(angle) * radius;
            zoomStage[i3 + 1] = Math.sin(angle) * radius;
            zoomStage[i3 + 2] = (i / PARTICLE_COUNT) * 50 - 25;
        }

        return { cloud, scatter, barChart, zoomStage };
    }, []);

    // 2. Initial Positions (Cloud)
    const initialPositions = useMemo(() => new Float32Array(targets.cloud), [targets]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Calculate Global Scroll Progress (Animation takes up distance)
        const scrollY = window.scrollY;
        const heroOffset = 400; // Delay animation until Hero begins to fade
        const animationDistance = window.innerHeight * 1.5;
        const progress = Math.max(0, Math.min((scrollY - heroOffset) / animationDistance, 1));

        const positions = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            let tx, ty, tz;

            if (progress < 0.25) {
                // Cloud to Scatter
                const p = progress / 0.25;
                tx = THREE.MathUtils.lerp(targets.cloud[i3], targets.scatter[i3], p);
                ty = THREE.MathUtils.lerp(targets.cloud[i3 + 1], targets.scatter[i3 + 1], p);
                tz = THREE.MathUtils.lerp(targets.cloud[i3 + 2], targets.scatter[i3 + 2], p);
            } else if (progress < 0.5) {
                // Scatter to Bar Chart
                const p = (progress - 0.25) / 0.25;
                tx = THREE.MathUtils.lerp(targets.scatter[i3], targets.barChart[i3], p);
                ty = THREE.MathUtils.lerp(targets.scatter[i3 + 1], targets.barChart[i3 + 1], p);
                tz = THREE.MathUtils.lerp(targets.scatter[i3 + 2], targets.barChart[i3 + 2], p);
            } else if (progress < 0.75) {
                // Bar Chart to Zoom Stage
                const p = (progress - 0.5) / 0.25;
                tx = THREE.MathUtils.lerp(targets.barChart[i3], targets.zoomStage[i3], p);
                ty = THREE.MathUtils.lerp(targets.barChart[i3 + 1], targets.zoomStage[i3 + 1], p);
                tz = THREE.MathUtils.lerp(targets.barChart[i3 + 2], targets.zoomStage[i3 + 2], p);
            } else {
                // Final Zoom / Stay in Zoom Stage
                tx = targets.zoomStage[i3];
                ty = targets.zoomStage[i3 + 1];
                tz = targets.zoomStage[i3 + 2];
            }

            // Smoothly move towards target
            positions[i3] += (tx - positions[i3]) * 0.1;
            positions[i3 + 1] += (ty - positions[i3 + 1]) * 0.1;
            positions[i3 + 2] += (tz - positions[i3 + 2]) * 0.1;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // 3. Camera Zoom Control
        if (progress > 0.8) {
            const zoomExp = (progress - 0.8) / 0.2;
            state.camera.position.z = THREE.MathUtils.lerp(8, -20, zoomExp);
            state.camera.focus = THREE.MathUtils.lerp(10, 50, zoomExp);
        } else {
            state.camera.position.z = 8;
        }

        // Rotate slightly for life
        pointsRef.current.rotation.y += 0.001;
        pointsRef.current.rotation.x += 0.0005;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={PARTICLE_COUNT}
                    array={initialPositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#2EF2FF"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const ParticleSwarm = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none bg-s1'>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#2EF2FF" />
                <Particles />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>

            {/* Scroll Indicator Overlay */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 uppercase tracking-widest text-xs animate-pulse transition-opacity duration-500"
                style={{ opacity: Math.max(0, 1 - (typeof window !== 'undefined' ? window.scrollY / 500 : 0)) }}
            >
                Scroll to Analyze
            </div>
        </div>
    );
};

export default ParticleSwarm;
