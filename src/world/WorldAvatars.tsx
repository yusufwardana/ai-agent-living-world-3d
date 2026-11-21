import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { Agent } from '../data/agents';
import { useWorldUi } from '../lib/store';
import { WorldLabel } from './WorldLabel';

export function Avatar({ agent, index }: { agent: Agent; index: number }) {
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
