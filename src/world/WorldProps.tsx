import { RoundedBox } from '@react-three/drei';
import type { Vec3 } from './types';

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
export function Desk({at}: {at:Vec3}) {
  return <group position={at}>
    <mesh castShadow position={[0,.75,0]}><boxGeometry args={[1.65,.12,.7]}/><meshStandardMaterial color="#d3ab82"/></mesh>
    {[-.62,.62].map(x=><mesh key={x} position={[x,.37,0]}><boxGeometry args={[.08,.72,.58]}/><meshStandardMaterial color="#718497"/></mesh>)}
    <mesh position={[0,1.12,-.16]}><boxGeometry args={[.66,.47,.06]}/><meshStandardMaterial color="#30394d" metalness={.35}/></mesh>
    <mesh position={[0,1.12,-.115]}><planeGeometry args={[.56,.36]}/><meshBasicMaterial color="#89c7db"/></mesh>
    <mesh position={[0,.52,1.05]}><boxGeometry args={[.54,.1,.48]}/><meshStandardMaterial color="#c2c9ca"/></mesh>
  </group>;
}
export function Pool() {
  return <group position={[12,.03,7]}>
    <RoundedBox args={[9,.65,5.6]} radius={.7} position={[0,.35,0]}><meshStandardMaterial color="#e3e8e5"/></RoundedBox>
    <mesh position={[0,.72,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[8.4,5.05]}/><meshStandardMaterial color="#62c5d4" transparent opacity={.88} metalness={.15} roughness={.19}/></mesh>
    <mesh position={[0,.74,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7.7,4.5]}/><meshStandardMaterial color="#b7e9e7" transparent opacity={.19}/></mesh>
    {[-3.4,3.4].map(x=><mesh key={x} position={[x,.85,-3.4]}><boxGeometry args={[1.2,.09,2]}/><meshStandardMaterial color="#e1b68b"/></mesh>)}
  </group>;
}
export function Grounds() {
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
