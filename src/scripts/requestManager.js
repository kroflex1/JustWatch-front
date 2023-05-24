import axios from 'axios';
export async function getResponce(methodName, params) {
    const responce = await axios.post('api',
        {
            jsonrpc: '2.0',
            id: 0,
            method: methodName,
            params: params
        },
        {
            headers: {
                'access-token': localStorage.getItem('access-token')
            }
        })
    return responce
}