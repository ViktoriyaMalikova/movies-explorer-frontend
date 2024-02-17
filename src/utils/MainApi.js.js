import { checkResponse } from './checkResponse';
import { BASE_URL } from './constants';


export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(checkResponse)
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
};


export const getInfoProfile = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
        .then(checkResponse)
};


// export const setInfoProfile = (userData) => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({
//             name: userData.name,
//             email: userData.email,
//         })
//     })
//         .then(checkResponse)
// }

export const setInfoProfile = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email })
    })
        .then(checkResponse)
}




