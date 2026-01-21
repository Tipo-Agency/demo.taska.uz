import { firestoreService } from "../../services/firestoreService";
import { Task, Project } from "../../types";
import { getTodayLocalDate } from "../../utils/dateUtils";

const TASKS_COLLECTION = 'tasks';
const PROJECTS_COLLECTION = 'projects';

// Нормализация задачи - убеждаемся, что у задач есть обязательные даты
const normalizeTask = (task: any): Task => {
    const isTask = (task.entityType || 'task') !== 'idea';
    const createdAtDate = task.createdAt ? new Date(task.createdAt).toISOString().split('T')[0] : getTodayLocalDate();
    
    // Для задач (не идей) даты обязательны - если их нет, используем дату создания
    if (isTask) {
        return {
            ...task,
            startDate: task.startDate || createdAtDate,
            endDate: task.endDate || createdAtDate,
        } as Task;
    }
    
    return task as Task;
};

export const tasksEndpoint = {
    getAll: async (): Promise<Task[]> => {
        const items = await firestoreService.getAll(TASKS_COLLECTION);
        // Нормализуем задачи - убеждаемся, что у всех задач есть даты
        const normalizedTasks = items.map(normalizeTask);
        // Не фильтруем архивные задачи - фильтрация происходит на уровне компонентов
        return normalizedTasks as Task[];
    },
    
    updateAll: async (tasks: Task[]): Promise<void> => {
        // Сохраняем все задачи (включая архивные) в Firebase
        await Promise.all(tasks.map(task => firestoreService.save(TASKS_COLLECTION, task)));
    },
};

export const projectsEndpoint = {
    getAll: async (): Promise<Project[]> => {
        const items = await firestoreService.getAll(PROJECTS_COLLECTION);
        // Не фильтруем архивные проекты - фильтрация происходит на уровне компонентов
        return items as Project[];
    },
    
    updateAll: async (projects: Project[]): Promise<void> => {
        // Сохраняем все проекты, включая архивные (soft delete)
        await Promise.all(projects.map(project => firestoreService.save(PROJECTS_COLLECTION, project)));
        // Удаление физически должно происходить только при "permanentDelete"
    },
};
