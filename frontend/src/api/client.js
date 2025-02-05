import {auth} from '../firebase/firebase';

const API_BASE_URL = 'http://localhost:8000/api';

//APIリクエストを送るためのヘッダーを作成
async function getAuthHeaders() {
    const token = await auth.currentUser?.getIdToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    }
}

//GETリクエストの処理
export async function get(endpoint) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {headers});
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