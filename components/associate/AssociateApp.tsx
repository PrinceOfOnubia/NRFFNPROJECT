"use client";

import { useState } from "react";
import {
  Award, Bell, Building2, ChevronRight, Clock3, Copy, Crown, Download, Facebook, GraduationCap,
  Home, LayoutGrid, LogOut, MapPin, Menu, MessageCircle, Play, Plus, Search, Share2,
  ShieldCheck, Target, Trophy, Users, Wallet, X, Check, TrendingUp, Star, Lock, Plane, Gift,
  ArrowLeft, ArrowRight, FileCheck, PlayCircle, Eye
} from "lucide-react";
import {
  naira, member, ranks, rankProgress, commissionLevels, earningsBreakdown, wallet,
  transactions, leads, leadStages, team, referralStats, courses, academyStats, quiz,
  notifications, funnel, weeklyEarnings, certificates, lessonsFor, type Lead, type Course
} from "../../lib/associate/data";
import PortalDrawers, { type PortalPanel } from "../PortalDrawers";
import MembershipHub from "../membership/MembershipHub";
import { propertySlug } from "../../lib/property-catalog";
import { downloadCertificate } from "../../lib/pdf";

type PageKey =
  | "Overview" | "Earnings" | "Referrals" | "CRM" | "Academy"
  | "Membership" | "Incentives" | "Team" | "Properties" | "Notifications" | "Profile";

const NAV: [PageKey, typeof Home, string][] = [
  ["Overview", Home, "MAIN"],
  ["CRM", Target, "MAIN"],
  ["Referrals", Share2, "GROWTH"],
  ["Team", Users, "GROWTH"],
  ["Membership", Crown, "GROWTH"],
  ["Earnings", Wallet, "MONEY"],
  ["Incentives", Trophy, "MONEY"],
  ["Properties", Building2, "TOOLS"],
  ["Academy", GraduationCap, "TOOLS"],
  ["Notifications", Bell, "TOOLS"],
  ["Profile", Users, "TOOLS"]
];

const SUBTITLE: Record<PageKey, string> = {
  Overview: "Your performance at a glance",
  Earnings: "Wallet, commissions & withdrawals",
  Referrals: "Share, track & grow your network",
  CRM: "Lead pipeline & follow-ups",
  Academy: "Learn, certify & grow",
  Membership: "Upgrade your membership",
  Incentives: "Ranks, rewards & recognition",
  Team: "Your downline & leadership",
  Properties: "Listings & sales tools",
  Notifications: "Activity & updates",
  Profile: "Account & verification"
};

export default function AssociateApp({ initialPage = "Overview" }: { initialPage?: PageKey }) {
  const [page, setPage] = useState<PageKey>(initialPage);
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState<null | "withdraw" | "lead" | "addlead">(null);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [panel, setPanel] = useState<PortalPanel>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [membershipTier, setMembershipTier] = useState("Bronze");
  const [setupDismissed, setSetupDismissed] = useState(false);

  const go = (p: PageKey) => { setPage(p); setOpen(false); };
  const unread = notifications.filter((n) => n.unread).length;

  const openLead = (l: Lead) => { setActiveLead(l); setDrawer("lead"); };

  return (
    <div className="npl">
      <div className={`npl-shell${open ? " open" : ""}`}>
        {open && <div className="npl-overlay" onClick={() => setOpen(false)} />}

        {/* SIDEBAR */}
        <aside className="npl-side">
          <div className="npl-side__brand">
            <span className="chip"><img src="/assets/nrffn-logo-mark-white.png" alt="NRFFN" /></span>
            <div>
              <b style={{ color: "#fff", display: "block", fontSize: "1.05rem" }}>NRFFN</b>
              <span style={{ color: "rgba(255,255,255,.6)", fontSize: ".66rem", letterSpacing: ".12em" }}>REALTOR PORTAL</span>
            </div>
          </div>
          {groupNav().map((grp) => (
            <div key={grp.label}>
              <div className="npl-side__group">{grp.label}</div>
              {grp.items.map(([label, Icon]) => (
                <button key={label} className={`npl-nav${page === label ? " active" : ""}`} onClick={() => go(label)}>
                  <Icon size={19} /> <span>{label}</span>
                  {label === "Notifications" && unread > 0 && <span className="npl-nav__badge">{unread}</span>}
                </button>
              ))}
            </div>
          ))}
          <div className="npl-side__foot">
            <a href="/" className="npl-nav npl-nav--danger"><LogOut size={19} /> <span>Sign out</span></a>
          </div>
        </aside>

        {/* MAIN */}
        <div className="npl-main">
          <header className="npl-top">
            <button className="npl-icnbtn npl-mtop" onClick={() => setOpen(true)} aria-label="Menu"><Menu size={20} /></button>
            <div>
              <h1>{page}</h1>
              <div className="npl-top__sub">{SUBTITLE[page]}</div>
            </div>
            <label className="npl-top__search">
              <Search size={16} />
              <input placeholder="Search leads, properties, members" />
            </label>
            <button className="npl-top__wallet" onClick={() => go("Earnings")}>
              <Wallet size={16} /> {naira(wallet.available)}
            </button>
            <button className="npl-icnbtn" onClick={() => setPanel("notifications")} aria-label="Notifications">
              <Bell size={19} />{unread > 0 && <span className="npl-badgecount">{unread}</span>}
            </button>
            <button className="npl-pill-user" onClick={() => setPanel("profile")}>
              {avatarUrl ? <img className="npl-avatar" src={avatarUrl} alt="" /> : <span className="npl-avatar">{member.initials}</span>}
              <span style={{ fontSize: ".85rem" }}>{member.name.split(" ")[0]}</span>
            </button>
          </header>

          <main className="npl-content">
            {page === "Overview" && (
              <Overview
                go={go}
                onWithdraw={() => setDrawer("withdraw")}
                setupDismissed={setupDismissed}
                onDismissSetup={() => setSetupDismissed(true)}
              />
            )}
            {page === "Earnings" && <Earnings onWithdraw={() => setDrawer("withdraw")} />}
            {page === "Referrals" && <Referrals />}
            {page === "CRM" && <CRM onOpen={openLead} onAdd={() => setDrawer("addlead")} />}
            {page === "Academy" && <Academy />}
            {page === "Membership" && (
              <MembershipHub
                currentTier={membershipTier}
                roleLabel="Realtor membership"
                onTierChange={setMembershipTier}
              />
            )}
            {page === "Incentives" && <Incentives />}
            {page === "Team" && <Team_ />}
            {page === "Properties" && <Properties />}
            {page === "Notifications" && <Notifications_ />}
            {page === "Profile" && <Profile />}
          </main>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="npl-mobnav">
        {(["Overview", "CRM", "Earnings", "Referrals", "Academy"] as PageKey[]).map((p) => {
          const Icon = NAV.find((n) => n[0] === p)![1];
          return (
            <button key={p} className={page === p ? "active" : ""} onClick={() => go(p)}>
              <Icon size={20} /><span>{p === "Overview" ? "Home" : p}</span>
            </button>
          );
        })}
      </nav>

      {/* DRAWERS */}
      {drawer === "withdraw" && <WithdrawDrawer onClose={() => setDrawer(null)} />}
      {drawer === "lead" && activeLead && <LeadDrawer lead={activeLead} onClose={() => setDrawer(null)} />}
      {drawer === "addlead" && <AddLeadDrawer onClose={() => setDrawer(null)} />}
      <PortalDrawers panel={panel} onClose={() => setPanel(null)} name={member.name} initials={member.initials} role="Realtor Member" avatarUrl={avatarUrl} onAvatarChange={setAvatarUrl} membershipTier={membershipTier} />
    </div>
  );
}

