import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { CanvasTexture, LinearFilter, SRGBColorSpace, type Group } from 'three';
import { agents, type Agent } from '../data/agents';
import { useWorldUi } from '../lib/store';

type Vec3 = [number, number, number];

/**
 * Billboard labels drawn using a local Canvas2D texture. Unlike Drei/Troika
 * text, these labels never suspend the entire R3F scene while fetching font
 * metadata from an external CDN. System fonts work in offline sandboxes.
 */
function WorldLabel({ label, position, width = 3.6, selected = false }: {
  label: string;
  position: Vec3;
  width?: number;
  selected?: boolean;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 96;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = selected ? 'rgba(23, 71, 81, 0.94)' : 'rgba(249, 252, 249, 0.91)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = selected ? '#ffffff' : '#315563';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 34px system-ui, sans-serif';
      const text = label.length > 30 ? label.slice(0, 29) + '…' : label;
      ctx.fillText(text, 256, 50, 480);
    }
    const next = new CanvasTexture(canvas);
    next.colorSpace = SRGBColorSpace;
    next.minFilter = LinearFilter;
    next.magFilter = LinearFilter;
    return next;
  }, [label, selected]);

  useEffect(() => () => texture.dispose(), [texture]);
  return <sprite position={position} scale={[width, width * 96 / 512, 1]}>
    <spriteMaterial map={texture} transparent depthWrite={false} />
  </sprite>;
}

