
"use client";

import { useEffect, useState } from "react";
import { getCameras } from "@/lib/cameraStorage";
import type { Camera } from "@/lib/cameras";

export function useCameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);

  useEffect(() => {
    const loadCameras = () => {
      setCameras(getCameras());
    };

    loadCameras();

    window.addEventListener("storage", loadCameras);
    window.addEventListener("camerasUpdated", loadCameras);

    return () => {
      window.removeEventListener("storage", loadCameras);
      window.removeEventListener("camerasUpdated", loadCameras);
    };
  }, []);

  return cameras;
}
