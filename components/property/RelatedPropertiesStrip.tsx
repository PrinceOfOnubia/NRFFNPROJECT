"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { propertySlug } from "../../lib/property-catalog";

type RelatedItem = {
  slug: string;
  name: string;
  location: string;
  model: string;
  hero: string;
};

export default function RelatedPropertiesStrip({ items }: { items: RelatedItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);

  const count = useMemo(() => items.length, [items.length]);

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(count - 1, index));
    const node = itemRefs.current[clamped];
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(clamped);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const midpoint = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let best = Number.POSITIVE_INFINITY;
    itemRefs.current.forEach((node, index) => {
      if (!node) return;
      const nodeMid = node.offsetLeft + node.offsetWidth / 2;
      const diff = Math.abs(nodeMid - midpoint);
      if (diff < best) {
        best = diff;
        closest = index;
      }
    });
    setActive(closest);
  };

  return (
    <div className="propertyDetail__relatedStrip">
      <div className="propertyDetail__relatedStripHead">
        <button type="button" className="propertyDetail__relatedArrow" onClick={() => scrollToIndex(active - 1)} aria-label="Previous related property">
          <ArrowLeft size={18} />
        </button>
        <div className="propertyDetail__relatedDots" aria-label="Related properties position">
          {items.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className={index === active ? "active" : ""}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to ${item.name}`}
            />
          ))}
        </div>
        <button type="button" className="propertyDetail__relatedArrow" onClick={() => scrollToIndex(active + 1)} aria-label="Next related property">
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="propertyDetail__related-grid propertyDetail__related-grid--slider" ref={trackRef} onScroll={onScroll}>
        {items.map((item, index) => (
          <article
            className="propertyDetail__related-card"
            key={item.slug}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
          >
            <img src={item.hero} alt={item.name} />
            <div>
              <span>{item.model}</span>
              <h3>{item.name}</h3>
              <p>{item.location}</p>
              <a className="propertyDetail__textlink" href={`/properties/${propertySlug(item.name)}`}>View property <ArrowRight size={14} /></a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
