import { localStoreService } from "../../services/localStoreService";
import { User, Role } from "../../types";

const COLLECTION_NAME = 'users';

const DEMO_USER: User = {
    id: 'demo-user',
    name: 'Демо',
    role: Role.ADMIN,
    login: 'demo',
    password: '',
};

export const authEndpoint = {
    getAll: async (): Promise<User[]> => {
        let items = await localStoreService.getAll(COLLECTION_NAME) as User[];
        if (items.length === 0) {
            await localStoreService.save(COLLECTION_NAME, DEMO_USER);
            items = [DEMO_USER];
        }
        return items;
    },

    updateAll: async (users: User[]): Promise<void> => {
        const activeUsers = users.filter(u => !u.isArchived);
        await Promise.all(activeUsers.map(user => localStoreService.save(COLLECTION_NAME, user)));
        const allItems = await localStoreService.getAll(COLLECTION_NAME);
        const archivedIds = new Set(users.filter(u => u.isArchived).map(u => u.id));
        await Promise.all(
            allItems
                .filter((item: User) => archivedIds.has(item.id))
                .map((item: User) => localStoreService.delete(COLLECTION_NAME, item.id))
        );
    },
};
