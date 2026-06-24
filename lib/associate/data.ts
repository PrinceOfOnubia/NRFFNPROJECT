/* ============================================================
   NRFFN Associate / Realtor portal — domain data + engine
   Frontend mock layer (no backend). All naira amounts in NGN.
   ============================================================ */

export const naira = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export const member = {
  name: "John Doe",
  initials: "JD",
  rank: "Director",
  joined: "Mar 2025",
  referralCode: "john_doe_2048",
  referralLink: "https://nrffn.ng/signup?ref=john_doe_2048"
};

/* ---------- Rank ladder (incentives) ---------- */
export type Rank = {
  name: string;
  requirement: string;
  volume: number;
  reward: string;
  travel?: string;
  achieved: boolean;
  current?: boolean;
};

export const ranks: Rank[] = [
  { name: "Associate", requirement: "Join the network", volume: 0, reward: "Welcome kit", achieved: true },
  { name: "Consultant", requirement: "5 direct referrals", volume: 2_000_000, reward: "₦50,000 bonus", achieved: true },
  { name: "Manager", requirement: "₦10M team volume", volume: 10_000_000, reward: "₦150,000 bonus", travel: "Lagos retreat", achieved: true },
  { name: "Director", requirement: "₦35M team volume", volume: 35_000_000, reward: "₦500,000 bonus", travel: "Dubai summit", achieved: true, current: true },
  { name: "Executive", requirement: "₦80M team volume", volume: 80_000_000, reward: "₦1,500,000 + car plan", travel: "London experience", achieved: false },
  { name: "Ambassador", requirement: "₦200M team volume", volume: 200_000_000, reward: "₦5,000,000 + equity pool", travel: "Global VIP tour", achieved: false }
];

export const rankProgress = { current: "Director", next: "Executive", volume: 65_400_000, target: 80_000_000 };

/* ---------- Wallet + 5-level commission engine ---------- */
export type CommissionLevel = {
  level: number;
  label: string;
  rate: number;
  members: number;
  volume: number;
  earned: number;
};

// Direct = level 0/1 headline; levels 1-5 downline overrides
export const commissionRates = [10, 5, 3, 2, 1.5, 1]; // direct, L1..L5 (%)

export const commissionLevels: CommissionLevel[] = [
  { level: 1, label: "Level 1 — Direct", rate: 10, members: 14, volume: 42_000_000, earned: 4_200_000 },
  { level: 2, label: "Level 2", rate: 5, members: 38, volume: 28_500_000, earned: 1_425_000 },
  { level: 3, label: "Level 3", rate: 3, members: 71, volume: 19_200_000, earned: 576_000 },
  { level: 4, label: "Level 4", rate: 2, members: 96, volume: 11_400_000, earned: 228_000 },
  { level: 5, label: "Level 5", rate: 1.5, members: 120, volume: 6_800_000, earned: 102_000 }
];

export const earningsBreakdown = {
  directReferral: 4_200_000,
  levelCommissions: commissionLevels.slice(1).reduce((s, l) => s + l.earned, 0),
  propertyCommissions: 2_850_000,
  leadershipBonuses: 1_200_000
};

export const wallet = {
  available: 1_264_000,
  pending: 842_000,
  withdrawn: 6_980_000,
  get total() {
    return this.available + this.pending + this.withdrawn;
  }
};

export type Transaction = {
  id: string;
  date: string;
  type: "Direct" | "Level" | "Property" | "Bonus" | "Withdrawal";
  description: string;
  amount: number;
  status: "Available" | "Pending" | "Paid";
};

