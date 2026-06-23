"use client";

import { Bell, Check, ShieldCheck, UserRound, X } from "lucide-react";

export type PortalPanel = "notifications" | "profile" | null;

export default function PortalDrawers({
  panel,
  onClose,
  name,
  initials,
  role,
}: {
  panel: PortalPanel;
  onClose: () => void;
  name: string;
  initials: string;
  role: string;
}) {
  if (!panel) return null;

  return (
    <div className="npl-drawer-overlay" onClick={onClose} role="presentation">
      <aside className="npl-drawer npl-drawer--compact" onClick={(event) => event.stopPropagation()} aria-label={panel === "notifications" ? "Notifications drawer" : "Profile drawer"}>
        <div className="npl-drawer__head">
          <div>
            <h3>{panel === "notifications" ? "Notifications" : "Profile"}</h3>
            <p>{panel === "notifications" ? "Recent platform activity and updates" : "Account and verification overview"}</p>
          </div>
          <button className="npl-icnbtn" onClick={onClose} aria-label="Close drawer"><X size={18} /></button>
        </div>

        {panel === "notifications" ? (
          <div className="npl-grid npl-drawer__list">
            {[
              ["Portfolio update", "Your latest performance summary is available.", "Now"],
              ["Verification complete", "Your identity details have been approved.", "2h"],
              ["NRFFN Academy", "A new wealth-building course is available.", "Today"],
            ].map(([title, copy, time], index) => (
              <div className={`npl-notif${index === 0 ? " unread" : ""}`} key={title}>
                <span className="npl-notif__ic"><Bell size={18} /></span>
                <div style={{ flex: 1 }}><b>{title}</b><p>{copy}</p></div>
                <small>{time}</small>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="npl-profile-summary">
              <span className="npl-avatar npl-avatar--large">{initials}</span>
              <div><h3>{name}</h3><p>{role}</p><span className="npl-badge ok"><ShieldCheck size={13} /> Verified</span></div>
            </div>
            <div className="npl-grid npl-drawer__list">
              {["Email and phone", "Government ID", "Account security"].map((item) => (
                <div className="npl-tree__row" key={item}>
                  <span className="npl-notif__ic"><UserRound size={17} /></span>
                  <b style={{ flex: 1, color: "var(--c-ink)" }}>{item}</b>
                  <span className="npl-badge ok"><Check size={12} /> Complete</span>
                </div>
              ))}
            </div>
            <a className="npl-btn npl-btn--secondary" href={role.includes("Investor") ? "/client/profile" : role.includes("Realtor") ? "/associate/profile" : "#"}>
              View full profile
            </a>
          </>
        )}
      </aside>
    </div>
  );
}
