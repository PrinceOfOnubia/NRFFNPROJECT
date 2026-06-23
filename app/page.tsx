"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Copy,
  Download,
  Eye,
  EyeOff,
  ExternalLink,
  FileText,
  Home as HomeIcon,
  Info,
  Landmark,
  LogOut,
  MapPin,
  Menu,
  Minus,
  MoreHorizontal,
  Mountain,
  PanelLeftClose,
  Play,
  Plus,
  Search,
  Share2,
  ShoppingBag,
  Settings,
  Star,
  Store,
  Target,
  Upload,
  Users,
  UserRound,
  WalletCards,
  X
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const productCards = [
  {
    label: "NRFFN Academy",
    title: "Learn From Industry Experts",
    copy: "Build practical skills in real estate sales, investment, marketing, leadership, and entrepreneurship.",
    icon: CheckCircle2
  },
  {
    label: "Property Marketplace",
    title: "Sell Verified Opportunities",
    copy: "Connect clients to structured property opportunities with clearer information and digital support.",
    icon: Building2
  },
  {
    label: "Realtor CRM",
    title: "Manage Leads Better",
    copy: "Organize prospects, follow-ups, referrals, and client activity from one connected workspace.",
    icon: Users
  },
  {
    label: "Wealth Builder",
    title: "Grow With Structure",
    copy: "Follow transparent membership, sales, referral, mentorship, and leadership pathways.",
    icon: Mountain
  }
];

const listings = [
  {
    name: "Freedom Gardens",
    location: "Epe, Lagos",
    type: "Flex",
    badge: "Flex Property",
    status: "Active",
    price: "₦30,000/Monthly",
    copy: "Explore this verified estate opportunity with flexible payment and digital allocation.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Rockville Courts",
    location: "Moniya-Iseyin, Ibadan",
    type: "Full Ownership",
    badge: "Full Ownership",
    status: "Sold Out",
    price: "₦100,000",
    copy: "A resort-style residential community blending modern comfort with smart ownership.",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Greencity",
    location: "Kobape-Asipa, Abeokuta",
    type: "Land Banking",
    badge: "Land Banking",
    status: "Active",
    price: "₦55,000/Monthly",
    copy: "A growth estate for clients building wealth through long-term land appreciation.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Cedar Residences",
    location: "Ajah, Lagos",
    type: "Co-Ownership",
    badge: "Co-Ownership",
    status: "Active",
    price: "₦80,000/Monthly",
    copy: "Premium apartment shares with transparent portfolio tracking and income reporting.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Prime Acres",
    location: "Atapa, Abeokuta",
    type: "Flex",
    badge: "Flex Property",
    status: "Sold Out",
    price: "₦25,000/Monthly",
    copy: "A flexible ownership plan for first-time buyers entering verified real estate.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Heritage Court",
    location: "Ibeju-Lekki, Lagos",
    type: "Full Ownership",
    badge: "Full Ownership",
    status: "Active",
    price: "₦200,000",
    copy: "A complete ownership product with allocation workflow and digital documentation.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
  }
];

const listingTabs = ["All", "Flex", "Full Ownership", "Land Banking", "Co-Ownership"];

const tabIcons: Record<string, string> = {
  All: "",
  Flex: "🧾",
  "Full Ownership": "🏠",
  "Land Banking": "📊",
  "Co-Ownership": "👥"
};

const advantageItems = [
  ["Professional Education", "Learn practical real estate, sales, investment, and leadership skills."],
  ["Technology for Growth", "Use connected tools for leads, referrals, property opportunities, and activity tracking."],
  ["Nationwide Community", "Build relationships with members, mentors, and leaders across Nigeria."]
];

const stats = [
  ["36", "states coverage"],
  ["6", "membership levels"],
  ["5", "core growth tools"],
  ["1", "nationwide network"]
];

const testimonials = [
  ["Akinwunmi Sunday", "NRFFN Associate", "The training and community give me a clearer way to approach clients and grow professionally."],
  ["Dr Shabi", "Property Investor", "NRFFN brings learning, credible opportunities, and useful technology into one network."],
  ["Mariam Bello", "Associate Realtor", "The CRM and referral direction will help realtors work with more structure and consistency."],
  ["Tunde Adeyemi", "Community Member", "I can see a practical path from learning to sales, mentorship, and leadership."]
];

const membershipPreview = [
  ["Associate", "Free", "Community access, weekly learning, and essential resources."],
  ["Bronze", "₦20,000", "Membership certification, training materials, and referral access."],
  ["Silver", "₦100,000", "Advanced learning, investment access, and leadership development."],
  ["Gold", "₦250,000", "Mentorship, priority events, and premium opportunities."]
];

const benefits = [
  ["Learn at every stage", "Access training for sales, investment, marketing, leadership, and entrepreneurship."],
  ["Manage your realtor activity", "Keep leads, follow-ups, referrals, and opportunities organized."],
  ["Access property opportunities", "Connect clients and investors to verified real estate products."],
  ["Grow through mentorship", "Learn from experienced professionals and support the people you lead."],
  ["Build a national network", "Connect, collaborate, and grow with members across Nigeria."]
];

const faqItems = [
  [
    "How many units can I subscribe to?",
    "Clients can subscribe to one or multiple units depending on the estate, available inventory, and approved payment plan. Final unit limits will be controlled from the admin dashboard."
  ],
  [
    "How does NRFFN verify properties before listing?",
    "Each estate record will support title documents, location data, inspection media, approval notes, and internal review before it becomes visible to clients or realtors."
  ],
  [
    "Can realtors track referral commissions?",
    "Yes. The realtor portal will show leads, conversion status, commission history, wallet balance, withdrawal requests, and team activity."
  ],
  [
    "How are receipts and allocation letters generated?",
    "Payment records, allocation approvals, and ownership documents will be generated from verified transaction data and made available in the client download center."
  ]
];

