import axios from 'axios'


export async function checkAccessToken() {
    if (checkAccessTokenExpire() === true) {
        console.log('Начал замену токенов')
        const get_new_tokens_responce = await axios.post('api',
            {
                jsonrpc: '2.0',
                id: 0,
                method: 'get_new_refresh_and_access_token',
                params: {}
            },
            {
                headers: {
                    'refresh-token': localStorage.getItem('refresh-token')
                }
            })
        if (typeof get_new_tokens_responce.data.error === 'undefined') {
            localStorage.setItem('access-token', get_new_tokens_responce.data.result.access_token)
            localStorage.setItem('refresh-token', get_new_tokens_responce.data.result.refresh_token)
        }
        else {
            console.log('Refresh token просрочен')
        }
    }
}


async function checkAccessTokenExpire() {
    var access_token = localStorage.getItem('access-token')
    var base64Url = access_token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    var expire = JSON.parse(jsonPayload).exp
    var expire_date = new Date(parseInt(expire) * 1000)
    var now_date = Date()
    return expire_date <= now_date
}