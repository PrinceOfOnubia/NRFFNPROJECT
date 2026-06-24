"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export default function PropertyGallery({ images, name }: { images: string[]; name: string }) {
  const slides = images.length ? images : ["/img/prop-1.jpg"];
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <div className="npl-gallery">
      <div className="npl-gallery__stage">
        <img src={slides[i]} alt={`${name} — view ${i + 1}`} />
        <button className="npl-gallery__arrow left" onClick={() => go(i - 1)} aria-label="Previous image"><ChevronLeft size={22} /></button>
        <button className="npl-gallery__arrow right" onClick={() => go(i + 1)} aria-label="Next image"><ChevronRight size={22} /></button>
        <button className="npl-gallery__zoom" onClick={() => setZoom(true)} aria-label="View full size"><Maximize2 size={16} /></button>
        <span className="npl-gallery__count">{i + 1} / {slides.length}</span>
        <div className="npl-gallery__dots">
          {slides.map((_, n) => (
            <button key={n} className={n === i ? "active" : ""} onClick={() => setI(n)} aria-label={`Go to image ${n + 1}`} />
          ))}
        </div>
      </div>

      <div className="npl-gallery__thumbs">
        {slides.map((src, n) => (
          <button key={src + n} className={`npl-gallery__thumb${n === i ? " active" : ""}`} onClick={() => setI(n)}>
            <img src={src} alt={`${name} thumbnail ${n + 1}`} />
          </button>
        ))}
      </div>

      {zoom && (
        <div className="npl-gallery__lightbox" onClick={() => setZoom(false)} role="presentation">
          <button className="npl-gallery__close" aria-label="Close"><X size={22} /></button>
          <button className="npl-gallery__arrow left" onClick={(e) => { e.stopPropagation(); go(i - 1); }} aria-label="Previous image"><ChevronLeft size={26} /></button>
          <img src={slides[i]} alt={`${name} — view ${i + 1}`} onClick={(e) => e.stopPropagation()} />
          <button className="npl-gallery__arrow right" onClick={(e) => { e.stopPropagation(); go(i + 1); }} aria-label="Next image"><ChevronRight size={26} /></button>
        </div>
      )}
    </div>
  );
}
