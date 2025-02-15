import {auth} from '../firebase/firebase';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

//APIリクエストを送るためのヘッダーを作成
async function getAuthHeaders() {
    try {
        const token = await auth.currentUser?.getIdToken(true); // forceRefresh: true
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
export async function get(endpoint) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers,
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
export async function post(endpoint, data) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'APIリクエストに失敗しました');
    }
    return response.json();
}

//PUTリクエストの処理
export async function put(endpoint, data) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'APIリクエストに失敗しました');
    }
    return response.json();
}

//DELETEリクエストの処理
export const del = async (path) => {
    const idToken = await auth.currentUser?.getIdToken();
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete portfolio');
    }
    return response.json();
}