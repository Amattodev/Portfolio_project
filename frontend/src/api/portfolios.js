import * as client from './client';
import { getIdToken } from '../contexts/AuthContext';
export async function getPortfolios() {
    return client.get('/portfolios');
}

export async function getPortfolioById(id) {
    return client.get(`/portfolios/${id}`);
}

export async function createPortfolio(portfolioData) {
    return client.post('/portfolios', portfolioData)
}

export async function searchPortfolios(search = '') {
    const queryParams = search ? `?search=${encodeURIComponent(search)}` : '';
    return client.get(`/portfolios${queryParams}`);
}

export async function toggleLike(portfolioId) {
    return client.post(`/portfolios/${portfolioId}/like`);
}

export async function deletePortfolio(portfolioId) {
    return client.del(`/portfolios/${portfolioId}`);
}