import { localStoreService } from "../../services/localStoreService";
import { Warehouse, InventoryItem, StockMovement, InventoryRevision } from "../../types";

const WAREHOUSES_COLLECTION = 'warehouses';
const INVENTORY_ITEMS_COLLECTION = 'inventoryItems';
const STOCK_MOVEMENTS_COLLECTION = 'stockMovements';
const INVENTORY_REVISIONS_COLLECTION = 'inventoryRevisions';

export const inventoryEndpoint = {
    getWarehouses: async (): Promise<Warehouse[]> => {
        return await localStoreService.getAll(WAREHOUSES_COLLECTION) as Warehouse[];
    },
    updateWarehouses: async (warehouses: Warehouse[]) => {
        await Promise.all(warehouses.map(wh => localStoreService.save(WAREHOUSES_COLLECTION, wh)));
    },

    getItems: async (): Promise<InventoryItem[]> => {
        return await localStoreService.getAll(INVENTORY_ITEMS_COLLECTION) as InventoryItem[];
    },
    updateItems: async (items: InventoryItem[]) => {
        await Promise.all(items.map(item => localStoreService.save(INVENTORY_ITEMS_COLLECTION, item)));
    },

    getMovements: async (): Promise<StockMovement[]> => {
        return await localStoreService.getAll(STOCK_MOVEMENTS_COLLECTION) as StockMovement[];
    },
    updateMovements: async (movements: StockMovement[]) => {
        await Promise.all(movements.map(mov => localStoreService.save(STOCK_MOVEMENTS_COLLECTION, mov)));
    },

    getRevisions: async (): Promise<InventoryRevision[]> => {
        return await localStoreService.getAll(INVENTORY_REVISIONS_COLLECTION) as InventoryRevision[];
    },
    updateRevisions: async (revisions: InventoryRevision[]) => {
        await Promise.all(revisions.map(r => localStoreService.save(INVENTORY_REVISIONS_COLLECTION, r)));
    },
};
