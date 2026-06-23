export type PropertyDetail = {
  slug: string;
  name: string;
  location: string;
  model: string;
  price: string;
  roi: string;
  hero: string;
  gallery: string[];
  description: string;
  features: string[];
  highlights: string[];
  installment: string[];
};

export const propertySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const propertyCatalog: PropertyDetail[] = [
  {
    slug: "emerald-heights-residence",
    name: "Emerald Heights Residence",
    location: "Lekki Phase 1, Lagos",
    model: "Full Ownership",
    price: "₦95,000,000",
    roi: "18% projected annual return",
    hero: "/img/prop-1.jpg",
    gallery: ["/img/prop-1.jpg", "/img/estate-5.jpg", "/img/prop-3.jpg"],
    description: "A premium residential opportunity designed for investors seeking full ownership, strong rental demand and long-term value appreciation in one of Lagos' most established districts.",
    features: ["Serviced estate", "24-hour security", "Dedicated parking", "Reliable utilities", "Digital documentation", "Professional facility management"],
    highlights: ["Prime Lekki address", "Verified title documents", "High rental demand", "Limited available units"],
    installment: ["30% initial deposit", "Balance spread across 12 months", "Digital receipts after every payment"],
  },
  {
    slug: "the-sterling-apartments",
    name: "The Sterling Apartments",
    location: "Maitama, Abuja",
    model: "Co-Ownership",
    price: "₦12,500,000",
    roi: "Quarterly rental income",
    hero: "/img/prop-2.jpg",
    gallery: ["/img/prop-2.jpg", "/img/estate-6.jpg", "/img/about-team.jpg"],
    description: "A managed co-ownership opportunity that gives members access to premium Abuja real estate with professional management and structured rental distributions.",
    features: ["Fractional ownership", "Managed tenancy", "Quarterly reporting", "Secure digital records", "Premium location", "Exit support"],
    highlights: ["Accessible premium entry", "Professionally managed", "Rental income potential", "Transparent share structure"],
    installment: ["25% initial deposit", "Up to 9 monthly payments", "Shares allocated after payment milestones"],
  },
  {
    slug: "greenfield-estate-plots",
    name: "Greenfield Estate Plots",
    location: "Epe Corridor, Lagos",
    model: "Land Banking",
    price: "₦4,800,000",
    roi: "Long-term capital growth",
    hero: "/img/land.jpg",
    gallery: ["/img/land.jpg", "/img/estate-5.jpg", "/img/hero-home.jpg"],
    description: "A strategic land banking opportunity positioned along a fast-developing Lagos growth corridor for investors focused on affordability and long-term appreciation.",
    features: ["Verified survey", "Estate layout", "Perimeter security", "Allocation documentation", "Inspection access", "Flexible plot options"],
    highlights: ["Growth corridor", "Low entry point", "Flexible payment", "Documented allocation"],
    installment: ["20% initial deposit", "Balance spread across 12 months", "Early allocation after 60% payment"],
  },
  {
    slug: "cedar-court-villas",
    name: "Cedar Court Villas",
    location: "Ikoyi, Lagos",
    model: "Full Ownership",
    price: "₦145,000,000",
    roi: "16% projected annual return",
    hero: "/img/prop-3.jpg",
    gallery: ["/img/prop-3.jpg", "/img/prop-1.jpg", "/img/estate-6.jpg"],
    description: "An exclusive collection of modern villas created for buyers seeking private ownership, premium finishing and enduring value in Ikoyi.",
    features: ["Private compound", "Smart-home provision", "Premium finishing", "Resident lounge", "Secure parking", "Facility management"],
    highlights: ["Prestigious address", "Limited inventory", "Strong capital preservation", "Verified documentation"],
    installment: ["40% initial deposit", "Balance across 9 months", "Construction milestone reporting"],
  },
  {
    slug: "palm-grove-flex-homes",
    name: "Palm Grove Flex Homes",
    location: "Ajah, Lagos",
    model: "Flex",
    price: "₦6,200,000",
    roi: "Flexible ownership pathway",
    hero: "/img/estate-5.jpg",
    gallery: ["/img/estate-5.jpg", "/img/prop-3.jpg", "/img/land.jpg"],
    description: "A flexible home ownership pathway for members who want to begin with manageable payments while building toward a complete real estate position.",
    features: ["Flexible entry", "Payment tracking", "Upgrade options", "Secure documentation", "Inspection access", "Member support"],
    highlights: ["Accessible monthly plan", "Clear ownership milestones", "Growing Ajah market", "Member-friendly terms"],
    installment: ["10% initial deposit", "Up to 24 monthly payments", "Ownership milestones shown in your dashboard"],
  },
  {
    slug: "harbour-view-apartments",
    name: "Harbour View Apartments",
    location: "Victoria Island, Lagos",
    model: "Co-Ownership",
    price: "₦18,900,000",
    roi: "Rental income potential",
    hero: "/img/estate-6.jpg",
    gallery: ["/img/estate-6.jpg", "/img/prop-2.jpg", "/img/hero-home.jpg"],
    description: "A professionally managed co-ownership apartment opportunity in Victoria Island, designed for rental yield and convenient digital investor reporting.",
    features: ["Managed property", "Income reporting", "Premium tenant market", "Digital ownership records", "Security", "Maintenance reserve"],
    highlights: ["Victoria Island location", "Income-oriented", "Professional management", "Limited shares"],
    installment: ["30% initial deposit", "Balance across 6 months", "Income begins after full allocation"],
  },
];

export function getProperty(slug: string) {
  return propertyCatalog.find((property) => property.slug === slug);
}
