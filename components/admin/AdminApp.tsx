"use client";

import { useState } from "react";
import {
  Activity, BadgeCheck, Bell, Building2, Check, Cog, Database, DollarSign, FileText,
  Home, LayoutGrid, LogOut, Menu, Search, Shield, TrendingUp, Users, Wallet
} from "lucide-react";
import {
  naira, platformStats, revenueTrend, membershipTiers, users, properties, commissions,
  auditLogs, roles, systemHealth
} from "../../lib/admin/data";
import PortalDrawers, { type PortalPanel } from "../PortalDrawers";

type Role = "Admin" | "Super Admin";
type PageKey =
  | "Dashboard" | "Users" | "Memberships" | "Properties" | "Commissions" | "Analytics"
  | "Revenue" | "Audit" | "Roles" | "Health" | "Settings";

const NAV: Record<PageKey, typeof Home> = {
  Dashboard: LayoutGrid, Users: Users, Memberships: BadgeCheck, Properties: Building2,
  Commissions: Wallet, Analytics: TrendingUp, Revenue: DollarSign, Audit: FileText,
  Roles: Shield, Health: Activity, Settings: Cog
};
const ADMIN_PAGES: PageKey[] = ["Dashboard", "Users", "Memberships", "Properties", "Commissions", "Analytics"];
const SUPER_PAGES: PageKey[] = ["Dashboard", "Users", "Revenue", "Commissions", "Audit", "Roles", "Health", "Settings"];

export default function AdminApp({ role = "Admin", initialPage = "Dashboard" }: { role?: Role; initialPage?: PageKey }) {
  const pages = role === "Super Admin" ? SUPER_PAGES : ADMIN_PAGES;
  const [page, setPage] = useState<PageKey>(pages.includes(initialPage) ? initialPage : "Dashboard");
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<PortalPanel>(null);
  const go = (p: PageKey) => { setPage(p); setOpen(false); };

  return (
    <div className="npl">
      <div className={`npl-shell${open ? " open" : ""}`}>
        {open && <div className="npl-overlay" onClick={() => setOpen(false)} />}
        <aside className="npl-side">
          <div className="npl-side__brand">
            <span className="chip"><img src="/assets/nrffn-logo-mark.png" alt="NRFFN" /></span>
            <div>
              <b style={{ color: "#fff", display: "block", fontSize: "1.05rem" }}>NRFFN</b>
              <span style={{ color: "rgba(255,255,255,.6)", fontSize: ".62rem", letterSpacing: ".1em" }}>{role.toUpperCase()}</span>
            </div>
          </div>
          <div className="npl-side__group">Control</div>
          {pages.map((p) => {
            const Icon = NAV[p];
            return (
              <button key={p} className={`npl-nav${page === p ? " active" : ""}`} onClick={() => go(p)}>
                <Icon size={19} /> <span>{p}</span>
              </button>
            );
          })}
          <div className="npl-side__foot"><a href="/" className="npl-nav"><LogOut size={19} /> <span>Sign out</span></a></div>
        </aside>

        <div className="npl-main">
          <header className="npl-top">
            <button className="npl-icnbtn npl-mtop" onClick={() => setOpen(true)} aria-label="Menu"><Menu size={20} /></button>
            <div><h1>{page === "Audit" ? "Audit Logs" : page}</h1><div className="npl-top__sub">{role} control panel</div></div>
            <label className="npl-top__search"><Search size={16} /><input placeholder="Search users, properties, payouts" /></label>
            <button className="npl-icnbtn" aria-label="Notifications" onClick={() => setPanel("notifications")}><Bell size={19} /><span className="dot" /></button>
            <button className="npl-pill-user" onClick={() => setPanel("profile")}><span className="npl-avatar">{role === "Super Admin" ? "SA" : "AD"}</span><span style={{ fontSize: ".85rem" }}>{role === "Super Admin" ? "Super" : "Admin"}</span></button>
          </header>

          <main className="npl-content">
            {page === "Dashboard" && <Dashboard role={role} go={go} />}
            {page === "Users" && <UsersView />}
            {page === "Memberships" && <Memberships />}
            {page === "Properties" && <Properties_ />}
            {page === "Commissions" && <Commissions_ />}
            {page === "Analytics" && <Analytics />}
            {page === "Revenue" && <Revenue />}
            {page === "Audit" && <Audit />}
            {page === "Roles" && <Roles_ />}
            {page === "Health" && <Health />}
            {page === "Settings" && <Settings />}
          </main>
        </div>
      </div>
      <nav className="npl-mobnav">
        {pages.slice(0, 5).map((p) => { const Icon = NAV[p]; return <button key={p} className={page === p ? "active" : ""} onClick={() => go(p)}><Icon size={20} /><span>{p}</span></button>; })}
      </nav>
      <PortalDrawers panel={panel} onClose={() => setPanel(null)} name={role === "Super Admin" ? "Super Admin" : "NRFFN Admin"} initials={role === "Super Admin" ? "SA" : "AD"} role={role} />
    </div>
  );
}

