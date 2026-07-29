import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function getEmbedVideoUrl(
  url: string,
  options?: { autoplay?: boolean }
): { type: "youtube" | "vimeo" | "file"; src: string } | null {
  if (!url?.trim()) return null;

  const trimmed = url.trim();
  const autoplay = options?.autoplay === true;

  const youtubeMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    const params = autoplay
      ? "?autoplay=1&mute=1&playsinline=1&rel=0"
      : "?rel=0";
    return { type: "youtube", src: `https://www.youtube.com/embed/${youtubeMatch[1]}${params}` };
  }

  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    const params = autoplay ? "?autoplay=1&muted=1" : "";
    return { type: "vimeo", src: `https://player.vimeo.com/video/${vimeoMatch[1]}${params}` };
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(trimmed)) {
    return { type: "file", src: trimmed };
  }

  if (trimmed.includes("youtube.com/embed/") || trimmed.includes("player.vimeo.com/video/")) {
    let src = trimmed;
    if (autoplay) {
      const joiner = src.includes("?") ? "&" : "?";
      if (trimmed.includes("vimeo")) {
        src = `${src}${joiner}autoplay=1&muted=1`;
      } else {
        src = `${src}${joiner}autoplay=1&mute=1&playsinline=1`;
      }
    }
    return {
      type: trimmed.includes("vimeo") ? "vimeo" : "youtube",
      src,
    };
  }

  return null;
}