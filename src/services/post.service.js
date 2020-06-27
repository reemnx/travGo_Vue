import httpService from './httpService'
const BASE_URL = 'posts'

export default {
    query,
    get,
    remove,
    save
}

async function query() {
    return await httpService.get(BASE_URL);
}

async function get(id) {
    return await httpService.get(`${BASE_URL}/${id}`)
}

async function remove(id) {
    return await httpService.delete(`${BASE_URL}/${id}`)
}

async function save(post) {
    console.log('SERVICE', post);
    
    var prm;
    if (post._id) {
        prm = await httpService.put(`${BASE_URL}/${post._id}`, post)
    } else {
        prm = await httpService.post(`${BASE_URL}`, post)
    }
    return prm
}