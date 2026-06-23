"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`floatingActions${open ? " is-open" : ""}`}>
      {open && (
        <nav className="floatingActions__menu" aria-label="Quick navigation">
          <a href="/">Home</a>
          <a href="/client/properties">Properties</a>
          <a href="/associate/dashboard">Realtor Portal</a>
          <a href="/client/dashboard">Investor Portal</a>
        </nav>
      )}
      <a
        className="floatingActions__button floatingActions__button--whatsapp"
        href="https://wa.me/2348000000000?text=Hello%20NRFFN"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with NRFFN on WhatsApp"
      >
        <MessageCircle size={21} />
      </a>
      <button
        className="floatingActions__button"
        type="button"
        aria-label={open ? "Close quick menu" : "Open quick menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
    </div>
  );
}
