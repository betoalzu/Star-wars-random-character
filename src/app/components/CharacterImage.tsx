"use client";

import { useState } from "react";

const MIN_IMAGE_WIDTH = 220;
const MIN_IMAGE_HEIGHT = 220;
const MIN_IMAGE_AREA = 120000;
const MIN_ASPECT_RATIO = 0.5;
const MAX_ASPECT_RATIO = 1.8;

function shouldUseFallback(img: HTMLImageElement): boolean {
  const { naturalWidth, naturalHeight } = img;

  if (!naturalWidth || !naturalHeight) {
    return true;
  }

  const area = naturalWidth * naturalHeight;
  const aspectRatio = naturalWidth / naturalHeight;

  return (
    naturalWidth < MIN_IMAGE_WIDTH ||
    naturalHeight < MIN_IMAGE_HEIGHT ||
    area < MIN_IMAGE_AREA ||
    aspectRatio < MIN_ASPECT_RATIO ||
    aspectRatio > MAX_ASPECT_RATIO
  );
}

type CharacterImageProps = {
  src?: string;
  alt: string;
  name: string;
  containerClassName: string;
  imageClassName: string;
  fallbackClassName: string;
  loading?: "lazy" | "eager";
};

export default function CharacterImage({
  src,
  alt,
  containerClassName,
  imageClassName,
  fallbackClassName,
  loading = "lazy",
}: CharacterImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [invalidSrc, setInvalidSrc] = useState<string | null>(null);
  const showFallback = !src || failedSrc === src || invalidSrc === src;

  return (
    <div className={containerClassName}>
      {src && !showFallback ? (
        <img
          src={src}
          alt={alt}
          className={imageClassName}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
          onLoad={(event) => {
            if (shouldUseFallback(event.currentTarget)) {
              setInvalidSrc(src);
            }
          }}
        />
      ) : null}

      {showFallback ? (
        <div className={fallbackClassName}>
          <span className="px-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-[#f87171] sm:text-base">
            Imagen no disponible
          </span>
        </div>
      ) : null}
    </div>
  );
}