"use client";

import { useState } from "react";
import {
  Bell, Building2, Check, ChevronRight, Clock3, Copy, Download, FileText, Home, LogOut,
  MapPin, Menu, Search, Share2, ShieldCheck, Store, TrendingUp, Users, Wallet, X, Landmark, MessageCircle
} from "lucide-react";
import {
  naira, investor, portfolio, wallet, holdings, marketplace, transactions, installments,
  documents, valueTrend, referral, type Listing
} from "../../lib/client/data";
import PortalDrawers, { type PortalPanel } from "../PortalDrawers";
import { propertySlug } from "../../lib/property-catalog";

type PageKey = "Home" | "Wallet" | "Marketplace" | "Investments" | "Documents" | "Referral" | "Profile";

const NAV: [PageKey, typeof Home, string][] = [
  ["Home", Home, "MAIN"],
  ["Marketplace", Store, "INVEST"],
  ["Investments", Building2, "INVEST"],
  ["Wallet", Wallet, "MONEY"],
  ["Documents", FileText, "MONEY"],
  ["Referral", Share2, "MORE"],
  ["Profile", Users, "MORE"]
];
const SUB: Record<PageKey, string> = {
  Home: "Your portfolio at a glance",
  Wallet: "Balance, income & transactions",
  Marketplace: "Browse & invest in verified properties",
  Investments: "Your holdings & payment plans",
  Documents: "Receipts, allocations & certificates",
  Referral: "Invite & earn",
  Profile: "Account & verification"
};

export default function ClientApp({ initialPage = "Home" }: { initialPage?: PageKey }) {
  const [page, setPage] = useState<PageKey>(initialPage);
  const [open, setOpen] = useState(false);
  const [buy, setBuy] = useState<Listing | null>(null);
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
              <span style={{ color: "rgba(255,255,255,.6)", fontSize: ".66rem", letterSpacing: ".12em" }}>INVESTOR PORTAL</span>
            </div>
          </div>
          {["MAIN", "INVEST", "MONEY", "MORE"].map((grp) => (
            <div key={grp}>
              <div className="npl-side__group">{grp}</div>
              {NAV.filter((n) => n[2] === grp).map(([label, Icon]) => (
                <button key={label} className={`npl-nav${page === label ? " active" : ""}`} onClick={() => go(label)}>
                  <Icon size={19} /> <span>{label}</span>
                </button>
              ))}
            </div>
          ))}
          <div className="npl-side__foot"><a href="/" className="npl-nav"><LogOut size={19} /> <span>Exit portal</span></a></div>
        </aside>

        <div className="npl-main">
          <header className="npl-top">
            <button className="npl-icnbtn npl-mtop" onClick={() => setOpen(true)} aria-label="Menu"><Menu size={20} /></button>
            <div><h1>{page}</h1><div className="npl-top__sub">{SUB[page]}</div></div>
            <label className="npl-top__search"><Search size={16} /><input placeholder="Search properties, documents" /></label>
            <button className="npl-top__wallet" onClick={() => go("Wallet")}><Wallet size={16} /> {naira(wallet.available)}</button>
            <button className="npl-icnbtn" aria-label="Notifications" onClick={() => setPanel("notifications")}><Bell size={19} /><span className="dot" /></button>
            <button className="npl-pill-user" onClick={() => setPanel("profile")}><span className="npl-avatar">{investor.initials}</span><span style={{ fontSize: ".85rem" }}>{investor.name.split(" ")[0]}</span></button>
          </header>

          <main className="npl-content">
            {page === "Home" && <HomeView go={go} onBuy={setBuy} />}
            {page === "Marketplace" && <Marketplace onBuy={setBuy} />}
            {page === "Investments" && <Investments />}
            {page === "Wallet" && <WalletView />}
            {page === "Documents" && <Documents_ />}
            {page === "Referral" && <Referral_ />}
            {page === "Profile" && <Profile />}
          </main>
        </div>
      </div>

      <nav className="npl-mobnav">
        {(["Home", "Marketplace", "Investments", "Wallet", "Profile"] as PageKey[]).map((p) => {
          const Icon = NAV.find((n) => n[0] === p)![1];
          return <button key={p} className={page === p ? "active" : ""} onClick={() => go(p)}><Icon size={20} /><span>{p}</span></button>;
        })}
      </nav>

      {buy && <BuyDrawer listing={buy} onClose={() => setBuy(null)} />}
      <PortalDrawers panel={panel} onClose={() => setPanel(null)} name={investor.name} initials={investor.initials} role="Investor Member" />
    </div>
  );
}

