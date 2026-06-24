"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  Crown,
  GraduationCap,
  Handshake,
  Landmark,
  Lightbulb,
  LineChart,
  MapPin,
  Menu,
  Network,
  Play,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Wallet,
  X
} from "lucide-react";
import { propertySlug } from "../lib/property-catalog";

/* ---------------- content ---------------- */

const STATS = [
  ["12k+", "Members targeted"],
  ["36", "States coverage"],
  ["6", "Membership tiers"],
  ["₦3M", "Top tier value"]
];

const BENEFITS: [string, typeof Award][] = [
  ["Professional Realtor Training", GraduationCap],
  ["Real Estate Wealth Education", TrendingUp],
  ["Property Investment Access", Building2],
  ["Weekly Mentorship Sessions", Users],
  ["Real Estate Certifications", BadgeCheck],
  ["Networking with Leaders", Network],
  ["Referral Income Streams", Wallet],
  ["Personal Development", Rocket],
  ["Digital Marketing Training", LineChart],
  ["Technology Tools for Realtors", Target],
  ["National Realtor Community", Handshake],
  ["Financial Freedom Roadmap", Trophy]
];

const MISSION = [
  "Train and empower realtors nationwide",
  "Promote ethical real estate practice",
  "Provide wealth creation opportunities",
  "Connect members with investment opportunities",
  "Develop the future leaders in real estate",
  "Leverage technology to transform marketing",
  "Build a financially independent community"
];

const VALUES: [typeof Award, string, string][] = [
  [ShieldCheck, "Integrity", "We do what is right even when nobody is watching."],
  [BadgeCheck, "Professionalism", "We maintain the highest standards in all dealings."],
  [Lightbulb, "Innovation", "We embrace technology and creativity at every step."],
  [Star, "Excellence", "We relentlessly pursue exceptional performance."],
  [TrendingUp, "Wealth Creation", "We help members build sustainable prosperity."],
  [Handshake, "Collaboration", "Together everyone achieves more — every time."]
];

const PILLARS: [typeof Award, string, string[]][] = [
  [GraduationCap, "Education", ["Realtor Certification Programs", "Real Estate Investment Training", "Digital Marketing Training", "Sales Mastery Programs"]],
  [Landmark, "Opportunities", ["Access to Properties", "Joint Venture Opportunities", "Investment Syndication", "Business Partnerships"]],
  [Target, "Technology", ["CRM Systems", "Lead Generation Tools", "Marketing Resources", "Mobile Applications"]],
  [Users, "Community", ["National Networking Events", "Mentorship Programs", "Accountability Groups", "Leadership Development"]]
];

type Tier = {
  name: string;
  price: string;
  unit?: string;
  desc: string;
  features: string[];
  featured?: boolean;
  flag?: string;
};

const TIERS: Tier[] = [
  {
    name: "Associate",
    price: "Free",
    desc: "For beginners who want to learn real estate.",
    features: ["Access to community", "Weekly training", "Newsletter", "Basic resources"]
  },
  {
    name: "Bronze",
    price: "₦20,000",
    unit: "registration",
    desc: "Start earning with certified membership.",
    features: ["All Associate benefits", "Certificate of Membership", "Training materials", "Referral income participation"]
  },
  {
    name: "Silver",
    price: "₦100,000",
    unit: "registration",
    desc: "Advance into investment & leadership.",
    features: ["All Bronze benefits", "Advanced trainings", "Investment opportunities", "Leadership development"]
  },
  {
    name: "Gold",
    price: "₦250,000",
    unit: "registration",
    desc: "Priority access and direct mentorship.",
    features: ["All Silver benefits", "Priority events", "Mentorship access", "Premium resources"],
    featured: true,
    flag: "Most Popular"
  },
  {
    name: "Platinum",
    price: "₦1,500,000",
    unit: "registration",
    desc: "Executive wealth-building partnership.",
    features: ["All Gold benefits", "Investment syndication", "Executive networking", "Wealth-building mentorship"]
  },
  {
    name: "VIP",
    price: "₦3,000,000",
    unit: "registration",
    desc: "The exclusive inner circle of NRFFN.",
    features: ["All Platinum benefits", "Exclusive investment deals", "VIP events", "Direct access to leadership", "National recognition"],
    flag: "Elite"
  }
];

