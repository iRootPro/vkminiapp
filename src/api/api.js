import axios from "axios";

const instance = axios.create({
    baseURL: 'https://195.161.114.20/'
})

export const api = {
    async getInfo(id) {
        return instance.get(`/?id=${id}`)
    },

    async getRating() {
        return instance.get('/rating')
    }
}
