"use client";

import { useState } from "react";
import {
  Activity, BadgeCheck, Bell, Building2, Check, Cog, Database, DollarSign, FileText,
  Home, LayoutGrid, LogOut, Menu, Search, Shield, TrendingUp, Users, Wallet,
  X, Plus, ShieldCheck, ClipboardCheck, MapPin, Ban, UserCog
} from "lucide-react";
import {
  naira, platformStats, revenueTrend, membershipTiers, users, properties, commissions,
  auditLogs, roles, systemHealth, kycRequests, manualInvestments,
  type KycRequest, type Commission, type ManualInvestment
} from "../../lib/admin/data";
import PortalDrawers, { type PortalPanel } from "../PortalDrawers";

type Role = "Admin" | "Super Admin";
type PageKey =
  | "Dashboard" | "Users" | "Memberships" | "Properties" | "Commissions" | "Analytics"
  | "Revenue" | "Audit" | "Roles" | "Health" | "Settings" | "KYC" | "Investments";

const NAV: Record<PageKey, typeof Home> = {
  Dashboard: LayoutGrid, Users: Users, Memberships: BadgeCheck, Properties: Building2,
  Commissions: Wallet, Analytics: TrendingUp, Revenue: DollarSign, Audit: FileText,
  Roles: Shield, Health: Activity, Settings: Cog, KYC: ClipboardCheck, Investments: TrendingUp
};
const ADMIN_PAGES: PageKey[] = ["Dashboard", "Users", "Roles", "Memberships", "Properties", "Commissions", "KYC", "Investments", "Analytics"];
const SUPER_PAGES: PageKey[] = ["Dashboard", "Users", "Roles", "Revenue", "Commissions", "KYC", "Investments", "Audit", "Health", "Settings"];

export default function AdminApp({ role = "Admin", initialPage = "Dashboard" }: { role?: Role; initialPage?: PageKey }) {
  const pages = role === "Super Admin" ? SUPER_PAGES : ADMIN_PAGES;
  const [page, setPage] = useState<PageKey>(pages.includes(initialPage) ? initialPage : "Dashboard");
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<PortalPanel>(null);
  const [addingUser, setAddingUser] = useState(false);
  const go = (p: PageKey) => { setPage(p); setOpen(false); };
  const unread = 3;

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
          <div className="npl-side__foot"><a href="/" className="npl-nav npl-nav--danger"><LogOut size={19} /> <span>Exit portal</span></a></div>
        </aside>

        <div className="npl-main">
          <header className="npl-top">
            <button className="npl-icnbtn npl-mtop" onClick={() => setOpen(true)} aria-label="Menu"><Menu size={20} /></button>
            <div><h1>{page === "Audit" ? "Audit Logs" : page}</h1><div className="npl-top__sub">{role} control panel</div></div>
            <label className="npl-top__search"><Search size={16} /><input placeholder="Search users, properties, payouts" /></label>
            <button className="npl-icnbtn" aria-label="Notifications" onClick={() => setPanel("notifications")}><Bell size={19} />{unread > 0 && <span className="npl-badgecount">{unread}</span>}</button>
            <button className="npl-pill-user" onClick={() => setPanel("profile")}><span className="npl-avatar">{role === "Super Admin" ? "SA" : "AD"}</span><span style={{ fontSize: ".85rem" }}>{role === "Super Admin" ? "Super" : "Admin"}</span></button>
          </header>

          <main className="npl-content">
            {page === "Dashboard" && <Dashboard role={role} go={go} />}
            {page === "Users" && <UsersView onAdd={() => setAddingUser(true)} />}
            {page === "Memberships" && <Memberships />}
            {page === "Properties" && <Properties_ />}
            {page === "Commissions" && <Commissions_ />}
            {page === "Analytics" && <Analytics />}
            {page === "KYC" && <Kyc />}
            {page === "Investments" && <Investments_ />}
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
      {addingUser && <AddUserDrawer onClose={() => setAddingUser(false)} />}
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
function UsersView({ onAdd }: { onAdd: () => void }) {
  const [f, setF] = useState("All");
  const items = f === "All" ? users : users.filter((u) => u.role === f);
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="User management" title="Members & roles" sub="Manage investors, realtors and access." action={<button className="npl-btn npl-btn--primary" onClick={onAdd}><Plus size={16} /> Add user</button>} /></div>
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

function AddUserDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="npl-drawer-overlay" onClick={onClose} role="presentation">
      <aside className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head">
          <div><h3>Add a user</h3><p>Create access for a new member or staff account</p></div>
          <button className="npl-icnbtn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="npl-field"><label>Full name</label><input placeholder="e.g. Adaeze Nwankwo" /></div>
        <div className="npl-fieldrow">
          <div className="npl-field"><label>Email address</label><input type="email" placeholder="name@mail.com" /></div>
          <div className="npl-field"><label>Phone number</label><input placeholder="+234 800 000 0000" /></div>
        </div>
        <div className="npl-fieldrow">
          <div className="npl-field"><label>Role</label><select><option>Investor</option><option>Realtor</option><option>Admin</option><option>Support</option></select></div>
          <div className="npl-field"><label>Tier</label><select><option>Associate</option><option>Bronze</option><option>Silver</option><option>Gold</option><option>Platinum</option><option>VIP</option></select></div>
        </div>
        <div className="npl-field"><label>Initial status</label><select><option>Pending</option><option>Active</option><option>Suspended</option></select></div>
        <div className="npl-field"><label>Notes</label><textarea rows={3} placeholder="Access notes, placement details or approvals..." /></div>
        <div style={{ display: "flex", gap: ".6rem" }}>
          <button className="npl-btn npl-btn--ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Cancel</button>
          <button className="npl-btn npl-btn--primary" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}><Check size={16} /> Create user</button>
        </div>
      </aside>
    </div>
  );
}

