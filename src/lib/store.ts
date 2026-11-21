import { create } from 'zustand';
export type CameraMode = 'isometric' | 'top';
interface WorldUi {
  selectedAgent: string | null;
  setSelectedAgent: (id: string | null) => void;
  cameraMode: CameraMode;
  setCameraMode: (mode: CameraMode) => void;
  showRoof: boolean;
  toggleRoof: () => void;
  paused: boolean;
  togglePause: () => void;
}
export const useWorldUi = create<WorldUi>(set => ({
  selectedAgent: null, setSelectedAgent: selectedAgent => set({ selectedAgent }),
  cameraMode: 'isometric', setCameraMode: cameraMode => set({ cameraMode }),
  showRoof: false, toggleRoof: () => set(s => ({ showRoof: !s.showRoof })),
  paused: false, togglePause: () => set(s => ({ paused: !s.paused }))
}));