export const transactions: Transaction[] = [
  { id: "t1", date: "18 Jun 2026", type: "Property", description: "Emerald Heights — unit sale commission", amount: 950_000, status: "Available" },
  { id: "t2", date: "16 Jun 2026", type: "Direct", description: "Direct referral — A. Sunday (Silver)", amount: 100_000, status: "Available" },
  { id: "t3", date: "14 Jun 2026", type: "Level", description: "Level 2 override — M. Bello downline", amount: 45_000, status: "Pending" },
  { id: "t4", date: "12 Jun 2026", type: "Bonus", description: "Director rank leadership bonus", amount: 500_000, status: "Paid" },
  { id: "t5", date: "09 Jun 2026", type: "Property", description: "Sterling Apartments — co-ownership", amount: 320_000, status: "Pending" },
  { id: "t6", date: "05 Jun 2026", type: "Withdrawal", description: "Payout to GTBank ••4821", amount: -800_000, status: "Paid" },
  { id: "t7", date: "01 Jun 2026", type: "Level", description: "Level 3 override — network activity", amount: 28_000, status: "Available" }
];

/* ---------- CRM leads ---------- */
export type LeadStage = "New" | "Contacted" | "Qualified" | "Inspection" | "Negotiation" | "Closed Won" | "Closed Lost";
export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  property: string;
  budget: number;
  stage: LeadStage;
  temp: "Hot" | "Warm" | "Cold";
  source: string;
  nextFollowUp: string;
  notes: { text: string; at: string }[];
};

export const leadStages: LeadStage[] = ["New", "Contacted", "Qualified", "Inspection", "Negotiation", "Closed Won"];

export const leads: Lead[] = [
  { id: "l1", name: "Chidi Okeke", phone: "+234 803 111 2233", email: "chidi@mail.com", property: "Emerald Heights", budget: 95_000_000, stage: "Negotiation", temp: "Hot", source: "WhatsApp", nextFollowUp: "Today, 4:00 PM", notes: [{ text: "Wants 2 units, financing via installment.", at: "2h ago" }] },
  { id: "l2", name: "Ngozi Eze", phone: "+234 802 444 5566", email: "ngozi@mail.com", property: "Sterling Apartments", budget: 12_500_000, stage: "Inspection", temp: "Hot", source: "Referral", nextFollowUp: "Tomorrow, 11:00 AM", notes: [{ text: "Inspection booked for Saturday.", at: "1d ago" }] },
  { id: "l3", name: "Bola Akande", phone: "+234 805 777 8899", email: "bola@mail.com", property: "Greenfield Plots", budget: 4_800_000, stage: "Qualified", temp: "Warm", source: "Instagram", nextFollowUp: "Thu, 2:00 PM", notes: [] },
  { id: "l4", name: "Emeka Obi", phone: "+234 807 222 3344", email: "emeka@mail.com", property: "Emerald Heights", budget: 95_000_000, stage: "Contacted", temp: "Warm", source: "Website", nextFollowUp: "Fri, 10:00 AM", notes: [] },
  { id: "l5", name: "Aisha Bello", phone: "+234 809 555 6677", email: "aisha@mail.com", property: "Sterling Apartments", budget: 25_000_000, stage: "New", temp: "Cold", source: "Walk-in", nextFollowUp: "Next week", notes: [] },
  { id: "l6", name: "Tunde Cole", phone: "+234 806 999 0011", email: "tunde@mail.com", property: "Greenfield Plots", budget: 9_600_000, stage: "New", temp: "Warm", source: "WhatsApp", nextFollowUp: "Mon, 9:00 AM", notes: [] }
];

/* ---------- Team / network ---------- */
export type TeamMember = {
  id: string;
  name: string;
  rank: string;
  level: number;
  referrals: number;
  volume: number;
  status: "Active" | "Inactive";
};

export const team: TeamMember[] = [
  { id: "m1", name: "Mariam Bello", rank: "Manager", level: 1, referrals: 12, volume: 14_200_000, status: "Active" },
  { id: "m2", name: "Akin Sunday", rank: "Consultant", level: 1, referrals: 6, volume: 8_400_000, status: "Active" },
  { id: "m3", name: "Grace Udo", rank: "Consultant", level: 1, referrals: 5, volume: 6_100_000, status: "Active" },
  { id: "m4", name: "Peter Nwosu", rank: "Associate", level: 2, referrals: 2, volume: 2_300_000, status: "Active" },
  { id: "m5", name: "Hauwa Sani", rank: "Associate", level: 2, referrals: 1, volume: 900_000, status: "Inactive" },
  { id: "m6", name: "Femi Alabi", rank: "Manager", level: 1, referrals: 9, volume: 11_700_000, status: "Active" }
];

