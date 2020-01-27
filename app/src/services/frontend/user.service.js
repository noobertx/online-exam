import { authHeader } from '../../helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
const url = 'api/login/'


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.name) { //change to user.refresh token soon
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}
function logout() {}
function register() {}
function getAll() {}
function getById () {}
function update () {}
function _delete () {}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}