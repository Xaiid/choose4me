const axios = require('axios').default;

const secret = `client_id=RRZRQV3GZ4HZMQJ425YIDOONWGJHNRWYUAEGE5QBYAD2TC3S
  &client_secret=34CDV0DSPDOE0XBSDO1Y3PIS3KV1SBI45PBPMXMMWUE35XYA&v=20180323`

class api {
  getOptions = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
  }

  getFoursquareOptions = async(query) => {
    let ll = await this.getLocation();
    return axios.get(`https://api.foursquare.com/v2/venues/search?${secret}&ll=${ll}&limit=10&query=${query}`)
  }

  getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(`${position.coords.latitude},${position.coords.longitude}`)
      }, err => {
        reject(err);
      });
    });
  }
}

export default api

