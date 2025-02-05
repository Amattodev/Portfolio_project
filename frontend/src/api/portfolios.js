import * as client from './client';

export async function getPortfolios() {
    return client.get('/portfolios');
}

export async function getPortfolioById(id) {
    return client.get(`/portfolios/${id}`);
}