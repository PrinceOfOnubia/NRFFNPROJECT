/* ============================================================
   NRFFN Admin / Super-Admin portal — domain data (mock)
   ============================================================ */

export const naira = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export const platformStats = {
  members: 12480,
  activeMembers: 9120,
  properties: 86,
  revenue: 842_500_000,
  payouts: 318_400_000,
  pendingPayouts: 24_600_000,
  newThisMonth: 612
};

export const revenueTrend = [42, 55, 61, 58, 72, 81, 95, 88, 102, 118, 124, 136]; // ₦M per month

export const membershipTiers = [
  { tier: "Associate", price: 0, members: 6840, color: "cold" },
  { tier: "Bronze", price: 20_000, members: 2960, color: "warn" },
  { tier: "Silver", price: 100_000, members: 1480, color: "blue" },
  { tier: "Gold", price: 250_000, members: 820, color: "ok" },
  { tier: "Platinum", price: 1_500_000, members: 290, color: "blue" },
  { tier: "VIP", price: 3_000_000, members: 90, color: "ok" }
];

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Investor" | "Realtor" | "Admin";
  tier: string;
  status: "Active" | "Pending" | "Suspended";
  joined: string;
  volume: number;
};

export const users: User[] = [
  { id: "u1", name: "Adaeze Nwankwo", email: "adaeze@mail.com", role: "Investor", tier: "Gold", status: "Active", joined: "12 Jan 2026", volume: 38_500_000 },
  { id: "u2", name: "John Doe", email: "john@mail.com", role: "Realtor", tier: "Platinum", status: "Active", joined: "03 Mar 2025", volume: 65_400_000 },
  { id: "u3", name: "Mariam Bello", email: "mariam@mail.com", role: "Realtor", tier: "Silver", status: "Active", joined: "21 Apr 2025", volume: 14_200_000 },
  { id: "u4", name: "Chidi Okeke", email: "chidi@mail.com", role: "Investor", tier: "Bronze", status: "Pending", joined: "18 Jun 2026", volume: 0 },
  { id: "u5", name: "Tunde Adeyemi", email: "tunde@mail.com", role: "Investor", tier: "VIP", status: "Active", joined: "09 Feb 2026", volume: 142_000_000 },
  { id: "u6", name: "Grace Udo", email: "grace@mail.com", role: "Realtor", tier: "Gold", status: "Suspended", joined: "30 May 2025", volume: 6_100_000 }
];

export type AdminProperty = {
  id: string;
  name: string;
  location: string;
  model: string;
  price: number;
  units: number;
  sold: number;
  status: "Active" | "Draft" | "Sold out";
};

export const properties: AdminProperty[] = [
  { id: "p1", name: "Emerald Heights Residence", location: "Lekki Phase 1", model: "Full Ownership", price: 95_000_000, units: 24, sold: 19, status: "Active" },
  { id: "p2", name: "The Sterling Apartments", location: "Maitama, Abuja", model: "Co-Ownership", price: 12_500_000, units: 120, sold: 88, status: "Active" },
  { id: "p3", name: "Greenfield Estate Plots", location: "Epe Corridor", model: "Land Banking", price: 4_800_000, units: 200, sold: 200, status: "Sold out" },
  { id: "p4", name: "Cedar Court Villas", location: "Ikoyi, Lagos", model: "Full Ownership", price: 145_000_000, units: 12, sold: 0, status: "Draft" }
];

export type Commission = {
  id: string;
  realtor: string;
  property: string;
  amount: number;
  type: "Direct" | "Level" | "Property" | "Bonus";
  status: "Pending" | "Approved" | "Paid";
  date: string;
};

