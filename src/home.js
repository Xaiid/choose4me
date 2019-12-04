import React from 'react';
import './index.css';
import Form from './components/form.js'

class Home extends React.Component{
   render(){
    return (
      <section>
        <h1>Choose 4 Me</h1>
        <Form />
      </section>
    )
  }
}
export default Home;
