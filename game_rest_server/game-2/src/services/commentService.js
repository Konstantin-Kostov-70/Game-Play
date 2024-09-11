const baseURL = 'https://rosapaw.com/api'
const url = `${baseURL}/comments/`


export const getGameAllComments = async(id) => {
    try {
        const res = await fetch(`${url}${id}`)
        const result = await res.json()
        return result
        
    } catch (error) {
       console.error(error) 
    }
}

export const createComment = async(id, data) => {
    const res = await fetch(`${url}${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result
}