/* ===== MEMBERSHIPS ===== */
type Tier = (typeof membershipTiers)[number];
function Memberships() {
  const [editing, setEditing] = useState<Tier | null>(null);
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Membership control" title="Tiers & pricing" sub="Manage the 6 membership categories." /></div>
      <div className="npl-grid cols-3">
        {membershipTiers.map((t) => (
          <div className="npl-card" key={t.tier} style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3>{t.tier}</h3><span className={`npl-badge ${t.color}`}>{t.members.toLocaleString()} members</span></div>
            <b style={{ fontSize: "1.5rem", color: "var(--c-royal)" }}>{t.price === 0 ? "Free" : naira(t.price)}</b>
            <span style={{ fontSize: ".8rem", color: "var(--c-muted)" }}>Registration fee</span>
            <button className="npl-btn npl-btn--ghost" style={{ marginTop: ".4rem" }} onClick={() => setEditing(t)}>Edit tier</button>
          </div>
        ))}
      </div>
      {editing && <EditTierDrawer tier={editing} onClose={() => setEditing(null)} />}
    </>
  );
}

function EditTierDrawer({ tier, onClose }: { tier: Tier; onClose: () => void }) {
  return (
    <div className="npl-drawer-overlay" onClick={onClose} role="presentation">
      <aside className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head"><div><h3>Edit {tier.tier} tier</h3><p>{tier.members.toLocaleString()} members on this tier</p></div><button className="npl-icnbtn" onClick={onClose}><X size={18} /></button></div>
        <div className="npl-field"><label>Tier name</label><input defaultValue={tier.tier} /></div>
        <div className="npl-fieldrow">
          <div className="npl-field"><label>Registration fee (₦)</label><input type="number" defaultValue={tier.price} /></div>
          <div className="npl-field"><label>Badge colour</label><select defaultValue={tier.color}><option value="cold">Neutral</option><option value="warn">Bronze</option><option value="blue">Blue</option><option value="ok">Green</option></select></div>
        </div>
        <div className="npl-field"><label>Member benefits</label><textarea rows={3} defaultValue={"Priority allocations\nReduced commission split\nDedicated adviser"} /></div>
        <div className="npl-field"><label>Status</label><select><option>Active</option><option>Hidden</option></select></div>
        <div style={{ display: "flex", gap: ".6rem" }}>
          <button className="npl-btn npl-btn--ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Cancel</button>
          <button className="npl-btn npl-btn--primary" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}><Check size={16} /> Save tier</button>
        </div>
      </aside>
    </div>
  );
}

