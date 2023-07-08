const base = 'https://urban-explorer-5dbde-default-rtdb.firebaseio.com/'
import axios from 'axios'
export const customAxios = {
    get(path: string) {
        const r = axios.get(`${base}${path}.json`)
        return r
    }
}