function groupNav() {
  const order = ["MAIN", "GROWTH", "MONEY", "TOOLS"];
  return order.map((label) => ({
    label,
    items: NAV.filter((n) => n[2] === label).map((n) => [n[0], n[1]] as [PageKey, typeof Home])
  }));
}

/* ---------- shared ---------- */
function PageHead({ eyebrow, title, sub, action }: { eyebrow: string; title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div className="npl-card__head" style={{ marginBottom: 0, alignItems: "center" }}>
      <div className="npl-pagehead">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
      {action}
    </div>
  );
}
function Metric({ icon: Icon, label, value, note, variant }: { icon: typeof Home; label: string; value: string; note?: React.ReactNode; variant?: string }) {
  return (
    <div className={`npl-card npl-metric${variant ? " npl-metric--" + variant : ""}`}>
      <span className="npl-metric__ic"><Icon size={21} /></span>
      <b>{value}</b>
      <span>{label}</span>
      {note && <small>{note}</small>}
    </div>
  );
}
function Bars({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data);
  return (
    <>
      <div className="npl-bars">{data.map((v, i) => <div key={i} className="bar" style={{ height: `${(v / max) * 100}%` }} />)}</div>
      <div className="npl-bars-x">{labels.map((l, index) => <span key={`${l}-${index}`}>{l}</span>)}</div>
    </>
  );
}
const tempClass = (t: string) => (t === "Hot" ? "hot" : t === "Warm" ? "warn" : "cold");

