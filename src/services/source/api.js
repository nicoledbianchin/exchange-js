import http from '../utils/http.js'

export default {
    getRates: (base) => http.get(`${base}`)
}