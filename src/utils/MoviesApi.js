import { checkResponse } from './checkResponse';
import { MOVIES_URL } from './constants';

export const getMoviesApi = () => {
    return fetch(`${MOVIES_URL}/beatfilm-movies`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}