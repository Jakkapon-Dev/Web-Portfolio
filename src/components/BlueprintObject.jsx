import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMotionPreference } from '../context/MotionContext';

// The Hero's one 3D moment: a small schematic model, not a portrait
// decoration. Two nested wireframe solids — draft-orange shell, blueprint-
// cyan core — slowly counter-rotating, like a drafted 3D view sitting next
// to the 2D plan. Respects the site's motion toggle: with motion off it
// still renders, just holds still instead of auto-rotating.
function WireframeModel({ motionEnabled }) {
  const groupRef = useRef(null);
  const innerRef = useRef(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current) return;

    // Gentle parallax toward the pointer, always active — a still nudge
    // reads as "responsive," not as motion that needs reducing.
    targetRotation.current.x = state.pointer.y * 0.25;
    targetRotation.current.y = state.pointer.x * 0.35;

    if (motionEnabled) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x += delta * 0.06;
      innerRef.current.rotation.y -= delta * 0.28;
      innerRef.current.rotation.x -= delta * 0.1;
    }

    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#E8611C" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={innerRef} rotation={[0.5, 0.4, 0]}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#AFD3ED" wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function BlueprintObject({ className = '' }) {
  const { motionEnabled } = useMotionPreference();

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <WireframeModel motionEnabled={motionEnabled} />
      </Canvas>
    </div>
  );
}