function PageHead({ eyebrow, title, sub, action }: { eyebrow: string; title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div className="npl-card__head" style={{ marginBottom: 0, alignItems: "center" }}>
      <div className="npl-pagehead"><span>{eyebrow}</span><h2>{title}</h2><p>{sub}</p></div>
      {action}
    </div>
  );
}
function Metric({ icon: Icon, label, value, note, variant }: { icon: typeof Home; label: string; value: string; note?: React.ReactNode; variant?: string }) {
  return (
    <div className={`npl-card npl-metric${variant ? " npl-metric--" + variant : ""}`}>
      <span className="npl-metric__ic"><Icon size={21} /></span><b>{value}</b><span>{label}</span>{note && <small>{note}</small>}
    </div>
  );
}
const modelBadge = (m: string) => (m === "Land Banking" ? "ok" : m === "Co-Ownership" ? "blue" : m === "Flex" ? "warn" : "blue");

/* ===================== HOME ===================== */
function HomeView({ go, onBuy }: { go: (p: PageKey) => void; onBuy: (l: Listing) => void }) {
  const max = Math.max(...valueTrend);
  return (
    <>
      <div className="npl-card" style={{ background: "linear-gradient(150deg,#071f44,#0a3476 55%,#1046a3)", color: "#fff", border: "none", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: ".74rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#e6c158", fontWeight: 800 }}>Portfolio value</span>
          <h2 style={{ color: "#fff", fontSize: "2.2rem", margin: ".3rem 0" }}>{naira(portfolio.currentValue)}</h2>
          <p style={{ color: "rgba(255,255,255,.82)" }}><span className="npl-badge ok" style={{ marginRight: 6 }}>+{portfolio.roi}%</span> {naira(portfolio.gain)} total gain · {naira(portfolio.monthlyIncome)}/mo income</p>
        </div>
        <button className="npl-btn npl-btn--success" onClick={() => go("Marketplace")}><Store size={16} /> Invest more</button>
      </div>

      <div className="npl-grid cols-4">
        <Metric icon={TrendingUp} label="Invested capital" value={naira(portfolio.invested)} variant="royal" />
        <Metric icon={Wallet} label="Available balance" value={naira(wallet.available)} note={<span className="npl-up">Ready to invest</span>} variant="gold" />
        <Metric icon={Building2} label="Active holdings" value={String(holdings.length)} note="Across 3 models" />
        <Metric icon={Clock3} label="Monthly income" value={naira(portfolio.monthlyIncome)} note={<span className="npl-up">+8% this quarter</span>} />
      </div>

      <div className="npl-grid cols-2">
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Portfolio growth</h3><p>Value over last 7 months (₦M)</p></div></div>
          <div className="npl-bars">{valueTrend.map((v, i) => <div key={i} className="bar" style={{ height: `${(v / max) * 100}%` }} />)}</div>
          <div className="npl-bars-x">{["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => <span key={m}>{m}</span>)}</div>
        </div>
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Your holdings</h3><p>Current allocation</p></div><button className="npl-btn npl-btn--ghost" onClick={() => go("Investments")}>View all <ChevronRight size={15} /></button></div>
          <div className="npl-grid" style={{ gap: ".7rem" }}>
            {holdings.map((h) => (
              <div className="npl-tree__row" key={h.id} style={{ gap: ".9rem" }}>
                <img src={h.img} alt="" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}><b style={{ color: "var(--c-ink)", display: "block" }}>{h.name}</b><span style={{ fontSize: ".78rem", color: "var(--c-muted)" }}>{h.model}</span></div>
                <div style={{ textAlign: "right" }}><b style={{ color: "var(--c-royal)" }}>{naira(h.value)}</b></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Recommended for you</h3><p>Verified opportunities matching your profile</p></div><button className="npl-btn npl-btn--ghost" onClick={() => go("Marketplace")}>Marketplace <ChevronRight size={15} /></button></div>
        <div className="npl-grid cols-3">{marketplace.slice(0, 3).map((l) => <ListingCard key={l.id} l={l} onBuy={onBuy} />)}</div>
      </div>
    </>
  );
}

function ListingCard({ l, onBuy }: { l: Listing; onBuy: (l: Listing) => void }) {
  return (
    <div className="npl-course">
      <div className="npl-course__media">
        <img src={l.img} alt={l.name} />
        <span className={`npl-badge ${modelBadge(l.model)} npl-course__cat`}>{l.model}</span>
        {l.badge && <span className="npl-badge hot" style={{ position: "absolute", top: ".7rem", right: ".7rem" }}>{l.badge}</span>}
      </div>
      <div className="npl-course__body">
        <h3>{l.name}</h3>
        <div className="npl-course__meta"><MapPin size={14} /> {l.location}</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".4rem", alignItems: "flex-end" }}>
          <div><small style={{ color: "var(--c-muted)", fontWeight: 700, fontSize: ".72rem" }}>From</small><div style={{ fontWeight: 800, color: "var(--c-ink)" }}>{naira(l.price)}</div></div>
          <span className="npl-badge ok">{l.roi}</span>
        </div>
        <div className="npl-property-actions">
          <a className="npl-btn npl-btn--secondary" href={`/properties/${propertySlug(l.name)}`}>View Property</a>
          <button className="npl-btn npl-btn--success" onClick={() => onBuy(l)}>Invest now</button>
        </div>
      </div>
    </div>
  );
}

/* ===================== MARKETPLACE ===================== */
function Marketplace({ onBuy }: { onBuy: (l: Listing) => void }) {
  const [filter, setFilter] = useState("All");
  const tabs = ["All", "Full Ownership", "Co-Ownership", "Land Banking", "Flex"];
  const items = filter === "All" ? marketplace : marketplace.filter((l) => l.model === filter);
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Marketplace" title="Verified properties" sub="Every estate is vetted, mapped and documented before listing." /></div>
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t} className={`npl-btn ${filter === t ? "npl-btn--primary" : "npl-btn--ghost"}`} style={{ padding: ".5rem 1.1rem", fontSize: ".84rem" }} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>
      <div className="npl-grid cols-3">{items.map((l) => <ListingCard key={l.id} l={l} onBuy={onBuy} />)}</div>
    </>
  );
}

