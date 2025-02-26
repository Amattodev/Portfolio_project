import * as client from './client';
import {Portfolio, ApiResponse} from '../types';

export async function getPortfolios(): Promise<ApiResponse<Portfolio[]>> {
    return client.get<ApiResponse<Portfolio[]>>('/portfolios');
}

export async function getPortfolioById(id: string): Promise<ApiResponse<Portfolio>> {
    return client.get<ApiResponse<Portfolio>>(`/portfolios/${id}`);
}

export async function createPortfolio(data: Omit<Portfolio, '_id' | 'user' | 'likes' | 'createdAt'>): Promise<ApiResponse<Portfolio>> {
    return client.post<ApiResponse<Portfolio>>('/portfolios', data)
}

export async function updatePortfolio(id: string, data: Partial<Portfolio>): Promise<ApiResponse<Portfolio>> {
    return client.put<ApiResponse<Portfolio>>(`/portfolios/${id}`, data);
}

export async function searchPortfolios(search: string = ''): Promise<ApiResponse<Portfolio[]>> {
    const queryParams = search ? `?search=${encodeURIComponent(search)}` : '';
    return client.get<ApiResponse<Portfolio[]>>(`/portfolios${queryParams}`);
}

export async function toggleLike(id: string): Promise<ApiResponse<{ isLiked: boolean; likesCount: number }>> {
    return client.post<ApiResponse<{ isLiked: boolean; likesCount: number }>>(`/portfolios/${id}/like`, {});
}

export async function deletePortfolio(id: string): Promise<ApiResponse<void>> {
    return client.del<ApiResponse<void>>(`/portfolios/${id}`);
}