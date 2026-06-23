import {
  createPurchase,
  loadCommissions,
  loadPurchases,
  loadRealtorLeads,
  loadTeamMembers,
  savePurchases,
  saveRealtorLeads
} from "./platform-storage";
import type {
  CheckoutSelection,
  PaymentMethod,
  PaymentStatus,
  PurchaseRecord,
  RealtorLead
} from "./platform-types";
import { propertyListings } from "./mock-data/properties";

const delay = (milliseconds = 80) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export const mockApi = {
  properties: {
    async list() {
      await delay();
      return propertyListings;
    }
  },
  purchases: {
    async list() {
      await delay();
      return loadPurchases();
    },
    async create(selection: CheckoutSelection, method: PaymentMethod, status: PaymentStatus) {
      await delay(250);
      const purchase = createPurchase(selection, method, status);
      if (status !== "Failed") savePurchases([purchase, ...loadPurchases()]);
      return purchase;
    },
    async save(records: PurchaseRecord[]) {
      await delay();
      savePurchases(records);
      return records;
    }
  },
  realtor: {
    async leads() {
      await delay();
      return loadRealtorLeads();
    },
    async saveLeads(leads: RealtorLead[]) {
      await delay();
      saveRealtorLeads(leads);
      return leads;
    },
    async commissions() {
      await delay();
      return loadCommissions();
    },
    async team() {
      await delay();
      return loadTeamMembers();
    }
  }
};