/* ===================== INVESTMENTS ===================== */
function Investments() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Your holdings" title="Investment portfolio" sub="Track value, returns and payment plans." /></div>
      <div className="npl-grid cols-3">
        <Metric icon={TrendingUp} label="Total invested" value={naira(portfolio.invested)} variant="royal" />
        <Metric icon={Building2} label="Current value" value={naira(portfolio.currentValue)} variant="gold" />
        <Metric icon={Check} label="Total ROI" value={`+${portfolio.roi}%`} note={<span className="npl-up">{naira(portfolio.gain)} gain</span>} />
      </div>
      {holdings.map((h) => (
        <div className="npl-card" key={h.id} style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
          <img src={h.img} alt={h.name} style={{ width: 120, height: 90, borderRadius: 14, objectFit: "cover" }} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <span className={`npl-badge ${modelBadge(h.model)}`}>{h.model}</span>
            <h3 style={{ margin: ".4rem 0 .2rem" }}>{h.name}</h3>
            <p style={{ color: "var(--c-muted)", fontSize: ".85rem", display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} /> {h.location}</p>
            {h.progress < 100 && (
              <div style={{ marginTop: ".6rem", maxWidth: 280 }}>
                <div className="npl-progress"><i style={{ width: `${h.progress}%` }} /></div>
                <small style={{ fontSize: ".72rem", color: "var(--c-muted)", fontWeight: 700 }}>{h.progress}% paid · installment plan</small>
              </div>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <small style={{ color: "var(--c-muted)", fontWeight: 700, fontSize: ".72rem" }}>Current value</small>
            <div style={{ fontWeight: 800, color: "var(--c-royal)", fontSize: "1.3rem" }}>{naira(h.value)}</div>
            <span className="npl-badge ok">+{Math.round(((h.value - h.invested) / h.invested) * 100)}%</span>
          </div>
        </div>
      ))}
      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Greenfield Plots — payment plan</h3><p>Installment schedule</p></div></div>
        <div className="npl-grid auto">
          {installments.map((i) => (
            <div className="npl-tree__row" key={i.n} style={{ justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: "var(--c-ink)" }}>#{i.n} · {naira(i.amount)}</span>
              <span className={`npl-badge ${i.paid ? "ok" : "warn"}`}>{i.paid ? "Paid" : i.due}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ===================== WALLET ===================== */
function WalletView() {
  return (
    <>
      <div className="npl-card" style={{ background: "linear-gradient(150deg,#071f44,#1046a3)", color: "#fff", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div><span style={{ fontSize: ".74rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#e6c158", fontWeight: 800 }}>Available balance</span><h2 style={{ color: "#fff", fontSize: "2.2rem", margin: ".3rem 0" }}>{naira(wallet.available)}</h2></div>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}><button className="npl-btn npl-btn--primary"><Wallet size={16} /> Fund wallet</button><button className="npl-btn npl-btn--secondary">Withdraw</button></div>
      </div>
      <div className="npl-grid cols-3">
        <Metric icon={Wallet} label="Available" value={naira(wallet.available)} variant="gold" />
        <Metric icon={Clock3} label="Pending income" value={naira(wallet.pending)} note="Settling soon" />
        <Metric icon={TrendingUp} label="Invested" value={naira(wallet.invested)} variant="royal" />
      </div>
      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Transaction history</h3><p>Investments, income & transfers</p></div><button className="npl-btn npl-btn--ghost"><Download size={15} /> Export</button></div>
        <div className="npl-table-wrap">
          <table className="npl-table responsive">
            <thead><tr><th>Date</th><th>Type</th><th>Description</th><th>Amount</th></tr></thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td data-label="Date">{t.date}</td>
                  <td data-label="Type"><span className={`npl-badge ${t.type === "Income" ? "ok" : t.type === "Investment" ? "blue" : t.type === "Deposit" ? "warn" : "cold"}`}>{t.type}</span></td>
                  <td data-label="Description">{t.description}</td>
                  <td data-label="Amount"><b style={{ color: t.amount < 0 ? "var(--hot)" : "var(--ok)" }}>{t.amount < 0 ? "−" : "+"}{naira(Math.abs(t.amount))}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ===================== DOCUMENTS ===================== */
const docIcon: Record<string, typeof Home> = { Allocation: Landmark, Receipt: FileText, Contract: FileText, Certificate: ShieldCheck, Survey: MapPin };
function Documents_() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Document center" title="Your documents" sub="Receipts, allocation letters, contracts and certificates." /></div>
      <div className="npl-grid" style={{ gap: ".8rem" }}>
        {documents.map((d) => {
          const Ic = docIcon[d.type] || FileText;
          return (
            <div className="npl-notif" key={d.id}>
              <span className="npl-notif__ic"><Ic size={19} /></span>
              <div style={{ flex: 1 }}><b>{d.name}</b><p>{d.property} · {d.type} · {d.date}</p></div>
              <button className="npl-btn npl-btn--ghost" style={{ padding: ".5rem .9rem" }}><Download size={15} /> Download</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ===================== REFERRAL ===================== */
function Referral_() {
  const [copied, setCopied] = useState(false);
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&color=071f44&data=${encodeURIComponent(referral.link)}`;
  const copy = () => { navigator.clipboard?.writeText(referral.link); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Invite & earn" title="Refer fellow investors" sub="Share your link and earn rewards on every successful referral." /></div>
      <div className="npl-grid cols-2">
        <div className="npl-card">
          <div className="npl-refbox">
            <div className="npl-qr"><img src={qr} alt="Referral QR" /></div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ marginBottom: ".6rem" }}>Your referral link</h3>
              <div className="npl-linkfield"><input readOnly value={referral.link} /><button className="npl-btn npl-btn--primary" onClick={copy}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy"}</button></div>
              <div className="npl-share" style={{ marginTop: ".8rem" }}><a href={`https://wa.me/?text=${encodeURIComponent(referral.link)}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a><button><Share2 size={15} /> Share</button></div>
            </div>
          </div>
        </div>
        <div className="npl-grid cols-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <Metric icon={Users} label="People invited" value={String(referral.invited)} variant="royal" />
          <Metric icon={Wallet} label="Rewards earned" value={naira(referral.earned)} variant="gold" />
        </div>
      </div>
    </>
  );
}

/* ===================== PROFILE ===================== */
function Profile() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Account" title="Your profile" sub="Personal details and verification." /></div>
      <div className="npl-grid cols-2">
        <div className="npl-card" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span className="npl-avatar" style={{ width: 64, height: 64, fontSize: "1.4rem" }}>{investor.initials}</span>
          <div>
            <h3>{investor.name}</h3>
            <p style={{ color: "var(--c-muted)" }}>{investor.tier} · Since {investor.joined}</p>
            <div style={{ marginTop: ".5rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}><span className="npl-badge blue">{investor.tier}</span><span className="npl-badge ok"><ShieldCheck size={12} /> Verified</span></div>
          </div>
        </div>
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Verification & KYC</h3><p>Required for investments & payouts</p></div></div>
          <div className="npl-grid" style={{ gap: ".6rem" }}>
            {[["Email & phone", true], ["BVN verification", true], ["Government ID", true], ["Next of kin", false]].map(([l, done]) => (
              <div className="npl-tree__row" key={l as string} style={{ justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, color: "var(--c-ink)" }}>{l}</span>
                <span className={`npl-badge ${done ? "ok" : "warn"}`}>{done ? <><Check size={12} /> Done</> : "Pending"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ===================== BUY DRAWER ===================== */
function BuyDrawer({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const [plan, setPlan] = useState("Outright");
  return (
    <div className="npl-drawer-overlay" onClick={onClose}>
      <div className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head"><div><h3>Invest — {listing.name}</h3><p>{listing.location}</p></div><button className="npl-icnbtn" onClick={onClose}><X size={18} /></button></div>
        <img src={listing.img} alt={listing.name} style={{ width: "100%", height: 170, objectFit: "cover", borderRadius: 14 }} />
        <div className="npl-grid cols-2" style={{ gap: ".7rem" }}>
          <div className="npl-note"><span>Price from</span><br /><b>{naira(listing.price)}</b></div>
          <div className="npl-note"><span>Expected return</span><br /><b>{listing.roi}</b></div>
          <div className="npl-note"><span>Model</span><br /><b>{listing.model}</b></div>
          <div className="npl-note"><span>Status</span><br /><b>{listing.status}</b></div>
        </div>
        <div className="npl-field"><label>Payment plan</label><select value={plan} onChange={(e) => setPlan(e.target.value)}><option>Outright</option><option>Installment (12 months)</option><option>Flex</option></select></div>
        <div className="npl-field"><label>Units</label><input type="number" defaultValue={1} min={1} /></div>
        <div className="npl-note"><b>Verified asset</b><br /><span>Title documents, location data and inspection media reviewed by NRFFN.</span></div>
        <button className="npl-btn npl-btn--success" style={{ width: "100%" }} onClick={onClose}><ShieldCheck size={16} /> Proceed to checkout</button>
      </div>
    </div>
  );
}