export const commissions: Commission[] = [
  { id: "c1", realtor: "John Doe", property: "Emerald Heights", amount: 950_000, type: "Property", status: "Pending", date: "18 Jun 2026" },
  { id: "c2", realtor: "Mariam Bello", property: "Sterling Apartments", amount: 320_000, type: "Property", status: "Approved", date: "16 Jun 2026" },
  { id: "c3", realtor: "John Doe", property: "Network override", amount: 45_000, type: "Level", status: "Pending", date: "14 Jun 2026" },
  { id: "c4", realtor: "Femi Alabi", property: "Direct referral", amount: 100_000, type: "Direct", status: "Paid", date: "12 Jun 2026" },
  { id: "c5", realtor: "Grace Udo", property: "Leadership bonus", amount: 500_000, type: "Bonus", status: "Approved", date: "10 Jun 2026" }
];

export const auditLogs = [
  { actor: "superadmin@nrffn.ng", action: "Updated commission rate", target: "Level 2 → 5%", at: "Today 09:42", level: "config" },
  { actor: "admin@nrffn.ng", action: "Approved payout", target: "₦950,000 → John Doe", at: "Today 08:15", level: "money" },
  { actor: "admin@nrffn.ng", action: "Suspended user", target: "Grace Udo", at: "Yesterday 17:30", level: "security" },
  { actor: "superadmin@nrffn.ng", action: "Published property", target: "Cedar Court Villas", at: "Yesterday 14:02", level: "content" },
  { actor: "admin@nrffn.ng", action: "Edited membership tier", target: "Gold benefits", at: "20 Jun 11:20", level: "config" }
];

export const roles = [
  { name: "Super Admin", users: 2, perms: "Full platform control", color: "ok" },
  { name: "Admin", users: 6, perms: "Users, properties, commissions", color: "blue" },
  { name: "Finance", users: 3, perms: "Payouts & revenue only", color: "warn" },
  { name: "Support", users: 9, perms: "Read-only + CRM", color: "cold" }
];

export type KycRequest = {
  id: string;
  name: string;
  email: string;
  type: "BVN" | "Government ID" | "Next of kin" | "Address" | "Full KYC";
  submitted: string;
  status: "Pending" | "Approved" | "Rejected";
  tier: string;
};

export const kycRequests: KycRequest[] = [
  { id: "k1", name: "Chidi Okeke", email: "chidi@mail.com", type: "Government ID", submitted: "20 Jun 2026", status: "Pending", tier: "Bronze" },
  { id: "k2", name: "Aisha Bello", email: "aisha@mail.com", type: "BVN", submitted: "19 Jun 2026", status: "Pending", tier: "Silver" },
  { id: "k3", name: "Tunde Cole", email: "tunde@mail.com", type: "Full KYC", submitted: "18 Jun 2026", status: "Pending", tier: "Associate" },
  { id: "k4", name: "Grace Udo", email: "grace@mail.com", type: "Next of kin", submitted: "16 Jun 2026", status: "Approved", tier: "Gold" },
  { id: "k5", name: "Adaeze Nwankwo", email: "adaeze@mail.com", type: "Government ID", submitted: "12 Jan 2026", status: "Approved", tier: "Gold" },
  { id: "k6", name: "Femi Alabi", email: "femi@mail.com", type: "Address", submitted: "10 Jun 2026", status: "Rejected", tier: "Bronze" }
];

export type ManualInvestment = {
  id: string;
  user: string;
  property: string;
  units: number;
  amount: number;
  date: string;
  by: string;
};

export const manualInvestments: ManualInvestment[] = [
  { id: "mi1", user: "Tunde Adeyemi", property: "Cedar Court Villas", units: 1, amount: 145_000_000, date: "17 Jun 2026", by: "admin@nrffn.ng" },
  { id: "mi2", user: "Mariam Bello", property: "The Sterling Apartments", units: 4, amount: 50_000_000, date: "11 Jun 2026", by: "admin@nrffn.ng" }
];

export const systemHealth = [
  { name: "API", status: "Operational", uptime: "99.98%", ok: true },
  { name: "Database", status: "Operational", uptime: "99.99%", ok: true },
  { name: "Payments", status: "Operational", uptime: "99.95%", ok: true },
  { name: "Email / SMS", status: "Degraded", uptime: "98.20%", ok: false }
];
