"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

interface Marker {
  id: string;
  location: [number, number];
  label: string;
}

interface Arc {
  id: string;
  from: [number, number];
  to: [number, number];
  label?: string;
}

interface GlobeProps {
  markers?: Marker[];
  arcs?: Arc[];
  className?: string;
  markerColor?: [number, number, number];
  baseColor?: [number, number, number];
  arcColor?: [number, number, number];
  glowColor?: [number, number, number];
  dark?: number;
  mapBrightness?: number;
  markerSize?: number;
  markerElevation?: number;
  arcWidth?: number;
  arcHeight?: number;
  speed?: number;
  theta?: number;
  diffuse?: number;
  mapSamples?: number;
}

export function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [0.5, 0.29, 0.78],
  baseColor = [0.05, 0.07, 0.14],
  arcColor = [0.5, 0.29, 0.78],
  glowColor = [0.5, 0.29, 0.78],
  dark = 1,
  mapBrightness = 4,
  markerSize = 0.05,
  markerElevation = 0.01,
  arcWidth = 0.5,
  arcHeight = 0.25,
  speed = 0.003,
  theta = 0.2,
  diffuse = 1.2,
  mapSamples = 16000,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x;
      const deltaY = e.clientY - pointerInteracting.current.y;
      dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };
      const now = Date.now();
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1);
        const maxV = 0.15;
        velocity.current = {
          phi: Math.max(-maxV, Math.min(maxV, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
          theta: Math.max(-maxV, Math.min(maxV, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
        };
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let phi = 0;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markers: markers.map((m) => ({ location: m.location, size: markerSize })),
        opacity: 0.9,
        onRender: (state: Record<string, number>) => {
          if (!isPausedRef.current) {
            phi += speed;
            if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
              phiOffsetRef.current += velocity.current.phi;
              thetaOffsetRef.current += velocity.current.theta;
              velocity.current.phi *= 0.95;
              velocity.current.theta *= 0.95;
            }
            const thetaMin = -0.4, thetaMax = 0.4;
            if (thetaOffsetRef.current < thetaMin) thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1;
            else if (thetaOffsetRef.current > thetaMax) thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1;
          }
          state.phi = phi + phiOffsetRef.current + dragOffset.current.phi;
          state.theta = theta + thetaOffsetRef.current + dragOffset.current.theta;
          state.width = width * dpr;
          state.height = width * dpr;
        },
      } as Parameters<typeof createGlobe>[1]);

      setTimeout(() => { if (canvas) canvas.style.opacity = "1"; }, 0);
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1s ease",
          contain: "layout paint size",
        }}
      />
    </div>
  );
}
