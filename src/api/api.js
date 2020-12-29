import axios from "axios";

const instance = axios.create({
    baseURL: 'https://rootjspy.ru/'
})

export const api = {
    async getInfo(id) {
        return instance.get(`/?id=${id}`)
    },

    async getRating() {
        return instance.get('/rating')
    }
}
