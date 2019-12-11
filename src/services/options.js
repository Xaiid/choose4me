const axios = require('axios').default;

class api {
  getOptions = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
  }
}

export default api

