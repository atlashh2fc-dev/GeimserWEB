'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { Float, Html, Line, OrbitControls, RoundedBox, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { ExperienceProduct } from './experienceData';

type SceneProps = {
  products: ExperienceProduct[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const positions: [number, number, number][] = [
  [-2.55, 1.35, 0.05],
  [2.45, 1.25, -0.25],
  [-2.3, -1.55, -0.15],
  [2.55, -1.45, 0.1],
];

function ServerObject({ color }: { color: string }) {
  return (
    <group>
      {[-0.42, 0, 0.42].map((y, index) => (
        <RoundedBox key={y} args={[1.2, 0.29, 0.62]} radius={0.08} smoothness={5} position={[0, y, 0]}>
          <meshPhysicalMaterial color="#101d2c" metalness={0.72} roughness={0.22} clearcoat={1} emissive={color} emissiveIntensity={index === 1 ? 0.16 : 0.05} />
          <mesh position={[0.42, 0, 0.32]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
          <mesh position={[0.25, 0, 0.32]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        </RoundedBox>
      ))}
    </group>
  );
}

function LearningObject({ color }: { color: string }) {
  return (
    <group rotation={[-0.15, 0, 0]}>
      <RoundedBox args={[0.92, 1.2, 0.16]} radius={0.07} smoothness={5} position={[-0.48, 0, 0]} rotation={[0, 0.38, -0.08]}>
        <meshPhysicalMaterial color="#17142c" metalness={0.42} roughness={0.2} clearcoat={1} emissive={color} emissiveIntensity={0.13} />
      </RoundedBox>
      <RoundedBox args={[0.92, 1.2, 0.16]} radius={0.07} smoothness={5} position={[0.48, 0, 0]} rotation={[0, -0.38, 0.08]}>
        <meshPhysicalMaterial color="#21183b" metalness={0.42} roughness={0.2} clearcoat={1} emissive={color} emissiveIntensity={0.16} />
      </RoundedBox>
      {[0.28, 0, -0.28].map((y) => (
        <mesh key={y} position={[-0.49, y, 0.18]} rotation={[0, 0.38, -0.08]}>
          <boxGeometry args={[0.52, 0.025, 0.02]} />
          <meshBasicMaterial color={color} transparent opacity={0.72} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function LegalObject({ color }: { color: string }) {
  return (
    <group>
      <RoundedBox args={[1.5, 0.18, 0.66]} radius={0.05} smoothness={4} position={[0, -0.58, 0]}>
        <meshPhysicalMaterial color="#10241f" metalness={0.62} roughness={0.24} emissive={color} emissiveIntensity={0.08} />
      </RoundedBox>
      {[-0.48, 0, 0.48].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.17, 1.05, 24]} />
            <meshPhysicalMaterial color="#153228" metalness={0.58} roughness={0.22} emissive={color} emissiveIntensity={0.1} />
          </mesh>
          <mesh position={[0, 0.57, 0]}>
            <cylinderGeometry args={[0.19, 0.15, 0.13, 24]} />
            <meshBasicMaterial color={color} transparent opacity={0.75} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.9, 0.28, 3]} />
        <meshPhysicalMaterial color="#102a22" metalness={0.6} roughness={0.2} emissive={color} emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}

function NetworkObject({ color }: { color: string }) {
  const nodes = useMemo<[number, number, number][]>(() => [
    [-0.72, 0.46, 0], [0.7, 0.52, 0.06], [-0.76, -0.48, -0.04],
    [0.7, -0.48, 0.02], [0, 0.78, -0.1],
  ], []);

  return (
    <group>
      {nodes.map((node, index) => (
        <group key={index}>
          <Line points={[[0, 0, 0], node]} color={color} transparent opacity={0.35} lineWidth={1.2} />
          <mesh position={node}>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshPhysicalMaterial color="#2a2015" metalness={0.62} roughness={0.18} emissive={color} emissiveIntensity={0.55} />
          </mesh>
        </group>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.46, 2]} />
        <meshPhysicalMaterial color="#382510" metalness={0.7} roughness={0.16} emissive={color} emissiveIntensity={0.34} clearcoat={1} />
      </mesh>
      <mesh scale={1.18}>
        <icosahedronGeometry args={[0.46, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

function ProductObject({ product }: { product: ExperienceProduct }) {
  if (product.object === 'server') return <ServerObject color={product.color} />;
  if (product.object === 'learning') return <LearningObject color={product.color} />;
  if (product.object === 'legal') return <LegalObject color={product.color} />;
  return <NetworkObject color={product.color} />;
}

function ProductNode({
  product,
  index,
  selected,
  onSelect,
}: {
  product: ExperienceProduct;
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetScale = selected ? 1.35 : hovered ? 1.12 : 0.88;
    const scale = THREE.MathUtils.damp(group.current.scale.x, targetScale, 5, delta);
    group.current.scale.setScalar(scale);
    group.current.rotation.y += delta * (selected ? 0.28 : 0.12);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, selected ? 0.75 : positions[index][2], 4, delta);
  });

  const handlePointer = (active: boolean) => {
    setHovered(active);
    document.body.style.cursor = active ? 'pointer' : 'default';
  };

  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(index);
  };

  return (
    <Float speed={selected ? 1.6 : 1.05} rotationIntensity={0.14} floatIntensity={selected ? 0.28 : 0.18}>
      <group
        ref={group}
        position={positions[index]}
        onClick={select}
        onPointerOver={(event) => { event.stopPropagation(); handlePointer(true); }}
        onPointerOut={() => handlePointer(false)}
      >
        <pointLight color={product.color} intensity={selected ? 5 : 1.4} distance={4.5} decay={2} />
        <ProductObject product={product} />
        <Html center position={[0, -1.18, 0]} distanceFactor={7.2} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              color: selected ? '#ffffff' : 'rgba(255,255,255,.58)',
              background: selected ? 'rgba(5,10,22,.82)' : 'rgba(5,10,22,.5)',
              border: `1px solid ${selected ? product.color : 'rgba(255,255,255,.12)'}`,
              boxShadow: selected ? `0 0 30px ${product.color}33` : 'none',
              borderRadius: 999,
              padding: '7px 12px',
              fontFamily: 'var(--font-geist-sans)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '.08em',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              transition: 'all .3s ease',
              backdropFilter: 'blur(12px)',
            }}
          >
            {product.shortName}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Universe({ products, selectedIndex, onSelect }: SceneProps) {
  const universe = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!universe.current) return;
    universe.current.rotation.y = THREE.MathUtils.damp(universe.current.rotation.y, state.pointer.x * 0.12, 2.5, delta);
    universe.current.rotation.x = THREE.MathUtils.damp(universe.current.rotation.x, -state.pointer.y * 0.06, 2.5, delta);
  });

  return (
    <group ref={universe} position={[0.45, 0, 0]}>
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.18, 0.012, 8, 128]} />
          <meshBasicMaterial color="#69def5" transparent opacity={0.2} toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2.25, 0.5, 0.2]}>
          <torusGeometry args={[1.48, 0.007, 8, 128]} />
          <meshBasicMaterial color="#b89cff" transparent opacity={0.15} toneMapped={false} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.72, 3]} />
          <meshPhysicalMaterial color="#071422" metalness={0.82} roughness={0.08} clearcoat={1} emissive="#47dfff" emissiveIntensity={0.12} transparent opacity={0.86} />
        </mesh>
        <mesh scale={1.08}>
          <icosahedronGeometry args={[0.72, 2]} />
          <meshBasicMaterial color="#71e8ff" wireframe transparent opacity={0.25} toneMapped={false} />
        </mesh>
        <Sparkles count={36} scale={2.7} size={2.2} speed={0.25} color="#82edff" opacity={0.55} />
      </group>

      {positions.map((position, index) => (
        <Line key={products[index].id} points={[[0, 0, 0], position]} color={products[index].color} transparent opacity={selectedIndex === index ? 0.5 : 0.12} lineWidth={selectedIndex === index ? 1.6 : 0.7} />
      ))}

      {products.map((product, index) => (
        <ProductNode key={product.id} product={product} index={index} selected={selectedIndex === index} onSelect={onSelect} />
      ))}
    </group>
  );
}

export default function ExperienceScene(props: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 7.8], fov: 43 }} dpr={[1, 1.65]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.42} />
      <directionalLight position={[2, 4, 6]} intensity={2.2} color="#c9f7ff" />
      <directionalLight position={[-5, -3, 2]} intensity={1.15} color="#8c72ff" />
      <Stars radius={24} depth={28} count={850} factor={2.2} saturation={0} fade speed={0.18} />
      <Suspense fallback={null}>
        <Universe {...props} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.3} maxPolarAngle={Math.PI / 1.72} rotateSpeed={0.34} />
    </Canvas>
  );
}
