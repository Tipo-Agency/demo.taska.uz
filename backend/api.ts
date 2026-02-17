
import { storageService } from "../services/storageService";
import { authEndpoint } from "./endpoints/auth.endpoint";
import { tasksEndpoint, projectsEndpoint } from "./endpoints/tasks.endpoint";
import { clientsEndpoint, contractsEndpoint, employeesEndpoint, dealsEndpoint, oneTimeDealsEndpoint, accountsReceivableEndpoint } from "./endpoints/crm.endpoint";
import { docsEndpoint, foldersEndpoint, meetingsEndpoint, contentPostsEndpoint } from "./endpoints/content.endpoint";
import { tablesEndpoint, activityEndpoint, statusesEndpoint, prioritiesEndpoint, notificationPrefsEndpoint, automationEndpoint, notificationQueueEndpoint } from "./endpoints/settings.endpoint";
import { departmentsEndpoint, financeEndpoint } from "./endpoints/finance.endpoint";
import { bpmEndpoint } from "./endpoints/bpm.endpoint";
import { inventoryEndpoint } from "./endpoints/inventory.endpoint";
import { funnelsEndpoint } from "./endpoints/funnels.endpoint";
import { partnerLogosEndpoint, newsEndpoint, casesEndpoint, tagsEndpoint, publicSitesEndpoint } from "./endpoints/sites.endpoint";

// The Unified "Backend" Interface — данные в localStorage (localStoreService)
export const api = {
  users: authEndpoint,
  
  tasks: tasksEndpoint,
  projects: projectsEndpoint,
  
  tables: tablesEndpoint,
  activity: activityEndpoint,
  statuses: statusesEndpoint,
  priorities: prioritiesEndpoint,
  notificationPrefs: notificationPrefsEndpoint,
  automation: automationEndpoint,
  notificationQueue: notificationQueueEndpoint,
  
  clients: clientsEndpoint,
  contracts: contractsEndpoint,
  oneTimeDeals: oneTimeDealsEndpoint,
  accountsReceivable: accountsReceivableEndpoint,
  employees: employeesEndpoint,
  deals: dealsEndpoint,
  
  docs: docsEndpoint,
  folders: foldersEndpoint,
  meetings: meetingsEndpoint,
  contentPosts: contentPostsEndpoint,

  departments: departmentsEndpoint,
  finance: financeEndpoint,
  bpm: bpmEndpoint,
  inventory: inventoryEndpoint,
  funnels: funnelsEndpoint,
  
  // Sites content management
  partnerLogos: partnerLogosEndpoint,
  news: newsEndpoint,
  cases: casesEndpoint,
  tags: tagsEndpoint,
  publicSites: publicSitesEndpoint,
};
