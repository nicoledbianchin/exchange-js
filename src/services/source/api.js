import http from '../../utils/https'

export default {
    getRates: (base) => http.get(`/latest?base=${base}`)
}