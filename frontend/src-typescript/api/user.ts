import * as client from './client';
import { User, Portfolio, ApiResponse } from '../types';
export async function createUserProfile(userData: Omit<User, 'uid' | 'email' | 'displayName' | 'photoURL'>): Promise<ApiResponse<User>>{
    return client.post<ApiResponse<User>>('/users/profile', userData);
}

export async function getProfile(): Promise<ApiResponse<User>> {
    return client.get<ApiResponse<User>>('/users/profile');
}

export async function updateProfile(userdata: Partial<User>): Promise<ApiResponse<User>> {
    return client.put<ApiResponse<User>>('/users/profile', userdata);
}

export async function getUsersPortfolios(uid: string): Promise<ApiResponse<Portfolio[]>> {
    if (!uid) {
        throw new Error('uidが必要です');
    }
    return client.get<ApiResponse<Portfolio[]>>(`/users/${uid}/portfolios`);
}