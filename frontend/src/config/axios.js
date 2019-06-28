import axios from 'axios'

const success = resp => resp

const error = err => {
    if (401 === err) {
        window.location = '/'
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)
