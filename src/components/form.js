import React from 'react'
import Option from './option.js'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.emptyOptions = [{ id: 0, text: '' }]
    this.state = {
      options: this.emptyOptions,
      winner: null,
    }
  }

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
    this.setState({ winner: '' })
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
      winner: this.state.options[Math.floor(Math.random() * this.state.options.length)].text,
    })
  }

  renderOption(i) {
    return (
      <Option
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
          <h1>Choose 4 Me</h1>
          <ol>
            {
              this.state.options.map((i, index) => {
                return this.renderOption(index)
              })
            }
          </ol>

          <button type="submit">
            Choose!!
          </button>

          <button
            type="button"
            onClick={this.add}>
            Add More
          </button>

          <button
            type="button"
            className="clear"
            onClick={this.reset}>
            Clear
          </button>

        </form>
        {this.state.winner &&
        <section>
          <h2>We've chosen: <span>{this.state.winner}</span></h2>
          <button type="button" onClick={this.back}>Back</button>
        </section>
        }
      </div>
    )
  }
}

export default Form