function PageHead({ eyebrow, title, sub, action }: { eyebrow: string; title: string; sub: string; action?: React.ReactNode }) {
  return <div className="npl-card__head" style={{ marginBottom: 0, alignItems: "center" }}><div className="npl-pagehead"><span>{eyebrow}</span><h2>{title}</h2><p>{sub}</p></div>{action}</div>;
}
function Metric({ icon: Icon, label, value, note, variant }: { icon: typeof Home; label: string; value: string; note?: React.ReactNode; variant?: string }) {
  return <div className={`npl-card npl-metric${variant ? " npl-metric--" + variant : ""}`}><span className="npl-metric__ic"><Icon size={21} /></span><b>{value}</b><span>{label}</span>{note && <small>{note}</small>}</div>;
}
function RevChart() {
  const max = Math.max(...revenueTrend);
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (<><div className="npl-bars">{revenueTrend.map((v, i) => <div key={i} className="bar" style={{ height: `${(v / max) * 100}%` }} />)}</div><div className="npl-bars-x">{months.map((m, i) => <span key={i}>{m}</span>)}</div></>);
}

/* ===== DASHBOARD ===== */
function Dashboard({ role, go }: { role: Role; go: (p: PageKey) => void }) {
  return (
    <>
      <div className="npl-card" style={{ background: "linear-gradient(150deg,#071f44,#0a3476 55%,#1046a3)", color: "#fff", border: "none", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: ".74rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#e6c158", fontWeight: 800 }}>Platform revenue</span>
          <h2 style={{ color: "#fff", fontSize: "2.2rem", margin: ".3rem 0" }}>{naira(platformStats.revenue)}</h2>
          <p style={{ color: "rgba(255,255,255,.82)" }}><span className="npl-badge ok" style={{ marginRight: 6 }}>+18%</span> {platformStats.newThisMonth} new members this month</p>
        </div>
        <button className="npl-btn npl-btn--primary" onClick={() => go(role === "Super Admin" ? "Revenue" : "Analytics")}><TrendingUp size={16} /> View analytics</button>
      </div>
      <div className="npl-grid cols-4">
        <Metric icon={Users} label="Total members" value={platformStats.members.toLocaleString()} note={<span className="npl-up">{platformStats.activeMembers.toLocaleString()} active</span>} variant="royal" />
        <Metric icon={Building2} label="Properties" value={String(platformStats.properties)} note="Listed estates" />
        <Metric icon={Wallet} label="Payouts to date" value={naira(platformStats.payouts)} variant="gold" />
        <Metric icon={DollarSign} label="Pending payouts" value={naira(platformStats.pendingPayouts)} note="Awaiting approval" />
      </div>
      <div className="npl-grid cols-2">
        <div className="npl-card"><div className="npl-card__head"><div><h3>Revenue trend</h3><p>Monthly (₦M)</p></div></div><RevChart /></div>
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Members by tier</h3><p>Distribution across membership</p></div></div>
          <div className="npl-grid" style={{ gap: ".55rem" }}>
            {membershipTiers.map((t) => {
              const max = Math.max(...membershipTiers.map((x) => x.members));
              return (<div className="npl-tree__row" key={t.tier}><b style={{ width: 84, color: "var(--c-ink)" }}>{t.tier}</b><div className="npl-tree__bar"><i style={{ width: `${(t.members / max) * 100}%` }} /></div><span style={{ width: 64, textAlign: "right", fontWeight: 700, color: "var(--c-muted)" }}>{t.members.toLocaleString()}</span></div>);
            })}
          </div>
        </div>
      </div>
      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Commissions awaiting approval</h3><p>Review and release payouts</p></div><button className="npl-btn npl-btn--ghost" onClick={() => go("Commissions")}>Open</button></div>
        <CommissionTable limit={3} />
      </div>
    </>
  );
}

