"""
Модуль работы с задачами
"""
from typing import List, Dict, Any, Optional
from datetime import datetime
from firebase_client import firebase
from utils import get_today_date, is_overdue

def get_user_tasks(user_id: str, include_archived: bool = False) -> List[Dict[str, Any]]:
    """Получить задачи пользователя"""
    try:
        all_tasks = firebase.get_all('tasks')
        user_tasks = []
        
        for task in all_tasks:
            # Пропускаем архивные задачи
            if task.get('isArchived') and not include_archived:
                continue
            
            # Проверяем, назначена ли задача на пользователя
            assignee_id = task.get('assigneeId')
            assignee_ids = task.get('assigneeIds', [])
            
            # Проверяем по assigneeId (может быть строкой или None)
            if assignee_id and str(assignee_id) == str(user_id):
                user_tasks.append(task)
            # Проверяем по assigneeIds (массив)
            elif isinstance(assignee_ids, list) and user_id in [str(uid) for uid in assignee_ids if uid]:
                user_tasks.append(task)
        
        return user_tasks
    except Exception as e:
        print(f"Error getting user tasks: {e}")
        import traceback
        traceback.print_exc()
        return []

def get_today_tasks(user_id: str) -> List[Dict[str, Any]]:
    """Получить задачи на сегодня"""
    try:
        today = get_today_date()
        print(f"[TASKS] Getting today tasks for user_id: {user_id}, today: {today}")
        
        user_tasks = get_user_tasks(user_id)
        print(f"[TASKS] Found {len(user_tasks)} user tasks total")
        
        today_tasks = []
        for task in user_tasks:
            end_date = task.get('endDate', '')
            # Нормализуем дату - убираем время если есть
            if end_date:
                # Если дата содержит время, берем только дату
                if 'T' in end_date:
                    end_date = end_date.split('T')[0]
                elif ' ' in end_date:
                    end_date = end_date.split(' ')[0]
            
            print(f"[TASKS] Task {task.get('id')}: endDate={end_date}, today={today}, match={end_date == today}")
            
            # Сравниваем даты (может быть в формате YYYY-MM-DD или другой)
            if end_date and (end_date == today or end_date.startswith(today)):
                # Исключаем выполненные задачи
                status = task.get('status', '').lower()
                if status not in ['выполнено', 'done', 'завершено', 'completed']:
                    today_tasks.append(task)
                    print(f"[TASKS] Added task {task.get('id')} to today tasks")
        
        print(f"[TASKS] Returning {len(today_tasks)} today tasks")
        return today_tasks
    except Exception as e:
        print(f"Error getting today tasks: {e}")
        import traceback
        traceback.print_exc()
        return []

def get_overdue_tasks(user_id: str) -> List[Dict[str, Any]]:
    """Получить просроченные задачи"""
    try:
        print(f"[TASKS] Getting overdue tasks for user_id: {user_id}")
        user_tasks = get_user_tasks(user_id)
        print(f"[TASKS] Found {len(user_tasks)} user tasks total")
        
        overdue_tasks = []
        for task in user_tasks:
            end_date = task.get('endDate', '')
            if end_date:
                # Нормализуем дату - убираем время если есть
                if 'T' in end_date:
                    end_date_normalized = end_date.split('T')[0]
                elif ' ' in end_date:
                    end_date_normalized = end_date.split(' ')[0]
                else:
                    end_date_normalized = end_date
                
                is_overdue_task = is_overdue(end_date_normalized)
                print(f"[TASKS] Task {task.get('id')}: endDate={end_date}, is_overdue={is_overdue_task}")
                
                if is_overdue_task:
                    # Исключаем выполненные задачи
                    status = task.get('status', '').lower()
                    if status not in ['выполнено', 'done', 'завершено', 'completed']:
                        overdue_tasks.append(task)
                        print(f"[TASKS] Added task {task.get('id')} to overdue tasks")
        
        print(f"[TASKS] Returning {len(overdue_tasks)} overdue tasks")
        return overdue_tasks
    except Exception as e:
        print(f"Error getting overdue tasks: {e}")
        import traceback
        traceback.print_exc()
        return []

