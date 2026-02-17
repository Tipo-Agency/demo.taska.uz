import { localStoreService } from "../../services/localStoreService";
import { OrgPosition, BusinessProcess } from "../../types";

const ORG_POSITIONS_COLLECTION = 'orgPositions';
const BUSINESS_PROCESSES_COLLECTION = 'businessProcesses';

export const bpmEndpoint = {
    getPositions: async (): Promise<OrgPosition[]> => {
        return await localStoreService.getAll(ORG_POSITIONS_COLLECTION) as OrgPosition[];
    },
    updatePositions: async (positions: OrgPosition[]) => {
        await Promise.all(positions.map(pos => localStoreService.save(ORG_POSITIONS_COLLECTION, pos)));
    },
    
    getProcesses: async (): Promise<BusinessProcess[]> => {
        return await localStoreService.getAll(BUSINESS_PROCESSES_COLLECTION) as BusinessProcess[];
    },
    updateProcesses: async (processes: BusinessProcess[]) => {
        await Promise.all(processes.map(proc => localStoreService.save(BUSINESS_PROCESSES_COLLECTION, proc)));
    },
};
