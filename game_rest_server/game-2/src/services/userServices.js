const baseURL = 'https://gamesplay.kostov.website/api'
const registerURL = `${baseURL}/users/register/`
const loginURL = `${baseURL}/login/`
const logoutURL = `${baseURL}/logout/`
const userUrl = `${baseURL}/user/`

export const userRegister = async (data) => {
    const res = await fetch(registerURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
   
    return res.status
}

export const logUser = async (data) => {
    const res = await fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    return result
}

// export const logoutUser = async (token) => {
//     const res = await fetch(logoutURL, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Token ${token}`
//         }, 
//     })
//     return res.status
// }

export const logoutUser = async (token) => {
    try {
        const res = await fetch(logoutURL, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        return res.status;
    } catch (error) {
        console.error('Logout failed:', error);
        window.location.href = '/errors';   
    }
};

export const getUser = async(token, id) => {
    if (!token) {
        return
    }
    const res = await fetch(`${userUrl}${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }, 
    })
    const result = await res.json()
    return result
} 

export const EditUser = async(token, id, user) => {
    if (!token) {
        return
    }
    const res = await fetch(`${userUrl}${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) 
    })
    const result = await res.json()
    return result
} 

export const delUser = async(id) => {
    const res = await fetch(`${userUrl}${id}`, {
        method: 'DELETE',
    })
    const result = await res.json()
    return result
}