/* ===== PROPERTIES ===== */
function Properties_() {
  const [adding, setAdding] = useState(false);
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Property management" title="Estate listings" sub="Add, review and publish properties." action={<button className="npl-btn npl-btn--primary" onClick={() => setAdding(true)}><Plus size={16} /> Add property</button>} /></div>
      {adding && <AddPropertyDrawer onClose={() => setAdding(false)} />}
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

function AddPropertyDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="npl-drawer-overlay" onClick={onClose} role="presentation">
      <aside className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head"><div><h3>Add a property</h3><p>List a new estate on the marketplace</p></div><button className="npl-icnbtn" onClick={onClose}><X size={18} /></button></div>
        <div className="npl-field"><label>Property name</label><input placeholder="e.g. Emerald Heights Residence" /></div>
        <div className="npl-fieldrow">
          <div className="npl-field"><label>Location</label><input placeholder="Lekki Phase 1, Lagos" /></div>
          <div className="npl-field"><label>Model</label><select><option>Full Ownership</option><option>Co-Ownership</option><option>Land Banking</option><option>Flex</option></select></div>
        </div>
        <div className="npl-fieldrow">
          <div className="npl-field"><label>Price per unit (₦)</label><input type="number" placeholder="95,000,000" /></div>
          <div className="npl-field"><label>Total units</label><input type="number" placeholder="24" /></div>
        </div>
        <div className="npl-field"><label>Expected return</label><input placeholder="18% projected annual return" /></div>
        <label className="npl-upload"><Plus size={20} /><b>Upload property images</b><small>Cover photo + gallery — JPG or PNG</small><input type="file" accept="image/*" multiple hidden /></label>
        <div className="npl-field"><label>Description</label><textarea rows={3} placeholder="Describe the property..." /></div>
        <div className="npl-field"><label>Status</label><select><option>Draft</option><option>Active</option></select></div>
        <div style={{ display: "flex", gap: ".6rem" }}>
          <button className="npl-btn npl-btn--ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Cancel</button>
          <button className="npl-btn npl-btn--primary" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}><Check size={16} /> Publish property</button>
        </div>
      </aside>
    </div>
  );
}

