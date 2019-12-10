import React from 'react';

function Option({option, remove, add, update, ...props}){
  return (
    <li key={option.id}>
      <input
        type="text"
        value={option.text}
        placeholder="Enter an option"
        onChange={(e) => {update(e, option.id)}}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            add()
          }
        }}
        required
        {...props}
      />
      <button
        type="button"
        className="remove"
        onClick={() => {remove(option.id)}}>X</button>
    </li>
  )
}

export default Option;
