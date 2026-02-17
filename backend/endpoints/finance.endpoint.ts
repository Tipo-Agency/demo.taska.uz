import { localStoreService } from "../../services/localStoreService";
import { Department, FinanceCategory, FinancePlan, PurchaseRequest, FinancialPlanDocument, FinancialPlanning, Fund } from "../../types";
import { DEFAULT_FINANCE_CATEGORIES, DEFAULT_FUNDS } from "../../constants";

const DEPARTMENTS_COLLECTION = 'departments';
const FINANCE_CATEGORIES_COLLECTION = 'financeCategories';
const FUNDS_COLLECTION = 'funds';
const FINANCE_PLAN_COLLECTION = 'financePlan';
const PURCHASE_REQUESTS_COLLECTION = 'purchaseRequests';
const FINANCIAL_PLAN_DOCUMENTS_COLLECTION = 'financialPlanDocuments';
const FINANCIAL_PLANNINGS_COLLECTION = 'financialPlannings';

export const departmentsEndpoint = {
    getAll: async (): Promise<Department[]> => {
        return await localStoreService.getAll(DEPARTMENTS_COLLECTION) as Department[];
    },
    updateAll: async (departments: Department[]) => {
        await Promise.all(departments.map(dept => localStoreService.save(DEPARTMENTS_COLLECTION, dept)));
    },
};

export const financeEndpoint = {
    getCategories: async (): Promise<FinanceCategory[]> => {
        const items = await localStoreService.getAll(FINANCE_CATEGORIES_COLLECTION);
        return items.length > 0 ? (items as FinanceCategory[]) : DEFAULT_FINANCE_CATEGORIES;
    },
    updateCategories: async (categories: FinanceCategory[]) => {
        await Promise.all(categories.map(cat => localStoreService.save(FINANCE_CATEGORIES_COLLECTION, cat)));
    },

    getFunds: async (): Promise<Fund[]> => {
        const items = await localStoreService.getAll(FUNDS_COLLECTION);
        const list = items.length > 0 ? (items as Fund[]) : DEFAULT_FUNDS;
        return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },
    updateFunds: async (funds: Fund[]) => {
        await Promise.all(funds.map(f => localStoreService.save(FUNDS_COLLECTION, f)));
    },
    
    getPlan: async (): Promise<FinancePlan | null> => {
        const items = await localStoreService.getAll(FINANCE_PLAN_COLLECTION);
        return items.length > 0 ? (items[0] as FinancePlan) : null;
    },
    updatePlan: async (plan: FinancePlan) => {
        const existing = await localStoreService.getAll(FINANCE_PLAN_COLLECTION);
        if (existing.length > 0) {
            await localStoreService.save(FINANCE_PLAN_COLLECTION, { ...plan, id: existing[0].id });
        } else {
            await localStoreService.save(FINANCE_PLAN_COLLECTION, { ...plan, id: 'default' });
        }
    },
    
    getRequests: async (): Promise<PurchaseRequest[]> => {
        return await localStoreService.getAll(PURCHASE_REQUESTS_COLLECTION) as PurchaseRequest[];
    },
    updateRequests: async (requests: PurchaseRequest[]) => {
        await Promise.all(requests.map(req => localStoreService.save(PURCHASE_REQUESTS_COLLECTION, req)));
    },
    
    getFinancialPlanDocuments: async (): Promise<FinancialPlanDocument[]> => {
        return await localStoreService.getAll(FINANCIAL_PLAN_DOCUMENTS_COLLECTION) as FinancialPlanDocument[];
    },
    updateFinancialPlanDocuments: async (docs: FinancialPlanDocument[]) => {
        await Promise.all(docs.map(doc => localStoreService.save(FINANCIAL_PLAN_DOCUMENTS_COLLECTION, doc)));
    },
    
    getFinancialPlannings: async (): Promise<FinancialPlanning[]> => {
        return await localStoreService.getAll(FINANCIAL_PLANNINGS_COLLECTION) as FinancialPlanning[];
    },
    updateFinancialPlannings: async (plannings: FinancialPlanning[]) => {
        await Promise.all(plannings.map(plan => localStoreService.save(FINANCIAL_PLANNINGS_COLLECTION, plan)));
    },
};
