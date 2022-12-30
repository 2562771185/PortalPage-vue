import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8081/yc/sso', // url = base url + request url
  timeout: 5000 // request timeout
})




export default service
