import { Canvas } from '@react-three/fiber';
import { agents } from '../data/agents';
import { useWorldUi } from '../lib/store';
import { CameraRig } from '../world/WorldCamera';
import { MainOffice, SideBuilding } from '../world/WorldBuildings';
import { Grounds, Pool } from '../world/WorldProps';
import { Avatar } from '../world/WorldAvatars';

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
