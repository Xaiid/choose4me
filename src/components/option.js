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
      <button type="button" onClick={() => {props.remove(props.id)}}>Remove</button>
    </li>
  )
}

export default Option;
