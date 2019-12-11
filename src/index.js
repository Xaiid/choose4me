import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.js'
import About from './components/about.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <NavLink exact to='/' activeClassName='active' >Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName='active' >About</NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  ,
  document.getElementById('root')
);
