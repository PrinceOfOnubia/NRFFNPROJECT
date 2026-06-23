export type OwnershipKind = "Flex" | "Full Ownership";
export type PaymentPlan = "Flex" | "Outright" | "Installment";
export type PaymentMethod = "Card" | "Bank Transfer" | "Wallet";
export type PaymentStatus = "Successful" | "Pending" | "Failed";
export type UserRole = "Client" | "Associate";

export type PropertyListing = {
  id: string;
  name: string;
  location: string;
  type: OwnershipKind | "Land Banking" | "Co-Ownership";
  badge: string;
  status: "Active" | "Sold Out";
  price: string;
  copy: string;
  image: string;
};

export type CheckoutSelection = {
  propertyName: string;
  propertyImage: string;
  location: string;
  kind: OwnershipKind;
  size: number;
  units: number;
  plan: PaymentPlan;
  totalAmount: number;
  amountDueNow: number;
  monthlyAmount: number;
  durationMonths: number;
};

export type Installment = {
  id: string;
  number: number;
  dueDate: string;
  amount: number;
  status: "Paid" | "Upcoming";
};

export type PurchaseRecord = CheckoutSelection & {
  id: string;
  reference: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
  amountPaid: number;
  balance: number;
  installments: Installment[];
};

export type LeadStage =
  | "New Lead"
  | "Contacted"
  | "Qualified"
  | "Interested"
  | "Inspection Scheduled"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";
export type LeadTemperature = "Hot" | "Warm" | "Cold";

export type LeadActivity = {
  id: string;
  type: "Note" | "Call" | "Follow-up" | "Stage change";
  text: string;
  createdAt: string;
};

export type RealtorLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  budget: number;
  stage: LeadStage;
  temperature: LeadTemperature;
  source: string;
  nextFollowUp: string;
  createdAt: string;
  activities: LeadActivity[];
};

export type CommissionRecord = {
  id: string;
  clientName: string;
  property: string;
  saleAmount: number;
  rate: number;
  amount: number;
  status: "Pending" | "Available" | "Paid";
  createdAt: string;
};

export type TeamMember = {
  id: string;
  name: string;
  rank: string;
  joinedAt: string;
  referrals: number;
  salesVolume: number;
  status: "Active" | "Inactive";
  children?: TeamMember[];
};
