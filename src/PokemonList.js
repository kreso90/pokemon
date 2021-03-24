import React,{useState,useEffect} from 'react'
import axios from 'axios';
import bulbasaur from './pokemons/img_bulbasaur.png'
import ivysaur from './pokemons/img_ivysaur.png'
import venusaur from './pokemons/img_venusaur.png'
import charmander from './pokemons/img_charmander.png'
import charmeleon from './pokemons/img_charmeleon.png'
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";


function PokemonList({match}) {
    const [pokemon, setPokemon] = useState([])
    const [currPage, setCurrPage] = useState("https://pokeapi.co/api/v2/pokemon/?limit=12")
    const [nextPage, setNextPage] = useState("")
    const [prevPage, setPrevPage] = useState("")
    const [pageNumber, setPageNumber] = useState(1)
    const [pokemonImage, setPokemonImage] = useState()

    var images = []
    var index = 0;

    images[0] = bulbasaur
    images[1] = ivysaur
    images[2] = venusaur
    images[3] = charmander
    images[4] = charmeleon

    index = images.length + 1;

    useEffect(() => {
        axios.get(currPage)
        .then(res => {
            setPokemon(res.data.results)
            setNextPage(res.data.next)
            setPrevPage(res.data.previous)
        })
    }, [currPage])
    
    function changeNext(){
        setCurrPage(nextPage)
        setPageNumber(prevCount => prevCount + 1);
    }

    function changePrev(){
        setCurrPage(prevPage)
        setPageNumber(prevCount => prevCount - 1);
    }
   
    return(
        <div className="pokemon-list-container">
        <div className="pokemon-list">
            <div className="pokemon-list-row">
            {pokemon.map((pokemon,index)=> (
             <div className="col">
                <Link to={`/PokemonList/${pokemon.name}`}>
                    <div key={index} className="pokemon-wrapper">
                        <div className="pokemon-inner-wrapper">
                            <div className="pokemon-inner">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${index + 1}.png`}></img>
                                <span>{pokemon.name}</span>
                            </div>
                        </div>
                    </div>
                </Link>
               </div>
            ))}
          </div>
        </div>
        <div className="pagination">
       
      
        {prevPage !== null &&
        <button onClick={() => {changePrev();}}>&#60;</button>
        }
        <span className="page-nubmer">{pageNumber}</span>
         {nextPage !== null &&
        <button onClick={() => {changeNext();}}>&#62;</button>
        }
        </div>
        </div>
    )
}

export default PokemonList