"use client";

import { useEffect, useRef } from "react";

const EarthBackground = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // 1. Fungsi untuk load script Sketchfab API secara manual
    const loadSketchfabScript = () => {
      return new Promise((resolve) => {
        if (window.Sketchfab) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    // 2. Inisialisasi Viewer
    const initViewer = async () => {
      await loadSketchfabScript();
      
      const iframe = iframeRef.current;
      const client = new window.Sketchfab("1.12.1", iframe);

      client.init("5ce4b1465c83432d9bb7e3c30232c02b", {
        success: (api) => {
          api.start();
          api.addEventListener("viewerready", () => {
            console.log("Viewer is ready");
          });
        },
        error: () => {
          console.error("Sketchfab Viewer Error");
        },
        // --- KONFIGURASI UI (DIJAMIN HILANG DI SINI) ---
        autostart: 1,
        ui_hint: 0,        // <--- PASTI HILANG
        ui_controls: 0,
        ui_infos: 0,
        ui_inspector: 0,
        ui_stop: 0,
        ui_watermark: 0,
        ui_help: 0,
        ui_settings: 0,
        ui_vr: 0,
        ui_fullscreen: 0,
        ui_annotations: 0,
        scrollwheel: 0,    // Mencegah zoom manual
        transparent: 1     // Background transparan
      });
    };

    initViewer();
  }, []); // Run sekali saat mount

  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10">
      {/* Container Iframe */}
      <div className="w-full h-full opacity-60">
        <iframe
          ref={iframeRef}
          title="EARTH"
          frameBorder="0"
          className="w-full h-full border-none saturate-[1.2]"
          allow="autoplay; fullscreen; xr-spatial-tracking"
        ></iframe>
      </div>

      {/* Green Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(69, 255, 144, 0.2), rgba(0, 0, 0, 0.6))",
          mixBlendMode: "overlay",
        }}
      ></div>
    </div>
  );
};

export default EarthBackground;