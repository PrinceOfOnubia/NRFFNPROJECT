import type {
  CheckoutSelection,
  CommissionRecord,
  Installment,
  PaymentMethod,
  PaymentStatus,
  PurchaseRecord,
  RealtorLead,
  TeamMember
} from "./platform-types";
import { seedCommissions, seedLeads, seedTeam } from "./mock-data/realtor";

const PURCHASES_KEY = "nrffn-demo-purchases-v1";
const LEADS_KEY = "nrffn-demo-leads-v1";
const COMMISSIONS_KEY = "nrffn-demo-commissions-v1";
const TEAM_KEY = "nrffn-demo-team-v1";

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function createInstallments(selection: CheckoutSelection, createdAt: Date): Installment[] {
  if (selection.durationMonths <= 1 || selection.monthlyAmount <= 0) return [];

  const remaining = Math.max(selection.totalAmount - selection.amountDueNow, 0);
  const count = Math.max(selection.durationMonths - 1, 0);

  return Array.from({ length: count }, (_, index) => {
    const isLast = index === count - 1;
    const regularAmount = selection.monthlyAmount;
    const amount = isLast
      ? Math.max(remaining - regularAmount * Math.max(count - 1, 0), 0)
      : regularAmount;

    return {
      id: `INS-${createdAt.getTime()}-${index + 1}`,
      number: index + 2,
      dueDate: addMonths(createdAt, index + 1).toISOString(),
      amount,
      status: "Upcoming"
    };
  });
}

export function loadPurchases(): PurchaseRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(PURCHASES_KEY);
    return value ? (JSON.parse(value) as PurchaseRecord[]) : [];
  } catch {
    return [];
  }
}

export function savePurchases(purchases: PurchaseRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PURCHASES_KEY, JSON.stringify(purchases));
}

export function createPurchase(
  selection: CheckoutSelection,
  paymentMethod: PaymentMethod,
  paymentStatus: PaymentStatus
): PurchaseRecord {
  const createdAt = new Date();
  const reference = `NRF-${createdAt.getFullYear()}-${String(createdAt.getTime()).slice(-8)}`;
  const amountPaid = paymentStatus === "Successful" ? selection.amountDueNow : 0;

  return {
    ...selection,
    id: `purchase-${createdAt.getTime()}`,
    reference,
    paymentMethod,
    paymentStatus,
    createdAt: createdAt.toISOString(),
    amountPaid,
    balance: Math.max(selection.totalAmount - amountPaid, 0),
    installments:
      paymentStatus === "Successful" ? createInstallments(selection, createdAt) : []
  };
}

function loadOrSeed<T>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;
  try {
    const value = window.localStorage.getItem(key);
    if (value) return JSON.parse(value) as T[];
    window.localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  } catch {
    return seed;
  }
}

export function loadRealtorLeads() {
  return loadOrSeed(LEADS_KEY, seedLeads);
}

export function saveRealtorLeads(leads: RealtorLead[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function loadCommissions() {
  return loadOrSeed(COMMISSIONS_KEY, seedCommissions);
}

export function loadTeamMembers() {
  return loadOrSeed(TEAM_KEY, seedTeam);
}
