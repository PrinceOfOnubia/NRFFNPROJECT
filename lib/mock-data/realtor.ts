import type { CommissionRecord, RealtorLead, TeamMember } from "../platform-types";

const now = Date.now();
const daysFromNow = (days: number) => new Date(now + 86400000 * days).toISOString();

export const seedLeads: RealtorLead[] = [
  {
    id: "lead-amara",
    name: "Amara Okafor",
    email: "amara@example.com",
    phone: "+234 803 555 0142",
    property: "Empire Park",
    budget: 3000000,
    stage: "Inspection Scheduled",
    temperature: "Hot",
    source: "WhatsApp",
    nextFollowUp: daysFromNow(1),
    createdAt: daysFromNow(-8),
    activities: [{ id: "activity-amara-1", type: "Call", text: "Confirmed interest in a 300sqm plot and requested a weekend inspection.", createdAt: daysFromNow(-1) }]
  },
  {
    id: "lead-tunde",
    name: "Tunde Balogun",
    email: "tunde@example.com",
    phone: "+234 806 441 7720",
    property: "Heritage Court",
    budget: 8000000,
    stage: "Negotiation",
    temperature: "Hot",
    source: "Referral",
    nextFollowUp: daysFromNow(2),
    createdAt: daysFromNow(-14),
    activities: [{ id: "activity-tunde-1", type: "Note", text: "Client requested the outright-payment brochure and title documents.", createdAt: daysFromNow(-2) }]
  },
  {
    id: "lead-zainab",
    name: "Zainab Musa",
    email: "zainab@example.com",
    phone: "+234 809 220 1355",
    property: "Freedom Gardens",
    budget: 1500000,
    stage: "Qualified",
    temperature: "Warm",
    source: "Instagram",
    nextFollowUp: daysFromNow(4),
    createdAt: daysFromNow(-4),
    activities: []
  },
  {
    id: "lead-chidi",
    name: "Chidi Eze",
    email: "chidi@example.com",
    phone: "+234 701 884 3312",
    property: "Greencity",
    budget: 2500000,
    stage: "New Lead",
    temperature: "Cold",
    source: "Website",
    nextFollowUp: daysFromNow(5),
    createdAt: daysFromNow(-1),
    activities: []
  }
];

export const seedCommissions: CommissionRecord[] = [
  { id: "commission-1", clientName: "Ifeoma Nwosu", property: "Empire Park", saleAmount: 2520000, rate: 5, amount: 126000, status: "Available", createdAt: daysFromNow(-5) },
  { id: "commission-2", clientName: "David Adeyemi", property: "Heritage Court", saleAmount: 6750000, rate: 10, amount: 675000, status: "Pending", createdAt: daysFromNow(-2) },
  { id: "commission-3", clientName: "Mariam Lawal", property: "Freedom Gardens", saleAmount: 1800000, rate: 5, amount: 90000, status: "Paid", createdAt: daysFromNow(-25) }
];

export const seedTeam: TeamMember[] = [
  {
    id: "team-bola",
    name: "Bola Akin",
    rank: "Silver Associate",
    joinedAt: daysFromNow(-90),
    referrals: 8,
    salesVolume: 12500000,
    status: "Active",
    children: [{ id: "team-chioma", name: "Chioma Ude", rank: "Associate", joinedAt: daysFromNow(-31), referrals: 3, salesVolume: 4200000, status: "Active" }]
  },
  { id: "team-kunle", name: "Kunle James", rank: "Associate", joinedAt: daysFromNow(-45), referrals: 4, salesVolume: 6800000, status: "Active" },
  { id: "team-ruth", name: "Ruth Peter", rank: "Associate", joinedAt: daysFromNow(-12), referrals: 0, salesVolume: 0, status: "Inactive" }
];
