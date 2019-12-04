import React from 'react';

class Option extends React.Component{
  render(){
    return (
      <li>
        <input
          type="text"
          placeholder="Enter an option"
          onChange={(e) => {this.props.update(e, this.props.id)}}
          required
        />
        <button type="button" onClick={() => {this.props.remove(this.props.id)}}>Remove</button>
      </li>
    )
  }
}

export default Option;