def get_yesterday_tasks() -> List[Dict[str, Any]]:
    """Получить задачи на вчера (не выполненные)"""
    try:
        from utils import get_today_date
        from datetime import datetime, timedelta
        import pytz
        
        tz = pytz.timezone('Asia/Tashkent')
        today = datetime.now(tz).date()
        yesterday = today - timedelta(days=1)
        yesterday_str = yesterday.isoformat()
        
        all_tasks = firebase.get_all('tasks')
        yesterday_tasks = []
        
        for task in all_tasks:
            if task.get('isArchived'):
                continue
            
            # Исключаем выполненные задачи
            status = task.get('status', '')
            if status in ['Выполнено', 'Done', 'Завершено']:
                continue
            
            end_date = task.get('endDate', '')
            if end_date == yesterday_str:
                yesterday_tasks.append(task)
        
        return yesterday_tasks
    except Exception as e:
        print(f"Error getting yesterday tasks: {e}")
        return []

def get_all_today_tasks() -> List[Dict[str, Any]]:
    """Получить все задачи на сегодня (не только для конкретного пользователя)"""
    try:
        from utils import get_today_date
        
        today = get_today_date()
        all_tasks = firebase.get_all('tasks')
        
        today_tasks = []
        for task in all_tasks:
            if task.get('isArchived'):
                continue
            
            # Исключаем выполненные задачи
            status = task.get('status', '')
            if status in ['Выполнено', 'Done', 'Завершено']:
                continue
            
            if task.get('endDate') == today:
                today_tasks.append(task)
        
        return today_tasks
    except Exception as e:
        print(f"Error getting all today tasks: {e}")
        return []

def get_all_overdue_tasks() -> List[Dict[str, Any]]:
    """Получить все просроченные задачи (не только для конкретного пользователя)"""
    try:
        all_tasks = firebase.get_all('tasks')
        
        overdue_tasks = []
        for task in all_tasks:
            if task.get('isArchived'):
                continue
            
            # Исключаем выполненные задачи
            status = task.get('status', '')
            if status in ['Выполнено', 'Done', 'Завершено']:
                continue
            
            if is_overdue(task.get('endDate', '')):
                overdue_tasks.append(task)
        
        return overdue_tasks
    except Exception as e:
        print(f"Error getting all overdue tasks: {e}")
        return []

def get_task_by_id(task_id: str) -> Optional[Dict[str, Any]]:
    """Получить задачу по ID"""
    return firebase.get_by_id('tasks', task_id)

def update_task_status(task_id: str, new_status: str) -> bool:
    """Обновить статус задачи"""
    try:
        task = firebase.get_by_id('tasks', task_id)
        if not task:
            return False
        
        task['status'] = new_status
        task['updatedAt'] = datetime.now().isoformat()
        firebase.save('tasks', task)
        return True
    except Exception as e:
        print(f"Error updating task status: {e}")
        return False

def create_task(task_data: Dict[str, Any]) -> Optional[str]:
    """Создать новую задачу"""
    try:
        now = datetime.now().isoformat()
        task_data['createdAt'] = task_data.get('createdAt', now)
        task_data['updatedAt'] = now
        task_data['isArchived'] = False
        
        # Генерируем ID если нет
        if not task_data.get('id'):
            task_data['id'] = f"task-{int(datetime.now().timestamp() * 1000)}"
        
        firebase.save('tasks', task_data)
        return task_data['id']
    except Exception as e:
        print(f"Error creating task: {e}")
        return None

def get_statuses() -> List[Dict[str, Any]]:
    """Получить список статусов"""
    try:
        return firebase.get_all('statuses')
    except Exception as e:
        print(f"Error getting statuses: {e}")
        return []
