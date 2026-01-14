import { firestoreService } from "../../services/firestoreService";
import { PartnerLogo, News, Case, Tag } from "../../types";

const PARTNER_LOGOS_COLLECTION = 'partnerLogos';
const NEWS_COLLECTION = 'news';
const CASES_COLLECTION = 'cases';
const TAGS_COLLECTION = 'tags';

const filterArchived = <T extends { isArchived?: boolean }>(items: T[]): T[] => {
    return items.filter(item => !item.isArchived);
};

const saveCollection = async (collectionName: string, items: Array<{ id: string; isArchived?: boolean }>) => {
    const activeItems = filterArchived(items);
    await Promise.all(activeItems.map(item => firestoreService.save(collectionName, item)));
    
    const allItems = await firestoreService.getAll(collectionName);
    const archivedIds = new Set(items.filter(item => item.isArchived).map(item => item.id));
    await Promise.all(
        allItems
            .filter(item => archivedIds.has(item.id))
            .map(item => firestoreService.delete(collectionName, item.id))
    );
};

// Partner Logos
export const partnerLogosEndpoint = {
    getAll: async (): Promise<PartnerLogo[]> => {
        const items = await firestoreService.getAll(PARTNER_LOGOS_COLLECTION);
        return filterArchived(items) as PartnerLogo[];
    },
    updateAll: async (logos: PartnerLogo[]) => saveCollection(PARTNER_LOGOS_COLLECTION, logos),
};

// News
export const newsEndpoint = {
    getAll: async (): Promise<News[]> => {
        const items = await firestoreService.getAll(NEWS_COLLECTION);
        return filterArchived(items) as News[];
    },
    updateAll: async (news: News[]) => saveCollection(NEWS_COLLECTION, news),
    // Публичный API для сайта - только опубликованные новости
    getPublished: async (): Promise<News[]> => {
        const items = await firestoreService.getAll(NEWS_COLLECTION);
        return filterArchived(items).filter(item => item.published) as News[];
    },
};

// Cases
export const casesEndpoint = {
    getAll: async (): Promise<Case[]> => {
        const items = await firestoreService.getAll(CASES_COLLECTION);
        return filterArchived(items) as Case[];
    },
    updateAll: async (cases: Case[]) => saveCollection(CASES_COLLECTION, cases),
    // Публичный API для сайта - только опубликованные кейсы
    getPublished: async (): Promise<Case[]> => {
        const items = await firestoreService.getAll(CASES_COLLECTION);
        return filterArchived(items).filter(item => item.published) as Case[];
    },
};

// Tags
export const tagsEndpoint = {
    getAll: async (): Promise<Tag[]> => {
        const items = await firestoreService.getAll(TAGS_COLLECTION);
        return filterArchived(items) as Tag[];
    },
    updateAll: async (tags: Tag[]) => saveCollection(TAGS_COLLECTION, tags),
};

// Публичный API для сайта tipa.uz
export const publicSitesEndpoint = {
    // Получить все данные для сайта
    getSiteData: async (): Promise<{
        partnerLogos: PartnerLogo[];
        news: News[];
        cases: Case[];
        tags: Tag[];
    }> => {
        const [logos, news, cases, tags] = await Promise.all([
            partnerLogosEndpoint.getAll(),
            newsEndpoint.getPublished(),
            casesEndpoint.getPublished(),
            tagsEndpoint.getAll(),
        ]);
        
        return {
            partnerLogos: logos.sort((a, b) => a.order - b.order),
            news: news.sort((a, b) => {
                const dateA = a.publishedAt || a.createdAt;
                const dateB = b.publishedAt || b.createdAt;
                return new Date(dateB).getTime() - new Date(dateA).getTime();
            }),
            cases: cases.sort((a, b) => a.order - b.order),
            tags,
        };
    },
};
