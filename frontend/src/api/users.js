import * as client from './client';

export async function createUserProfile(userData) {
    return client.post('/users/profile', userData);
}

export async function getProfile() {
    return client.get('/users/profile');
}

export async function updateProfile(userdata) {
    return client.put('/users/profile', userdata);
}

export async function getUsersPortfolios(userId) {
    return client.get(`/users/${userId}/portfolios`);
}