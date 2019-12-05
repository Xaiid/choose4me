import React from 'react';
import Option from './option.js';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      options: [{id: 0}, {id: 1}, {id: 2}],
      winner: ''
    }
    const options = [{id: 0, text: 'wut'}, {id: 1}, {id: 2}].slice()
    this.initialState = { ...this.state, options: options }
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.back = this.back.bind(this);
    this.reset = this.reset.bind(this);
  }

  remove(id){
    let position = this.state.options.indexOf(this.state.options.find(obj => id === obj.id))
    let options = this.state.options.slice()
    options.splice(position, 1)
    this.setState({
      options: options
    })
  }

  add(){
    this.setState({
      options: [...this.state.options, {id: this.state.options.length}]
    })
  }

  update(option, id){
    let options = this.state.options.slice()
    let index = this.state.options.indexOf(this.state.options.find(obj => id === obj.id))
    options[index]['text'] = option.target.value

    this.setState({
      options: options
    })
  }

  choose(e){
    e.preventDefault();
    this.setState({
      winner: this.state.options[Math.floor(Math.random() * this.state.options.length)].text
    });
  }

  renderOption(i) {
    return (
      <Option
        key={this.state.options[i].id}
        remove={ this.remove }
        id={this.state.options[i].id}
        update={ this.update}
      />
    )
  }

  back(){
    this.setState({ winner: ''})
  }

  reset(){
    const options = this.state.options.slice()
    options[0]['text'] = 'wuwuw'
    this.setState({
      options: options,
      winner: null
    })
    this.refs.form.reset();
  }

  render(){
    return (
      <div>
        <form
          ref="form"
          onSubmit={(e) => {this.choose(e)}}
          className={this.state.winner ? 'hidden' : ''}>
          <h1>Choose 4 Me</h1>
          <ol>
            {
              this.state.options.map((i,index) => {
                return this.renderOption(index)
              })
            }
          </ol>

          <button type="submit">
            Choose!!
          </button>

          <button
            type="button"
            onClick={() => { this.add()}}>
            Add More
          </button>

          <button
            type="button"
            className="clear"
            onClick={this.reset}>Clear</button>

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

export default Form;
