const url = 'http://localhost:8000/games/'


// export const getAll = () => {
//     return fetch(url)
//         .then(res => res.json())
// }

// export const getOne = (id) => {
//     return fetch(`${url}/${id}`)
//         .then(res => res.json())
// }

// export const deleteOne = (id) => {
//     return fetch(`${url}/${id}`, {
//         method: 'DELETE',
//     })
//         .then(res => res.json())
// }

export const getAll = async () => {
    try {
        const res = await fetch(url)
        if (res.status !== 200) {
            console.log('is not ok');
            throw new Error('Network response was not ok')
        }
        const result = await res.json()
        const status = res.status
        return {
            result,
            status

        }

    } catch (error) {
        console.error(error)
        console.log('Bed Response');
     
    }
}

export const getOne = async (id) => {
    try {
        const res = await fetch(`${url}${id}`)
        const result = await res.json()
        return result
        
    } catch (error) {
        console.log("Bed Response for getOne ");
    }
    // const result = await res.json()
    // return result
}

export const deleteOne = async (id) => {
    await fetch(`${url}${id}`, {
        method: 'DELETE',
    })
}

export const createOne = async (data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    return result

}

export const editOne = async (id, data) => {
    const res = await fetch(`${url}${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    return result
}
