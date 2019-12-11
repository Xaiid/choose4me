import React from 'react'
import Option from './option.js'
import api from '../services/options'

class ChooseForm extends React.Component {
  constructor(props) {
    super(props)
    this.emptyOptions = [{ id: 0, text: '' }]
    this.state = {
      options: this.emptyOptions,
      winner: null,
      loading: false,
    }
  }

  //static getDerivedStateFromProps(props, state){
    //if(props.options && props.options.length){
      //state.options = props.options
    //}
    //return state
  //}

  remove = id => {
    let position = this.state.options.indexOf(this.state.options.find(obj => id === obj.id))
    let options = this.state.options.slice()
    options.splice(position, 1)
    this.setState({
      options: options,
    })
  }

  add = () => {
    this.setState({
      options: [...this.state.options, { id: this.state.options.length }],
    })
  }

  update = (option, id) => {
    let options = this.state.options.slice()
    let index = this.state.options.indexOf(this.state.options.find(obj => id === obj.id))
    options[index]['text'] = option.target.value

    this.setState({
      options: options,
    })
  }

  back = () => {
    this.setState({ winner: null })
  }

  reset = () => {
    this.setState({
      options: this.emptyOptions,
      winner: null,
    })
  }

  choose = e => {
    e.preventDefault()
    this.setState({
      winner: this.state.options[Math.floor(Math.random() * this.state.options.length)],
    })
  }

  getFoursquareOptions = (query) => {
    (async () => {

      this.setState({
        loading: true
      })

      let response = await new api().getFoursquareOptions(query)

      let options = [...response.data.response.venues].map((option, index) => {
        return {id: index, text: option.name, location: option.location }
      })

      this.setState({
        options: options,
        loading: false
      })
    })();
  }

  getWinnerUrl(){
    //if(this.state.winner.location.formattedAddress.length > 1) return `https://www.google.com/maps/search/?api=1&query=${this.state.winner.location.formattedAddress.join(" ")}`
    return `https://www.google.com/maps/search/?api=1&query=${this.state.winner.location.lat},${this.state.winner.location.lng}`
    //return `https://www.google.com/maps/search/?api=1&query=${this.state.winner.text},${this.state.winner.location.lat},${this.state.winner.location.lng}`
    //return `https://www.google.com/maps/search/?api=1&query=${this.state.winner.location.lat},${this.state.winner.location.lng}`
  }

  renderOption(i) {
    return (
      <Option
        key={this.state.options[i].id}
        add={this.add}
        remove={this.remove}
        update={this.update}
        option={this.state.options[i]}
      />
    )
  }

  render() {
    return (
      <div className="form-container">
        <form
          ref="form"
          onSubmit={this.choose}
          className={this.state.winner ? 'hidden' : ''}>

          <div className="row">
            <button
              type="button"
              className="get"
              disabled={this.state.loading ? true : false}
              onClick={()=> {this.getFoursquareOptions('restaurant')}}>
              {this.state.loading ? 'wait...' : 'Get Near Restaurants'}
            </button>
            <h1>Choose 4 Me</h1>
            <button
              type="button"
              className="get"
              disabled={this.state.loading ? true : false}
              onClick={()=>{this.getFoursquareOptions('bar')}}>
              {this.state.loading ? 'wait...' : 'Get Near Bars'}
            </button>
          </div>
          <ol>
            {
              this.state.options.map((i, index) => {
                return this.renderOption(index)
              })
            }
          </ol>

          <button
            disabled={this.state.loading ? true : false}
            type="submit">
            Choose!!
          </button>

          <button
            disabled={this.state.loading ? true : false}
            type="button"
            onClick={this.add}>
            Add More
          </button>

          <button
            disabled={this.state.loading ? true : false}
            type="button"
            className="clear"
            onClick={this.reset}>
            Clear
          </button>

        </form>
        {this.state.winner &&
            <section>
              <h2>We've chosen: <span>{this.state.winner.text}</span></h2>
              {this.state.winner && this.state.winner.location &&
                  <a className="directions" target="_blank" rel="noopener noreferrer" href={this.getWinnerUrl()}>Get directions -></a>
              }
              <button type="button" onClick={this.back}>Back</button>
            </section>
        }
      </div>
    )
  }
}

export default ChooseForm
