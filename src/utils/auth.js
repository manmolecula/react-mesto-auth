export const BASE_URL = 'https://auth.nomoreparties.co';

function getResponse(res){
    return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData))
} 

export const register = ( password, email ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({ password, email })
  })
  .then(getResponse)
};

export const login = ( password, email ) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({ password, email })
  })
  .then(getResponse)
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    })
    .then(getResponse)
  };