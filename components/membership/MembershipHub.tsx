"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Check, CreditCard, Crown, Landmark, ShieldCheck, Wallet, X } from "lucide-react";
import { TIERS, type MembershipTier } from "../../lib/membership";

export default function MembershipHub({
  currentTier,
  roleLabel,
  onTierChange,
}: {
  currentTier: string;
  roleLabel: string;
  onTierChange: (tier: string) => void;
}) {
  const initialTier = useMemo(
    () => TIERS.find((tier) => tier.name === currentTier) ?? TIERS[0],
    [currentTier]
  );
  const [selected, setSelected] = useState<MembershipTier>(initialTier);
  const [open, setOpen] = useState(false);
  useEffect(() => setSelected(initialTier), [initialTier]);

  const handleSelect = (tier: MembershipTier) => {
    setSelected(tier);
    setOpen(true);
  };

  return (
    <>
      <div className="npl-card">
        <div className="npl-card__head" style={{ marginBottom: 0, alignItems: "center" }}>
          <div className="npl-pagehead">
            <span>Membership</span>
            <h2>Upgrade your membership</h2>
            <p>Choose the plan that matches your growth stage and unlock the next level of benefits.</p>
          </div>
          <span className="npl-badge blue">{roleLabel}</span>
        </div>
      </div>

      <div className="npl-grid npl-membership-grid">
        {TIERS.map((tier) => {
          const active = tier.name === currentTier;
          return (
            <article key={tier.name} className={`npl-membership-card${active ? " is-current" : ""}${tier.featured ? " is-featured" : ""}`}>
              <div className="npl-membership-card__head">
                <div className="npl-membership-card__title">
                  {tier.name === "VIP" ? <Crown size={18} /> : tier.name === "Platinum" ? <ShieldCheck size={18} /> : tier.name === "Gold" ? <BadgeCheck size={18} /> : <Check size={18} />}
                  <span>{tier.name}</span>
                </div>
                <span className={`npl-badge ${active ? "ok" : tier.price === "Free" ? "cold" : "blue"}`}>
                  {active ? "Current" : tier.price === "Free" ? "Free upgrade" : tier.price}
                </span>
              </div>

              <div className="npl-membership-card__price">
                <b>{tier.price}</b>
                {tier.unit && <span>{tier.unit}</span>}
              </div>

              <p className="npl-membership-card__desc">{tier.desc}</p>

              <ul className="npl-membership-card__list">
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`npl-btn ${active ? "npl-btn--ghost" : "npl-btn--primary"} npl-btn--block`}
                type="button"
                onClick={() => handleSelect(tier)}
              >
                {active ? "Current membership" : tier.price === "Free" ? "Select free plan" : "Upgrade now"}
                {!active && <ArrowRight size={16} />}
              </button>
            </article>
          );
        })}
      </div>

      {open && (
        <div className="npl-drawer-overlay" onClick={() => setOpen(false)} role="presentation">
          <aside className="npl-drawer npl-membership-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="npl-drawer__head">
              <div>
                <h3>Upgrade to {selected.name}</h3>
                <p>Pay the membership fee and attach the new tag to your profile.</p>
              </div>
              <button className="npl-icnbtn" type="button" onClick={() => setOpen(false)} aria-label="Close upgrade drawer">
                <X size={18} />
              </button>
            </div>

            <div className="npl-membership-drawer__summary">
              <div>
                <span>Selected plan</span>
                <b>{selected.name}</b>
              </div>
              <div>
                <span>Fee</span>
                <b>{selected.price}</b>
              </div>
            </div>

            <div className="npl-note">
              <b>What you unlock</b>
              <span>{selected.desc}</span>
            </div>

            <div className="npl-optgrid">
              {[
                { icon: Wallet, title: "Wallet payment", copy: "Pay instantly from your available balance." },
                { icon: CreditCard, title: "Card payment", copy: "Use a debit card to complete the upgrade." },
                { icon: Landmark, title: "Bank transfer", copy: "Transfer to the NRFFN account and confirm." }
              ].map(({ icon: Icon, title, copy }) => (
                <button key={title} className="npl-opttile" type="button">
                  <span className="npl-opttile__ic"><Icon size={18} /></span>
                  <span>
                    <b>{title}</b>
                    <small>{copy}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="npl-membership-drawer__actions">
              <button className="npl-btn npl-btn--ghost" type="button" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="npl-btn npl-btn--primary"
                type="button"
                onClick={() => {
                  onTierChange(selected.name);
                  setOpen(false);
                }}
              >
                Upgrade
              </button>
            </div>
            <small className="npl-membership-drawer__note">
              Membership tags update immediately in the profile drawer after payment.
            </small>
          </aside>
        </div>
      )}
    </>
  );
}
