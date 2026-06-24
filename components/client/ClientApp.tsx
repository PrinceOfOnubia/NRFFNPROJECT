"use client";

import { useRef, useState } from "react";
import {
  Bell, Building2, Check, ChevronRight, Clock3, Copy, Download, FileText, Home, LogOut,
  MapPin, Menu, Search, Share2, ShieldCheck, Store, TrendingUp, Users, Wallet, X, Landmark, MessageCircle,
  CreditCard, Smartphone, ArrowLeft, ArrowRight, Camera, Upload, Mail, Phone, UserPlus, Pencil
} from "lucide-react";
import {
  naira, investor, portfolio, wallet, holdings, marketplace, transactions, installments,
  documents, valueTrend, referral, clientNotifications, type Listing, type Holding
} from "../../lib/client/data";
import PortalDrawers, { type PortalPanel } from "../PortalDrawers";
import { propertySlug } from "../../lib/property-catalog";
import { downloadReceipt, downloadDocument } from "../../lib/pdf";

const docsForHolding = (h: Holding) =>
  documents.filter((d) => h.name.toLowerCase().startsWith(d.property.toLowerCase()));

type PageKey = "Home" | "Wallet" | "Marketplace" | "Investments" | "Documents" | "Referral" | "Notifications" | "Profile";

