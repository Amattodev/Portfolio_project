import {auth} from '../../src/firebase/firebase';
import {Headers,  ErrorResponse} from './types';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

//APIリクエストを送るためのヘッダーを作成
async function getAuthHeaders(): Promise<Headers> {
    try {
        const token = await auth.currentUser?.getIdToken(true); 
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        };
    } catch (error) {
        console.error('トークン取得エラー:', error);
        return {
            'Content-Type': 'application/json'
        };
    }
}

//GETリクエストの処理
export async function get<T>(endpoint: string): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: headers as Headers,
        credentials: 'include',
        mode: 'cors'
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'APIリクエストに失敗しました');
    }
    return response.json();
}

//POSTリクエストの処理
export async function post<T>(endpoint: string, data: unknown): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: headers as Headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'APIリクエストに失敗しました');
    }
    return response.json();
}

//PUTリクエストの処理
export async function put<T>(endpoint: string, data: unknown): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: headers as Headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'APIリクエストに失敗しました');
    }
    return response.json();
}

// DELETEリクエスト
export async function del<T>(path: string): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: headers as Headers,
    });
  
    if (!response.ok) {
      const error = await response.json() as ErrorResponse;
      throw new Error(error.message || 'ポートフォリオの削除に失敗しました');
    }
    return response.json();
  }

