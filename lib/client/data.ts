/* ============================================================
   NRFFN Client / Investor portal — domain data (mock)
   ============================================================ */

export const naira = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export const investor = {
  name: "Adaeze Nwankwo",
  initials: "AN",
  joined: "Jan 2026",
  tier: "Gold Investor"
};

export const portfolio = {
  invested: 38_500_000,
  currentValue: 46_820_000,
  get gain() {
    return this.currentValue - this.invested;
  },
  get roi() {
    return Math.round((this.gain / this.invested) * 100);
  },
  monthlyIncome: 410_000
};

export const wallet = {
  available: 1_850_000,
  pending: 620_000,
  invested: portfolio.invested
};

export type Holding = {
  id: string;
  name: string;
  location: string;
  model: "Full Ownership" | "Co-Ownership" | "Land Banking" | "Flex";
  invested: number;
  value: number;
  img: string;
  progress: number; // payment progress %
};

export const holdings: Holding[] = [
  { id: "h1", name: "Emerald Heights — Unit 14B", location: "Lekki Phase 1, Lagos", model: "Full Ownership", invested: 28_000_000, value: 34_200_000, img: "/img/prop-1.jpg", progress: 100 },
  { id: "h2", name: "Sterling Apartments — 6 shares", location: "Maitama, Abuja", model: "Co-Ownership", invested: 7_500_000, value: 9_120_000, img: "/img/prop-2.jpg", progress: 100 },
  { id: "h3", name: "Greenfield Plots — 2 plots", location: "Epe Corridor, Lagos", model: "Land Banking", invested: 3_000_000, value: 3_500_000, img: "/img/land.jpg", progress: 64 }
];

export type Listing = {
  id: string;
  name: string;
  location: string;
  model: "Full Ownership" | "Co-Ownership" | "Land Banking" | "Flex";
  price: number;
  roi: string;
  img: string;
  badge?: string;
  status: "Active" | "Few left" | "Sold out";
};

export const marketplace: Listing[] = [
  { id: "p1", name: "Emerald Heights Residence", location: "Lekki Phase 1, Lagos", model: "Full Ownership", price: 95_000_000, roi: "18% p.a.", img: "/img/prop-1.jpg", badge: "Premium", status: "Few left" },
  { id: "p2", name: "The Sterling Apartments", location: "Maitama, Abuja", model: "Co-Ownership", price: 12_500_000, roi: "Rental income", img: "/img/prop-2.jpg", status: "Active" },
  { id: "p3", name: "Greenfield Estate Plots", location: "Epe Corridor, Lagos", model: "Land Banking", price: 4_800_000, roi: "Capital growth", img: "/img/land.jpg", badge: "Hot", status: "Active" },
  { id: "p4", name: "Cedar Court Villas", location: "Ikoyi, Lagos", model: "Full Ownership", price: 145_000_000, roi: "16% p.a.", img: "/img/prop-3.jpg", badge: "New", status: "Active" },
  { id: "p5", name: "Palm Grove Flex Homes", location: "Ajah, Lagos", model: "Flex", price: 6_200_000, roi: "Flexible", img: "/img/estate-5.jpg", status: "Active" },
  { id: "p6", name: "Harbour View Apartments", location: "Victoria Island, Lagos", model: "Co-Ownership", price: 18_900_000, roi: "Rental income", img: "/img/estate-6.jpg", status: "Few left" }
];

export type Tx = {
  id: string;
  date: string;
  type: "Investment" | "Income" | "Deposit" | "Withdrawal";
  description: string;
  amount: number;
};

export const transactions: Tx[] = [
  { id: "t1", date: "18 Jun 2026", type: "Income", description: "Sterling Apartments — rental payout", amount: 95_000 },
  { id: "t2", date: "12 Jun 2026", type: "Investment", description: "Greenfield Plots — installment 7/12", amount: -250_000 },
  { id: "t3", date: "05 Jun 2026", type: "Income", description: "Emerald Heights — quarterly return", amount: 315_000 },
  { id: "t4", date: "01 Jun 2026", type: "Deposit", description: "Wallet top-up — GTBank", amount: 1_000_000 },
  { id: "t5", date: "24 May 2026", type: "Withdrawal", description: "Payout to Access Bank ••0934", amount: -400_000 }
];

export type Installment = { n: number; due: string; amount: number; paid: boolean };
export const installments: Installment[] = [
  { n: 5, due: "Paid · 12 Apr", amount: 250_000, paid: true },
  { n: 6, due: "Paid · 12 May", amount: 250_000, paid: true },
  { n: 7, due: "Paid · 12 Jun", amount: 250_000, paid: true },
  { n: 8, due: "Due 12 Jul", amount: 250_000, paid: false },
  { n: 9, due: "Due 12 Aug", amount: 250_000, paid: false }
];

export type Doc = { id: string; name: string; type: string; date: string; property: string };
export const documents: Doc[] = [
  { id: "d1", name: "Allocation Letter — Emerald 14B", type: "Allocation", date: "20 Mar 2026", property: "Emerald Heights" },
  { id: "d2", name: "Payment Receipt — ₦28,000,000", type: "Receipt", date: "20 Mar 2026", property: "Emerald Heights" },
  { id: "d3", name: "Co-Ownership Agreement", type: "Contract", date: "08 Feb 2026", property: "Sterling Apartments" },
  { id: "d4", name: "Certificate of Ownership", type: "Certificate", date: "22 Mar 2026", property: "Emerald Heights" },
  { id: "d5", name: "Survey Plan — Greenfield", type: "Survey", date: "15 Jan 2026", property: "Greenfield Plots" }
];

export const valueTrend = [32, 35, 34, 38, 41, 44, 47]; // portfolio value over months (₦M)

export const referral = {
  code: "ada_invests",
  link: "https://nrffn.ng/signup?ref=ada_invests",
  invited: 6,
  earned: 320_000
};