const COURSES: [typeof Award, string, string][] = [
  [Building2, "Real Estate Sales", "Master listings, negotiation & closing."],
  [Landmark, "Property Development", "From acquisition to profitable delivery."],
  [TrendingUp, "Land Banking", "Strategic land for long-term appreciation."],
  [LineChart, "Digital Marketing", "Generate leads and build your brand."]
];

type Property = {
  img: string;
  tag: string;
  tagColor: string;
  name: string;
  location: string;
  price: string;
  roi: string;
  model: string;
};

const PROPERTIES: Property[] = [
  {
    img: "/img/prop-1.jpg",
    tag: "Full Ownership",
    tagColor: "linear-gradient(135deg,#f3ce54,#d8ad24)",
    name: "Emerald Heights Residence",
    location: "Lekki Phase 1, Lagos",
    price: "₦95,000,000",
    roi: "18% p.a.",
    model: "Outright / Installment"
  },
  {
    img: "/img/prop-2.jpg",
    tag: "Co-Ownership",
    tagColor: "linear-gradient(135deg,#f3ce54,#d8ad24)",
    name: "The Sterling Apartments",
    location: "Maitama, Abuja",
    price: "₦12,500,000",
    roi: "Rental income",
    model: "Shares from 1 unit"
  },
  {
    img: "/img/land.jpg",
    tag: "Land Banking",
    tagColor: "linear-gradient(135deg,#f3ce54,#d8ad24)",
    name: "Greenfield Estate Plots",
    location: "Epe Corridor, Lagos",
    price: "₦4,800,000",
    roi: "Capital growth",
    model: "Flexible payment"
  }
];

const TESTIMONIALS: [string, string, string, string][] = [
  ["av-1.jpg", "Mariam Bello", "Associate Realtor · Lagos", "The commission wallet and CRM finally let me work with real structure. I closed more in one quarter than my whole last year."],
  ["av-4.jpg", "Tunde Adeyemi", "Platinum Member · Abuja", "From land banking to syndication, NRFFN showed me a clear path. The mentorship alone is worth the membership."],
  ["av-3.jpg", "Dr. Amaka Obi", "Gold Member · Port Harcourt", "Verified properties, digital documents, real training. This is how real estate should work in Nigeria."]
];

const chunk = <T,>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, index * size + size));

/* ---------------- hooks ---------------- */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".nlp-reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------------- page ---------------- */

