"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronLeft, Building2, MapPin, Minus, Plus, ShieldCheck, X } from "lucide-react";
import type { PropertyDetail } from "../../lib/property-catalog";
import PropertyGallery from "./PropertyGallery";

function parsePrice(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function summaryLabel(model: string) {
  if (model === "Full Ownership") return "Full ownership";
  if (model === "Co-Ownership") return "Co-ownership";
  if (model === "Flex") return "Flex (flexible)";
  return model;
}

export default function PropertyInvestPanel({ property }: { property: PropertyDetail }) {
  const [open, setOpen] = useState(false);
  const [units, setUnits] = useState(1);
  const [plan, setPlan] = useState(property.model === "Flex" ? "Flexible plan" : "Outright");
  const [stage, setStage] = useState(0);
  const price = useMemo(() => parsePrice(property.price), [property.price]);
  const total = price * units;
  const dueNow = plan === "Outright" ? total : Math.max(Math.round(total * 0.3), Math.round(price * 0.1));
  const planOptions = property.model === "Co-Ownership"
    ? ["Income plan", "Capital growth"]
    : property.model === "Flex"
      ? ["Flexible plan", "Upgrade plan"]
      : ["Outright", "Installment"];

  return (
    <>
      <div className="propertyDetail__actions">
        <a href="#docs" className="npl-btn npl-btn--ghost"><Building2 size={17} /> View documents</a>
        <button type="button" className="npl-btn npl-btn--success" onClick={() => setOpen(true)}>
          <Building2 size={17} /> Buy / Invest
        </button>
      </div>

      {open && (
        <div className="propertyInvest__backdrop" onClick={() => setOpen(false)} role="presentation">
          <aside className="propertyInvest__sheet" onClick={(event) => event.stopPropagation()} aria-label={`Invest in ${property.name}`}>
            <div className="propertyInvest__head">
              <div>
                <h3>Invest - {property.name}</h3>
                <p><MapPin size={14} /> {property.location}</p>
              </div>
              <button className="npl-icnbtn" type="button" onClick={() => setOpen(false)} aria-label="Close invest drawer">
                <X size={18} />
              </button>
            </div>

            <div className="propertyInvest__body">
              <PropertyGallery images={[property.hero, ...property.gallery]} name={property.name} />

              <div className="propertyInvest__meta">
                <div>
                  <small>Price per unit</small>
                  <b>{property.price}</b>
                </div>
                <div>
                  <small>Expected return</small>
                  <b>{property.roi}</b>
                </div>
              </div>

              <div className="propertyInvest__summary">
                <div className="propertyInvest__summary-head">
                  <span>{summaryLabel(property.model)}</span>
                  <b>{property.model === "Flex" ? "Flexible pathway" : "Available now"}</b>
                </div>
                <div className="propertyInvest__summary-row">
                  <span>Payment plan</span>
                  <select value={plan} onChange={(event) => setPlan(event.target.value)}>
                    {planOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="propertyInvest__summary-row">
                  <span>Units</span>
                  <div className="propertyInvest__stepper">
                    <button type="button" onClick={() => setUnits((value) => Math.max(1, value - 1))} aria-label="Decrease units"><Minus size={16} /></button>
                    <b>{units}</b>
                    <button type="button" onClick={() => setUnits((value) => value + 1)} aria-label="Increase units"><Plus size={16} /></button>
                  </div>
                </div>
                <div className="propertyInvest__summary-row total">
                  <span>Total value</span>
                  <b>{total.toLocaleString("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })}</b>
                </div>
                <div className="propertyInvest__summary-row">
                  <span>Due now</span>
                  <b>{dueNow.toLocaleString("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })}</b>
                </div>
              </div>

              <div className="propertyInvest__steps">
                {[
                  ["Details", "Review the property and plan"],
                  ["Payment", "Choose a payment method"],
                  ["Receipt", "See your investment confirmation"],
                ].map(([title, copy], index) => (
                  <div key={title} className={`propertyInvest__step${stage === index ? " active" : stage > index ? " done" : ""}`}>
                    <span>{stage > index ? <Check size={14} /> : index + 1}</span>
                    <div>
                      <b>{title}</b>
                      <small>{copy}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="propertyInvest__note">
                <ShieldCheck size={17} />
                <div>
                  <b>NRFFN verified</b>
                  <p>Images, title records and location data are reviewed before this property is listed.</p>
                </div>
              </div>

              {stage === 1 && (
                <div className="propertyInvest__payment">
                  {["Card", "Bank transfer", "Wallet"].map((method) => (
                    <button key={method} type="button" className="propertyInvest__method">
                      <span><Check size={14} /></span>
                      <div>
                        <b>{method}</b>
                        <small>Mock checkout option</small>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="propertyInvest__footer">
              <button type="button" className="npl-btn npl-btn--ghost" onClick={() => setStage((value) => Math.max(0, value - 1))} disabled={stage === 0}>
                <ChevronLeft size={16} /> Back
              </button>
              <button
                type="button"
                className="npl-btn npl-btn--primary"
                onClick={() => (stage === 2 ? setOpen(false) : setStage((value) => Math.min(2, value + 1)))}
              >
                {stage === 2 ? "Close" : "Continue"} <ArrowRight size={16} />
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
