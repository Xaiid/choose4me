import React from 'react';
import Option from './option.js';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      options: [{id: 0}, {id: 1}, {id: 2}],
      winner: ''
    }
    this.updateOption = this.updateOption.bind(this);
    this.remove = this.remove.bind(this);
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
    let options = this.state.options.slice()
    options.push({id: options.length});

    this.setState({
      options: options
    })
  }

  updateOption(option, id){
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
      update={ this.updateOption }
    />
    )
  }

  render(){
    return (
      <form onSubmit={(e) => {this.choose(e)}}>
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

        <button type="button" onClick={() => { this.add()}}>
          Add Option
        </button>

        <h1>{this.state.winner}</h1>

      </form>
    )
  }
}

export default Form;