export default function LandingPage() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  useReveal();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nlp">
      {/* NAV */}
      <nav ref={navRef} className={`nlp-nav${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
        <div className="nlp__wrap nlp-nav__inner">
          <a href="#top" className="nlp-brand" aria-label="NRFFN home">
            <img className="nlp-brand__img" src="/assets/nrffn-logo-blue.png" alt="NRFFN — Nigerian Realtors Financial Freedom Network" />
          </a>
          <div className="nlp-nav__links">
            <a href="#about">About</a>
            <a href="#why">Why Join</a>
            <a href="#membership">Membership</a>
            <a href="#academy">Academy</a>
          </div>
          <div className="nlp-nav__cta">
            <a href="/login" className="nlp-nav__login">Login</a>
            <a href="/associate/register" className="nlp-btn nlp-btn--primary">Join Free Today</a>
            <button className="nlp-burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
        <div className="nlp-mobilemenu">
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#why" onClick={() => setOpen(false)}>Why Join</a>
          <a href="#membership" onClick={() => setOpen(false)}>Membership</a>
          <a href="#academy" onClick={() => setOpen(false)}>Academy</a>
          <a href="/login" onClick={() => setOpen(false)}>Login</a>
          <a href="/associate/register" className="nlp-btn nlp-btn--primary">Join Free Today</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="nlp-hero">
        <div className="nlp__wrap nlp-hero__grid">
          <div className="nlp-reveal">
            <span className="nlp-eyebrow nlp-hero__eyebrow"><Sparkles size={16} /> Real Estate · Technology · Education · Wealth Creation</span>
            <h1>Nigeria&apos;s Largest <span className="accent-blue">Real Estate Wealth</span> <span className="accent-green">Building</span> Network</h1>
            <p className="nlp-hero__lead">
              Learn, invest and grow through verified real estate opportunities, practical education and technology built for sustainable wealth creation.
            </p>
            <div className="nlp-hero__cta">
              <a href="/associate/register" className="nlp-btn nlp-btn--primary nlp-btn--lg">
                Join Free Today <ArrowRight size={18} />
              </a>
              <a href="#membership" className="nlp-btn nlp-btn--ghost nlp-btn--lg">
                View Membership
              </a>
            </div>
            <div className="nlp-hero__trust">
              {STATS.map(([n, l]) => (
                <div className="nlp-stat" key={l}>
                  <b>{n}</b>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="nlp-hero__art nlp-reveal">
            <div className="nlp-hero__photo-wrap">
              <img className="nlp-hero__photo" src="/img/hero-home.jpg" alt="Premium NRFFN real estate property" />
              <div className="nlp-hero__glass nlp-glass">
                <div className="nlp-hero__glass-row">
                  <b>Member Portfolio</b>
                  <Crown size={20} color="#c9a227" />
                </div>
                <div className="nlp-hero__amt">₦48,250,000</div>
                <div className="nlp-hero__bars">
                  {[40, 62, 48, 78, 56, 88, 70].map((h, i) => (
                    <i key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="nlp-hero__float nlp-hero__float--a nlp-glass">
              <span className="nlp-hero__float-ic" style={{ background: "linear-gradient(140deg,#1046a3,#0a3476)" }}>
                <Wallet size={18} />
              </span>
              <div>
                <small>Available commission</small>
                <b>₦126,400</b>
              </div>
            </div>
            <div className="nlp-hero__float nlp-hero__float--b nlp-glass">
              <span className="nlp-hero__float-ic" style={{ background: "linear-gradient(140deg,#e6c158,#c9a227)" }}>
                <Trophy size={18} color="#071f44" />
              </span>
              <div>
                <small>Rank progress</small>
                <b>Director · 82%</b>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* REGULATORS */}
      <section className="nlp-regs">
        <div className="nlp__wrap nlp-regs__row">
          <div className="nlp-regs__intro">
            <span className="nlp-regs__icon"><ShieldCheck size={20} /></span>
            <div>
              <p>Registered &amp; compliant with</p>
              <small>Verified standards and trusted industry oversight</small>
            </div>
          </div>
          <div className="nlp-regs__badges">
            <article className="nlp-regbadge">
              <img src="/assets/regulator-cac.jpg" alt="Corporate Affairs Commission" />
              <span>CAC<small>Registered Ltd.</small></span>
            </article>
            <article className="nlp-regbadge">
              <img src="/assets/regulator-redan.jpg" alt="REDAN" />
              <span>REDAN<small>Developers Assoc.</small></span>
            </article>
            <article className="nlp-regbadge">
              <img src="/assets/regulator-lasrera.jpg" alt="LASRERA" />
              <span>LASRERA<small>Regulatory Authority</small></span>
            </article>
            <article className="nlp-regbadge">
              <span className="nlp-regbadge__verified"><ShieldCheck size={20} /></span>
              <span>Verified<small>Ethical Practice</small></span>
            </article>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="nlp-benefits">
        <div className="nlp__wrap">
          <div className="nlp-sec-head nlp-reveal">
            <span className="nlp-eyebrow"><BadgeCheck size={14} /> Benefits of Membership</span>
            <h2>Everything you need to build wealth</h2>
            <p>Whether you are a beginner or an experienced realtor, membership unlocks a complete ecosystem.</p>
          </div>
          <div className="nlp-benefit-grid nlp-mobile-slider nlp-mobile-slider--benefits">
            {chunk(BENEFITS, 4).map((group, slideIndex) => (
              <div className="nlp-mobile-slide" key={`benefits-${slideIndex}`}>
                {group.map(([label, Icon], i) => (
                  <div className="nlp-benefit nlp-reveal" key={label} style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                    <span className="nlp-benefit__ic"><Icon size={20} /></span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="nlp-about">
        <div className="nlp__wrap nlp-about__grid">
          <div className="nlp-about__figure nlp-reveal">
            <img className="nlp-about__photo" src="/img/about-team.jpg" alt="NRFFN members collaborating" />
            <div className="nlp-about__badge nlp-glass">
              <span className="nlp-mini__ic"><Users size={20} /></span>
              <div>
                <b>Learn · Earn · Network · Invest · Grow</b>
                <span>One unified ecosystem, nationwide</span>
              </div>
            </div>
          </div>
          <div className="nlp-reveal">
            <span className="nlp-eyebrow">Who We Are</span>
            <h2>The Nigerian Realtors Financial Freedom Network</h2>
            <p className="nlp-about__lead">
              NRFFN is a professional membership organization established to empower Nigerians through real estate
              entrepreneurship, investment education, technology and wealth creation opportunities.
            </p>
            <p>
              Our mission is to create a nationwide network of successful real estate professionals who are financially
              empowered, ethically grounded, professionally trained and globally competitive.
            </p>
            <p>
              NRFFN serves as a platform where individuals can <strong>learn, earn, network, invest and grow</strong> — all under one
              unified ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* PROPERTY SHOWCASE */}
      <section className="nlp-props" id="properties">
        <div className="nlp__wrap">
          <div className="nlp-sec-head nlp-reveal">
            <span className="nlp-eyebrow"><Building2 size={14} /> Investment Opportunities</span>
            <h2>Verified properties, built for wealth</h2>
            <p>Every estate is vetted, mapped and documented before members commit — across four ownership models.</p>
          </div>
          <div className="nlp-prop-grid">
            {PROPERTIES.map((p) => (
              <article className="nlp-prop nlp-reveal" key={p.name}>
                <div className="nlp-prop__media">
                  <span className="nlp-prop__tag" style={{ background: p.tagColor }}>{p.tag}</span>
                  <span className="nlp-prop__price nlp-glass-dark">{p.price}</span>
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="nlp-prop__body">
                  <h3>{p.name}</h3>
                  <div className="nlp-prop__loc"><MapPin size={15} /> {p.location}</div>
                  <div className="nlp-prop__meta">
                    <div>Returns<b>{p.roi}</b></div>
                    <div style={{ display: "flex", flexDirection: "column" }}>Plan<b>{p.model}</b></div>
                  </div>
                  <a href={`/properties/${propertySlug(p.name)}`} className="nlp-btn nlp-btn--ghost nlp-prop__cta">
                    View Property <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.4rem" }} className="nlp-reveal">
            <a href="/client/properties" className="nlp-btn nlp-btn--primary nlp-btn--lg">
              Explore the marketplace <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="nlp-vm">
        <div className="nlp__wrap nlp-vm__grid">
          <div className="nlp-vision nlp-reveal">
            <span className="nlp-eyebrow nlp-eyebrow--gold"><Crown size={14} /> Our Vision</span>
            <h3 style={{ marginTop: "1rem" }}>
              &ldquo;To become Africa&apos;s leading real estate empowerment network.&rdquo;
            </h3>
            <p>&ldquo;Raising millions of financially independent real estate entrepreneurs across the continent.&rdquo;</p>
          </div>
          <div className="nlp-mission nlp-reveal">
            <span className="nlp-eyebrow"><Target size={14} /> Our Mission</span>
            <h3 style={{ marginTop: "1rem" }}>Seven commitments that drive everything we do</h3>
            <ul>
              {MISSION.map((m) => (
                <li key={m}><CheckCircle2 size={20} /> {m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="nlp-values">
        <div className="nlp__wrap">
          <div className="nlp-sec-head nlp-reveal">
            <span className="nlp-eyebrow"><Star size={14} /> Our Core Values</span>
            <h2>The principles behind the network</h2>
            <p>Six values that shape how every member learns, earns and leads.</p>
          </div>
          <div className="nlp-value-grid nlp-mobile-slider nlp-mobile-slider--values">
            {chunk(VALUES, 3).map((group, slideIndex) => (
              <div className="nlp-mobile-slide" key={`values-${slideIndex}`}>
                {group.map(([Icon, title, copy], i) => (
                  <div className="nlp-value nlp-reveal" key={title} style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                    <span className="nlp-value__ic"><Icon size={24} /></span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section id="why" className="nlp-why">
        <div className="nlp__wrap">
          <div className="nlp-sec-head nlp-reveal">
            <span className="nlp-eyebrow"><Rocket size={14} /> Why Join NRFFN?</span>
            <h2>Four pillars of member success</h2>
            <p>As a member you receive a complete toolkit across education, opportunities, technology and community.</p>
          </div>
          <div className="nlp-why-grid">
            {PILLARS.map(([Icon, title, items], i) => (
              <div className="nlp-pillar nlp-reveal" key={title} style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                <span className="nlp-pillar__ic"><Icon size={24} /></span>
                <h3>{title}</h3>
                <ul>
                  {items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="nlp-tiers">
        <div className="nlp__wrap">
          <div className="nlp-sec-head nlp-reveal">
            <span className="nlp-eyebrow"><Crown size={14} /> Membership Categories</span>
            <h2>Choose the path to your financial freedom</h2>
            <p>From free Associate access to the elite VIP inner circle — every tier compounds the last.</p>
          </div>
          <div className="nlp-tier-grid">
            {TIERS.map((t) => (
              <div className={`nlp-tier nlp-reveal${t.featured ? " nlp-tier--featured" : ""}`} key={t.name}>
                {t.flag && <span className="nlp-tier__flag">{t.flag}</span>}
                <div className="nlp-tier__name">{t.name}</div>
                <div className="nlp-tier__price">
                  <b>{t.price}</b>
                  {t.unit && <span>{t.unit}</span>}
                </div>
                <p className="nlp-tier__desc">{t.desc}</p>
                <ul className="nlp-tier__feat">
                  {t.features.map((f) => (
                    <li key={f}><Check size={16} /> {f}</li>
                  ))}
                </ul>
                <a
                  href="/associate/register"
                  className={`nlp-btn ${t.featured ? "nlp-btn--featured" : "nlp-btn--ghost"}`}
                >
                  {t.price === "Free" ? "Join Free" : "Become a Member"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMY */}
      <section id="academy" className="nlp-academy">
        <div className="nlp__wrap nlp-academy__grid">
          <div className="nlp-reveal">
            <span className="nlp-eyebrow"><BookOpen size={14} /> NRFFN Academy</span>
            <h2>Learn. Earn. Grow.</h2>
            <p className="nlp-academy__lead">
              Our academy provides practical, on-demand training built for the Nigerian market — with certification,
              quizzes and progress tracking so you can master real estate at your own pace.
            </p>
            <div className="nlp-course-list">
              {COURSES.map(([Icon, title, copy]) => (
                <div className="nlp-course" key={title}>
                  <span className="nlp-course__ic"><Icon size={20} /></span>
                  <div>
                    <b>{title}</b>
                    <span>{copy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="nlp-academy__panel nlp-reveal">
            <img className="nlp-academy__bg" src="/img/academy.jpg" alt="" aria-hidden="true" />
            <Play size={34} color="#e6c158" style={{ position: "relative" }} />
            <h3 style={{ marginTop: "1rem" }}>A full curriculum, certified.</h3>
            <p>Video courses, quizzes, certificates and a guided roadmap from beginner to leader.</p>
            <div className="nlp-academy__stats">
              <div className="nlp-academy__stat"><b>120+</b><span>Training videos</span></div>
              <div className="nlp-academy__stat"><b>15</b><span>Certifications</span></div>
              <div className="nlp-academy__stat"><b>Weekly</b><span>Live mentorship</span></div>
              <div className="nlp-academy__stat"><b>100%</b><span>Self-paced</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="nlp-tm">
        <div className="nlp__wrap">
          <div className="nlp-sec-head nlp-reveal">
            <span className="nlp-eyebrow"><Quote size={14} /> Trusted by members</span>
            <h2>Real people. Real results.</h2>
            <p>From first-time learners to platinum investors — hear how NRFFN is changing the game.</p>
          </div>
          <div className="nlp-tm-grid nlp-mobile-slider nlp-mobile-slider--trust">
            {TESTIMONIALS.map(([img, name, role, quote]) => (
              <div className="nlp-mobile-slide" key={name}>
                <figure className="nlp-tmcard nlp-reveal">
                  <div className="nlp-tmcard__stars">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p>&ldquo;{quote}&rdquo;</p>
                  <figcaption className="nlp-tmcard__who">
                    <img src={`/img/${img}`} alt={name} loading="lazy" />
                    <span>
                      <b>{name}</b>
                      <span>{role}</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          <div className="nlp-trustband nlp-reveal">
            <span className="nlp-trustpill"><ShieldCheck size={16} /> CAC Registered Ltd.</span>
            <span className="nlp-trustpill"><Users size={16} /> 12,000+ members targeted</span>
            <span className="nlp-trustpill"><BadgeCheck size={16} /> 15 certification programs</span>
            <span className="nlp-trustpill"><Building2 size={16} /> 36 states coverage</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="nlp-cta">
        <div className="nlp__wrap">
          <div className="nlp-cta__inner nlp-reveal">
            <h2>Your financial freedom roadmap starts today</h2>
            <p>Join NRFFN free and step into Nigeria&apos;s largest real estate wealth-building network.</p>
            <div className="nlp-cta__btns">
              <a href="/associate/register" className="nlp-btn nlp-btn--primary nlp-btn--lg">
                Join Free Today <ArrowRight size={18} />
              </a>
              <a href="/login" className="nlp-btn nlp-btn--ghost nlp-btn--lg nlp-cta__secondary">
                Member Login
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="nlp-foot">
        <div className="nlp__wrap">
          <div className="nlp-foot__grid">
            <div className="nlp-foot__brand">
              <p>
                Nigerian Realtors Financial Freedom Network Ltd. Building wealth through real estate, technology,
                education and networking. The company is registered with Nigeria&apos;s <strong>Corporate Affairs Commission (CAC)</strong> and operate in compliance with relevant laws and regulatory bodies, including <strong>LASRERA</strong>, <strong>REDAN</strong>, and the <strong>World Trade Center Nigeria</strong>.
              </p>
              <div className="nlp-foot__certificate">
                <a className="nlp-btn nlp-btn--ghost" href="/documents/nrffn-ltd-certificate.pdf" target="_blank" rel="noreferrer">View NRFFN Certificate</a>
                <a className="nlp-btn nlp-btn--primary" href="/documents/nrffn-ltd-certificate.pdf" download>Download Certificate</a>
              </div>
            </div>
            <div className="nlp-foot__col">
              <h4>Platform</h4>
              <a href="#about">About NRFFN</a>
              <a href="#membership">Membership</a>
              <a href="#academy">Academy</a>
              <a href="#why">Why Join</a>
            </div>
            <div className="nlp-foot__col">
              <h4>Portals</h4>
              <a href="/associate/dashboard">Realtor Portal</a>
              <a href="/client/dashboard">Investor Portal</a>
              <a href="/login">Login</a>
              <a href="/associate/register">Register</a>
            </div>
            <div className="nlp-foot__col">
              <h4>Company</h4>
              <a href="#about">Our Vision</a>
              <a href="#about">Our Mission</a>
              <a href="#about">Core Values</a>
              <a href="#membership">Become a Member</a>
            </div>
          </div>
          <div className="nlp-foot__bottom">
            <span>© {new Date().getFullYear()} NRFFN Ltd. All rights reserved.</span>
            <div className="nlp-foot__socials">
              <a href="#top" aria-label="Network"><Network size={18} /></a>
              <a href="#top" aria-label="Community"><Users size={18} /></a>
              <a href="#top" aria-label="Excellence"><Award size={18} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
