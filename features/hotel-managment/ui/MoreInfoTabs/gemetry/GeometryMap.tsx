"use client";
import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { OSM_STYLE } from "@/constants/map.constants";
import { createRoot } from "react-dom/client";
import CustomMaker from "./CustomMaker";
import { useFormContext } from "react-hook-form";

function GeometryMap() {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const rootRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { setValue, trigger } = useFormContext();

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: OSM_STYLE,
      center: [51.264578, 35.236987],
      zoom: 5,
      attributionControl: false,
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl({ visualizePitch: true }),
      "top-left",
    );

    const handleClick = async (e: maplibregl.MapMouseEvent) => {
      // پاک کردن marker قبلی
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (rootRef.current) {
        rootRef.current.unmount();
      }

      // ساخت marker جدید
      const el = document.createElement("div");
      const root = createRoot(el);
      rootRef.current = root;

      root.render(<CustomMaker mapRef={map} />);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);

      markerRef.current = marker;

      setValue("lng", e.lngLat.lng);
      setValue("lat", e.lngLat.lat);

      await trigger(["lng", "lat"]);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);

      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (rootRef.current) {
        rootRef.current.unmount();
      }

      map.remove();
    };
  }, [setValue, trigger]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "600px", borderRadius: "8px" }}
    />
  );
}

export default GeometryMap;
