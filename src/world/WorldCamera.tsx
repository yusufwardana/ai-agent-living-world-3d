import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useWorldUi } from '../lib/store';

export function CameraRig() {
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
