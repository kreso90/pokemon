import React from 'react'
import Home from './Home'
import PokemonList from './PokemonList'
import SinglePokemon from './SinglePokemon'
import logo from './img_poke_logo.svg'
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

function App() {
  return(
    <Router>
    <div>
      <div className="nav">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo"/></Link>
        </div>
        <Link to="/PokemonList"><span className="nav-button">Pokemon list</span></Link>
    </div>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/PokemonList" exact component={PokemonList}/>
      <Route path="/PokemonList/:name" component={SinglePokemon}/>
    </Switch>
  </div>
  </Router>
  );
}

export default App;