/* ============================== OVERVIEW ============================== */
function Overview({
  go,
  onWithdraw,
  setupDismissed,
  onDismissSetup,
}: {
  go: (p: PageKey) => void;
  onWithdraw: () => void;
  setupDismissed: boolean;
  onDismissSetup: () => void;
}) {
  return (
    <>
      {!setupDismissed && (
        <AccountSetupPrompt
          onDismiss={onDismissSetup}
          onAction={() => go("Profile")}
        />
      )}

      <div className="npl-card" style={{ background: "linear-gradient(150deg,#071f44,#0a3476 55%,#1046a3)", color: "#fff", border: "none", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: ".74rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#e6c158", fontWeight: 800 }}>Good morning, {member.name.split(" ")[0]}</span>
          <h2 style={{ color: "#fff", fontSize: "1.7rem", margin: ".4rem 0" }}>You&apos;re {Math.round((rankProgress.volume / rankProgress.target) * 100)}% to {rankProgress.next}</h2>
          <p style={{ color: "rgba(255,255,255,.78)" }}>{naira(rankProgress.volume)} of {naira(rankProgress.target)} team volume · Rank: {member.rank}</p>
        </div>
        <div className="npl-hero-actions">
          <button className="npl-btn npl-btn--primary npl-btn--block" onClick={() => go("Referrals")}><Share2 size={16} /> Share link</button>
          <button className="npl-btn npl-btn--ghost npl-btn--block" onClick={onWithdraw}><Wallet size={16} /> Withdraw</button>
        </div>
      </div>

      <div className="npl-grid cols-4">
        <Metric icon={Wallet} label="Available balance" value={naira(wallet.available)} note={<span className="npl-up">Ready to withdraw</span>} variant="royal" />
        <Metric icon={Clock3} label="Pending commissions" value={naira(wallet.pending)} note="Awaiting milestones" />
        <Metric icon={Users} label="Total team" value={String(referralStats.totalReferrals + 82)} note="Across 5 levels" />
        <Metric icon={Target} label="Conversion rate" value={`${referralStats.conversionRate}%`} note={<span className="npl-up">+6% this month</span>} variant="gold" />
      </div>

      <div className="npl-grid cols-2">
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Weekly earnings</h3><p>Last 7 days (₦000)</p></div></div>
          <Bars data={weeklyEarnings} labels={["M", "T", "W", "T", "F", "S", "S"]} />
        </div>
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Conversion funnel</h3><p>Lead-to-sale movement</p></div></div>
          <div className="npl-funnel">
            {funnel.map((f) => (
              <div className="npl-funnel__row" key={f.stage}>
                <span>{f.stage}</span>
                <div className="npl-funnel__bar"><div className="npl-funnel__fill" style={{ width: `${(f.value / funnel[0].value) * 100}%` }}>{f.value}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Follow-ups due</h3><p>Your most important next conversations</p></div><button className="npl-btn npl-btn--ghost" onClick={() => go("CRM")}>Open CRM <ChevronRight size={15} /></button></div>
        <div className="npl-grid auto">
          {leads.slice(0, 3).map((l) => (
            <div className="npl-leadcard" key={l.id}>
              <b>{l.name}</b><small>{l.property} · {naira(l.budget)}</small>
              <div className="npl-leadcard__foot"><span className={`npl-badge ${tempClass(l.temp)}`}>{l.temp}</span><small style={{ color: "var(--c-royal)", fontWeight: 700 }}>{l.nextFollowUp}</small></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AccountSetupPrompt({ onDismiss, onAction }: { onDismiss: () => void; onAction: () => void }) {
  return (
    <div className="npl-setup">
      <div className="npl-setup__head">
        <div className="npl-setup__title">
          <span className="npl-setup__ic"><ShieldCheck size={18} /></span>
          <div>
            <h3>Finish setting up your account</h3>
            <p>You can use NRFFN now. To unlock referrals and withdrawals, finish your profile and KYC.</p>
          </div>
        </div>
        <button className="npl-setup__close" type="button" onClick={onDismiss} aria-label="Dismiss setup prompt">
          <X size={18} />
        </button>
      </div>
      <div className="npl-setup__dots">
        <span className="npl-setup__dot is-on" />
        <span className="npl-setup__dot" />
        <span className="npl-setup__dot" />
        <span>0 of 3</span>
      </div>
      <button className="npl-btn npl-setup__cta npl-btn--block" type="button" onClick={onAction}>
        Finish setup <ArrowRight size={18} />
      </button>
    </div>
  );
}

/* ============================== EARNINGS ============================== */
function Earnings({ onWithdraw }: { onWithdraw: () => void }) {
  return (
    <>
      <div className="npl-card" style={{ background: "linear-gradient(150deg,#071f44,#1046a3)", color: "#fff", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: ".74rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#e6c158", fontWeight: 800 }}>Total wallet value</span>
          <h2 style={{ color: "#fff", fontSize: "2.2rem", margin: ".3rem 0" }}>{naira(wallet.total)}</h2>
          <p style={{ color: "rgba(255,255,255,.78)" }}>Lifetime earnings across all streams</p>
        </div>
        <button className="npl-btn npl-btn--secondary npl-btn--block" onClick={onWithdraw}><Wallet size={16} /> Withdraw funds</button>
      </div>

      <div className="npl-grid cols-3">
        <Metric icon={Wallet} label="Available" value={naira(wallet.available)} note={<span className="npl-up">Ready now</span>} variant="gold" />
        <Metric icon={Clock3} label="Pending" value={naira(wallet.pending)} note="Awaiting approval" />
        <Metric icon={Check} label="Withdrawn" value={naira(wallet.withdrawn)} note="Paid out to date" />
      </div>

      <div className="npl-grid cols-2">
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Earnings breakdown</h3><p>Where your income comes from</p></div></div>
          <div className="npl-levels">
            <BreakRow label="Direct referral earnings" value={earningsBreakdown.directReferral} ic={Users} />
            <BreakRow label="Level 1–5 commissions" value={earningsBreakdown.levelCommissions} ic={Share2} />
            <BreakRow label="Property commissions" value={earningsBreakdown.propertyCommissions} ic={Building2} />
            <BreakRow label="Leadership bonuses" value={earningsBreakdown.leadershipBonuses} ic={Trophy} />
          </div>
        </div>
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>5-level commission engine</h3><p>Overrides across your downline</p></div></div>
          <div className="npl-levels">
            {commissionLevels.map((lv) => (
              <div className="npl-level" key={lv.level}>
                <span className="npl-level__n">L{lv.level}</span>
                <div className="npl-level__mid"><b>{lv.label}</b><span>{lv.members} members · {naira(lv.volume)} volume</span></div>
                <div className="npl-level__amt"><b>{naira(lv.earned)}</b><span>{lv.rate}% rate</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Transaction history</h3><p>Date, type, amount, status</p></div><button className="npl-btn npl-btn--ghost"><Download size={15} /> Export</button></div>
        <div className="npl-table-wrap">
          <table className="npl-table responsive">
            <thead><tr><th>Date</th><th>Type</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td data-label="Date">{t.date}</td>
                  <td data-label="Type"><span className="npl-badge blue">{t.type}</span></td>
                  <td data-label="Description">{t.description}</td>
                  <td data-label="Amount"><b style={{ color: t.amount < 0 ? "var(--hot)" : "var(--c-ink)" }}>{t.amount < 0 ? "−" : ""}{naira(Math.abs(t.amount))}</b></td>
                  <td data-label="Status"><span className={`npl-badge ${t.status === "Available" ? "ok" : t.status === "Pending" ? "warn" : "blue"}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
function BreakRow({ label, value, ic: Ic }: { label: string; value: number; ic: typeof Home }) {
  return (
    <div className="npl-level">
      <span className="npl-level__n" style={{ background: "linear-gradient(140deg,#e6c158,#c9a227)", color: "#071f44" }}><Ic size={18} /></span>
      <div className="npl-level__mid"><b>{label}</b></div>
      <div className="npl-level__amt"><b>{naira(value)}</b></div>
    </div>
  );
}

/* ============================== REFERRALS ============================== */
function Referrals() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(member.referralLink); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const wa = `https://wa.me/?text=${encodeURIComponent("Join me on NRFFN — Nigeria's largest real estate wealth network: " + member.referralLink)}`;
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Referral engine" title="Share & grow your network" sub="Share your referral link, track activity, and grow your 5-level network." /></div>

      <div className="npl-grid cols-2">
        <div className="npl-card npl-refcard">
          <div>
            <h3 style={{ marginBottom: ".35rem" }}>Share your referral link</h3>
            <p style={{ color: "var(--c-muted)", fontSize: ".95rem" }}>Invite investors through your link and keep track of the money that lands in your wallet.</p>
          </div>
          <div className="npl-refcard__linkbox">
            <div className="npl-refcard__label">Your referral link</div>
            <div className="npl-refcard__input">
              <input readOnly value={member.referralLink} />
              <button className="npl-btn npl-btn--primary npl-refcard__copy" onClick={copy}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy"}</button>
            </div>
          </div>
          <div className="npl-refcard__share">
            <a href={wa} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>WhatsApp</span></a>
            <button><Share2 size={18} /><span>Share</span></button>
            <button><Facebook size={18} /><span>Facebook</span></button>
            <button><Copy size={18} /><span>Copy</span></button>
          </div>
          <p className="npl-refcard__note">Your earnings are tied to successful referrals, so every valid sign-up matters.</p>
        </div>
          <div className="npl-grid cols-2 npl-refstats">
          <Metric icon={Target} label="Link clicks" value={referralStats.clicks.toLocaleString()} />
          <Metric icon={Users} label="Signups" value={String(referralStats.signups)} />
          <Metric icon={Check} label="Conversions" value={String(referralStats.conversions)} variant="gold" />
          <Metric icon={TrendingUp} label="Conversion" value={`${referralStats.conversionRate}%`} variant="royal" />
        </div>
      </div>

      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Network tree — 5 levels</h3><p>Members & active volume per level</p></div></div>
        <div className="npl-tree">
          {commissionLevels.map((lv) => {
            const max = commissionLevels[0].members;
            return (
              <div className="npl-tree__row" key={lv.level}>
                <b style={{ width: 64 }}>Level {lv.level}</b>
                <div className="npl-tree__bar"><i style={{ width: `${(lv.members / max) * 100}%` }} /></div>
                <span style={{ fontWeight: 700, color: "var(--c-ink)", width: 90, textAlign: "right" }}>{lv.members} members</span>
                <span style={{ color: "var(--c-muted)", fontSize: ".82rem", width: 110, textAlign: "right" }}>{naira(lv.volume)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ============================== CRM ============================== */
function CRM({ onOpen, onAdd }: { onOpen: (l: Lead) => void; onAdd: () => void }) {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Sales CRM" title="Lead management" sub="Track every prospect from first interest to closed sale." action={<button className="npl-btn npl-btn--primary npl-btn--block" onClick={onAdd}><Plus size={16} /> Add lead</button>} /></div>
      <div className="npl-grid cols-4">
        <Metric icon={Target} label="Active leads" value={String(leads.length)} variant="royal" />
        <Metric icon={MessageCircle} label="Hot leads" value={String(leads.filter((l) => l.temp === "Hot").length)} variant="gold" />
        <Metric icon={Clock3} label="Follow-ups today" value="2" />
        <Metric icon={Check} label="Closed this month" value="19" note={<span className="npl-up">+4 vs last</span>} />
      </div>
      <div className="npl-kanban">
        {leadStages.map((stage) => {
          const items = leads.filter((l) => l.stage === stage);
          return (
            <div className="npl-kcol" key={stage}>
              <div className="npl-kcol__head">{stage} <em>{items.length}</em></div>
              {items.map((l) => (
                <div className="npl-leadcard" key={l.id} onClick={() => onOpen(l)}>
                  <b>{l.name}</b><small>{l.property} · {naira(l.budget)}</small>
                  <div className="npl-leadcard__foot"><span className={`npl-badge ${tempClass(l.temp)}`}>{l.temp}</span><small style={{ fontWeight: 700 }}>{l.source}</small></div>
                </div>
              ))}
              {items.length === 0 && <small style={{ color: "var(--c-muted)", textAlign: "center", padding: ".5rem" }}>No leads</small>}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ============================== ACADEMY ============================== */
type AcademyView = { kind: "list" } | { kind: "course"; course: Course } | { kind: "certs" };

function Academy() {
  const [view, setView] = useState<AcademyView>({ kind: "list" });

  if (view.kind === "course") return <CourseDetail course={view.course} onBack={() => setView({ kind: "list" })} onCertificates={() => setView({ kind: "certs" })} />;
  if (view.kind === "certs") return <Certificates onBack={() => setView({ kind: "list" })} />;

  return (
    <>
      <div className="npl-card"><PageHead eyebrow="NRFFN Academy" title="Learn · Earn · Grow" sub="Video courses, certification and progress tracking."
        action={<button className="npl-btn npl-btn--secondary" onClick={() => setView({ kind: "certs" })}><Award size={16} /> My certificates</button>} /></div>
      <div className="npl-grid cols-4">
        <Metric icon={Check} label="Completed" value={String(academyStats.completed)} variant="gold" />
        <Metric icon={Play} label="In progress" value={String(academyStats.inProgress)} />
        <Metric icon={Award} label="Certificates" value={String(certificates.length)} variant="royal" />
        <Metric icon={Clock3} label="Hours learned" value={`${academyStats.hours}h`} />
      </div>
      <div className="npl-grid cols-4">
        {courses.map((c) => {
          const cta = c.progress === 0 ? "Start course" : c.progress === 100 ? "Review" : "Continue";
          const CtaIcon = c.progress === 100 ? Eye : PlayCircle;
          return (
            <div className="npl-course" key={c.id}>
              <button className="npl-course__media" onClick={() => setView({ kind: "course", course: c })} style={{ border: 0, padding: 0, cursor: "pointer", width: "100%" }}>
                <img src={c.img} alt={c.title} />
                <span className={`npl-badge ${c.certified ? "ok" : "blue"} npl-course__cat`}>{c.certified ? "Certified" : c.category}</span>
                <div className="npl-course__play"><Play size={34} /></div>
              </button>
              <div className="npl-course__body">
                <h3>{c.title}</h3>
                <div className="npl-course__meta"><span>{c.lessons} lessons</span><span>{c.duration}</span></div>
                <div className="npl-progress"><i style={{ width: `${c.progress}%` }} /></div>
                <small style={{ fontSize: ".74rem", color: "var(--c-muted)", fontWeight: 700 }}>{c.progress}% complete</small>
                <div style={{ display: "grid", gridTemplateColumns: c.progress === 100 ? "1fr" : "1fr auto", gap: ".5rem", marginTop: ".6rem" }}>
                  <button className="npl-btn npl-btn--primary" style={{ padding: ".55rem .8rem", fontSize: ".82rem" }} onClick={() => setView({ kind: "course", course: c })}><CtaIcon size={15} /> {cta}</button>
                  {c.progress !== 100 && <button className="npl-btn npl-btn--ghost" style={{ padding: ".55rem .8rem", fontSize: ".82rem" }} onClick={() => setView({ kind: "course", course: c })}>Take quiz</button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function CourseDetail({ course, onBack, onCertificates }: { course: Course; onBack: () => void; onCertificates: () => void }) {
  const lessons = lessonsFor(course);
  const [tab, setTab] = useState<"lessons" | "quiz">("lessons");
  const [picked, setPicked] = useState<number | null>(null);
  const [passed, setPassed] = useState(course.certified);

  return (
    <>
      <div className="npl-card">
        <button className="npl-btn npl-btn--ghost" style={{ alignSelf: "flex-start", marginBottom: ".4rem" }} onClick={onBack}><ArrowLeft size={16} /> Back to Academy</button>
        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
          <img src={course.img} alt={course.title} style={{ width: 200, height: 130, objectFit: "cover", borderRadius: 14 }} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <span className="npl-badge blue">{course.category}</span>
            <h2 style={{ margin: ".4rem 0 .3rem" }}>{course.title}</h2>
            <p style={{ color: "var(--c-muted)", fontSize: ".88rem" }}>{course.lessons} lessons · {course.duration}</p>
            <div className="npl-progress" style={{ marginTop: ".7rem", maxWidth: 320 }}><i style={{ width: `${course.progress}%` }} /></div>
            <small style={{ fontSize: ".74rem", color: "var(--c-muted)", fontWeight: 700 }}>{course.progress}% complete</small>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: ".5rem" }}>
        <button className={`npl-btn ${tab === "lessons" ? "npl-btn--primary" : "npl-btn--ghost"}`} onClick={() => setTab("lessons")}>Lessons</button>
        <button className={`npl-btn ${tab === "quiz" ? "npl-btn--primary" : "npl-btn--ghost"}`} onClick={() => setTab("quiz")}>Quiz & certificate</button>
      </div>

      {tab === "lessons" && (
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Course content</h3><p>{lessons.filter((l) => l.done).length} of {lessons.length} lessons done</p></div>
            <button className="npl-btn npl-btn--primary"><PlayCircle size={16} /> {course.progress === 0 ? "Start" : "Continue"} learning</button></div>
          <div className="npl-grid" style={{ gap: ".5rem" }}>
            {lessons.map((l) => (
              <div className={`npl-lesson${l.done ? " done" : ""}`} key={l.n}>
                <span className="npl-lesson__ic">{l.done ? <Check size={16} /> : <Play size={15} />}</span>
                <div><b>{l.n}. {l.title}</b><small>{l.done ? "Completed" : "Not started"}</small></div>
                <span className="npl-lesson__time">{l.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "quiz" && (
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Knowledge check</h3><p>Pass the quiz to unlock your certificate</p></div></div>
          <p style={{ fontWeight: 700, color: "var(--c-ink)", marginBottom: "1rem" }}>{quiz.question}</p>
          <div className="npl-grid" style={{ gap: ".7rem" }}>
            {quiz.options.map((o, i) => {
              const cls = picked === null ? "" : i === quiz.correct ? "correct" : picked === i ? "wrong" : "";
              return (
                <button key={i} className={`npl-quizopt ${cls}`} onClick={() => { setPicked(i); if (i === quiz.correct) setPassed(true); }}>
                  <span className="k">{String.fromCharCode(65 + i)}</span> {o}
                  {picked !== null && i === quiz.correct && <Check size={18} style={{ marginLeft: "auto" }} />}
                </button>
              );
            })}
          </div>
          {passed && (
            <div className="npl-note" style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".8rem", flexWrap: "wrap" }}>
              <div><b style={{ color: "var(--c-green)" }}>Certificate unlocked!</b><br /><span>You&apos;ve passed {course.title}.</span></div>
              <div style={{ display: "flex", gap: ".5rem" }}>
                <button className="npl-btn npl-btn--primary" onClick={() => downloadCertificate({ recipient: member.name, course: course.title, date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), certificateId: "NRFFN-" + course.title.split(" ").map((w) => w[0]).join("").toUpperCase() + "-204815" })}><Download size={15} /> Download</button>
                <button className="npl-btn npl-btn--ghost" onClick={onCertificates}>View all</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function Certificates({ onBack }: { onBack: () => void }) {
  return (
    <>
      <div className="npl-card">
        <button className="npl-btn npl-btn--ghost" style={{ alignSelf: "flex-start", marginBottom: ".4rem" }} onClick={onBack}><ArrowLeft size={16} /> Back to Academy</button>
        <PageHead eyebrow="NRFFN Academy" title="Your certificates" sub="View and download credentials you've earned." />
      </div>
      {certificates.length === 0 ? (
        <div className="npl-card" style={{ textAlign: "center", padding: "2.5rem" }}>
          <span className="npl-success__badge" style={{ margin: "0 auto 1rem" }}><Award size={32} /></span>
          <h3>No certificates yet</h3>
          <p style={{ color: "var(--c-muted)" }}>Complete a course and pass its quiz to earn your first certificate.</p>
        </div>
      ) : (
        <div className="npl-grid cols-3">
          {certificates.map((c) => (
            <div className="npl-cert" key={c.id}>
              <div className="npl-cert__top">
                <span className="eyebrow">Certificate of completion</span>
                <h3>{c.course}</h3>
                <span className="npl-cert__seal"><Award size={20} /></span>
              </div>
              <div className="npl-cert__body">
                <div><small>Issued {c.issued}</small><br /><small>ID: {c.credentialId}</small></div>
                <div style={{ display: "flex", gap: ".4rem" }}>
                  <button className="npl-btn npl-btn--primary" style={{ padding: ".45rem .8rem", fontSize: ".82rem" }}
                    onClick={() => downloadCertificate({ recipient: member.name, course: c.course, date: c.issued, certificateId: c.credentialId })}><Download size={14} /> PDF</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ============================== INCENTIVES ============================== */
function Incentives() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Ranks & recognition" title="Your leadership ladder" sub="Climb ranks to unlock bonuses, travel rewards & recognition." /></div>
      <div className="npl-card" style={{ background: "linear-gradient(150deg,#071f44,#1046a3)", color: "#fff", border: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <div>
            <span style={{ color: "#e6c158", fontWeight: 800, fontSize: ".74rem", letterSpacing: ".12em", textTransform: "uppercase" }}>Current rank</span>
            <h2 style={{ color: "#fff", fontSize: "1.9rem", margin: ".3rem 0" }}>{rankProgress.current} <Crown size={22} color="#e6c158" style={{ verticalAlign: "middle" }} /></h2>
            <p style={{ color: "rgba(255,255,255,.78)" }}>{naira(rankProgress.volume)} of {naira(rankProgress.target)} to {rankProgress.next}</p>
          </div>
          <div style={{ width: 220, maxWidth: "100%" }}>
            <div className="npl-progress" style={{ background: "rgba(255,255,255,.18)" }}><i style={{ width: `${(rankProgress.volume / rankProgress.target) * 100}%` }} /></div>
            <div style={{ textAlign: "right", marginTop: ".4rem", fontWeight: 800 }}>{Math.round((rankProgress.volume / rankProgress.target) * 100)}%</div>
          </div>
        </div>
      </div>
      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Rank progression ladder</h3><p>Rewards & travel incentives unlock as you grow</p></div></div>
        <div className="npl-ladder">
          {ranks.map((r) => {
            const state = r.current ? "cur" : r.achieved ? "done" : "lock";
            return (
              <div className={`npl-rank ${state}`} key={r.name}>
                <span className="npl-rank__ic">{r.current ? <Crown size={24} /> : r.achieved ? <Check size={22} /> : <Lock size={20} />}</span>
                <div className="npl-rank__mid"><b>{r.name}</b><span>{r.requirement}</span></div>
                <div className="npl-rank__reward">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Gift size={13} /> {r.reward}</span>
                  {r.travel && <small style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Plane size={12} /> {r.travel}</small>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ============================== TEAM ============================== */
function Team_() {
  const max = Math.max(...team.map((m) => m.volume));
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Team & leadership" title="Your downline network" sub="Track members, rank and sales volume across your team." /></div>
      <div className="npl-grid cols-4">
        <Metric icon={Users} label="Total members" value={String(team.length + 82)} variant="royal" />
        <Metric icon={ShieldCheck} label="Active" value={String(team.filter((m) => m.status === "Active").length + 70)} note={<span className="npl-up">88% active</span>} />
        <Metric icon={TrendingUp} label="Team volume" value={naira(rankProgress.volume)} variant="gold" />
        <Metric icon={Trophy} label="Leaders" value="4" note="Manager+" />
      </div>
      <div className="npl-card">
        <div className="npl-card__head"><div><h3>Direct & 2nd-level members</h3><p>Your closest network</p></div></div>
        <div className="npl-table-wrap">
          <table className="npl-table responsive">
            <thead><tr><th>Member</th><th>Rank</th><th>Level</th><th>Referrals</th><th>Volume</th><th>Status</th></tr></thead>
            <tbody>
              {team.map((m) => (
                <tr key={m.id}>
                  <td data-label="Member"><b>{m.name}</b></td>
                  <td data-label="Rank"><span className="npl-badge blue">{m.rank}</span></td>
                  <td data-label="Level">L{m.level}</td>
                  <td data-label="Referrals">{m.referrals}</td>
                  <td data-label="Volume"><b>{naira(m.volume)}</b></td>
                  <td data-label="Status"><span className={`npl-badge ${m.status === "Active" ? "ok" : "cold"}`}>{m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ============================== PROPERTIES ============================== */
const portfolioProps = [
  { img: "/img/prop-1.jpg", name: "Emerald Heights Residence", loc: "Lekki Phase 1, Lagos", price: "₦95,000,000", comm: "₦4,750,000", tag: "Full Ownership" },
  { img: "/img/prop-2.jpg", name: "The Sterling Apartments", loc: "Maitama, Abuja", price: "₦12,500,000", comm: "₦625,000", tag: "Co-Ownership" },
  { img: "/img/land.jpg", name: "Greenfield Estate Plots", loc: "Epe Corridor, Lagos", price: "₦4,800,000", comm: "₦240,000", tag: "Land Banking" }
];
function Properties() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Sales tools" title="Sell NRFFN properties" sub="Share verified listings and earn commission on every sale." /></div>
      <div className="npl-grid cols-3">
        {portfolioProps.map((p) => (
          <div className="npl-course" key={p.name}>
            <div className="npl-course__media"><img src={p.img} alt={p.name} /><span className="npl-badge blue npl-course__cat">{p.tag}</span></div>
            <div className="npl-course__body">
              <h3>{p.name}</h3>
              <div className="npl-course__meta"><MapPin size={14} /> {p.loc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".4rem" }}>
                <div><small style={{ color: "var(--c-muted)", fontWeight: 700, fontSize: ".72rem" }}>Price</small><div style={{ fontWeight: 800, color: "var(--c-ink)" }}>{p.price}</div></div>
                <div style={{ textAlign: "right" }}><small style={{ color: "var(--c-muted)", fontWeight: 700, fontSize: ".72rem" }}>Your commission</small><div style={{ fontWeight: 800, color: "var(--c-royal)" }}>{p.comm}</div></div>
              </div>
              <a className="npl-btn npl-btn--secondary" href={`/properties/${propertySlug(p.name)}`}>View Property</a>
              <div className="npl-share" style={{ marginTop: ".2rem" }}><button><MessageCircle size={14} /> WhatsApp</button><button><Share2 size={14} /> Share</button></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ============================== NOTIFICATIONS ============================== */
const notifIcon: Record<string, typeof Home> = { wallet: Wallet, users: Users, trophy: Trophy, academy: GraduationCap };
function Notifications_() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Activity" title="Notifications" sub="Commissions, downline activity and updates." /></div>
      <div className="npl-grid" style={{ gap: ".8rem" }}>
        {notifications.map((n, i) => {
          const Ic = notifIcon[n.icon] || Bell;
          return (
            <div className={`npl-notif${n.unread ? " unread" : ""}`} key={i}>
              <span className="npl-notif__ic"><Ic size={19} /></span>
              <div style={{ flex: 1 }}><b>{n.title}</b><p>{n.body}</p></div>
              <small>{n.at}</small>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ============================== PROFILE ============================== */
function Profile() {
  return (
    <>
      <div className="npl-card"><PageHead eyebrow="Account" title="Your profile" sub="Personal details, rank and verification status." /></div>
      <div className="npl-grid cols-2">
        <div className="npl-card" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span className="npl-avatar" style={{ width: 64, height: 64, fontSize: "1.4rem" }}>{member.initials}</span>
          <div>
            <h3>{member.name}</h3>
            <p style={{ color: "var(--c-muted)" }}>{member.rank} · Member since {member.joined}</p>
            <div style={{ marginTop: ".5rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
              <span className="npl-badge blue"><Crown size={12} /> {member.rank}</span>
              <span className="npl-badge ok"><ShieldCheck size={12} /> Verified</span>
            </div>
          </div>
        </div>
        <div className="npl-card">
          <div className="npl-card__head"><div><h3>Verification</h3><p>Complete to unlock withdrawals</p></div></div>
          <div className="npl-grid" style={{ gap: ".6rem" }}>
            {[["Email & phone", true], ["Government ID", true], ["Bank account", true], ["Face verification", false]].map(([l, done]) => (
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

/* ============================== DRAWERS ============================== */
function WithdrawDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="npl-drawer-overlay" onClick={onClose}>
      <div className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head"><div><h3>Withdraw funds</h3><p>Available: {naira(wallet.available)}</p></div><button className="npl-icnbtn" onClick={onClose}><X size={18} /></button></div>
        <div className="npl-field"><label>Amount (₦)</label><input type="number" placeholder="100,000" defaultValue={500000} /></div>
        <div className="npl-field"><label>Bank account</label><select><option>GTBank ••4821</option><option>Access Bank ••0934</option><option>+ Add new account</option></select></div>
        <div className="npl-note"><b>Processing time</b><br /><span>Payouts are verified and settled within 24 hours on business days.</span></div>
        <button className="npl-btn npl-btn--primary npl-btn--block" onClick={onClose}><ShieldCheck size={16} /> Request withdrawal</button>
      </div>
    </div>
  );
}
function AddLeadDrawer({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="npl-drawer-overlay" onClick={onClose}>
      <div className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head"><div><h3>{saved ? "Lead added" : "Add a new lead"}</h3><p>{saved ? "Your pipeline has been updated" : "Capture a prospect into your pipeline"}</p></div><button className="npl-icnbtn" onClick={onClose}><X size={18} /></button></div>
        {saved ? (
          <>
            <div className="npl-success">
              <span className="npl-success__badge"><Check size={36} /></span>
              <h3>Lead saved</h3>
              <p>The lead now appears in your CRM board under “New”.</p>
            </div>
            <button className="npl-btn npl-btn--primary npl-btn--block" onClick={onClose}>Done</button>
          </>
        ) : (
          <>
            <div className="npl-field"><label>Full name</label><input placeholder="Prospect name" /></div>
            <div className="npl-fieldrow">
              <div className="npl-field"><label>Phone</label><input placeholder="+234..." /></div>
              <div className="npl-field"><label>Email</label><input type="email" placeholder="name@mail.com" /></div>
            </div>
            <div className="npl-field"><label>Interested property</label>
              <select>{portfolioProps.map((p) => <option key={p.name}>{p.name}</option>)}</select>
            </div>
            <div className="npl-fieldrow">
              <div className="npl-field"><label>Budget (₦)</label><input type="number" placeholder="10,000,000" /></div>
              <div className="npl-field"><label>Temperature</label><select><option>Hot</option><option>Warm</option><option>Cold</option></select></div>
            </div>
            <div className="npl-field"><label>Source</label><select><option>WhatsApp</option><option>Referral</option><option>Instagram</option><option>Website</option><option>Walk-in</option></select></div>
            <div className="npl-field"><label>First note</label><textarea rows={2} placeholder="What does this prospect want?" /></div>
          <button className="npl-btn npl-btn--primary npl-btn--block" onClick={() => setSaved(true)}><Plus size={16} /> Add lead</button>
          </>
        )}
      </div>
    </div>
  );
}

function LeadDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const wa = `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`;
  return (
    <div className="npl-drawer-overlay" onClick={onClose}>
      <div className="npl-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="npl-drawer__head">
          <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
            <span className="npl-avatar" style={{ width: 48, height: 48 }}>{lead.name.charAt(0)}</span>
            <div><h3>{lead.name}</h3><p>{lead.temp} lead · {lead.source}</p></div>
          </div>
          <button className="npl-icnbtn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="npl-grid cols-2" style={{ gap: ".7rem" }}>
          <div className="npl-note"><span>Property</span><br /><b>{lead.property}</b></div>
          <div className="npl-note"><span>Budget</span><br /><b>{naira(lead.budget)}</b></div>
          <div className="npl-note"><span>Phone</span><br /><b>{lead.phone}</b></div>
          <div className="npl-note"><span>Next follow-up</span><br /><b>{lead.nextFollowUp}</b></div>
        </div>
        <div className="npl-share">
          <a href={wa} target="_blank" rel="noreferrer" className="npl-btn npl-btn--primary"><MessageCircle size={15} /> WhatsApp</a>
          <button className="npl-btn npl-btn--ghost"><Clock3 size={15} /> Schedule</button>
        </div>
        <div className="npl-field"><label>Stage</label><select defaultValue={lead.stage}>{leadStages.map((s) => <option key={s}>{s}</option>)}</select></div>
        <div className="npl-field"><label>Add a note</label><textarea rows={3} placeholder="Log a call, message or update..." /></div>
        <div>
          <h4 style={{ fontSize: ".9rem", marginBottom: ".5rem" }}>Activity</h4>
          {lead.notes.length ? lead.notes.map((n, i) => (
            <div className="npl-note" key={i} style={{ marginBottom: ".5rem" }}><b>{n.text}</b><br /><span>{n.at}</span></div>
          )) : <p style={{ color: "var(--c-muted)", fontSize: ".85rem" }}>No activity yet — add your first note.</p>}
        </div>
      </div>
    </div>
  );
}