/* ===== KYC MANAGEMENT ===== */
function Kyc() {
  const [rows, setRows] = useState<KycRequest[]>(kycRequests);
  const setStatus = (id: string, status: KycRequest["status"]) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  const pending = rows.filter((r) => r.status === "Pending").length;
  const badge = (s: KycRequest["status"]) => (s === "Approved" ? "ok" : s === "Rejected" ? "hot" : "warn");
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Compliance" title="KYC management" sub="Monitor, approve or revoke member verification." /></div>
      <div className="npl-grid cols-4">
        <Metric icon={ClipboardCheck} label="Pending review" value={String(pending)} variant="gold" />
        <Metric icon={Check} label="Approved" value={String(rows.filter((r) => r.status === "Approved").length)} variant="royal" />
        <Metric icon={Ban} label="Rejected" value={String(rows.filter((r) => r.status === "Rejected").length)} />
        <Metric icon={ShieldCheck} label="Verification rate" value="86%" />
      </div>
      <div className="npl-card">
        <div className="npl-table-wrap">
          <table className="npl-table responsive">
            <thead><tr><th>Member</th><th>Submission</th><th>Tier</th><th>Submitted</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td data-label="Member"><b>{r.name}</b><div style={{ fontSize: ".78rem", color: "var(--c-muted)" }}>{r.email}</div></td>
                  <td data-label="Submission"><span className="npl-badge blue">{r.type}</span></td>
                  <td data-label="Tier">{r.tier}</td>
                  <td data-label="Submitted">{r.submitted}</td>
                  <td data-label="Status"><span className={`npl-badge ${badge(r.status)}`}>{r.status}</span></td>
                  <td data-label="Action">
                    <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
                      {r.status !== "Approved" && <button className="npl-btn npl-btn--primary" style={{ padding: ".4rem .7rem", fontSize: ".78rem" }} onClick={() => setStatus(r.id, "Approved")}><Check size={13} /> Approve</button>}
                      {r.status !== "Rejected" && <button className="npl-btn npl-btn--ghost" style={{ padding: ".4rem .7rem", fontSize: ".78rem" }} onClick={() => setStatus(r.id, r.status === "Approved" ? "Pending" : "Rejected")}>{r.status === "Approved" ? "Revoke" : "Reject"}</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ===== INVESTMENT MANAGEMENT ===== */
function Investments_() {
  const [rows, setRows] = useState<ManualInvestment[]>(manualInvestments);
  const [form, setForm] = useState({ user: users[0].name, property: properties[0].name, units: 1, amount: properties[0].price });
  const add = () => {
    setRows((rs) => [
      { id: "mi" + Date.now(), user: form.user, property: form.property, units: form.units, amount: form.amount, date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), by: "admin@nrffn.ng" },
      ...rs
    ]);
  };
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Operations" title="Investment management" sub="Manually record an investment when an investor pays offline." /></div>
      <div className="npl-grid cols-2">
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Add investment</h3><p>Select user, property and amount</p></div></div>
          <div className="npl-field"><label>Investor</label>
            <select value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })}>
              {users.filter((u) => u.role === "Investor").map((u) => <option key={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div className="npl-field"><label>Property</label>
            <select value={form.property} onChange={(e) => { const p = properties.find((x) => x.name === e.target.value)!; setForm({ ...form, property: e.target.value, amount: p.price * form.units }); }}>
              {properties.map((p) => <option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="npl-fieldrow">
            <div className="npl-field"><label>Units</label>
              <input type="number" min={1} value={form.units} onChange={(e) => { const units = Math.max(1, Number(e.target.value) || 1); const p = properties.find((x) => x.name === form.property)!; setForm({ ...form, units, amount: p.price * units }); }} />
            </div>
            <div className="npl-field"><label>Amount (₦)</label><input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) || 0 })} /></div>
          </div>
          <div className="npl-note"><b>Manual entry</b><br /><span>Use this only for verified offline / bank-transfer payments. The investor&apos;s portfolio updates immediately.</span></div>
          <button className="npl-btn npl-btn--success npl-btn--block" onClick={add}><Plus size={16} /> Add investment</button>
        </div>
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Recent manual entries</h3><p>Logged investments</p></div></div>
          <div className="npl-table-wrap">
            <table className="npl-table responsive">
              <thead><tr><th>Investor</th><th>Property</th><th>Units</th><th>Amount</th><th>Date</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td data-label="Investor"><b>{r.user}</b></td>
                    <td data-label="Property">{r.property}</td>
                    <td data-label="Units">{r.units}</td>
                    <td data-label="Amount"><b>{naira(r.amount)}</b></td>
                    <td data-label="Date">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===== COMMISSIONS ===== */
function CommissionTable({ limit }: { limit?: number }) {
  const [rows, setRows] = useState<Commission[]>(commissions);
  const [approval, setApproval] = useState<Commission | null>(null);
  const items = limit ? rows.slice(0, limit) : rows;
  const setStatus = (id: string, status: Commission["status"]) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  return (
    <>
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
                <td data-label="">
                  {c.status === "Pending" && <button className="npl-btn npl-btn--primary" style={{ padding: ".4rem .8rem", fontSize: ".8rem" }} onClick={() => setApproval(c)}><Check size={14} /> Approve commission</button>}
                  {c.status === "Approved" && <button className="npl-btn npl-btn--primary" style={{ padding: ".4rem .8rem", fontSize: ".8rem" }} onClick={() => setStatus(c.id, "Paid")}>Mark paid</button>}
                  {c.status === "Paid" && <span style={{ color: "var(--c-muted)", fontSize: ".8rem", fontWeight: 700 }}>Released</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {approval && (
        <CommissionApproveDrawer
          item={approval}
          onClose={() => setApproval(null)}
          onApprove={() => { setStatus(approval.id, "Approved"); setApproval(null); }}
        />
      )}
    </>
  );
}

function CommissionApproveDrawer({
  item,
  onClose,
  onApprove,
}: {
  item: Commission;
  onClose: () => void;
  onApprove: () => void;
}) {
  return (
    <div className="npl-drawer-overlay" onClick={onClose} role="presentation">
      <aside className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head">
          <div>
            <h3>Approve commission</h3>
            <p>Review the payout before releasing funds</p>
          </div>
          <button className="npl-icnbtn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="npl-grid" style={{ gap: ".7rem" }}>
          <div className="npl-note"><b>Realtor</b><br /><span>{item.realtor}</span></div>
          <div className="npl-note"><b>Source property</b><br /><span>{item.property}</span></div>
          <div className="npl-note"><b>Commission type</b><br /><span>{item.type}</span></div>
          <div className="npl-note"><b>Amount</b><br /><span>{naira(item.amount)}</span></div>
        </div>
        <div className="npl-note">
          <b>Approval note</b><br />
          <span>This mock approval will move the commission to the approved state immediately.</span>
        </div>
        <div style={{ display: "flex", gap: ".6rem" }}>
          <button className="npl-btn npl-btn--ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Cancel</button>
          <button className="npl-btn npl-btn--primary" style={{ flex: 1, justifyContent: "center" }} onClick={onApprove}><Check size={16} /> Approve now</button>
        </div>
      </aside>
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
const ALL_PERMS = ["Manage users", "Manage properties", "Approve commissions", "Manage KYC", "Add investments", "View revenue", "Edit settings", "View analytics"];
function Roles_() {
  const [drawer, setDrawer] = useState<null | { mode: "new" } | { mode: "edit"; name: string; perms: string }>(null);
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Role permissions" title="User roles & access control" sub="Define what each role can do." action={<button className="npl-btn npl-btn--primary" onClick={() => setDrawer({ mode: "new" })}><Plus size={16} /> New role</button>} /></div>
      <div className="npl-grid cols-2">
        {roles.map((r) => (
          <div className="npl-card" key={r.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <div><div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}><span className="npl-metric__ic" style={{ width: 38, height: 38 }}><Shield size={18} /></span><h3>{r.name}</h3></div><p style={{ color: "var(--c-muted)", fontSize: ".85rem", marginTop: ".5rem" }}>{r.perms}</p></div>
            <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: ".5rem", alignItems: "flex-end" }}>
              <span className={`npl-badge ${r.color}`}>{r.users} users</span>
              <button className="npl-btn npl-btn--ghost" style={{ padding: ".4rem .8rem", fontSize: ".8rem" }} onClick={() => setDrawer({ mode: "edit", name: r.name, perms: r.perms })}><UserCog size={14} /> Edit</button>
            </div>
          </div>
        ))}
      </div>
      {drawer && <RoleDrawer data={drawer} onClose={() => setDrawer(null)} />}
    </>
  );
}

function RoleDrawer({ data, onClose }: { data: { mode: "new" } | { mode: "edit"; name: string; perms: string }; onClose: () => void }) {
  const isEdit = data.mode === "edit";
  const defaultChecked = (p: string) => isEdit && data.perms.toLowerCase().includes(p.split(" ")[1] ?? p.toLowerCase());
  return (
    <div className="npl-drawer-overlay" onClick={onClose} role="presentation">
      <aside className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head"><div><h3>{isEdit ? `Edit ${data.name}` : "Create a new role"}</h3><p>Set the name and permissions for this role</p></div><button className="npl-icnbtn" onClick={onClose}><X size={18} /></button></div>
        <div className="npl-field"><label>Role name</label><input defaultValue={isEdit ? data.name : ""} placeholder="e.g. Operations" /></div>
        <div className="npl-field"><label>Description</label><input defaultValue={isEdit ? data.perms : ""} placeholder="What can this role do?" /></div>
        <div className="npl-field" style={{ gap: ".55rem" }}>
          <label>Permissions</label>
          <div className="npl-grid cols-2" style={{ gap: ".5rem" }}>
            {ALL_PERMS.map((p) => (
              <label key={p} className="npl-tree__row" style={{ gap: ".55rem", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked={defaultChecked(p)} style={{ width: 16, height: 16 }} />
                <span style={{ fontWeight: 600, color: "var(--c-ink)", fontSize: ".85rem" }}>{p}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: ".6rem" }}>
          <button className="npl-btn npl-btn--ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Cancel</button>
          <button className="npl-btn npl-btn--primary" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}><Check size={16} /> {isEdit ? "Save role" : "Create role"}</button>
        </div>
      </aside>
    </div>
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