const NAV: [PageKey, typeof Home, string][] = [
  ["Home", Home, "MAIN"],
  ["Marketplace", Store, "INVEST"],
  ["Investments", Building2, "INVEST"],
  ["Wallet", Wallet, "MONEY"],
  ["Documents", FileText, "MONEY"],
  ["Referral", Share2, "MORE"],
  ["Notifications", Bell, "MORE"],
  ["Profile", Users, "MORE"]
];
const SUB: Record<PageKey, string> = {
  Home: "Your portfolio at a glance",
  Wallet: "Balance, income & transactions",
  Marketplace: "Browse & invest in verified properties",
  Investments: "Your holdings & payment plans",
  Documents: "Receipts, allocations & certificates",
  Referral: "Invite & earn",
  Notifications: "Activity & updates",
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
            {page === "Notifications" && <Notifications_ />}
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
      {holdings.map((h) => {
        const docs = docsForHolding(h);
        return (
          <div className="npl-card" key={h.id}>
            <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
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
            {docs.length > 0 && (
              <div style={{ marginTop: "1rem", borderTop: "1px solid var(--c-line)", paddingTop: ".9rem" }}>
                <small style={{ color: "var(--c-muted)", fontWeight: 700, fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".06em" }}>Property documents</small>
                <div className="npl-grid" style={{ gap: ".5rem", marginTop: ".55rem" }}>
                  {docs.map((d) => {
                    const Ic = docIcon[d.type] || FileText;
                    return (
                      <div className="npl-tree__row" key={d.id} style={{ gap: ".7rem" }}>
                        <span className="npl-lesson__ic" style={{ width: 30, height: 30 }}><Ic size={15} /></span>
                        <div style={{ flex: 1, minWidth: 0 }}><b style={{ color: "var(--c-ink)", fontSize: ".85rem", display: "block" }}>{d.name}</b><small style={{ color: "var(--c-muted)", fontSize: ".74rem" }}>{d.type} · {d.date}</small></div>
                        <button className="npl-btn npl-btn--ghost" style={{ padding: ".4rem .75rem", fontSize: ".8rem" }} onClick={() => downloadDocument(d.name, [["Property", h.name], ["Type", d.type], ["Date", d.date], ["Member", investor.name]])}><Download size={14} /></button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
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
              <button className="npl-btn npl-btn--ghost" style={{ padding: ".5rem .9rem" }} onClick={() => downloadDocument(d.name, [["Property", d.property], ["Type", d.type], ["Date", d.date], ["Member", investor.name]])}><Download size={15} /> Download</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Notifications_() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Activity" title="Notifications" sub="Investment, wallet and document updates." /></div>
      <div className="npl-grid" style={{ gap: ".8rem" }}>
        {clientNotifications.map((n) => (
          <div className={`npl-notif${n.unread ? " unread" : ""}`} key={n.title}>
            <span className="npl-notif__ic"><Bell size={19} /></span>
            <div style={{ flex: 1 }}><b>{n.title}</b><p>{n.body}</p><small>{n.at}</small></div>
          </div>
        ))}
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
type KycKey = "email" | "phone" | "bvn" | "id" | "kin";
const KYC_STEPS: { key: KycKey; label: string; icon: typeof Home }[] = [
  { key: "email", label: "Email verification", icon: Mail },
  { key: "phone", label: "Phone verification", icon: Phone },
  { key: "bvn", label: "BVN verification", icon: Landmark },
  { key: "id", label: "Government ID", icon: FileText },
  { key: "kin", label: "Next of kin", icon: UserPlus }
];

function Profile() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [done, setDone] = useState<Record<KycKey, boolean>>({ email: true, phone: true, bvn: true, id: true, kin: false });
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [form, setForm] = useState({ name: investor.name, email: "adaeze@mail.com", phone: "+234 803 000 1122" });

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setAvatar(URL.createObjectURL(f));
  };
  const completed = KYC_STEPS.filter((s) => done[s.key]).length;
  const pct = Math.round((completed / KYC_STEPS.length) * 100);
  const firstPending = KYC_STEPS.find((s) => !done[s.key])?.key ?? "email";

  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Account" title="Your profile" sub="Personal details and verification."
        action={pct < 100 && <button className="npl-btn npl-btn--primary" onClick={() => setVerifyOpen(true)}><ShieldCheck size={16} /> Complete verification</button>} /></div>

      <div className="npl-grid cols-2">
        <div className="npl-card" style={{ display: "flex", gap: "1.1rem", alignItems: "center" }}>
          <div className="npl-avatar-edit">
            {avatar ? <img src={avatar} alt="Your avatar" /> : <span className="npl-avatar">{investor.initials}</span>}
            <button className="npl-avatar-edit__btn" onClick={() => fileRef.current?.click()} aria-label="Change photo"><Camera size={15} /></button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} />
          </div>
          <div>
            <h3>{form.name}</h3>
            <p style={{ color: "var(--c-muted)" }}>{investor.tier} · Since {investor.joined}</p>
            <div style={{ marginTop: ".5rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
              <span className="npl-badge blue">{investor.tier}</span>
              <span className={`npl-badge ${pct === 100 ? "ok" : "warn"}`}>{pct === 100 ? <><ShieldCheck size={12} /> Verified</> : `${pct}% verified`}</span>
            </div>
          </div>
        </div>

        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Personal details</h3><p>Edit your account information</p></div></div>
          <div className="npl-field"><label>Full name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="npl-fieldrow">
            <div className="npl-field"><label>Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="npl-field"><label>Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <button className="npl-btn npl-btn--primary" style={{ alignSelf: "flex-start" }}><Pencil size={15} /> Save changes</button>
        </div>
      </div>

      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Verification & KYC</h3><p>Required for investments & payouts</p></div></div>
        <div className="npl-progress" style={{ marginBottom: ".9rem" }}><i style={{ width: `${pct}%` }} /></div>
        <div className="npl-grid" style={{ gap: ".6rem" }}>
          {KYC_STEPS.map((s) => (
            <div className="npl-tree__row" key={s.key} style={{ justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center", gap: ".6rem", fontWeight: 700, color: "var(--c-ink)" }}><span className="npl-lesson__ic" style={{ width: 30, height: 30 }}><s.icon size={15} /></span> {s.label}</span>
              {done[s.key]
                ? <span className="npl-badge ok"><Check size={12} /> Done</span>
                : <button className="npl-btn npl-btn--ghost" style={{ padding: ".35rem .8rem", fontSize: ".8rem" }} onClick={() => setVerifyOpen(true)}>Verify</button>}
            </div>
          ))}
        </div>
      </div>

      {verifyOpen && (
        <VerificationDrawer
          initialStep={firstPending}
          done={done}
          onClose={() => setVerifyOpen(false)}
          onComplete={(key) => setDone((d) => ({ ...d, [key]: true }))}
        />
      )}
    </>
  );
}

/* ===================== VERIFICATION DRAWER ===================== */
function VerificationDrawer({ initialStep, done, onClose, onComplete }: {
  initialStep: KycKey; done: Record<KycKey, boolean>; onClose: () => void; onComplete: (k: KycKey) => void;
}) {
  const [active, setActive] = useState<KycKey>(initialStep);
  const idx = KYC_STEPS.findIndex((s) => s.key === active);
  const step = KYC_STEPS[idx];
  const [idFile, setIdFile] = useState<string | null>(null);
  const idRef = useRef<HTMLInputElement>(null);

  const next = () => {
    onComplete(active);
    const remaining = KYC_STEPS.find((s, i) => i > idx && !done[s.key] && s.key !== active) ?? KYC_STEPS.find((s) => !done[s.key] && s.key !== active);
    if (remaining) setActive(remaining.key);
    else onClose();
  };

  return (
    <div className="npl-drawer-overlay" onClick={onClose}>
      <div className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head"><div><h3>Verify {step.label.toLowerCase()}</h3><p>Step {idx + 1} of {KYC_STEPS.length} · KYC</p></div><button className="npl-icnbtn" onClick={onClose}><X size={18} /></button></div>

        <div className="npl-steps">
          {KYC_STEPS.map((s, i) => (
            <div key={s.key} className={`npl-steps__item${i === idx ? " active" : ""}${done[s.key] ? " done" : ""}`}>
              <span className="npl-steps__dot">{done[s.key] ? <Check size={14} /> : i + 1}</span>
              {i < KYC_STEPS.length - 1 && <span className="npl-steps__line" />}
            </div>
          ))}
        </div>

        {active === "email" && (
          <>
            <div className="npl-field"><label>Email address</label><input type="email" defaultValue="adaeze@mail.com" /></div>
            <div className="npl-field"><label>Email verification code</label><input placeholder="000000" inputMode="numeric" style={{ letterSpacing: ".35em", textAlign: "center" }} /></div>
            <small style={{ color: "var(--c-muted)" }}>Didn&apos;t get it? <b style={{ color: "var(--c-royal)" }}>Resend code</b></small>
          </>
        )}
        {active === "phone" && (
          <>
            <div className="npl-field"><label>Phone number</label><input defaultValue="+234 803 000 1122" /></div>
            <div className="npl-field"><label>SMS verification code</label><input placeholder="000000" inputMode="numeric" style={{ letterSpacing: ".35em", textAlign: "center" }} /></div>
            <small style={{ color: "var(--c-muted)" }}>Use a phone number that can receive payout and allocation alerts.</small>
          </>
        )}
        {active === "bvn" && (
          <>
            <div className="npl-field"><label>Bank Verification Number (BVN)</label><input placeholder="22XXXXXXXXX" maxLength={11} /></div>
            <div className="npl-field"><label>Date of birth</label><input type="date" /></div>
            <div className="npl-note"><b>Why we ask</b><br /><span>Your BVN confirms your identity with your bank. We never store your banking PIN.</span></div>
          </>
        )}
        {active === "id" && (
          <>
            <div className="npl-field"><label>ID type</label><select><option>National ID (NIN)</option><option>International passport</option><option>Driver&apos;s licence</option><option>Voter&apos;s card</option></select></div>
            <div className="npl-field"><label>ID number</label><input placeholder="Enter ID number" /></div>
            <label className={`npl-upload${idFile ? " has-file" : ""}`} onClick={() => idRef.current?.click()}>
              {idFile ? <><Check size={22} /><b>{idFile}</b><small>Tap to replace</small></> : <><Upload size={22} /><b>Upload a photo of your ID</b><small>JPG or PNG, up to 5MB</small></>}
              <input ref={idRef} type="file" accept="image/*" hidden onChange={(e) => setIdFile(e.target.files?.[0]?.name ?? null)} />
            </label>
          </>
        )}
        {active === "kin" && (
          <>
            <div className="npl-field"><label>Next of kin full name</label><input placeholder="Full name" /></div>
            <div className="npl-fieldrow">
              <div className="npl-field"><label>Relationship</label><select><option>Spouse</option><option>Parent</option><option>Sibling</option><option>Child</option><option>Other</option></select></div>
              <div className="npl-field"><label>Phone</label><input placeholder="+234..." /></div>
            </div>
            <div className="npl-field"><label>Address</label><textarea rows={2} placeholder="Residential address" /></div>
          </>
        )}

        <button className="npl-btn npl-btn--primary npl-btn--block" onClick={next}>
          <Check size={16} /> {KYC_STEPS.filter((s) => !done[s.key] && s.key !== active).length ? "Verify & continue" : "Finish verification"}
        </button>
      </div>
    </div>
  );
}

/* ===================== CHECKOUT DRAWER ===================== */
const PAY_METHODS: { id: string; label: string; sub: string; icon: typeof Home }[] = [
  { id: "Card", label: "Debit / Credit card", sub: "Pay instantly with your card", icon: CreditCard },
  { id: "Bank transfer", label: "Bank transfer", sub: "Transfer to a one-time account", icon: Landmark },
  { id: "Wallet", label: "NRFFN wallet", sub: `Balance ${naira(wallet.available)}`, icon: Wallet },
  { id: "USSD", label: "USSD", sub: "Pay from any phone, *737#", icon: Smartphone }
];

const STEP_LABELS = ["Details", "Payment", "Receipt"];
function Stepper({ step }: { step: number }) {
  return (
    <div className="npl-steps">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className={`npl-steps__item${i === step ? " active" : ""}${i < step ? " done" : ""}`}>
          <span className="npl-steps__dot">{i < step ? <Check size={14} /> : i + 1}</span>
          <span className="npl-steps__label">{label}</span>
          {i < STEP_LABELS.length - 1 && <span className="npl-steps__line" />}
        </div>
      ))}
    </div>
  );
}

function BuyDrawer({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState("Outright");
  const [units, setUnits] = useState(1);
  const [method, setMethod] = useState("Card");
  const reference = useRef("NRF-" + Math.random().toString(36).slice(2, 8).toUpperCase()).current;

  const dueNow = plan === "Outright" ? listing.price * units : Math.round(listing.price * units * 0.3);
  const planNote = plan === "Outright" ? "Full payment" : plan === "Flex" ? "Flexible monthly" : "30% deposit, balance over 12 months";
  const receipt = {
    reference, date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    investorName: investor.name, property: listing.name, location: listing.location,
    model: listing.model, plan, paymentMethod: method, units, amount: dueNow
  };

  return (
    <div className="npl-drawer-overlay" onClick={onClose}>
      <div className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head">
          <div><h3>{step === 2 ? "Payment confirmed" : `Invest — ${listing.name}`}</h3><p>{listing.location}</p></div>
          <button className="npl-icnbtn" onClick={onClose}><X size={18} /></button>
        </div>

        {step < 2 && <Stepper step={step} />}

        {step === 0 && (
          <>
            <img src={listing.img} alt={listing.name} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 14 }} />
            <div className="npl-grid cols-2" style={{ gap: ".7rem" }}>
              <div className="npl-note"><span>Price per unit</span><br /><b>{naira(listing.price)}</b></div>
              <div className="npl-note"><span>Expected return</span><br /><b>{listing.roi}</b></div>
            </div>
            <div className="npl-field"><label>Payment plan</label>
              <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                <option>Outright</option><option>Installment (12 months)</option><option>Flex</option>
              </select>
            </div>
            <div className="npl-field"><label>Units</label>
              <input type="number" value={units} min={1} onChange={(e) => setUnits(Math.max(1, Number(e.target.value) || 1))} />
            </div>
            <div className="npl-summary">
              <div className="npl-summary__row"><span>Total value</span><b>{naira(listing.price * units)}</b></div>
              <div className="npl-summary__row"><span>Plan</span><b>{planNote}</b></div>
              <div className="npl-summary__row"><span>Due now</span><b style={{ color: "var(--c-royal)" }}>{naira(dueNow)}</b></div>
            </div>
            <button className="npl-btn npl-btn--success npl-btn--block" onClick={() => setStep(1)}>Continue to payment <ArrowRight size={16} /></button>
          </>
        )}

        {step === 1 && (
          <>
            <div className="npl-summary">
              <div className="npl-summary__row"><span>{listing.name} × {units}</span><b>{naira(listing.price * units)}</b></div>
              <div className="npl-summary__row"><span>Due now ({plan})</span><b style={{ color: "var(--c-royal)" }}>{naira(dueNow)}</b></div>
            </div>
            <div className="npl-field" style={{ gap: ".55rem" }}>
              <label>Choose a payment method</label>
              <div className="npl-optgrid">
                {PAY_METHODS.map((m) => (
                  <button key={m.id} className={`npl-opttile${method === m.id ? " active" : ""}`} onClick={() => setMethod(m.id)}>
                    <span className="npl-opttile__ic"><m.icon size={19} /></span>
                    <span><b>{m.label}</b><small>{m.sub}</small></span>
                    {method === m.id && <Check size={18} className="npl-opttile__check" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="npl-note"><b>Secure mock checkout</b><br /><span>No real charge is made. This demonstrates the NRFFN payment flow.</span></div>
            <div style={{ display: "flex", gap: ".6rem" }}>
              <button className="npl-btn npl-btn--ghost" onClick={() => setStep(0)}><ArrowLeft size={16} /> Back</button>
              <button className="npl-btn npl-btn--success" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(2)}><ShieldCheck size={16} /> Pay {naira(dueNow)}</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="npl-success">
              <span className="npl-success__badge"><Check size={36} /></span>
              <h3>Investment confirmed</h3>
              <p>Your payment of {naira(dueNow)} via {method} was successful.</p>
            </div>
            <div className="npl-summary">
              <div className="npl-summary__row"><span>Reference</span><b>{reference}</b></div>
              <div className="npl-summary__row"><span>Property</span><b>{listing.name}</b></div>
              <div className="npl-summary__row"><span>Units</span><b>{units}</b></div>
              <div className="npl-summary__row"><span>Amount paid</span><b>{naira(dueNow)}</b></div>
              <div className="npl-summary__row"><span>Method</span><b>{method}</b></div>
            </div>
            <button className="npl-btn npl-btn--primary npl-btn--block" onClick={() => downloadReceipt(receipt)}><Download size={16} /> Download receipt (PDF)</button>
            <button className="npl-btn npl-btn--ghost npl-btn--block" onClick={onClose}>Done</button>
          </>
        )}
      </div>
    </div>
  );
}
