// import axios from 'axios'


// export async function check_access_token() {
//     const check_token_responce = await axios.post('api', {
//         jsonrpc: '2.0',
//         id: 0,
//         method: 'get_current_user_information',
//         params: {}
//     })
//     if (typeof check_token_responce.data.error !== 'undefined') {
//         console.log('Начал замену токенов')
//         const get_new_tokens_responce = await axios.post('api',
//             {
//                 jsonrpc: '2.0',
//                 id: 0,
//                 method: 'get_new_refresh_and_access_token',
//                 params: {}
//             },
//             {
//                 headers: {
//                     'refresh-token': localStorage.getItem('refresh-token')
//                 }
//             })
//         console.log(get_new_tokens_responce)
//         localStorage.setItem('access-token', get_new_tokens_responce.data.result.access_token)
//         localStorage.setItem('refresh-token', get_new_tokens_responce.data.result.refresh_token)
//     }
// }