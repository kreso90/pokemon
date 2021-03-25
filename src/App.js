import React from 'react'
import Home from './components/Home'
import PokemonList from './components/PokemonList'
import SinglePokemon from './components/SinglePokemon'
import logo from './img/img_poke_logo.svg'
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