export const referralStats = {
  totalReferrals: 14,
  clicks: 1284,
  signups: 96,
  conversions: 41,
  get conversionRate() {
    return Math.round((this.conversions / this.signups) * 100);
  }
};

/* ---------- Academy ---------- */
export type Course = {
  id: string;
  title: string;
  category: string;
  lessons: number;
  duration: string;
  progress: number; // 0-100
  certified: boolean;
  img: string;
};

export const courses: Course[] = [
  { id: "c1", title: "Real Estate Sales Mastery", category: "Sales", lessons: 18, duration: "4h 20m", progress: 100, certified: true, img: "/img/course-1.jpg" },
  { id: "c2", title: "Property Development 101", category: "Development", lessons: 14, duration: "3h 10m", progress: 65, certified: false, img: "/img/course-2.jpg" },
  { id: "c3", title: "Land Banking Strategy", category: "Investment", lessons: 10, duration: "2h 40m", progress: 30, certified: false, img: "/img/course-3.jpg" },
  { id: "c4", title: "Digital Marketing for Realtors", category: "Marketing", lessons: 16, duration: "3h 50m", progress: 0, certified: false, img: "/img/course-4.jpg" }
];

export const academyStats = { completed: 1, inProgress: 2, certificates: 1, hours: 12 };

/* Lessons are generated per course from its lesson count (mock outline) */
const LESSON_TITLES = [
  "Introduction & overview", "Core principles", "Market fundamentals", "Working with clients",
  "Practical frameworks", "Tools & templates", "Case study walkthrough", "Negotiation tactics",
  "Closing the deal", "Compliance & documentation", "Scaling your pipeline", "Final review"
];
export type Lesson = { n: number; title: string; duration: string; done: boolean };
export function lessonsFor(course: Course): Lesson[] {
  const completedCount = Math.round((course.progress / 100) * course.lessons);
  return Array.from({ length: course.lessons }, (_, i) => ({
    n: i + 1,
    title: LESSON_TITLES[i % LESSON_TITLES.length],
    duration: `${8 + ((i * 3) % 14)}m`,
    done: i < completedCount
  }));
}

export type Certificate = { id: string; course: string; issued: string; credentialId: string };
export const certificates: Certificate[] = [
  { id: "cert1", course: "Real Estate Sales Mastery", issued: "12 Jun 2026", credentialId: "NRFFN-RSM-204815" }
];

export const quiz = {
  course: "Real Estate Sales Mastery",
  question: "What is the most important step before closing a property sale?",
  options: [
    "Collecting full payment upfront",
    "Verifying title documents and client financing",
    "Posting the listing on social media",
    "Scheduling a housewarming"
  ],
  correct: 1
};

/* ---------- Notifications ---------- */
export const notifications = [
  { icon: "wallet", title: "Commission available", body: "Emerald Heights sale unlocked ₦950,000.", at: "2h ago", unread: true },
  { icon: "users", title: "New downline signup", body: "Peter Nwosu joined under your Level 2.", at: "5h ago", unread: true },
  { icon: "trophy", title: "Rank progress", body: "You are 82% to Executive rank.", at: "1d ago", unread: false },
  { icon: "academy", title: "Certificate earned", body: "Real Estate Sales Mastery completed.", at: "2d ago", unread: false }
];

/* ---------- KPIs for overview ---------- */
export const funnel = [
  { stage: "Leads", value: 124 },
  { stage: "Qualified", value: 68 },
  { stage: "Inspections", value: 32 },
  { stage: "Closed", value: 19 }
];

export const weeklyEarnings = [180, 240, 210, 320, 280, 410, 360]; // last 7 days (k)
