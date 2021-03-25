import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";


function SinglePokemon({match}) {
   
    const [singlePokemon, setSinglePokemon] = useState("bas")
    const [pokemonImg, setPokemonImg] = useState("")
    const [abilities, setAbilities] = useState([])
    const [stats, setStats] = useState([])
  
    useEffect(() => {
        async function fetchItem(){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${match.params.name}`)
            .then(res => {
                setSinglePokemon(res.data)
                setPokemonImg(res.data.sprites)
                setAbilities(res.data.abilities)
                setStats(res.data.stats)
            })
        }
        fetchItem();
        console.log(match)
    }, [])

   
 
    return(
       
        <div className="single-pokemon-container">
            <Link to={"/PokemonList/"}><div className="back">Back</div></Link>
            <div className="pokemon-name">
                <h1>{singlePokemon.name}</h1>
                <span>Species</span>
            </div>
            <div className="single-pokemon-row">
                <div className="single-pokemon-col">
                    
                    <div className="label">Abilities</div>
                    <div className="abilities">
                        {abilities.map((abiliti, index) => (
                            <span key={index}>{abiliti.ability.name}, </span>
                        ))}
                    </div>
                    <div className="label">Stats</div>
                    <div className="single-pokemon-row">
                        {stats.map((stats,index) => (
                        <div key={index} className="stats">
                            <div className="stats-main-wrapper">
                                <div className="stats-wrapper">
                                    <p className="stat-name">{stats.stat.name}</p>
                                    <p>{stats.base_stat}</p>
                                    <p>{stats.effort}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="single-pokemon-col">
                    <div className="single-image-wrapper">
                        <div className="single-inner-wrapper">
                            <img src={pokemonImg.back_default} alt="pokemon"/>
                            <span>{singlePokemon.name}</span>
                        </div>
                    </div>
                   
                </div>
            </div>
            
        </div>
        
    )
}

export default SinglePokemon