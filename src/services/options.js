const axios = require('axios').default;

const secret = `client_id=RRZRQV3GZ4HZMQJ425YIDOONWGJHNRWYUAEGE5QBYAD2TC3S
  &client_secret=34CDV0DSPDOE0XBSDO1Y3PIS3KV1SBI45PBPMXMMWUE35XYA&v=20180323`

class api {
  getOptions = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
  }

  getFoursquareOptions = async(query) => {
    let ll = await this.getLocation();
    if(query === 'restaurant'){
      return axios.get(`https://api.foursquare.com/v2/venues/search?${secret}&ll=${ll}&radius=250&limit=10&categoryId=4d4b7105d754a06374d81259`)
    }
    if(query === 'bar'){
      return axios.get(`https://api.foursquare.com/v2/venues/search?${secret}&ll=${ll}&radius=250&limit=10&categoryId=4d4b7105d754a06376d81259`)
    }
    return axios.get(`https://api.foursquare.com/v2/venues/search?${secret}&ll=${ll}&radius=250&limit=10&query=${query}`)
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

