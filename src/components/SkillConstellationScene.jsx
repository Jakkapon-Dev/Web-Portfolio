import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Html, Stars } from '@react-three/drei';
import { useMotionPreference } from '../context/MotionContext';

// Per-group depth: the five domains sit at genuinely different Z planes
// instead of a flat canvas — the whole point of making this real 3D.
const GROUP_Z = { frontend: 1.6, backend: -1.6, database: 0.8, devops: -0.8, tools: 0 };

// Reuses the already-tuned 2D cluster layout for x/y (0..1 canvas-space),
// remapped into 3D units, plus the per-group Z above and a small
// deterministic per-node jitter so a cluster isn't a perfectly flat card.
function project(positions2D, allSkills) {
  const map = {};
  positions2D.forEach((p, i) => {
    const skill = allSkills.find((s) => s.id === p.id);
    if (!skill) return;
    const jitter = ((i * 37) % 10) / 10 - 0.5; // -0.5..0.5, stable per node
    map[p.id] = [
      (p.x - 0.5) * 8.6,
      (0.5 - p.y) * 5.6,
      (GROUP_Z[skill.group] ?? 0) + jitter * 0.5
    ];
  });
  return map;
}

function nodeRadius(level) {
  return 0.09 + (level / 100) * 0.15;
}

function SkillNode({ skill, position, active, isHovered, isSelected, onHover, onUnhover, onSelect, portalRef }) {
  const meshRef = useRef(null);
  const r = nodeRadius(skill.level);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const pulse = isHovered || isSelected
      ? 1 + 0.16 * Math.sin(t * 5)
      : 1 + 0.05 * Math.sin(t * 1.1 + skill.level);
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(skill.id); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); onUnhover(); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); onSelect(skill.id); }}
      >
        <sphereGeometry args={[r, 20, 20]} />
        <meshStandardMaterial
          color={isSelected || isHovered ? skill.color : '#0A1830'}
          emissive={skill.color}
          emissiveIntensity={active ? (isHovered || isSelected ? 1.6 : 0.45) : 0.06}
          transparent
          opacity={active ? 1 : 0.22}
          roughness={0.4}
        />
      </mesh>

      {/* Level ring — a thin drafting-compass circle around the node */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r * 1.3, r * 1.42, 32]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={active ? (isHovered || isSelected ? 0.8 : 0.35) : 0.08}
          side={2}
        />
      </mesh>

      {/* Name label only on hover/select — with all 21 nodes "active" by
          default, labeling every one at once got both visually noisy and
          prone to drei's Html projection escaping the canvas bounds near
          the edges. Hover-to-reveal reads more like a real 3D inspector. */}
      {(isHovered || isSelected) && (
        <Html center distanceFactor={9} style={{ pointerEvents: 'none' }} occlude={false} portal={portalRef}>
          <div
            className="font-mono-code font-bold whitespace-nowrap"
            style={{
              transform: 'translateY(20px)',
              fontSize: 11,
              color: '#FFFFFF',
              textShadow: `0 0 8px ${skill.color}`
            }}
          >
            {skill.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectionLine({ a, b, active, sameGroup, highlighted, color }) {
  return (
    <Line
      points={[a, b]}
      color={sameGroup ? color : '#4A5D6E'}
      transparent
      opacity={highlighted ? 0.9 : active ? (sameGroup ? 0.5 : 0.2) : 0.05}
      lineWidth={highlighted ? 2 : sameGroup ? 1.2 : 0.7}
      dashed={!sameGroup}
      dashSize={sameGroup ? undefined : 0.08}
      gapSize={sameGroup ? undefined : 0.07}
    />
  );
}

function AutoRotateGroup({ children, speed, enabled }) {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (!ref.current || !enabled) return;
    ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref}>{children}</group>;
}

export default function SkillConstellationScene({
  allSkills,
  connections,
  positions2D,
  activeGroup,
  hovered,
  selected,
  setHovered,
  setSelected,
  pulseSpeed
}) {
  const { motionEnabled } = useMotionPreference();
  const positions = useMemo(() => project(positions2D, allSkills), [positions2D, allSkills]);
  // Explicit portal target for node labels — drei's Html doesn't reliably
  // respect an *ancestor's* overflow-hidden, so hand it this exact clipped
  // element instead of letting it guess where the canvas root is.
  const portalRef = useRef(null);

  const isNodeActive = (id) => {
    const s = allSkills.find((x) => x.id === id);
    return activeGroup === 'all' || (s && s.group === activeGroup);
  };

  return (
    <div ref={portalRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 48 }}
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['#050D1A']} />
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 6]} intensity={60} color="#AFD3ED" />
      <pointLight position={[-4, -3, -4]} intensity={30} color="#E8611C" />

      <Stars radius={14} depth={20} count={900} factor={1.6} saturation={0} fade speed={motionEnabled ? 0.4 : 0} />

      <AutoRotateGroup speed={pulseSpeed === 'boost' ? 0.16 : 0.06} enabled={motionEnabled}>
        {connections.map(([a, b], idx) => {
          const sa = allSkills.find((s) => s.id === a);
          const sb = allSkills.find((s) => s.id === b);
          const pa = positions[a];
          const pb = positions[b];
          if (!sa || !sb || !pa || !pb) return null;
          const active = isNodeActive(a) && isNodeActive(b);
          const sameGroup = sa.group === sb.group;
          const highlighted = (hovered && (hovered === a || hovered === b)) || (selected && (selected === a || selected === b));
          return (
            <ConnectionLine
              key={idx}
              a={pa}
              b={pb}
              active={active}
              sameGroup={sameGroup}
              highlighted={highlighted}
              color={sa.color}
            />
          );
        })}

        {allSkills.map((skill) => {
          const pos = positions[skill.id];
          if (!pos) return null;
          return (
            <SkillNode
              key={skill.id}
              skill={skill}
              position={pos}
              active={isNodeActive(skill.id)}
              isHovered={hovered === skill.id}
              isSelected={selected === skill.id}
              onHover={setHovered}
              onUnhover={() => setHovered(null)}
              onSelect={(id) => setSelected((prev) => (prev === id ? null : id))}
              portalRef={portalRef}
            />
          );
        })}
      </AutoRotateGroup>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={5}
        maxDistance={16}
        autoRotate={false}
      />
    </Canvas>
    </div>
  );
}
