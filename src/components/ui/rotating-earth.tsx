"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
  /** dot/land color */
  dotColor?: string;
  /** outline + graticule color */
  strokeColor?: string;
  /** ocean / sphere fill */
  oceanColor?: string;
  /** accent ring color */
  accentColor?: string;
}

export default function RotatingEarth({
  width = 800,
  height = 800,
  className = "",
  dotColor = "#814ac8",
  strokeColor = "rgba(248,250,252,0.55)",
  oceanColor = "#060b16",
  accentColor = "#814ac8",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const containerWidth = width;
    const containerHeight = height;
    const radius = Math.min(containerWidth, containerHeight) / 2.3;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break; }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    };

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.08;
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) dots.push(point);
        }
      }
      return dots;
    };

    const allDots: { lng: number; lat: number }[] = [];
    let landFeatures: any = null;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Outer accent glow ring
      const grad = context.createRadialGradient(
        containerWidth / 2, containerHeight / 2, currentScale * 0.9,
        containerWidth / 2, containerHeight / 2, currentScale * 1.25,
      );
      grad.addColorStop(0, accentColor + "55");
      grad.addColorStop(1, "transparent");
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale * 1.25, 0, 2 * Math.PI);
      context.fillStyle = grad;
      context.fill();

      // Ocean sphere
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = oceanColor;
      context.fill();
      context.strokeStyle = accentColor;
      context.lineWidth = 1.5 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = strokeColor;
        context.lineWidth = 0.6 * scaleFactor;
        context.globalAlpha = 0.35;
        context.stroke();
        context.globalAlpha = 1;

        context.beginPath();
        landFeatures.features.forEach((f: any) => path(f));
        context.strokeStyle = strokeColor;
        context.lineWidth = 0.8 * scaleFactor;
        context.stroke();

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 && projected[0] <= containerWidth &&
            projected[1] >= 0 && projected[1] <= containerHeight
          ) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.3 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = dotColor;
            context.fill();
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        );
        if (!response.ok) throw new Error("Failed to load land data");
        landFeatures = await response.json();
        landFeatures.features.forEach((feature: any) => {
          generateDotsInPolygon(feature, 16).forEach(([lng, lat]) =>
            allDots.push({ lng, lat }),
          );
        });
        render();
      } catch {
        setError("Failed to load Earth data");
      }
    };

    const rotation: [number, number] = [0, -10];
    let autoRotate = true;
    const rotationSpeed = 0.15;

    const rotationTimer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      }
    });

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number] = [rotation[0], rotation[1]];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5;
        rotation[0] = startRotation[0] + (moveEvent.clientX - startX) * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - (moveEvent.clientY - startY) * sensitivity));
        projection.rotate(rotation);
        render();
      };
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setTimeout(() => { autoRotate = true; }, 800);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    loadWorldData();

    return () => {
      rotationTimer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [width, height, dotColor, strokeColor, oceanColor, accentColor]);

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-auto" style={{ cursor: "grab" }} />
    </div>
  );
}
