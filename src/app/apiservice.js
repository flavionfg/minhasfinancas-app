import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'https://flavio-minhasfinancas-api.herokuapp.com'
})

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto){
        const requestUrL = `${this.apiurl}${url}`
        return httpClient.post(requestUrL, objeto);
    }

    put(url, objeto){
        const requestUrL = `${this.apiurl}${url}`
        return httpClient.put(requestUrL, objeto);
    }

    delete(url){
        const requestUrL = `${this.apiurl}${url}`
        return httpClient.delete(requestUrL)
    }

    get(url){
        const requestUrL = `${this.apiurl}${url}`
        return httpClient.get(requestUrL)
    }
}

export default ApiService;