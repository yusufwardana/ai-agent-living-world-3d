import { useEffect, useMemo } from 'react';
import { CanvasTexture, LinearFilter, SRGBColorSpace } from 'three';
import type { Vec3 } from './types';

/**
 * Billboard labels drawn using a local Canvas2D texture. Unlike Drei/Troika
 * text, these labels never suspend the entire R3F scene while fetching font
 * metadata from an external CDN. System fonts work in offline sandboxes.
 */
export function WorldLabel({ label, position, width = 3.6, selected = false }: {
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
