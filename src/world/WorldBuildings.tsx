import { RoundedBox } from '@react-three/drei';
import { useWorldUi } from '../lib/store';
import type { Vec3 } from './types';
import { Desk } from './WorldProps';
import { WorldLabel } from './WorldLabel';

export function MainOffice() {
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
export function SideBuilding({ at, color, label, width = 7 }: {at: Vec3; color:string; label:string; width?:number}) {
  return <group position={at}>
    <RoundedBox args={[width,3.9,5.3]} radius={.22} position={[0,2,0]} castShadow receiveShadow><meshStandardMaterial color={color} roughness={.8}/></RoundedBox>
    <mesh position={[0,2.05,2.67]}><boxGeometry args={[width-1.1,2.7,.08]}/><meshStandardMaterial color="#8fc2d0" transparent opacity={.72} metalness={.2}/></mesh>
    {[-1.6,0,1.6].map(x=><mesh key={x} position={[x,2.05,2.75]}><boxGeometry args={[.12,2.9,.12]}/><meshStandardMaterial color="#e7eff1"/></mesh>)}
    <RoundedBox args={[width+.25,.3,5.55]} radius={.1} position={[0,4.1,0]} castShadow><meshStandardMaterial color="#f1f5ee"/></RoundedBox>
    <WorldLabel label={label} position={[0,4.65,2.83]} width={4.5} />
  </group>;
}