type AppView = "home" | "login" | "signup" | "profile";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [view, setView] = useState<AppView>("home");
  const filteredListings =
    activeTab === "All" ? listings : listings.filter((listing) => listing.type === activeTab);
  const openSignup = () => {
    window.history.pushState(null, "", "?signup=1");
    setView("signup");
  };
  const openLogin = () => {
    window.history.pushState(null, "", "/login");
    setView("login");
  };

  useEffect(() => {
    const syncView = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("signup") === "1" || window.location.hash === "#signup") {
        setView("signup");
      } else if (window.location.pathname === "/login") {
        setView("login");
      } else {
        setView("home");
      }
    };

    syncView();
    window.addEventListener("popstate", syncView);
    window.addEventListener("hashchange", syncView);
    return () => {
      window.removeEventListener("popstate", syncView);
      window.removeEventListener("hashchange", syncView);
    };
  }, []);

  if (view === "login") {
    return (
      <LoginScreen
        onBack={() => {
          window.history.pushState(null, "", "/");
          setView("home");
        }}
        onCreateAccount={openSignup}
        onSignIn={() => {
          window.history.pushState(null, "", "/");
          setView("profile");
        }}
      />
    );
  }

  if (view === "signup") {
    return (
      <SignupFlow
        onBack={() => {
          window.history.pushState(null, "", "/");
          setView("home");
        }}
        onComplete={() => {
          window.history.pushState(null, "", "/");
          setView("profile");
        }}
      />
    );
  }

  if (view === "profile") {
    return <ProfileMock onBack={() => setView("home")} />;
  }

  return (
    <main>
      <div className="announcement">
        <span>Join us! Sign up to be an associate</span>
        <a href="/about#membership">
          Learn more <ArrowRight size={13} />
        </a>
      </div>

      <section className="hero">
        <Nav
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onLogin={openLogin}
          onGetStarted={openSignup}
        />
        <div className="heroGrid shell">
          <div className="heroCopy">
            <h1>Building Wealth Through Real Estate &amp; Technology.</h1>
            <p>
              NRFFN empowers realtors, investors, entrepreneurs, and professionals
              through education, technology, mentorship, and structured opportunities
              to grow in real estate.
            </p>
            <div className="heroActions">
              <a className="btn ghost" href="#contact">
                Talk to an Expert
              </a>
              <button className="btn primary" type="button" onClick={openSignup}>
                Get started <ArrowRight size={17} />
              </button>
            </div>
          </div>
          <HeroCollage />
        </div>
      </section>

      <RegulatorStrip />

      <section className="advantage shell">
        <div className="advantageCopy">
          <Pill label="Our Advantage" />
          <h2>Everything you need to grow in real estate.</h2>
          <p>
            Learn practical skills, access useful technology, discover property
            opportunities, and grow inside a nationwide professional community.
          </p>
          <div className="advantageList">
            {advantageItems.map(([title, copy]) => (
              <article key={title}>
                <CheckCircle2 size={22} />
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <VideoPanel
          image="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=1100&q=80"
          alt="Black realtor using a phone"
        />
      </section>

      <section className="numbers">
        <div className="patternLine left" />
        <div className="patternLine right" />
        <div className="shell numbersInner">
          <Pill label="Our Numbers" />
          <h2>One vision. Nationwide reach. Shared growth.</h2>
          <p>
            NRFFN is building the structure for professionals to learn, collaborate,
            lead, and create sustainable wealth through real estate.
          </p>
          <VideoPanel
            image="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1300&q=80"
            alt="Black professionals building wealth together"
            wide
          />
          <div className="statGrid">
            {stats.map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials membershipHome">
        <div className="shell testimonialsHead">
          <Pill label="NRFFN Membership" />
          <h2>Start free. Grow with purpose.</h2>
          <p>Choose a membership path that matches your current goals and unlock more opportunities as you grow.</p>
          <a className="btn ghost" href="/about#membership">Explore all membership levels <ArrowRight size={16} /></a>
        </div>
        <div className="shell membershipHomeGrid">
          {membershipPreview.map(([name, price, copy], index) => (
            <article className={index === 0 ? "membershipHomeCard featured" : "membershipHomeCard"} key={name}>
              <span>{name}</span><strong>{price}</strong><p>{copy}</p>
              <a href="/?signup=1">Join now <ArrowRight size={15} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="products" id="products">
        <div className="shell productMatrix">
          <div className="productColumn">
            {productCards.slice(0, 2).map((product) => (
              <ProductCard product={product} key={product.label} />
            ))}
          </div>
          <div className="productCenter">
            <Pill label="Our Products" />
            <h2>Technology <span>&amp; tools</span> for modern realtors</h2>
            <p>Everything you need to learn, sell, manage relationships, and grow.</p>
            <Image className="productLogoMark" src="/assets/nrffn-logo-mark.png" alt="" width={150} height={160} />
          </div>
          <div className="productColumn">
            {productCards.slice(2).map((product) => (
              <ProductCard product={product} key={product.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="listings shell" id="properties">
        <div className="sectionHead center">
          <h2>Discover Opportunities.<span>Serve Clients Better.</span></h2>
          <p>Explore verified property options for clients, investors, and your own wealth journey.</p>
          <a className="btn primary" href="/properties">See all available listings <ArrowRight size={17} /></a>
        </div>
        <div className="tabs">
          {listingTabs.map((tab) => (
            <button className={activeTab === tab ? "active" : ""} data-filter={tab} key={tab} type="button" onClick={() => setActiveTab(tab)}>
              {tabIcons[tab] && <span>{tabIcons[tab]}</span>}{tab}
            </button>
          ))}
        </div>
        <div className="listingGrid">
          {filteredListings.length > 0 ? filteredListings.map((listing) => (
            <ListingCard listing={listing} key={listing.name} onView={openSignup} />
          )) : <p className="emptyListings">No listings found for this category.</p>}
        </div>
      </section>

      <section className="appSection">
        <div className="shell appCard">
          <div>
            <h2>Your network.<span>Your tools.</span>Anywhere.</h2>
            <p>Learn, manage leads, track referrals, explore properties, and follow your growth from one connected experience.</p>
            <button className="btn primary" type="button" onClick={openSignup}>Get started <ArrowRight size={17} /></button>
          </div>
          <PhoneMock />
        </div>
        <div className="shell benefitGrid">
          {benefits.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="ownership">
        <div className="shell ownershipInner">
          <h2>Empowering <span>Real Estate Professionals</span> Across Nigeria</h2>
          <p>Join a community where education, technology, mentorship, ethical practice, and opportunity work together to help people grow.</p>
        </div>
      </section>

      <section className="faq shell">
        <div className="sectionHead center">
          <Pill label="Learn. Grow. Own." />
          <h2>Got questions? We have answers.</h2>
          <p>Everything clients and realtors need to know before joining the ecosystem.</p>
        </div>
        <div className="faqList">
          {faqItems.map(([question, answer]) => (
            <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

function LoginScreen({
  onBack,
  onCreateAccount,
  onSignIn
}: {
  onBack: () => void;
  onCreateAccount: () => void;
  onSignIn: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="authPage">
      <div className="authCard loginAuthCard">
        <button className="backLink" type="button" onClick={onBack}>
          <ArrowLeft size={20} /> Back to website
        </button>
        <div className="progressTrack loginTrack"><span /></div>
        <form onSubmit={(event) => { event.preventDefault(); onSignIn(); }}>
          <AuthStep
            eyebrow="Member portal"
            title="Welcome back"
            copy="Sign in to continue learning, connecting, and growing with NRFFN."
          >
            <label>
              Email address
              <input type="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
          <div className="passwordLabel">
            <span>Password</span>
            <button type="button">Forgot password?</button>
          </div>
          <div className="passwordInput">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="current-password"
              minLength={8}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          </AuthStep>
          <button className="continueBtn loginSubmit" type="submit">Sign in <ArrowRight size={18} /></button>
        </form>
        <p className="loginCreate">New to NRFFN? <button type="button" onClick={onCreateAccount}>Create free account</button></p>
      </div>
      <CityPattern />
    </main>
  );
}

type ContentPage = "products" | "about" | "properties" | "resources";

export function DedicatedContentPage({ page }: { page: ContentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pageHead = {
    products: ["Technology & Tools for Modern Realtors", "Everything you need to learn, sell, manage, and grow in real estate."],
    about: ["About NRFFN", "Nigerian Realtors Financial Freedom Network Ltd is a nationwide real estate empowerment ecosystem combining education, technology, investment access, and structured wealth-building systems for realtors, entrepreneurs, and investors."],
    properties: ["Property Listings & Investment Opportunities", "Explore verified real estate opportunities for clients, investors, and your personal wealth journey."],
    resources: ["Learn. Build. Grow.", "Training, compensation guidance, answers, and downloads for your NRFFN journey."]
  }[page];

  return (
    <main className="marketingPage">
      <section className="innerHero">
        <Nav
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onLogin={() => window.location.assign("/login")}
          onGetStarted={() => window.location.assign("/?signup=1")}
        />
        <div className="shell innerHeroCopy">
          <Pill label="NRFFN Network" />
          <h1>{pageHead[0]}</h1>
          <p>{pageHead[1]}</p>
        </div>
      </section>
      {page === "products" && <ProductsContent />}
      {page === "about" && <AboutContent />}
      {page === "properties" && <PropertiesContent />}
      {page === "resources" && <ResourcesContent />}
      <Footer />
      <FloatingButtons />
    </main>
  );
}

export function LoginRoute() {
  const [signedIn, setSignedIn] = useState(false);
  if (signedIn) return <ProfileMock onBack={() => window.location.assign("/")} />;
  return (
    <LoginScreen
      onBack={() => window.location.assign("/")}
      onCreateAccount={() => window.location.assign("/?signup=1")}
      onSignIn={() => setSignedIn(true)}
    />
  );
}

function ProductsContent() {
  const items = [
    ["NRFFN Academy", "Practical training in sales, investment, marketing, leadership, and entrepreneurship.", CheckCircle2],
    ["Property Marketplace", "Verified opportunities and clearer property information for realtors, clients, and investors.", Building2],
    ["Realtor CRM", "Manage leads, follow-ups, referrals, conversations, and conversion activity.", Users],
    ["Wealth Builder System", "Structured membership, referral, sales, mentorship, and leadership pathways.", Mountain],
    ["Referral Dashboard", "Track invitations, team activity, milestones, and earned rewards.", Share2]
  ] as const;
  return (
    <section className="marketingSection shell">
      <div className="marketingSectionHead"><h2>Built for the complete realtor journey</h2></div>
      <div className="productOverviewGrid">
        {items.map(([title, copy, Icon]) => <article key={title}><Icon size={26}/><h3>{title}</h3><p>{copy}</p><a href="/?signup=1">Explore <ArrowRight size={15}/></a></article>)}
      </div>
    </section>
  );
}

function AboutContent() {
  const mission = [
    "Train and empower realtors nationwide",
    "Promote ethical real estate practice",
    "Provide structured wealth creation opportunities",
    "Connect members with verified investments",
    "Develop future real estate leaders",
    "Transform marketing and operations through technology",
    "Build a financially independent national community"
  ];
  const values = [
    ["Integrity", "Doing what is right always."],
    ["Professionalism", "Maintaining high industry standards."],
    ["Innovation", "Leveraging technology and creativity."],
    ["Excellence", "Delivering exceptional performance."],
    ["Wealth Creation", "Building sustainable financial systems."],
    ["Collaboration", "Growing stronger together."]
  ];
  const offers = [
    ["Education System", ["Realtor certification programs", "Investment training", "Digital marketing", "Sales mastery", "Leadership development"], CheckCircle2],
    ["Investment Access", ["Property opportunities", "Joint venture deals", "Investment syndication", "Portfolio building"], Building2],
    ["Technology Platform", ["CRM tools", "Lead generation", "Member dashboards", "Referral tracking", "Property marketplace"], Target],
    ["Community Network", ["National realtor network", "Mentorship", "Accountability groups", "Leadership network", "Weekly webinars"], Users]
  ] as const;
  const levels = [
    ["Associate", "Free", ["Community access", "Weekly training", "Newsletter", "Basic resources"]],
    ["Bronze", "₦20,000", ["Certificate of membership", "Referral income access", "Training materials", "Community benefits"]],
    ["Silver", "₦100,000", ["Advanced training", "Investment opportunities", "Leadership development", "Premium resources"]],
    ["Gold", "₦250,000", ["Mentorship access", "Priority events", "Premium opportunities"]],
    ["Platinum", "₦1,500,000", ["Investment syndication", "Executive networking", "Wealth mentorship"]],
    ["VIP", "₦3,000,000", ["Exclusive deals", "VIP events", "Direct leadership access", "National recognition"]]
  ] as const;
  return (
    <>
      <section className="marketingSection shell">
        <div className="contentColumns">
          <article>
            <Pill label="Who We Are"/>
            <h2>A professional network built for financial independence.</h2>
            <p>NRFFN is a professional membership organization established to empower Nigerians through real estate entrepreneurship, investment education, technology, and wealth creation opportunities.</p>
            <p>We provide a structured platform where members can learn, earn, network, invest, and grow through real estate systems and technology-driven tools.</p>
            <p>NRFFN serves as a national network of real estate professionals, marketers, investors, and entrepreneurs working together to build sustainable financial independence.</p>
          </article>
          <article className="visionCard"><span>Our vision</span><h3>To become Africa’s leading real estate empowerment network, raising millions of financially independent real estate entrepreneurs.</h3></article>
        </div>
        <div className="valueGrid missionGrid">{mission.map((item) => <article key={item}><CheckCircle2 size={20}/><strong>{item}</strong></article>)}</div>
      </section>
      <section className="membershipPreview"><div className="shell">
        <div className="marketingSectionHead"><Pill label="Our Values"/><h2>Standards that guide the network.</h2></div>
        <div className="benefitCardGrid">{values.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div></section>
      <section className="marketingSection shell">
        <div className="marketingSectionHead"><Pill label="What We Offer"/><h2>One ecosystem for learning, earning, investing, and leading.</h2></div>
        <div className="aboutOfferGrid">{offers.map(([title, items, Icon]) => <article key={title}><Icon size={25}/><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>
      <section className="marketingSection shell">
        <div className="marketingSectionHead"><Pill label="Why Join NRFFN"/><h2>A platform built for practical growth.</h2><p>Members get a clearer route into real estate learning, marketing, property access, referral tracking, investment exposure, mentorship, and leadership development.</p></div>
        <div className="benefitCardGrid">
          {[
            ["Learn with structure", "Follow training paths designed for realtors, investors, and entrepreneurs."],
            ["Use better tools", "Work from dashboards, CRM systems, referral tracking, and marketplace support."],
            ["Find verified opportunities", "Access property and investment opportunities through a guided network."],
            ["Grow with people", "Build relationships through mentorship, webinars, teams, and national leadership paths."],
            ["Earn and invest", "Move from learning to referrals, sales, investment, wealth building, and leadership."]
          ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <section className="membershipPreview" id="membership"><div className="shell">
        <div className="marketingSectionHead"><Pill label="Membership System"/><h2>Choose your level. Expand your access.</h2></div>
        <div className="membershipGrid">{levels.map(([name, price, items], index) => <article className={index === 0 ? "featured" : ""} key={name}><span>{name}</span><strong>{price}</strong><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul><button type="button" onClick={() => window.location.assign("/?signup=1")}>Join {name}</button></article>)}</div>
      </div></section>
      <section className="marketingSection shell">
        <div className="marketingSectionHead"><Pill label="How NRFFN Works"/><h2>A clear path from learning to leadership.</h2></div>
        <div className="aboutFlow">{["Learn", "Join", "Train", "Build Network", "Earn", "Invest", "Grow", "Lead"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className="aboutSplit">
          <article><h3>Compensation overview</h3><ul><li>5×5 Wealth Builder System</li><li>Direct referral rewards</li><li>Team bonuses</li><li>Leadership incentives</li></ul><a className="btn ghost" href="/resources">View Full Compensation Plan</a></article>
          <article><h3>Leadership structure</h3><div className="leadershipPath aboutLeadership">{["Associate", "Bronze", "Silver", "Gold", "Platinum", "VIP", "Team Leader", "Director", "National Director"].map((item) => <span key={item}>{item}</span>)}</div></article>
        </div>
      </section>
      <section className="marketingCta"><div className="shell"><Pill label="Our Big Goal"/><h2>Raise over 1,000,000 financially empowered real estate entrepreneurs.</h2><p>Your financial freedom journey starts here. Join a nationwide ecosystem built for learning, earning, networking, and wealth creation.</p><a className="btn primary" href="/?signup=1">Join Free</a></div></section>
    </>
  );
}

function PropertiesContent() {
  return (
    <section className="marketingSection shell propertiesPage">
      <div className="marketTools">
        <div className="marketFilters">
          {["Property type", "Location", "Price range", "Status"].map((label) => <label key={label}><span>{label}</span><select defaultValue=""><option value="">{label}</option></select></label>)}
        </div>
        <label className="marketSearch"><Search size={19}/><input placeholder="Search properties" /></label>
      </div>
      <div className="listingGrid">
        {listings.map((listing) => <ListingCard listing={listing} key={`page-${listing.name}`} onView={() => window.location.assign("/?signup=1")} />)}
      </div>
    </section>
  );
}

function ResourcesContent() {
  const plans = [
    ["5×5 Wealth Builder", "A structured team-building framework with clear stages, qualifying activity, and reward visibility."],
    ["Land Sales Plan", "Commission guidance for verified land transactions, documentation, and approved sales milestones."],
    ["House Sales Plan", "A clear property-sales reward path tied to completed and verified transactions."],
    ["Leadership Incentives", "Recognition connected to mentorship, team quality, and sustained network performance."]
  ];
  return (
    <>
      <section className="marketingSection shell">
        <div className="marketingSectionHead"><h2>NRFFN Academy</h2><p>Focused modules that move members from knowledge to confident action.</p></div>
        <div className="valueGrid">{["Sales", "Investment", "Marketing", "Leadership", "Entrepreneurship"].map((item) => <article key={item}><CheckCircle2 size={20}/><strong>{item}</strong></article>)}</div>
      </section>
      <section className="membershipPreview"><div className="shell resourceColumns">
        <div><div className="marketingSectionHead"><h2>Compensation plan</h2><p>Open only the section you need.</p></div><div className="resourceAccordions">{plans.map(([title, copy]) => <details key={title}><summary>{title}<ChevronDown size={18}/></summary><p>{copy}</p></details>)}</div></div>
        <div><div className="marketingSectionHead"><h2>FAQ</h2></div><div className="resourceAccordions">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18}/></summary><p>{answer}</p></details>)}</div></div>
      </div></section>
      <section className="marketingSection shell"><div className="marketingSectionHead"><h2>Downloads</h2></div><div className="downloadGrid">{["Membership Guide", "Training Calendar", "Compensation PDF", "Onboarding Guide"].map((item) => <button type="button" key={item}><Download size={20}/><span>{item}</span></button>)}</div></section>
    </>
  );
}

function Nav({
  menuOpen,
  setMenuOpen,
  onLogin,
  onGetStarted
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onLogin: () => void;
  onGetStarted: () => void;
}) {
  const links = [
    ["Products", "/products"],
    ["About Company", "/about"],
    ["Properties", "/properties"],
    ["Resources", "/resources"]
  ] as const;

  return (
    <nav className="nav shell">
      <div className="navCluster">
        <BrandLogo compact />
        <div className="navLinks">
          {links.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
              {["Products", "About Company", "Resources"].includes(label) && <ChevronDown size={14} />}
            </a>
          ))}
        </div>
      </div>
      <div className="navActions">
        <button className="btn ghost" type="button" onClick={onLogin}>
          Log in
        </button>
        <button className="btn primary" type="button" onClick={onGetStarted}>
          Get Started <ArrowRight size={16} />
        </button>
      </div>
      <button className="menuButton" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      {menuOpen && (
        <div className="mobileMenu">
          {links.map(([label, href]) => (
            <a href={href} key={label} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button className="btn primary" type="button" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}

function HeroCollage() {
  return (
    <div className="heroCollage" aria-label="NRFFN platform preview">
      <div className="personPhoto">
        <Image
          src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=700&q=80"
          alt="Black client smiling with phone"
          fill
          priority
          sizes="260px"
        />
      </div>
      <div className="centralBadge">
        <Image
          src="/assets/nrffn-logo-mark.png"
          alt="NRFFN"
          width={192}
          height={192}
          priority
        />
      </div>
      <div className="miniPhoto one">
        <Image
          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80"
          alt="Black realtor presenting"
          fill
          sizes="190px"
        />
      </div>
      <div className="miniPhoto two">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80"
          alt="Estate property"
          fill
          sizes="190px"
        />
      </div>
      <div className="toast top">Co-ownership funds are now in your wallet</div>
      <div className="toast middle">Property successfully allocated to you</div>
      <div className="toast bottom">Your flex payment is now complete</div>
      <i className="dot green" />
      <i className="dot blue" />
      <i className="dot red" />
    </div>
  );
}

function RegulatorStrip() {
  const regulators = [
    { name: "CAC", logo: "/assets/regulator-cac.jpg", sub: "Corporate Affairs Commission" },
    { name: "LASRERA", logo: "/assets/regulator-lasrera.jpg", sub: "Lagos State Real Estate Regulatory Authority" },
    { name: "REDAN", logo: "/assets/regulator-redan.jpg", sub: "Real Estate Developers Association of Nigeria" }
  ];

  return (
    <section className="regulators">
      <div className="shell regulatorGrid">
        <span>Certified/Supported by Regulators:</span>
        {regulators.map((item) => (
          <div className="regLogo" key={item.name}>
            <Image src={item.logo} alt={item.sub} width={130} height={78} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="pill">
      <i />
      {label}
    </span>
  );
}

function VideoPanel({
  image,
  alt,
  wide = false
}: {
  image: string;
  alt: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "videoPanel wide" : "videoPanel"}>
      <Image src={image} alt={alt} fill sizes={wide ? "70vw" : "46vw"} />
      <button type="button">
        <span>
          <Play fill="currentColor" size={18} />
        </span>
        <b>Play video</b>
        <small>1 MIN</small>
      </button>
    </div>
  );
}

function ProductCard({
  product
}: {
  product: {
    label: string;
    title: string;
    copy: string;
    icon: typeof CheckCircle2;
  };
}) {
  const Icon = product.icon;
  return (
    <article className="productCard">
      <Icon size={25} />
      <small>{product.label}</small>
      <h3>{product.title}</h3>
      <p>{product.copy}</p>
      <a href="/products">
        Learn more <ArrowRight size={15} />
      </a>
    </article>
  );
}

function ListingCard({
  listing,
  onView
}: {
  listing: {
    name: string;
    location: string;
    type: string;
    badge: string;
    status: string;
    price: string;
    copy: string;
    image: string;
  };
  onView: () => void;
}) {
  return (
    <article className="listingCard">
      <div className="listingImage">
        <Image src={listing.image} alt={listing.name} fill sizes="(max-width: 900px) 90vw, 30vw" />
        <span className="listingType">{listing.badge}</span>
      </div>
      <div className="listingBody">
        <span className="location">
          <MapPin size={15} /> {listing.location}
        </span>
        <div className="listingTitle">
          <h3>{listing.name}</h3>
          <b className={listing.status === "Sold Out" ? "sold" : ""}>{listing.status}</b>
        </div>
        <p>{listing.copy}</p>
        <div className="priceRow">
          <span>
            Price:
            <strong>{listing.price}</strong>
          </span>
          <span>
            Status:
            <strong>{listing.status}</strong>
          </span>
        </div>
        <button className="viewProduct" type="button" onClick={onView}>
          View product
        </button>
      </div>
    </article>
  );
}

function PhoneMock() {
  return (
    <div className="phoneMock">
      <div className="phoneTop" />
      <div className="phoneScreen">
        <div className="phoneTabs">
          <b>All Offers</b>
          <span>My Assets</span>
        </div>
        <div className="searchLine">Search by name or location</div>
        <div className="phoneProperty">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
            alt="Mobile app property preview"
            fill
            sizes="220px"
          />
          <strong>The Arena</strong>
          <span>Agbowa-Ikorodu, Lagos</span>
        </div>
        <div className="miniWallet">
          <WalletCards size={18} />
          <div>
            <span>Commission Wallet</span>
            <strong>₦485,000</strong>
          </div>
        </div>
        <div className="phoneNav">
          <span>Dashboard</span>
          <span>Products</span>
          <span>Wallet</span>
        </div>
      </div>
    </div>
  );
}

function SignupFlow({
  onBack,
  onComplete
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  const progress = ["25%", "66%", "100%"][step];

  const next = () => {
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    onComplete();
  };

  return (
    <main className="authPage">
      <div className="authCard">
        <button className="backLink" type="button" onClick={step === 0 ? onBack : () => setStep(step - 1)}>
          <ArrowLeft size={20} />
          Back{step === 0 ? " to sign in" : ""}
        </button>
        <div className="progressTrack">
          <span style={{ width: progress }} />
        </div>

        {step === 0 && (
          <AuthStep
            eyebrow="Create your account"
            title="Tell us who you are"
            copy="We'll use this to set up your account."
          >
            <div className="formGrid two">
              <label>
                First name
                <input placeholder="John" autoComplete="given-name" />
              </label>
              <label>
                Last name
                <input placeholder="Doe" autoComplete="family-name" />
              </label>
            </div>
            <label>
              Email
              <input placeholder="john.doe@example.com" type="email" autoComplete="email" />
            </label>
            <label>
              Phone
              <div className="phoneField">
                <span>🇳🇬</span>
                <input placeholder="+234 801 000 0000" autoComplete="tel" />
              </div>
            </label>
          </AuthStep>
        )}

        {step === 1 && (
          <AuthStep
            eyebrow="Create your account"
            title="Where are you based?"
            copy="We use this to match you to nearby properties and clients."
          >
            <label>
              Country
              <select defaultValue="">
                <option value="">Select country</option>
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>United Kingdom</option>
              </select>
            </label>
            <label>
              State
              <select defaultValue="">
                <option value="">Select state</option>
                <option>Lagos</option>
                <option>Ogun</option>
                <option>Abuja</option>
              </select>
            </label>
            <label>
              Local Government Area
              <select defaultValue="">
                <option value="">Select state first</option>
                <option>Ikeja</option>
                <option>Eti-Osa</option>
                <option>Abeokuta South</option>
              </select>
            </label>
          </AuthStep>
        )}

        {step === 2 && (
          <AuthStep
            eyebrow="Create your account"
            title="A bit about your background"
            copy="Helps us tailor your experience."
          >
            <label>
              Highest level of education
              <select defaultValue="">
                <option value="">Select an option</option>
                <option>SSCE / WAEC</option>
                <option>OND / NCE</option>
                <option>HND / B.Sc</option>
                <option>Postgraduate (M.Sc / MBA / PhD)</option>
                <option>Professional Certificate</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Real estate experience
              <select defaultValue="">
                <option value="">Select experience</option>
                <option>No experience</option>
                <option>Less than 1 year</option>
                <option>1 - 2 years</option>
                <option>3 - 5 years</option>
                <option>5 - 10 years</option>
                <option>10+ years</option>
              </select>
            </label>
            <label>
              How did you hear about NRFFN?
              <select defaultValue="">
                <option value="">Select an option</option>
                <option>Someone invited me</option>
                <option>Social Media</option>
                <option>Billboard</option>
                <option>Email Newsletter</option>
                <option>Associate</option>
                <option>Event</option>
                <option>Other</option>
              </select>
            </label>
            <details className="referral">
              <summary>Have a referral code?</summary>
              <input placeholder="Enter referral code" />
            </details>
          </AuthStep>
        )}

        <div className="authActions">
          <button className="cancelBtn" type="button" onClick={onBack}>
            Cancel
          </button>
          <button className="continueBtn" type="button" onClick={next}>
            {step === 2 ? "Create account" : "Continue"}
          </button>
        </div>
      </div>
      <CityPattern />
    </main>
  );
}

function AuthStep({
  eyebrow,
  title,
  copy,
  children
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <section className="authStep">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
      <div className="authFields">{children}</div>
    </section>
  );
}

function CityPattern() {
  return (
    <div className="cityPattern" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span key={index} style={{ height: `${28 + (index % 4) * 18}px` }} />
      ))}
    </div>
  );
}

type DashboardPage =
  | "Home"
  | "Wallet"
  | "Flex"
  | "Full Ownership"
  | "Marketplace"
  | "Profile"
  | "Requests"
  | "Referral";

function ProfileMock({ onBack }: { onBack: () => void }) {
  const [activePage, setActivePage] = useState<DashboardPage>("Profile");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [setupFocus, setSetupFocus] = useState(0);
  const nav = [
    ["Home", HomeIcon],
    ["Wallet", WalletCards],
    ["Flex", Landmark],
    ["Full Ownership", Building2],
    ["Marketplace", Store],
    ["Profile", UserRound],
    ["Requests", ClipboardList],
    ["Referral", Users]
  ] as const;
  const mobilePrimary = nav.filter(([label]) => ["Home", "Flex", "Full Ownership", "Wallet"].includes(label));
  const mobileMore = nav.filter(([label]) => ["Marketplace", "Profile", "Requests", "Referral"].includes(label));

  const choosePage = (page: DashboardPage) => {
    setActivePage(page);
    setUserMenuOpen(false);
    setNotificationsOpen(false);
    setMoreOpen(false);
  };

  const finishSetup = () => {
    setSetupFocus((value) => value + 1);
    choosePage("Profile");
  };

  return (
    <main className={sidebarCollapsed ? "dashboard sidebarCollapsed" : "dashboard"}>
      <aside className="sideNav">
        <div className="sideHeader">
          <BrandLogo compact />
          <button
            className="sideCollapse"
            type="button"
            onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeftClose size={20} />
          </button>
        </div>
        {nav.map(([label, Icon]) => (
          <button
            className={label === activePage ? "active" : ""}
            type="button"
            key={label}
            onClick={() => choosePage(label)}
          >
            <Icon size={22} />
            <span>{label}</span>
          </button>
        ))}
        <button className="navLogout" type="button" onClick={() => setLogoutOpen(true)}>
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </aside>
      <section className="profileArea">
        <header className="profileTop">
          <h1>{activePage}</h1>
          <div className="topActions">
            <button
              className={notificationsOpen ? "iconButton active" : "iconButton"}
              type="button"
              aria-label="Notifications"
              onClick={() => {
                setNotificationsOpen((open) => !open);
                setUserMenuOpen(false);
              }}
            >
              <BellIcon />
            </button>
            <button
              className={userMenuOpen ? "userPill active" : "userPill"}
              type="button"
              onClick={() => {
                setUserMenuOpen((open) => !open);
                setNotificationsOpen(false);
              }}
            >
              <span>JD</span>
              <ChevronDown size={18} />
            </button>
            {notificationsOpen && <NotificationsPopup onClose={() => setNotificationsOpen(false)} />}
            {userMenuOpen && (
              <UserMenu
                onProfile={() => choosePage("Profile")}
                onClose={() => setUserMenuOpen(false)}
                onSignOut={() => setLogoutOpen(true)}
              />
            )}
          </div>
        </header>
        <DashboardContent
          page={activePage}
          setPage={choosePage}
          showSetup={showSetup}
          onDismissSetup={() => setShowSetup(false)}
          onFinishSetup={finishSetup}
          setupFocus={setupFocus}
        />
      </section>
      <nav className="mobileBottomNav" aria-label="Dashboard navigation">
        {mobilePrimary.map(([label, Icon]) => (
          <button
            className={label === activePage ? "active" : ""}
            type="button"
            key={`mobile-${label}`}
            onClick={() => choosePage(label)}
          >
            <Icon size={24} />
            <span>{label === "Full Ownership" ? "Full" : label}</span>
          </button>
        ))}
        <button className={moreOpen ? "active" : ""} type="button" onClick={() => setMoreOpen(true)}>
          <MoreHorizontal size={26} />
          <span>More</span>
        </button>
      </nav>
      {moreOpen && (
        <div className="mobileSheetOverlay" role="presentation" onClick={() => setMoreOpen(false)}>
          <div className="mobileSheet" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <span className="sheetHandle" />
            <div className="sheetTitle">
              <h2>More</h2>
              <button type="button" onClick={() => setMoreOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            {mobileMore.map(([label, Icon]) => (
              <button type="button" key={`more-${label}`} onClick={() => choosePage(label)}>
                <Icon size={26} />
                <span>{label}</span>
                <ArrowRight size={20} />
              </button>
            ))}
            <button type="button" onClick={() => setLogoutOpen(true)}>
              <LogOut size={25} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
      {logoutOpen && (
        <ConfirmDialog
          title="Sign out?"
          copy="You can sign back in anytime with your account details."
          confirmLabel="Sign out"
          onCancel={() => setLogoutOpen(false)}
          onConfirm={onBack}
        />
      )}
    </main>
  );
}

function ConfirmDialog({
  title,
  copy,
  confirmLabel,
  onCancel,
  onConfirm
}: {
  title: string;
  copy: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="confirmOverlay" role="presentation" onClick={onCancel}>
      <div className="confirmDialog" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <h2>{title}</h2>
        <p>{copy}</p>
        <div>
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="button" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function NotificationsPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="notificationsPopup">
      <header>
        <h2>Notifications</h2>
        <button type="button" onClick={onClose} aria-label="Close notifications">
          <X size={20} />
        </button>
      </header>
      <div className="notificationEmpty">
        <div>
          <h3>No notifications yet</h3>
          <p>You will see updates here when there is something to know.</p>
        </div>
      </div>
    </div>
  );
}

function UserMenu({
  onProfile,
  onClose,
  onSignOut
}: {
  onProfile: () => void;
  onClose: () => void;
  onSignOut: () => void;
}) {
  return (
    <div className="userMenu">
      <header>
        <p>Signed in as</p>
        <strong>John Doe</strong>
      </header>
      <button type="button" onClick={onProfile}>
        <UserRound size={21} />
        View profile
      </button>
      <button type="button" onClick={onClose}>
        <Settings size={21} />
        Settings
      </button>
      <button type="button" onClick={onSignOut}>
        <LogOut size={21} />
        Sign out
      </button>
    </div>
  );
}

function DashboardContent({
  page,
  setPage,
  showSetup,
  onFinishSetup,
  onDismissSetup,
  setupFocus
}: {
  page: DashboardPage;
  setPage: (page: DashboardPage) => void;
  showSetup: boolean;
  onFinishSetup: () => void;
  onDismissSetup: () => void;
  setupFocus: number;
}) {
  if (page === "Home") {
    return (
      <DashboardHome
        setPage={setPage}
        showSetup={showSetup}
        onFinishSetup={onFinishSetup}
        onDismissSetup={onDismissSetup}
      />
    );
  }

  if (page === "Wallet") {
    return <WalletDashboard showSetup={showSetup} onFinishSetup={onFinishSetup} onDismissSetup={onDismissSetup} />;
  }

  if (page === "Flex" || page === "Full Ownership") {
    return <CatalogDashboard kind={page} />;
  }

  if (page === "Marketplace") {
    return <MarketplaceDashboard />;
  }

  if (page === "Requests") {
    return <RequestsDashboard />;
  }

  if (page === "Referral") {
    return <ReferralDashboard />;
  }

  return (
    <ProfileDashboard
      showSetup={showSetup}
      onFinishSetup={onFinishSetup}
      onDismissSetup={onDismissSetup}
      setupFocus={setupFocus}
    />
  );
}

function SetupBanner({
  onFinish,
  onDismiss
}: {
  onFinish: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="setupBanner">
      <button className="setupDismiss" type="button" onClick={onDismiss} aria-label="Dismiss setup reminder">
        <X size={17} />
      </button>
      <div className="setupContent">
        <CheckCircle2 size={22} />
        <div>
          <h2>Finish setting up your account</h2>
          <p>Complete your profile and verification so your ownership records are ready.</p>
          <span>0 of 3</span>
        </div>
      </div>
      <div className="setupActions">
        <button className="setupCancel" type="button" onClick={onDismiss}>Cancel</button>
        <button className="setupPrimary" type="button" onClick={onFinish}>
          Finish setup <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function DashboardHome({
  setPage,
  showSetup,
  onFinishSetup,
  onDismissSetup
}: {
  setPage: (page: DashboardPage) => void;
  showSetup: boolean;
  onFinishSetup: () => void;
  onDismissSetup: () => void;
}) {
  return (
    <div className="dashboardContent">
      {showSetup && <SetupBanner onFinish={onFinishSetup} onDismiss={onDismissSetup} />}
      <p className="welcomeLine">Welcome back</p>
      <section className="dashHero">
        <span>Welcome to NRFFN</span>
        <h2>Start building something</h2>
        <p>You have not invested in a property yet. Browse our catalog and start with what fits your budget.</p>
        <button type="button" onClick={() => setPage("Flex")}>
          Purchase your first asset <ArrowRight size={18} />
        </button>
      </section>
      <div className="twoPanels">
        <article className="emptyPanel dashboardSummaryPanel">
          <h3>Your properties</h3>
          <div className="summaryPanelBody">
            <p>Start building something</p>
            <span>Once you buy into a property, payment progress and next payment dates will appear here.</span>
            <button type="button" onClick={() => setPage("Flex")}>Browse properties <ArrowRight size={16} /></button>
          </div>
        </article>
        <article className="emptyPanel dashboardSummaryPanel recentActivityPanel">
          <h3>Recent activity</h3>
          <div className="summaryPanelBody">
            <p>Your transactions will appear here.</p>
          </div>
        </article>
      </div>
      <CatalogPreview title="Worth a look" items={listings.slice(0, 3)} />
    </div>
  );
}

function WalletDashboard({
  showSetup,
  onFinishSetup,
  onDismissSetup
}: {
  showSetup: boolean;
  onFinishSetup: () => void;
  onDismissSetup: () => void;
}) {
  const [bankOpen, setBankOpen] = useState(false);
  return (
    <div className="dashboardContent">
      {showSetup && <SetupBanner onFinish={onFinishSetup} onDismiss={onDismissSetup} />}
      <section className="walletHero">
        <span>Wallet balance</span>
        <strong>₦0</strong>
      </section>
      <div className="walletAction">
        <button type="button">Withdraw</button>
        <p>Add a bank account first. <a href="#bank">Add bank →</a></p>
      </div>
      <article className="emptyPanel walletPanel" id="bank">
        <div className="panelTitle">
          <h3>Bank accounts</h3>
        </div>
        <div className="emptyState">
          <Landmark size={22} />
          <p>No bank accounts yet</p>
          <span>Add one to withdraw funds.</span>
          <button type="button" onClick={() => setBankOpen(true)}>+ Add bank</button>
        </div>
      </article>
      <article className="emptyPanel walletPanel">
        <div className="panelTitle">
          <h3>Transactions</h3>
          <div className="dashFilters">
            <button type="button">All types <ChevronDown size={16} /></button>
            <button type="button">All statuses <ChevronDown size={16} /></button>
            <button type="button">All time <ChevronDown size={16} /></button>
          </div>
        </div>
        <p>No transactions yet. Your wallet activity will appear here.</p>
      </article>
      {bankOpen && <BankDrawer onClose={() => setBankOpen(false)} />}
    </div>
  );
}

function BankDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="drawerOverlay" role="presentation" onClick={onClose}>
      <aside className="verifyDrawer bankDrawer" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="drawerHead">
          <h2>Add bank account</h2>
          <button type="button" onClick={onClose} aria-label="Close bank form">
            <X size={18} />
          </button>
        </div>
        <div className="drawerBody">
          <p>We send withdrawals straight to your bank. Type your name exactly as it appears on the bank account.</p>
          <label className="tinField">
            Bank
            <select defaultValue="">
              <option value="">Pick a bank</option>
              <option>Access Bank</option>
              <option>GTBank</option>
              <option>Zenith Bank</option>
              <option>UBA</option>
            </select>
          </label>
          <label className="tinField">
            Account number
            <input placeholder="10-digit NUBAN" />
          </label>
          <label className="tinField">
            Account holder name
            <input placeholder="Name as it appears on your bank account" />
          </label>
        </div>
        <div className="drawerFooter">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="button" onClick={onClose}>Continue</button>
        </div>
      </aside>
    </div>
  );
}

function CatalogDashboard({ kind }: { kind: "Flex" | "Full Ownership" }) {
  const labels = kind === "Flex" ? ["All Offers", "My Assets"] : ["All Offers", "Promo Offers", "My Assets"];
  const [tab, setTab] = useState(labels[0]);
  const [selectedListing, setSelectedListing] = useState<(typeof listings)[number] | null>(null);
  const items = listings.filter((item) => item.type === kind);
  const myAssetLabel = kind === "Flex" ? "Flex" : "Full Ownership";

  useEffect(() => {
    setTab("All Offers");
    setSelectedListing(null);
  }, [kind]);

  if (selectedListing) {
    return (
      <PropertyDetail
        kind={kind}
        listing={selectedListing}
        onBack={() => setSelectedListing(null)}
      />
    );
  }

  return (
    <div className="dashboardContent">
      <DashboardTabs active={tab} labels={labels} onChange={setTab} />
      {tab === "My Assets" ? (
        <AssetSummary kind={myAssetLabel} />
      ) : tab === "Promo Offers" ? (
        <PromoOffers />
      ) : (
        <>
      <div className="catalogHeader">
        <div>
          <h2>{kind} offerings</h2>
          <p>{kind === "Flex" ? "Buy land on a plan that fits your budget." : "Own a plot outright, or commit to a plan."}</p>
        </div>
        <label className="dashSearch">
          <Search size={16} />
          <input placeholder="Search by name or location" />
        </label>
      </div>
      <div className="dashListingGrid">
        {(items.length ? items : listings.slice(0, 3)).map((listing) => (
          <DashboardListingCard
            key={`${kind}-${listing.name}`}
            listing={listing}
            onView={() => setSelectedListing(listing)}
          />
        ))}
      </div>
        </>
      )}
    </div>
  );
}

const flexPricing = {
  150: { monthly: 70000, left: 30, allocation: 756000 },
  300: { monthly: 130000, left: 27, allocation: 1404000 },
  500: { monthly: 215000, left: 35, allocation: 2322000 }
} as const;

const fullOwnershipPricing = {
  300: { land: 1800000, statutory: 750000 },
  500: { land: 3000000, statutory: 750000 },
  1500: { land: 9000000, statutory: 750000 },
  3000: { land: 18000000, statutory: 750000 }
} as const;

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function PropertyDetail({
  kind,
  listing,
  onBack
}: {
  kind: "Flex" | "Full Ownership";
  listing: (typeof listings)[number];
  onBack: () => void;
}) {
  const isFlex = kind === "Flex";
  const [flexSize, setFlexSize] = useState<keyof typeof flexPricing>(150);
  const [fullSize, setFullSize] = useState<keyof typeof fullOwnershipPricing>(300);
  const [plan, setPlan] = useState<"Outright" | "Installment">("Outright");
  const [units, setUnits] = useState(1);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const flex = flexPricing[flexSize];
  const full = fullOwnershipPricing[fullSize];
  const fullTotal = (full.land + full.statutory) * units;
  const installmentInitial = Math.round(fullTotal * 0.25);
  const installmentMonthly = Math.round((fullTotal - installmentInitial) / 11);
  const displayName = listing.name === "Heritage Court" || listing.name === "Freedom Gardens"
    ? "Empire Park"
    : listing.name;
  const detailImage = isFlex
    ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=88"
    : listing.image;

  return (
    <div className="propertyDetail">
      <button className="propertyBack" type="button" onClick={onBack}>
        <ArrowLeft size={18} />
        {kind} offerings
      </button>

      <section className="propertyHeroGrid">
        <div className="propertyGalleryColumn">
          <div className="propertyGallery">
            <Image src={detailImage} alt={displayName} fill priority sizes="(max-width: 980px) 100vw, 58vw" />
            <button type="button" aria-label="Previous property image"><ChevronLeft size={26} /></button>
            <button type="button" aria-label="Next property image"><ChevronRight size={26} /></button>
          </div>
          <div className="galleryDots" aria-label="Image 1 of 3">
            <span className="active" />
            <span />
            <span />
          </div>
          <h2>{displayName}</h2>
          <p className="propertyLocation"><MapPin size={19} /> Ibefun, Epe-Ikorodu Road</p>
        </div>

        <aside className="purchasePanel">
          <span className="purchaseLabel">Size</span>
          <div className="sizeChoices">
            {(isFlex ? [150, 300, 500] : [300, 500, 1500, 3000]).map((size) => (
              <button
                className={(isFlex ? flexSize === size : fullSize === size) ? "active" : ""}
                type="button"
                key={size}
                onClick={() => {
                  if (isFlex) setFlexSize(size as keyof typeof flexPricing);
                  else setFullSize(size as keyof typeof fullOwnershipPricing);
                }}
              >
                {size}sqm
              </button>
            ))}
          </div>

          {isFlex ? (
            <>
              <span className="purchaseLabel">Payment plan</span>
              <article className="paymentPlanCard">
                <div><strong>3 years</strong><span>{flex.left} units left</span></div>
                <strong>{formatNaira(flex.monthly)}<small>/mo</small></strong>
              </article>
            </>
          ) : (
            <>
              <span className="purchaseLabel">Plan type</span>
              <div className="planSwitch">
                {(["Outright", "Installment"] as const).map((item) => (
                  <button className={plan === item ? "active" : ""} type="button" key={item} onClick={() => setPlan(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <article className="ownershipPlanCard">
                <div>
                  <span>{plan === "Outright" ? "Pay once, own forever" : "Secure now, pay monthly"}</span>
                  <strong>{formatNaira(plan === "Outright" ? fullTotal : installmentInitial)}</strong>
                </div>
                <p>
                  {plan === "Outright"
                    ? `You'll own the plot in full immediately after payment. Land ${formatNaira(full.land)} + statutory ${formatNaira(full.statutory)}.`
                    : `Start with 25%, then spread the balance across 11 monthly payments of ${formatNaira(installmentMonthly)}.`}
                </p>
              </article>
            </>
          )}

          <div className="unitStepper">
            <span>Units</span>
            <div>
              <button type="button" aria-label="Remove unit" onClick={() => setUnits((value) => Math.max(1, value - 1))}>
                <Minus size={18} />
              </button>
              <strong>{units}</strong>
              <button type="button" aria-label="Add unit" onClick={() => setUnits((value) => value + 1)}>
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="priceSummary">
            {isFlex ? (
              <>
                <p><span>Initial payment</span><strong>{formatNaira(flex.monthly * units)}</strong></p>
                <p><span>Monthly</span><strong>{formatNaira(flex.monthly * units)}</strong></p>
                <p><span>Total payable</span><strong>{formatNaira(flex.monthly * 36 * units)}</strong></p>
                <p><span>Allocation at <Info size={14} /></span><strong>{formatNaira(flex.allocation * units)}</strong></p>
              </>
            ) : (
              <>
                <p><span>Land cost</span><strong>{formatNaira(full.land * units)}</strong></p>
                <p><span>Statutory fees</span><strong>{formatNaira(full.statutory * units)}</strong></p>
                <p><span>Total</span><strong>{formatNaira(fullTotal)}</strong></p>
                <p><span>Allocation at <Info size={14} /></span><strong>{formatNaira(plan === "Outright" ? fullTotal : installmentInitial)}</strong></p>
              </>
            )}
          </div>

          <button className="buyPlotButton" type="button" onClick={() => setPurchaseOpen(true)}>
            <ShoppingBag size={20} />
            Buy this plot
          </button>
        </aside>
      </section>

      <section className="propertyInformation">
        <article>
          <h3>About this property</h3>
          <p>
            Empire Park is a well-planned development with spacious green areas, landscaped gardens,
            aesthetic homes, recreational facilities, and enhanced security within a gated community.
          </p>
          <p>
            Its prime location, affordability, and high-growth potential make it a strong property
            destination beyond Lagos.
          </p>
        </article>
        <article>
          <h3>Available sizes</h3>
          <p>
            We offer a variety of land sizes to meet your needs: 150sqm, 300sqm, 500sqm, 1500sqm,
            and 3000sqm. Pick what suits your build.
          </p>
        </article>

        <article>
          <h3>Basic details</h3>
          <div className="basicDetailGrid">
            <div><span><Mountain size={21} /></span><p>Topography<strong>Dryland</strong></p></div>
            <div><span><Target size={21} /></span><p>Purpose<strong>Residential</strong></p></div>
            <div><span><ExternalLink size={21} /></span><p>Map location<strong className="muted">Not yet pinned</strong></p></div>
          </div>
        </article>

        <article>
          <h3>Amenities</h3>
          <div className="amenityList">
            {["Perimeter Fencing", "Commercial Hub", "Green Park", "Road Stabilization"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </article>

        <article>
          <h3>Documents</h3>
          <div className="propertyDocuments">
            {["Brochure", "Layout", "Contract of Sale"].map((item) => (
              <button type="button" key={item}>
                <span><FileText size={21} /></span>
                {item}
                <Download size={19} />
              </button>
            ))}
          </div>
        </article>

        <a className="propertyFaq" href="#contact">Questions about this property? Read the FAQs <ArrowRight size={17} /></a>
      </section>

      {purchaseOpen && (
        <ConfirmDialog
          title="Review your selection"
          copy={`${units} unit${units === 1 ? "" : "s"} of ${isFlex ? flexSize : fullSize}sqm at ${isFlex ? formatNaira(flex.monthly * units) + " monthly" : formatNaira(fullTotal)}.`}
          confirmLabel="Continue"
          onCancel={() => setPurchaseOpen(false)}
          onConfirm={() => setPurchaseOpen(false)}
        />
      )}
    </div>
  );
}

function MarketplaceDashboard() {
  const [tab, setTab] = useState("All Listings");
  const [typeFilter, setTypeFilter] = useState("All property types");
  const [sortFilter, setSortFilter] = useState("Newest first");
  const [minimumAmount, setMinimumAmount] = useState("");
  const [maximumAmount, setMaximumAmount] = useState("");
  const amountOptions = ["₦500,000", "₦1,000,000", "₦2,500,000", "₦5,000,000", "₦10,000,000", "₦25,000,000"];

  return (
    <div className="dashboardContent">
      <DashboardTabs active={tab} labels={["All Listings", "My Listings"]} onChange={setTab} />
      <div className="catalogHeader">
        <div>
          <h2>{tab === "My Listings" ? "My Listings" : "Marketplace"}</h2>
          <p>
            {tab === "My Listings"
              ? "Your active, pending, and past marketplace listings."
              : "Browse plots others are selling."}
          </p>
        </div>
        {tab === "My Listings" ? (
          <button className="createListingBtn" type="button">+ Create listing</button>
        ) : null}
      </div>
      {tab === "My Listings" ? (
        <div className="dashFilters">
          {["All", "Active", "Reserved", "Pending", "Sold", "Cancelled", "Expired", "Suspended"].map((label) => (
            <button key={label} type="button">{label}</button>
          ))}
        </div>
      ) : (
        <div className="marketTools">
          <div className="marketFilters">
            <label>
              <span>Property type</span>
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option>All property types</option>
                <option>Flex</option>
                <option>Full Ownership</option>
                <option>Land Banking</option>
                <option>Co-Ownership</option>
              </select>
            </label>
            <label>
              <span>Sort by</span>
              <select value={sortFilter} onChange={(event) => setSortFilter(event.target.value)}>
                <option>Newest first</option>
                <option>Price: Low to high</option>
                <option>Price: High to low</option>
              </select>
            </label>
            <label>
              <span>Minimum amount</span>
              <select value={minimumAmount} onChange={(event) => setMinimumAmount(event.target.value)}>
                <option value="">Min ₦</option>
                {amountOptions.map((amount) => <option key={`min-${amount}`}>{amount}</option>)}
              </select>
            </label>
            <label>
              <span>Maximum amount</span>
              <select value={maximumAmount} onChange={(event) => setMaximumAmount(event.target.value)}>
                <option value="">Max ₦</option>
                {amountOptions.map((amount) => <option key={`max-${amount}`}>{amount}</option>)}
              </select>
            </label>
          </div>
          <label className="dashSearch marketSearch">
            <Search size={18} />
            <input placeholder="Search by name or location" />
          </label>
        </div>
      )}
      <article className="emptyPanel tallEmpty">
        <p>
          {tab === "My Listings"
            ? "No listings yet. Create your first listing to sell a fully-paid plot."
            : "No listings yet. Check back soon."}
        </p>
        {tab === "My Listings" && <button type="button">+ Create listing</button>}
      </article>
    </div>
  );
}

function RequestsDashboard() {
  return (
    <div className="dashboardContent">
      <section className="softBanner">
        <h2>Need help with your assets?</h2>
        <p>Start a request. We will get back to you shortly.</p>
      </section>
      <h2 className="sectionTitle">Start a request</h2>
      <div className="requestGrid">
        {[
          ["Change of Document", "Update the name or address on your land document.", "₦20,000 fee"],
          ["Update Asset", "Resize plot or change unit count.", "₦100,000 fee"],
          ["Custom Request", "Anything else? Tell us about it.", "Free"]
        ].map(([title, copy, fee]) => (
          <article className="requestCard" key={title}>
            <ClipboardList size={24} />
            <ArrowRight size={18} />
            <h3>{title}</h3>
            <p>{copy}</p>
            <span>{fee}</span>
          </article>
        ))}
      </div>
      <article className="emptyPanel walletPanel">
        <h3>My requests</h3>
        <div className="dashFilters">
          <button type="button">All statuses <ChevronDown size={16} /></button>
          <button type="button">All types <ChevronDown size={16} /></button>
        </div>
        <p>No requests yet. Pick a type above to start.</p>
      </article>
    </div>
  );
}

function ReferralDashboard() {
  const referralLink = "www.nrffn.ng/signup?ref=john_doe_2048";
  const [copied, setCopied] = useState(false);

  const copyReferral = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      // Clipboard permissions can fail in previews; the UI still confirms the action.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="dashboardContent">
      <section className="referralHero">
        <div>
          <span>Associate earnings</span>
          <strong>₦0</strong>
          <p>Share your verified referral link and track every qualifying client from invite to allocation.</p>
        </div>
        <div className="referralStats">
          <article><span>Invites</span><strong>0</strong></article>
          <article><span>Converted</span><strong>0</strong></article>
          <article><span>Pending</span><strong>0</strong></article>
        </div>
      </section>
      <article className="shareCard">
        <h2>Share your link</h2>
        <label>
          Your sign-up link
          <div>
            <input value={referralLink} readOnly />
            <button type="button" onClick={copyReferral}>
              <Copy size={16} />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </label>
        <div className="shareActions">
          {["WhatsApp", "Twitter", "Facebook"].map((label) => (
            <button type="button" key={label} onClick={copyReferral}>
              <Share2 size={16} />
              {label}
            </button>
          ))}
          <button type="button" onClick={copyReferral}><Copy size={16} /> Copy link</button>
        </div>
        <p>You earn 5% commission on Flex purchases and 10% on Full Ownership once a referred client completes payment.</p>
      </article>
      <article className="emptyPanel walletPanel">
        <div className="panelTitle">
          <h3>My referrals</h3>
          <label className="dashSearch compact">
            <Search size={16} />
            <input placeholder="Search by name or email" />
          </label>
        </div>
        <div className="referralTable">
          <span>Name</span>
          <span>Status</span>
          <span>Product</span>
          <span>Commission</span>
        </div>
        <p>No referrals yet. Share your link above to start earning.</p>
      </article>
    </div>
  );
}

function ProfileDashboard({
  showSetup,
  onFinishSetup,
  onDismissSetup,
  setupFocus = 0
}: {
  showSetup: boolean;
  onFinishSetup: () => void;
  onDismissSetup: () => void;
  setupFocus?: number;
}) {
  const [profileTab, setProfileTab] = useState<"Personal info" | "Next of kin" | "Verification">("Personal info");
  const [verificationModal, setVerificationModal] = useState<"id" | "face" | "tax" | null>(null);
  const tabs = ["Personal info", "Next of kin", "Verification"] as const;

  useEffect(() => {
    if (setupFocus > 0) {
      setProfileTab("Personal info");
    }
  }, [setupFocus]);

  return (
    <>
      {showSetup && <SetupBanner onFinish={onFinishSetup} onDismiss={onDismissSetup} />}
      <div className="profileMobileTabs">
        {tabs.map((tab) => (
          <button className={tab === profileTab ? "active" : ""} key={tab} type="button" onClick={() => setProfileTab(tab)}>
            {tab}
          </button>
        ))}
      </div>
      <div className="profileGrid">
        <aside className="pageNav">
          {tabs.map((tab) => (
            <button className={tab === profileTab ? "active" : ""} key={tab} type="button" onClick={() => setProfileTab(tab)}>
              {tab}
            </button>
          ))}
          <hr />
          <strong>Verification</strong>
          <p>0 of 3 approved</p>
        </aside>
        <div className="profileContent">
          <article className="profileSummary">
            <span>JD</span>
            <div>
              <h2>John Doe</h2>
              <p>john.doe@example.com</p>
              <p>+2348010000000</p>
            </div>
            <button type="button">
              <Camera size={18} />
              Change photo
            </button>
          </article>
          {profileTab === "Personal info" && <PersonalInfoForm />}
          {profileTab === "Next of kin" && <NextOfKinForm />}
          {profileTab === "Verification" && <VerificationPanel onOpen={setVerificationModal} />}
          {profileTab !== "Verification" && (
            <section className="verificationBelow">
              <h2>Verification</h2>
              <p>Complete these to unlock money movement on your properties.</p>
              <VerificationPanel onOpen={setVerificationModal} compact />
            </section>
          )}
        </div>
      </div>
      {verificationModal && <VerificationDrawer kind={verificationModal} onClose={() => setVerificationModal(null)} />}
    </>
  );
}

function PersonalInfoForm() {
  const [saved, setSaved] = useState(false);

  return (
    <article className="profileForm">
      <h2>Personal info</h2>
      <h3>Identity</h3>
      <div className="formGrid two">
        <label>
          First name
          <input placeholder="John" />
        </label>
        <label>
          Last name
          <input placeholder="Doe" />
        </label>
      </div>
      <label>
        Username
        <input placeholder="john_doe_2048" />
      </label>
      <div className="formGrid two">
        <label>
          Date of birth
          <div className="dateField">
            <input placeholder="mm/dd/yyyy" />
            <Calendar size={18} />
          </div>
        </label>
        <label>
          Gender
          <select defaultValue="">
            <option value="">Select an option</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
      </div>
      <h3>Contact</h3>
      <div className="formGrid two">
        <label>
          Email
          <input placeholder="john.doe@example.com" />
        </label>
        <label>
          Phone
          <input placeholder="+2348010000000" />
        </label>
      </div>
      <h3>Address</h3>
      <div className="formGrid two">
        <label>
          Country
          <input placeholder="Nigeria" />
        </label>
        <label>
          State
          <input placeholder="Lagos" />
        </label>
      </div>
      <label>
        Local Government Area
        <input placeholder="Ikeja" />
      </label>
      <label>
        House address
        <input />
      </label>
      <h3>Background</h3>
      <div className="formGrid two">
        <label>
          Marital status
          <select defaultValue="">
            <option value="">Select an option</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </label>
        <label>
          Employment status
          <select defaultValue="">
            <option value="">Select an option</option>
            <option>Employed</option>
            <option>Self-employed</option>
          </select>
        </label>
      </div>
      <label>
        Occupation
        <input />
      </label>
      <div className="formGrid two">
        <label>
          Highest education
          <select defaultValue="">
            <option value="">Select an option</option>
            <option>SSCE / WAEC</option>
            <option>OND / NCE</option>
            <option>HND / B.Sc</option>
            <option>Postgraduate</option>
          </select>
        </label>
        <label>
          Real estate experience
          <select defaultValue="">
            <option value="">Select experience</option>
            <option>No experience</option>
            <option>Less than 1 year</option>
            <option>1 - 2 years</option>
            <option>3 - 5 years</option>
          </select>
        </label>
      </div>
      <button className="formSave" type="button" onClick={() => setSaved(true)}>
        {saved ? "Personal info saved" : "Save personal info"}
      </button>
    </article>
  );
}

function NextOfKinForm() {
  const [saved, setSaved] = useState(false);

  return (
    <article className="profileForm">
      <h2>Next of kin</h2>
      <div className="formGrid two">
        <label>
          First name
          <input />
        </label>
        <label>
          Last name
          <input />
        </label>
      </div>
      <label>
        Relationship
        <input placeholder="e.g. Brother, Sister, Parent" />
      </label>
      <div className="formGrid two">
        <label>
          Email
          <input type="email" />
        </label>
        <label>
          Phone
          <input />
        </label>
      </div>
      <label>
        Address
        <input />
      </label>
      <button className="formSave" type="button" onClick={() => setSaved(true)}>
        {saved ? "Next of kin saved" : "Save next of kin"}
      </button>
    </article>
  );
}

function VerificationPanel({
  onOpen,
  compact = false
}: {
  onOpen: (kind: "id" | "face" | "tax") => void;
  compact?: boolean;
}) {
  const cards = [
    { title: "ID document", status: "Not started", action: "Start ID check", kind: "id" as const, icon: ClipboardList },
    { title: "Facial recognition", status: "Not started", action: "Start face check", kind: "face" as const, icon: Camera },
    { title: "Tax ID", status: "Not started", action: "Add TIN", kind: "tax" as const, icon: Download }
  ];

  return (
    <div className={compact ? "verificationCards compact" : "verificationCards"}>
      {cards.map(({ title, status, action, kind, icon: Icon }) => (
        <article className="verificationCard" key={title}>
          <Icon size={22} />
          <h3>{title}</h3>
          <span>{status}</span>
          <button type="button" onClick={() => onOpen(kind)}>{action}</button>
        </article>
      ))}
    </div>
  );
}

function VerificationDrawer({ kind, onClose }: { kind: "id" | "face" | "tax"; onClose: () => void }) {
  const isFace = kind === "face";
  const isTax = kind === "tax";
  const [faceStage, setFaceStage] = useState<"intro" | "camera" | "success">("intro");

  return (
    <div className="drawerOverlay" role="presentation" onClick={onClose}>
      <aside className="verifyDrawer" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="drawerHead">
          <h2>{isFace ? "Verify your face" : isTax ? "Add Tax ID" : "Verify your ID"}</h2>
          <button type="button" onClick={onClose} aria-label="Close verification">
            <X size={18} />
          </button>
        </div>
        <div className="drawerBody">
          {!isTax && (
            <p>
              {isFace
                ? "Use a live selfie to confirm the photo on your ID belongs to you."
                : "Use your ID to verify that property documents are issued in your real name."}
            </p>
          )}
          {kind === "id" && (
            <>
              <span className="drawerLabel">ID type</span>
              {["National ID Card (NIN)", "International Passport", "Driver's License"].map((item) => (
                <label className="radioRow" key={item}>
                  <input name="idType" type="radio" />
                  {item}
                </label>
              ))}
              <span className="drawerLabel">Upload document</span>
              <div className="uploadBox">
                <Upload size={22} />
                <strong>Drop your file or tap to browse</strong>
                <small>JPG, PNG, or PDF · up to 10MB</small>
              </div>
            </>
          )}
          {kind === "face" && (
            <div className={`faceFlow ${faceStage}`}>
              {faceStage === "success" ? (
                <>
                  <span className="faceSuccess"><CheckCircle2 size={34} /></span>
                  <h3>Face captured successfully</h3>
                  <p>Your selfie is clear and ready to be submitted for verification.</p>
                </>
              ) : (
                <>
                  <div className="facePreview">
                    <span />
                    {faceStage === "camera" && <i />}
                  </div>
                  <div className="faceInstructions">
                    <h3>{faceStage === "camera" ? "Position your face" : "Before you begin"}</h3>
                    <p>Use a well-lit space, remove hats or dark glasses, and look directly at the camera.</p>
                    <ul>
                      <li>Keep your full face inside the frame</li>
                      <li>Use a plain background where possible</li>
                      <li>Hold still while the image is captured</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
          {kind === "tax" && (
            <label className="tinField">
              Tax Identification Number
              <input placeholder="Enter TIN" />
            </label>
          )}
        </div>
        <div className="drawerFooter">
          <button type="button" onClick={onClose}>Cancel</button>
          {isFace ? (
            <button
              type="button"
              onClick={() => {
                if (faceStage === "intro") setFaceStage("camera");
                else if (faceStage === "camera") setFaceStage("success");
                else onClose();
              }}
            >
              {faceStage === "intro" ? "Open camera" : faceStage === "camera" ? "Capture photo" : "Done"}
            </button>
          ) : (
            <button type="button" onClick={onClose}>Submit</button>
          )}
        </div>
      </aside>
    </div>
  );
}

function AssetSummary({ kind }: { kind: "Flex" | "Full Ownership" }) {
  return (
    <>
      <div className="assetStats">
        <article>
          <span>Invested in {kind === "Flex" ? "Flex" : "FO"}</span>
          <strong>₦0</strong>
        </article>
        <article>
          <span>{kind === "Flex" ? "Outstanding" : "Land outstanding"}</span>
          <strong>₦0</strong>
        </article>
        <article>
          <span>{kind === "Flex" ? "Plots owned" : "Documents owed"}</span>
          <strong>0</strong>
        </article>
      </div>
      <article className="emptyPanel tallEmpty">
        <p>You do not own any {kind} plots yet.</p>
        <button type="button">Browse offerings <ArrowRight size={16} /></button>
      </article>
    </>
  );
}

function PromoOffers() {
  return (
    <>
      <section className="promoHero">
        <span>Active deal</span>
        <h2>Buy 5 plots. Own 6.</h2>
        <p>Purchase a full acre and receive one plot free. Limited allocation.</p>
        <div>
          <strong>Save up to ₦5M</strong>
          <button type="button">See the deal <ArrowRight size={16} /></button>
        </div>
      </section>
      <div className="promoGrid">
        {["Empire Park", "Woodgate Prime"].map((name, index) => (
          <article className="promoCard" key={name}>
            <span>Buy 5 own 6 · 1 free</span>
            <h3>{name}</h3>
            <p>{index === 0 ? "Ibefun, Epe-Ikorodu Road" : "Obafemi Owode, Ogun State"}</p>
            <strong>{index === 0 ? "₦25M" : "₦6M"}</strong>
            <button type="button">View <ArrowRight size={16} /></button>
          </article>
        ))}
      </div>
    </>
  );
}

function DashboardTabs({
  active,
  labels,
  onChange
}: {
  active: string;
  labels: string[];
  onChange: (label: string) => void;
}) {
  return (
    <div className="dashTabs">
      {labels.map((label) => (
        <button className={label === active ? "active" : ""} key={label} type="button" onClick={() => onChange(label)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function CatalogPreview({ title, items }: { title: string; items: typeof listings }) {
  return (
    <section className="catalogPreview">
      <h2>{title}</h2>
      <p>New properties added recently.</p>
      <div className="dashListingGrid">
        {items.map((listing) => (
          <DashboardListingCard key={`preview-${listing.name}`} listing={listing} />
        ))}
      </div>
    </section>
  );
}

function DashboardListingCard({
  listing,
  onView
}: {
  listing: (typeof listings)[number];
  onView?: () => void;
}) {
  return (
    <article className="dashListingCard">
      <div className="dashListingImage">
        <Image src={listing.image} alt={listing.name} fill sizes="(max-width: 760px) 100vw, 30vw" />
        <span>{listing.status === "Sold Out" ? "Sold out" : listing.badge}</span>
      </div>
      <div className="dashListingBody">
        <span><MapPin size={14} /> {listing.location}</span>
        <h3>{listing.name}</h3>
        <div>
          <p>From<br /><strong>{listing.price.replace("/Monthly", "/mo")}</strong></p>
          <p>{listing.type}<br /><strong>{listing.status}</strong></p>
        </div>
        <button
          className="viewProduct"
          type="button"
          onClick={() => {
            onView?.();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          View product
        </button>
      </div>
    </article>
  );
}

function BellIcon() {
  return (
    <svg fill="none" height="22" viewBox="0 0 24 24" width="22" aria-hidden="true">
      <path
        d="M15 17H9m9-2v-4a6 6 0 0 0-12 0v4l-2 2h16l-2-2Zm-4 4a2 2 0 0 1-4 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function Footer() {
  return (
    <footer id="contact">
      <div className="shell footerGrid">
        <div className="newsletter">
          <h3>Wealthscape by NRFFN</h3>
          <p>Your weekly window into smarter property and realtor wealth.</p>
          <input aria-label="Email address" placeholder="Enter your email" />
        </div>
        <div>
          <strong>Company</strong>
          <a href="/about">About Company</a>
          <a href="/about#membership">Membership</a>
          <a href="/about#membership">NRFFN Associates</a>
          <a href="#contact">Careers</a>
          <a href="#contact">Terms of Service</a>
          <a href="#contact">Privacy Policy</a>
        </div>
        <div>
          <strong>Products</strong>
          <a href="/products">Academy</a>
          <a href="/products">Realtor CRM</a>
          <a href="/products">Marketplace</a>
          <a href="/products">Wealth Builder</a>
        </div>
        <div>
          <strong>Resources</strong>
          <a href="/resources">Compensation Plan</a>
          <a href="/resources">Frequently Asked Questions</a>
          <a href="/resources">Downloads</a>
          <a href="/resources">Training Guides</a>
          <a href="/resources">Webinars</a>
        </div>
      </div>
      <div className="shell footerBottom">
        <BrandLogo />
        <p>11a Olu Akerele Street, Off Awolowo Road, Ikeja.</p>
        <p>© 2026 NRFFN.</p>
      </div>
      <div className="shell legalCopy">
        <div className="certificateActions">
          <a href="/documents/nrffn-ltd-certificate.pdf" target="_blank" rel="noreferrer">
            View NRFFN Certificate
          </a>
          <a href="/documents/nrffn-ltd-certificate.pdf" download>
            <Download size={18} />
            Download NRFFN Certificate
          </a>
        </div>
        <p>
          <strong>NRFFN</strong> is a real estate ownership and realtor management
          platform making land and property participation more accessible to Nigerians.
          Through flexible options, whether full or fractional ownership, we help
          individuals and associates build wealth through property.
        </p>
        <p>
          NRFFN works with verified estate partners and compliance workflows for asset
          acquisition, development updates, client engagement, payment records, and
          ownership documentation.
        </p>
        <p>
          By using this platform, you agree to our Terms of Service and Privacy Policy.
          Please note that all investments carry risk and may result in partial or total
          loss of capital.
        </p>
      </div>
    </footer>
  );
}

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={compact ? "brand compact" : "brand"} href="#" aria-label="NRFFN home">
      <Image
        src="/assets/nrffn-logo-mark.png"
        alt=""
        width={168}
        height={180}
        priority={compact}
      />
      <span>Nigerian Realtors Financial Freedom Network Ltd.</span>
    </a>
  );
}

function FloatingButtons() {
  return (
    <>
      <a className="whatsapp" href="#contact" aria-label="Contact support on WhatsApp">
        <Image src="/assets/whatsapp.png" alt="" width={58} height={58} />
      </a>
      <a className="scrollTop" href="#" aria-label="Scroll to top">
        <ChevronDown size={22} />
      </a>
    </>
  );
}
