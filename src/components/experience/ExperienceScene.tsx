'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { Float, Html, Line, OrbitControls, Sparkles, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { ExperienceProduct } from './experienceData';

type SceneProps = {
  products: ExperienceProduct[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const positions: [number, number, number][] = [
  [-1.9, 1.12, 0.05],
  [1.78, 1.04, -0.18],
  [-1.72, -1.08, -0.12],
  [1.86, -1.02, 0.08],
];

function ImageMark({ src, scale = [1.1, 1.1] }: { src: string; scale?: [number, number] }) {
  const texture = useTexture(src);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh position={[0, 0, 0.135]}>
      <planeGeometry args={scale} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.02} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function AprendeMark() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    if (!context) return new THREE.CanvasTexture(canvas);

    context.clearRect(0, 0, 512, 512);
    context.fillStyle = '#124E66';
    context.beginPath();
    context.roundRect(46, 46, 420, 420, 96);
    context.fill();
    context.fillStyle = '#ffffff';
    context.font = '700 250px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('A', 256, 273);

    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    result.anisotropy = 8;
    return result;
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh position={[0, 0, 0.135]}>
      <planeGeometry args={[0.74, 0.74]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function BrandedEmblem({ product, selected }: { product: ExperienceProduct; selected: boolean }) {
  const halo = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (halo.current) halo.current.rotation.z += delta * (selected ? 0.2 : 0.08);
  });

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.14, 72, 1, false]} />
        <meshPhysicalMaterial
          color="#07101d"
          metalness={0.82}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive={product.color}
          emissiveIntensity={selected ? 0.14 : 0.045}
        />
      </mesh>

      <mesh position={[0, 0, 0.105]}>
        <circleGeometry args={[0.57, 72]} />
        <meshPhysicalMaterial
          color="#0b1524"
          metalness={0.38}
          roughness={0.16}
          clearcoat={1}
          transparent
          opacity={0.96}
        />
      </mesh>

      <mesh ref={halo} position={[0, 0, 0.12]}>
        <torusGeometry args={[0.62, selected ? 0.012 : 0.007, 10, 120]} />
        <meshBasicMaterial color={product.color} transparent opacity={selected ? 0.95 : 0.32} toneMapped={false} />
      </mesh>

      {product.mark ? (
        <ImageMark src={product.mark} scale={product.markScale} />
      ) : (
        <AprendeMark />
      )}

      <mesh position={[0, 0, -0.1]}>
        <torusGeometry args={[0.5, 0.012, 12, 96]} />
        <meshBasicMaterial color={product.color} transparent opacity={0.22} toneMapped={false} />
      </mesh>
    </group>
  );
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
    const targetScale = selected ? 1.15 : hovered ? 1 : 0.84;
    const scale = THREE.MathUtils.damp(group.current.scale.x, targetScale, 5, delta);
    group.current.scale.setScalar(scale);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.12, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.08, 3, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, selected ? 0.38 : positions[index][2], 4, delta);
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
    <Float speed={selected ? 1.45 : 0.9} rotationIntensity={0.06} floatIntensity={selected ? 0.24 : 0.14}>
      <group
        ref={group}
        position={positions[index]}
        onClick={select}
        onPointerOver={(event) => { event.stopPropagation(); handlePointer(true); }}
        onPointerOut={() => handlePointer(false)}
      >
        <pointLight color={product.color} intensity={selected ? 4.5 : 1.1} distance={4} decay={2} />
        <BrandedEmblem product={product} selected={selected} />
        <Html center position={[0, -0.94, 0]} distanceFactor={8.2} style={{ pointerEvents: 'none' }}>
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
    universe.current.rotation.y = THREE.MathUtils.damp(universe.current.rotation.y, state.pointer.x * 0.1, 2.5, delta);
    universe.current.rotation.x = THREE.MathUtils.damp(universe.current.rotation.x, -state.pointer.y * 0.05, 2.5, delta);
  });

  return (
    <group ref={universe} position={[0.45, 0, 0]}>
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.82, 0.006, 8, 128]} />
          <meshBasicMaterial color="#69def5" transparent opacity={0.14} toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2.25, 0.5, 0.2]}>
          <torusGeometry args={[1.02, 0.004, 8, 128]} />
          <meshBasicMaterial color="#a990ff" transparent opacity={0.1} toneMapped={false} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.39, 3]} />
          <meshPhysicalMaterial color="#06101c" metalness={0.88} roughness={0.06} clearcoat={1} emissive="#47dfff" emissiveIntensity={0.1} transparent opacity={0.72} />
        </mesh>
        <mesh scale={1.08}>
          <icosahedronGeometry args={[0.39, 2]} />
          <meshBasicMaterial color="#71e8ff" wireframe transparent opacity={0.18} toneMapped={false} />
        </mesh>
        <Sparkles count={18} scale={1.8} size={1.5} speed={0.2} color="#82edff" opacity={0.34} />
      </group>

      {positions.map((position, index) => (
        <Line key={products[index].id} points={[[0, 0, 0], position]} color={products[index].color} transparent opacity={selectedIndex === index ? 0.38 : 0.07} lineWidth={selectedIndex === index ? 1.25 : 0.5} />
      ))}

      {products.map((product, index) => (
        <ProductNode key={product.id} product={product} index={index} selected={selectedIndex === index} onSelect={onSelect} />
      ))}
    </group>
  );
}

export default function ExperienceScene(props: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 9.8], fov: 42 }} dpr={[1, 1.65]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.38} />
      <directionalLight position={[2, 4, 6]} intensity={1.8} color="#c9f7ff" />
      <directionalLight position={[-5, -3, 2]} intensity={0.9} color="#8c72ff" />
      <Stars radius={24} depth={28} count={700} factor={2} saturation={0} fade speed={0.15} />
      <Suspense fallback={null}>
        <Universe {...props} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.3} maxPolarAngle={Math.PI / 1.72} rotateSpeed={0.3} />
    </Canvas>
  );
}
