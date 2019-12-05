import React from 'react';

function Option(props){
  return (
    <li>
      <input
        type="text"
        placeholder="Enter an option"
        onChange={(e) => {props.update(e, props.id)}}
        required
      />
      <button
        type="button"
        className="remove"
        onClick={() => {props.remove(props.id)}}>X</button>
    </li>
  )
}

export default Option;
