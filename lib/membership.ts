export type MembershipTier = {
  name: string;
  price: string;
  unit?: string;
  desc: string;
  features: string[];
  featured?: boolean;
  flag?: string;
};

export const TIERS: MembershipTier[] = [
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

export function membershipBadgeClass(tier: string) {
  const key = tier.trim().toLowerCase();
  if (key.includes("vip") || key.includes("platinum")) return "tier-platinum";
  if (key.includes("gold")) return "tier-gold";
  if (key.includes("silver")) return "tier-silver";
  if (key.includes("bronze")) return "tier-bronze";
  if (key.includes("associate")) return "tier-associate";
  return "tier-default";
}