/* ===== USERS ===== */
function UsersView() {
  const [f, setF] = useState("All");
  const items = f === "All" ? users : users.filter((u) => u.role === f);
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="User management" title="Members & roles" sub="Manage investors, realtors and access." action={<button className="npl-btn npl-btn--primary">+ Add user</button>} /></div>
      <div className="npl-grid cols-4">
        <Metric icon={Users} label="Total" value={platformStats.members.toLocaleString()} variant="royal" />
        <Metric icon={Check} label="Active" value={platformStats.activeMembers.toLocaleString()} />
        <Metric icon={BadgeCheck} label="Pending KYC" value="148" variant="gold" />
        <Metric icon={Shield} label="Suspended" value="23" />
      </div>
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        {["All", "Investor", "Realtor", "Admin"].map((t) => <button key={t} className={`npl-btn ${f === t ? "npl-btn--primary" : "npl-btn--ghost"}`} style={{ padding: ".5rem 1.1rem", fontSize: ".84rem" }} onClick={() => setF(t)}>{t}</button>)}
      </div>
      <div className="npl-card">
        <div className="npl-table-wrap">
          <table className="npl-table responsive">
            <thead><tr><th>Member</th><th>Role</th><th>Tier</th><th>Volume</th><th>Joined</th><th>Status</th></tr></thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id}>
                  <td data-label="Member"><b>{u.name}</b><div style={{ fontSize: ".78rem", color: "var(--c-muted)" }}>{u.email}</div></td>
                  <td data-label="Role"><span className="npl-badge blue">{u.role}</span></td>
                  <td data-label="Tier">{u.tier}</td>
                  <td data-label="Volume"><b>{naira(u.volume)}</b></td>
                  <td data-label="Joined">{u.joined}</td>
                  <td data-label="Status"><span className={`npl-badge ${u.status === "Active" ? "ok" : u.status === "Pending" ? "warn" : "hot"}`}>{u.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ===== MEMBERSHIPS ===== */
function Memberships() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Membership control" title="Tiers & pricing" sub="Manage the 6 membership categories." /></div>
      <div className="npl-grid cols-3">
        {membershipTiers.map((t) => (
          <div className="npl-card" key={t.tier} style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3>{t.tier}</h3><span className={`npl-badge ${t.color}`}>{t.members.toLocaleString()} members</span></div>
            <b style={{ fontSize: "1.5rem", color: "var(--c-royal)" }}>{t.price === 0 ? "Free" : naira(t.price)}</b>
            <span style={{ fontSize: ".8rem", color: "var(--c-muted)" }}>Registration fee</span>
            <button className="npl-btn npl-btn--ghost" style={{ marginTop: ".4rem" }}>Edit tier</button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===== PROPERTIES ===== */
function Properties_() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Property management" title="Estate listings" sub="Add, review and publish properties." action={<button className="npl-btn npl-btn--primary">+ Add property</button>} /></div>
      <div className="npl-card">
        <div className="npl-table-wrap">
          <table className="npl-table responsive">
            <thead><tr><th>Property</th><th>Model</th><th>Price</th><th>Units sold</th><th>Status</th></tr></thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id}>
                  <td data-label="Property"><b>{p.name}</b><div style={{ fontSize: ".78rem", color: "var(--c-muted)" }}>{p.location}</div></td>
                  <td data-label="Model"><span className="npl-badge blue">{p.model}</span></td>
                  <td data-label="Price"><b>{naira(p.price)}</b></td>
                  <td data-label="Units sold">
                    <div style={{ minWidth: 120 }}><div className="npl-progress"><i style={{ width: `${(p.sold / p.units) * 100}%` }} /></div><small style={{ fontSize: ".72rem", color: "var(--c-muted)", fontWeight: 700 }}>{p.sold}/{p.units}</small></div>
                  </td>
                  <td data-label="Status"><span className={`npl-badge ${p.status === "Active" ? "ok" : p.status === "Draft" ? "warn" : "cold"}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ===== COMMISSIONS ===== */
function CommissionTable({ limit }: { limit?: number }) {
  const items = limit ? commissions.slice(0, limit) : commissions;
  return (
    <div className="npl-table-wrap">
      <table className="npl-table responsive">
        <thead><tr><th>Realtor</th><th>Source</th><th>Type</th><th>Amount</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td data-label="Realtor"><b>{c.realtor}</b></td>
              <td data-label="Source">{c.property}</td>
              <td data-label="Type"><span className="npl-badge blue">{c.type}</span></td>
              <td data-label="Amount"><b>{naira(c.amount)}</b></td>
              <td data-label="Status"><span className={`npl-badge ${c.status === "Paid" ? "ok" : c.status === "Approved" ? "blue" : "warn"}`}>{c.status}</span></td>
              <td data-label="">{c.status === "Pending" && <button className="npl-btn npl-btn--success" style={{ padding: ".4rem .8rem", fontSize: ".8rem" }}>Approve</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Commissions_() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Commission oversight" title="Payout approvals" sub="Monitor and release realtor commissions." /></div>
      <div className="npl-grid cols-3">
        <Metric icon={Wallet} label="Pending approval" value={naira(platformStats.pendingPayouts)} variant="gold" />
        <Metric icon={Check} label="Paid this month" value={naira(48_200_000)} variant="royal" />
        <Metric icon={TrendingUp} label="Avg commission" value={naira(282_000)} />
      </div>
      <div className="npl-card"><CommissionTable /></div>
    </>
  );
}

/* ===== ANALYTICS / REVENUE ===== */
function Analytics() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="System analytics" title="Platform performance" sub="Members, sales and conversion trends." /></div>
      <div className="npl-grid cols-4">
        <Metric icon={Users} label="Member growth" value="+612" note={<span className="npl-up">this month</span>} variant="royal" />
        <Metric icon={Building2} label="Units sold" value="307" />
        <Metric icon={TrendingUp} label="Conversion" value="41%" variant="gold" />
        <Metric icon={Wallet} label="GMV" value={naira(platformStats.revenue)} />
      </div>
      <div className="npl-card"><div className="npl-card__head"><div><h3>Revenue trend</h3><p>Monthly (₦M)</p></div></div><RevChart /></div>
    </>
  );
}
function Revenue() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Revenue tracking" title="Financial overview" sub="Platform revenue, payouts and margins." /></div>
      <div className="npl-grid cols-4">
        <Metric icon={DollarSign} label="Total revenue" value={naira(platformStats.revenue)} variant="royal" />
        <Metric icon={Wallet} label="Total payouts" value={naira(platformStats.payouts)} variant="gold" />
        <Metric icon={TrendingUp} label="Net margin" value={naira(platformStats.revenue - platformStats.payouts)} note={<span className="npl-up">62%</span>} />
        <Metric icon={DollarSign} label="Pending" value={naira(platformStats.pendingPayouts)} />
      </div>
      <div className="npl-card"><div className="npl-card__head"><div><h3>Revenue trend</h3><p>Monthly (₦M)</p></div></div><RevChart /></div>
      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Revenue by tier</h3><p>Registration income</p></div></div>
        <div className="npl-grid" style={{ gap: ".55rem" }}>
          {membershipTiers.filter((t) => t.price > 0).map((t) => {
            const rev = t.price * t.members;
            const max = Math.max(...membershipTiers.filter((x) => x.price > 0).map((x) => x.price * x.members));
            return (<div className="npl-tree__row" key={t.tier}><b style={{ width: 84, color: "var(--c-ink)" }}>{t.tier}</b><div className="npl-tree__bar"><i style={{ width: `${(rev / max) * 100}%` }} /></div><span style={{ width: 120, textAlign: "right", fontWeight: 700, color: "var(--c-royal)" }}>{naira(rev)}</span></div>);
          })}
        </div>
      </div>
    </>
  );
}

/* ===== AUDIT ===== */
const auditColor: Record<string, string> = { config: "blue", money: "ok", security: "hot", content: "warn" };
function Audit() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Audit logs" title="Activity trail" sub="Every privileged action is recorded." /></div>
      <div className="npl-grid" style={{ gap: ".7rem" }}>
        {auditLogs.map((l, i) => (
          <div className="npl-notif" key={i}>
            <span className="npl-notif__ic"><FileText size={18} /></span>
            <div style={{ flex: 1 }}><b>{l.action}</b><p>{l.target} · <span style={{ color: "var(--c-muted)" }}>{l.actor}</span></p></div>
            <div style={{ textAlign: "right" }}><span className={`npl-badge ${auditColor[l.level]}`}>{l.level}</span><div><small style={{ color: "var(--c-muted)", fontWeight: 700 }}>{l.at}</small></div></div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===== ROLES ===== */
function Roles_() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Role permissions" title="Access control" sub="Define what each role can do." action={<button className="npl-btn npl-btn--primary">+ New role</button>} /></div>
      <div className="npl-grid cols-2">
        {roles.map((r) => (
          <div className="npl-card" key={r.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}><span className="npl-metric__ic" style={{ width: 38, height: 38 }}><Shield size={18} /></span><h3>{r.name}</h3></div><p style={{ color: "var(--c-muted)", fontSize: ".85rem", marginTop: ".5rem" }}>{r.perms}</p></div>
            <div style={{ textAlign: "right" }}><span className={`npl-badge ${r.color}`}>{r.users} users</span></div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===== HEALTH ===== */
function Health() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="System health" title="Infrastructure status" sub="Live monitoring of platform services." /></div>
      <div className="npl-grid cols-4">
        {systemHealth.map((s) => (
          <div className="npl-card npl-metric" key={s.name}>
            <span className="npl-metric__ic" style={{ background: s.ok ? "var(--ok-soft)" : "var(--warn-soft)", color: s.ok ? "var(--ok)" : "var(--warn)" }}><Database size={20} /></span>
            <b style={{ fontSize: "1.1rem" }}>{s.name}</b>
            <span className={`npl-badge ${s.ok ? "ok" : "warn"}`} style={{ alignSelf: "flex-start" }}>{s.status}</span>
            <small style={{ color: "var(--c-muted)", fontWeight: 700 }}>Uptime {s.uptime}</small>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===== SETTINGS ===== */
function Settings() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="System configuration" title="Platform settings" sub="Commission rates, branding and global controls." /></div>
      <div className="npl-grid cols-2">
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Commission rates</h3><p>5-level engine</p></div></div>
          <div className="npl-grid" style={{ gap: ".5rem" }}>
            {[["Direct", "10%"], ["Level 1", "5%"], ["Level 2", "3%"], ["Level 3", "2%"], ["Level 4", "1.5%"], ["Level 5", "1%"]].map(([l, v]) => (
              <div className="npl-tree__row" key={l} style={{ justifyContent: "space-between" }}><span style={{ fontWeight: 700, color: "var(--c-ink)" }}>{l}</span><span className="npl-badge blue">{v}</span></div>
            ))}
          </div>
        </div>
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Platform controls</h3><p>Global toggles</p></div></div>
          <div className="npl-grid" style={{ gap: ".5rem" }}>
            {[["New registrations", true], ["Withdrawals enabled", true], ["Maintenance mode", false], ["KYC required", true]].map(([l, on]) => (
              <div className="npl-tree__row" key={l as string} style={{ justifyContent: "space-between" }}><span style={{ fontWeight: 700, color: "var(--c-ink)" }}>{l}</span><span className={`npl-badge ${on ? "ok" : "cold"}`}>{on ? "On" : "Off"}</span></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
