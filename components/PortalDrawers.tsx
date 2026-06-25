"use client";

import { Camera, Bell, Check, LogOut, ShieldCheck, UserRound, X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { membershipBadgeClass } from "../lib/membership";

export type PortalPanel = "notifications" | "profile" | null;

export default function PortalDrawers({
  panel,
  onClose,
  name,
  initials,
  role,
  avatarUrl,
  onAvatarChange,
  membershipTier,
}: {
  panel: PortalPanel;
  onClose: () => void;
  name: string;
  initials: string;
  role: string;
  avatarUrl?: string | null;
  onAvatarChange?: (next: string) => void;
  membershipTier?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);
  const shownAvatar = avatarUrl ?? localAvatar;
  if (!panel) return null;

  const pickAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLocalAvatar(url);
    onAvatarChange?.(url);
  };

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
              <div className="npl-profile-summary__avatar">
                {shownAvatar ? <img src={shownAvatar} alt={`${name} profile`} /> : <span className="npl-avatar npl-avatar--large">{initials}</span>}
                <button className="npl-avatar-edit__btn" type="button" onClick={() => fileRef.current?.click()} aria-label="Change profile photo">
                  <Camera size={15} />
                </button>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickAvatar} />
              </div>
              <div>
                <h3>{name}</h3>
                <p>{role}</p>
                <div className="npl-profile-summary__tags">
                  <span className="npl-badge ok"><ShieldCheck size={13} /> Verified</span>
                  {membershipTier && <span className={`npl-badge ${membershipBadgeClass(membershipTier)}`}>{membershipTier}</span>}
                </div>
              </div>
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
            <div className="npl-profile-actions">
              <a className="npl-btn npl-btn--secondary npl-btn--block" href={role.includes("Investor") ? "/client/profile" : role.includes("Realtor") ? "/associate/profile" : "#"}>
                View full profile
              </a>
              <a className="npl-nav npl-nav--danger npl-profile-actions__signout" href="/">
                <LogOut size={16} /> Sign out
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
