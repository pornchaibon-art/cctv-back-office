import { CAMERAS, type Camera } from "@/lib/cameras";

const STORAGE_KEY = "cameras";

export function getCameras(): Camera[] {
  if (typeof window === "undefined") return CAMERAS;

  const saved = localStorage.getItem(STORAGE_KEY);

  return saved ? JSON.parse(saved) : CAMERAS;
}

export function saveCameras(cameras: Camera[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cameras));

  window.dispatchEvent(new Event("camerasUpdated"));
}