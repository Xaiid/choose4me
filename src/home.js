import React from 'react';
import './index.css';
import ChooseForm from './components/form.js'

import api from './services/options'


class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      options: null
    }
  }

  componentDidMount() {
    (async () => {

      let response = await new api().getOptions()
      let options = [...response.data].map((option, index) => {return {id: index, text: option.email}})

      this.setState({
        options: options
      })
    })();
  }

  render(){
    return (
      <section>
        <ChooseForm options={this.state.options}/>
      </section>
    )
  }
}
export default Home;
