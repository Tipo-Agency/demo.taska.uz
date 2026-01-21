"""
Клиент для работы с Firebase Firestore
"""
import firebase_admin
from firebase_admin import credentials, firestore
from typing import List, Dict, Any, Optional
import config

# Инициализация Firebase Admin SDK
if not firebase_admin._apps:
    if config.FIREBASE_CREDENTIALS_PATH and os.path.exists(config.FIREBASE_CREDENTIALS_PATH):
        cred = credentials.Certificate(config.FIREBASE_CREDENTIALS_PATH)
        firebase_admin.initialize_app(cred)
    else:
        # Используем Application Default Credentials (для Cloud Functions или локальной разработки)
        firebase_admin.initialize_app()

db = firestore.client()

class FirebaseClient:
    """Клиент для работы с Firebase Firestore"""
    
    @staticmethod
    def get_all(collection_name: str) -> List[Dict[str, Any]]:
        """Получить все документы из коллекции"""
        try:
            collection_ref = db.collection(collection_name)
            docs = collection_ref.stream()
            items = []
            for doc in docs:
                item = doc.to_dict()
                item['id'] = doc.id
                items.append(item)
            return items
        except Exception as e:
            print(f"Error getting all from {collection_name}: {e}")
            return []
    
    @staticmethod
    def get_by_id(collection_name: str, doc_id: str) -> Optional[Dict[str, Any]]:
        """Получить документ по ID"""
        try:
            doc_ref = db.collection(collection_name).document(doc_id)
            doc = doc_ref.get()
            if doc.exists:
                item = doc.to_dict()
                item['id'] = doc.id
                return item
            return None
        except Exception as e:
            print(f"Error getting {doc_id} from {collection_name}: {e}")
            return None
    
    @staticmethod
    def save(collection_name: str, item: Dict[str, Any]) -> bool:
        """Сохранить документ (создать или обновить)"""
        try:
            doc_id = item.get('id')
            if not doc_id:
                # Создаем новый документ
                doc_ref = db.collection(collection_name).document()
                doc_id = doc_ref.id
                item['id'] = doc_id
            
            # Удаляем id из данных перед сохранением (Firestore использует doc.id)
            data = {k: v for k, v in item.items() if k != 'id'}
            db.collection(collection_name).document(doc_id).set(data, merge=True)
            return True
        except Exception as e:
            print(f"Error saving to {collection_name}: {e}")
            return False
    
    @staticmethod
    def delete(collection_name: str, doc_id: str) -> bool:
        """Удалить документ"""
        try:
            db.collection(collection_name).document(doc_id).delete()
            return True
        except Exception as e:
            print(f"Error deleting {doc_id} from {collection_name}: {e}")
            return False
    
    @staticmethod
    def query(collection_name: str, filters: List[tuple]) -> List[Dict[str, Any]]:
        """Выполнить запрос с фильтрами"""
        try:
            collection_ref = db.collection(collection_name)
            query = collection_ref
            for field, operator, value in filters:
                query = query.where(field, operator, value)
            
            docs = query.stream()
            items = []
            for doc in docs:
                item = doc.to_dict()
                item['id'] = doc.id
                items.append(item)
            return items
        except Exception as e:
            print(f"Error querying {collection_name}: {e}")
            return []

# Создаем экземпляр клиента
firebase = FirebaseClient()