function CameraRig() {
  const mode = useWorldUi(s => s.cameraMode);
  const camera = useThree(s => s.camera);
  useEffect(() => {
    const position: [number, number, number] = mode === 'top' ? [0, 31, 0.01] : [22, 20, 25];
    camera.position.set(...position);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [mode, camera]);
  return <OrbitControls makeDefault enableDamping maxPolarAngle={Math.PI / 2.02} minDistance={8} maxDistance={65} target={[0, 0, 0]} />;
}

function Tree({ at, scale = 1 }: { at: Vec3; scale?: number }) {
  return <group position={at} scale={scale}>
    <mesh castShadow position={[0, .7, 0]}><cylinderGeometry args={[.15, .23, 1.4, 8]} /><meshStandardMaterial color="#775844" /></mesh>
    <mesh castShadow position={[0, 2.05, 0]}><icosahedronGeometry args={[1.15, 1]} /><meshStandardMaterial color="#78b597" flatShading /></mesh>
    <mesh castShadow position={[.45, 2.5, -.3]}><icosahedronGeometry args={[.65, 1]} /><meshStandardMaterial color="#90c9a1" flatShading /></mesh>
  </group>;
}
function Bench({ at }: { at: Vec3 }) {
  return <group position={at}>
    <mesh castShadow position={[0,.4,0]}><boxGeometry args={[1.45,.13,.5]}/><meshStandardMaterial color="#c58e60" /></mesh>
    {[-.55,.55].map(v => <mesh key={v} position={[v,.2,0]}><boxGeometry args={[.12,.4,.35]}/><meshStandardMaterial color="#6e7483"/></mesh>)}
  </group>;
}
function Desk({at}: {at:Vec3}) {
  return <group position={at}>
    <mesh castShadow position={[0,.75,0]}><boxGeometry args={[1.65,.12,.7]}/><meshStandardMaterial color="#d3ab82"/></mesh>
    {[-.62,.62].map(x=><mesh key={x} position={[x,.37,0]}><boxGeometry args={[.08,.72,.58]}/><meshStandardMaterial color="#718497"/></mesh>)}
    <mesh position={[0,1.12,-.16]}><boxGeometry args={[.66,.47,.06]}/><meshStandardMaterial color="#30394d" metalness={.35}/></mesh>
    <mesh position={[0,1.12,-.115]}><planeGeometry args={[.56,.36]}/><meshBasicMaterial color="#89c7db"/></mesh>
    <mesh position={[0,.52,1.05]}><boxGeometry args={[.54,.1,.48]}/><meshStandardMaterial color="#c2c9ca"/></mesh>
  </group>;
}
function MainOffice() {
  const showRoof = useWorldUi(s => s.showRoof);
  return <group position={[-6,0,-5]}>
    <RoundedBox args={[13,.38,10]} radius={.12} position={[0,.22,0]} receiveShadow><meshStandardMaterial color="#eff4ef"/></RoundedBox>
    <RoundedBox args={[13,.35,10]} radius={.08} position={[0,5.7,0]} receiveShadow><meshStandardMaterial color="#e7e3db"/></RoundedBox>
    {[-6.3,6.3].map(x=><mesh key={x} position={[x,3,0]} castShadow><boxGeometry args={[.25,5.5,10]}/><meshStandardMaterial color="#f3ebdf" transparent opacity={.83}/></mesh>)}
    <mesh position={[0,3,-4.95]}><boxGeometry args={[13,5.5,.16]}/><meshStandardMaterial color="#c0dce0" transparent opacity={.6}/></mesh>
    {[-4,-1.4,1.4,4].map(x=><group key={x}>
      <mesh position={[x,2.85,-4.89]}><boxGeometry args={[.09,5.4,.15]}/><meshStandardMaterial color="#f8ffff"/></mesh>
      <mesh position={[x,5.66,-4.8]}><boxGeometry args={[.12,.1,.2]}/><meshStandardMaterial color="#f7fbfd"/></mesh>
    </group>)}
    <mesh position={[0,3,4.92]}><boxGeometry args={[13,5.5,.11]}/><meshStandardMaterial color="#92bac4" transparent opacity={.12}/></mesh>
    {[-4,0,4].map(x=><Desk key={x} at={[x,.2,0]}/>)}
    {[-3.7,0,3.7].map(x=><Desk key={'back'+x} at={[x,.2,-2.65]}/>)}
    <RoundedBox args={[3,.5,1]} radius={.17} position={[0,.6,3.8]} castShadow><meshStandardMaterial color="#e3bd99"/></RoundedBox>
    <WorldLabel label="LIVING WORLD HQ" position={[0,6.3,5.04]} width={5.5} />
    {showRoof && <RoundedBox args={[13.5,.32,10.5]} radius={.14} position={[0,7.1,0]} castShadow><meshStandardMaterial color="#d7e5e3" transparent opacity={.7}/></RoundedBox>}
  </group>;
}
function SideBuilding({ at, color, label, width = 7 }: {at: Vec3; color:string; label:string; width?:number}) {
  return <group position={at}>
    <RoundedBox args={[width,3.9,5.3]} radius={.22} position={[0,2,0]} castShadow receiveShadow><meshStandardMaterial color={color} roughness={.8}/></RoundedBox>
    <mesh position={[0,2.05,2.67]}><boxGeometry args={[width-1.1,2.7,.08]}/><meshStandardMaterial color="#8fc2d0" transparent opacity={.72} metalness={.2}/></mesh>
    {[-1.6,0,1.6].map(x=><mesh key={x} position={[x,2.05,2.75]}><boxGeometry args={[.12,2.9,.12]}/><meshStandardMaterial color="#e7eff1"/></mesh>)}
    <RoundedBox args={[width+.25,.3,5.55]} radius={.1} position={[0,4.1,0]} castShadow><meshStandardMaterial color="#f1f5ee"/></RoundedBox>
    <WorldLabel label={label} position={[0,4.65,2.83]} width={4.5} />
  </group>;
}
function Pool() {
  return <group position={[12,.03,7]}>
    <RoundedBox args={[9,.65,5.6]} radius={.7} position={[0,.35,0]}><meshStandardMaterial color="#e3e8e5"/></RoundedBox>
    <mesh position={[0,.72,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[8.4,5.05]}/><meshStandardMaterial color="#62c5d4" transparent opacity={.88} metalness={.15} roughness={.19}/></mesh>
    <mesh position={[0,.74,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7.7,4.5]}/><meshStandardMaterial color="#b7e9e7" transparent opacity={.19}/></mesh>
    {[-3.4,3.4].map(x=><mesh key={x} position={[x,.85,-3.4]}><boxGeometry args={[1.2,.09,2]}/><meshStandardMaterial color="#e1b68b"/></mesh>)}
  </group>;
}
function Avatar({ agent, index }: { agent: Agent; index: number }) {
  const ref = useRef<Group>(null);
  const selectedAgent = useWorldUi(s=>s.selectedAgent);
  const setSelectedAgent = useWorldUi(s=>s.setSelectedAgent);
  const paused = useWorldUi(s=>s.paused);
  // Local time deliberately stops while paused; global clock.elapsedTime does not.
  const simulationTime = useRef(0);
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g || paused) return;
    simulationTime.current += Math.min(delta, .1);
    const t = simulationTime.current*.28 + index*1.2;
    g.position.set(agent.home[0] + Math.sin(t)*.72, .07 + Math.abs(Math.sin(t*3))*.05, agent.home[2] + Math.cos(t*.8)*.5);
    g.rotation.y = -t*.25;
  });
  const selected = selectedAgent === agent.id;
  return <group ref={ref} position={agent.home} onClick={e => {e.stopPropagation();setSelectedAgent(agent.id)}}>
    {selected && <mesh rotation={[-Math.PI/2,0,0]} position={[0,.03,0]}><ringGeometry args={[.53,.72,32]}/><meshBasicMaterial color="#f7ba70" side={2}/></mesh>}
    <mesh castShadow position={[0,.66,0]}><capsuleGeometry args={[.32,.65,4,12]}/><meshStandardMaterial color={agent.color} roughness={.55}/></mesh>
    <mesh castShadow position={[0,1.56,0]}><sphereGeometry args={[.38,20,16]}/><meshStandardMaterial color="#f3ddba" roughness={.85}/></mesh>
    <mesh position={[0,1.64,.31]}><sphereGeometry args={[.075,12,10]}/><meshStandardMaterial color="#2b4057"/></mesh>
    <mesh position={[-.39,.88,0]} rotation={[0,0,-.16]}><capsuleGeometry args={[.1,.43,4,8]}/><meshStandardMaterial color={agent.color}/></mesh>
    <mesh position={[.39,.88,0]} rotation={[0,0,.16]}><capsuleGeometry args={[.1,.43,4,8]}/><meshStandardMaterial color={agent.color}/></mesh>
    <WorldLabel label={agent.name} position={[0,2.2,0]} width={2.25} selected={selected} />
  </group>;
}
function Grounds() {
  return <>
    <mesh receiveShadow position={[0,-.28,0]}><boxGeometry args={[58,.6,47]}/><meshStandardMaterial color="#9ccda9"/></mesh>
    <mesh position={[0,-.01,0]}><boxGeometry args={[2,.04,46]}/><meshStandardMaterial color="#d7d3c9"/></mesh>
    <mesh position={[0,.0,0]}><boxGeometry args={[54,.04,2]}/><meshStandardMaterial color="#d6d2ca"/></mesh>
    <mesh position={[-4,.01,9]}><boxGeometry args={[17,.05,2]}/><meshStandardMaterial color="#e5dfd5"/></mesh>
    <mesh position={[13,.01,0]}><boxGeometry args={[18,.05,2]}/><meshStandardMaterial color="#dcd4c9"/></mesh>
    {([[-24,0,-18],[-18,0,-19],[-12,0,-18],[20,0,-17],[25,0,-11],[-24,0,16],[-20,0,18],[-15,0,18],[24,0,16],[24,0,10]] as Vec3[]).map((v,i)=><Tree key={i} at={v} scale={.8+(i%3)*.16}/>)}
    <Bench at={[1,0,11]}/><Bench at={[-9,0,11]}/>
    <mesh position={[8,.04,-12]}><cylinderGeometry args={[1.8,1.8,.15,48]}/><meshStandardMaterial color="#efe5d6"/></mesh>
    <mesh position={[8,.18,-12]}><cylinderGeometry args={[1.35,1.35,.14,48]}/><meshStandardMaterial color="#82c6cf"/></mesh>
    <mesh position={[8,.55,-12]}><sphereGeometry args={[.48,16,12]}/><meshStandardMaterial color="#faf5eb"/></mesh>
  </>;
}
export function WorldScene() {
  return <Canvas shadows camera={{position:[22,20,25],fov:42,near:.1,far:180}} dpr={[1,1.6]} onPointerMissed={()=>useWorldUi.getState().setSelectedAgent(null)}>
    <color attach="background" args={['#e6f0f1']}/>
    <fog attach="fog" args={['#e6f0f1',45,95]}/>
    <ambientLight intensity={1.6}/><hemisphereLight args={['#ecfaff','#9eb9a5',1.2]}/>
    <directionalLight castShadow position={[12,26,10]} intensity={2.1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-left={-35} shadow-camera-right={35} shadow-camera-top={35} shadow-camera-bottom={-35}/>
    <Grounds/><MainOffice/>
    <SideBuilding at={[13,0,-8]} color="#e7e4dc" label="INNOVATION LAB"/>
    <SideBuilding at={[-15,0,12]} color="#ece6df" label="AGENT LOUNGE" width={8}/>
    <Pool/>
    {agents.map((agent,i)=><Avatar key={agent.id} agent={agent} index={i}/>)}
    <CameraRig/>
  </Canvas>;
}
