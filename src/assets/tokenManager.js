import axios from 'axios'


export async function isUserAuthenticated() {
    if (isAccessTokenExpire()) {
        console.log('Начал замену токенов')
        const refresh_token = localStorage.getItem('refresh-token')
        if (refresh_token == null)
            return false
        const get_new_tokens_responce = await axios.post('api',
            {
                jsonrpc: '2.0',
                id: 0,
                method: 'get_new_refresh_and_access_token',
                params: {}
            },
            {
                headers: {
                    'refresh-token': refresh_token
                }
            })
        if (typeof get_new_tokens_responce.data.error === 'undefined') {
            localStorage.setItem('access-token', get_new_tokens_responce.data.result.access_token)
            localStorage.setItem('refresh-token', get_new_tokens_responce.data.result.refresh_token)
            return true
        }
        else {
            console.log('Refresh token просрочен')
            return fasle
        }
    }
    return true
}


function isAccessTokenExpire() {
    var access_token = localStorage.getItem('access-token')
    if (access_token == null)
        return true
    var base64Url = access_token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    var expire = JSON.parse(jsonPayload).exp
    var expire_date = new Date(parseInt(expire) * 1000)
    var now_date = new Date()
    return expire_date <= now_date
}