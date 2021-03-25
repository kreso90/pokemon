import React,{useState,useEffect} from 'react'
import axios from 'axios';
import logo from '../img/img_poke_logo.svg'
import bulbasaur from '../img/img_bulbasaur.png'
import ivysaur from '../img/img_ivysaur.png'
import venusaur from '../img/img_venusaur.png'
import charmander from '../img/img_charmander.png'
import charmeleon from '../img/img_charmeleon.png'
import {CSSTransition} from "react-transition-group"
import useLocalStorageState from "use-local-storage-state";

function Home() {
  const randomNum1 = Math.floor(Math.random() * 5) + 1;
  const randomNum2 = Math.floor(Math.random() * 5) + 1;
  const [firstPokemon, setFirstPokemon] = useState(1);
  const [secondPokemon, setSecondPokemon] = useState(1);
  const[pok1, setPok1] = useState();
  const[pok2, setPok2] = useState();
  const [winner, setWinner] = useState('')
  const [battle, setBattle] = useState(false)
  const [checkWinner, setCheckWinner] = useState(false)
  const [getWinner, setGetWinner] = useState(false)
  const [background, setBackground] = useState('#fff')
  const [localWinner, setLocalWinner] = useLocalStorageState("myValueInLocalStorage", winner)
  
  function fight(){
    setFirstPokemon(randomNum1)
    setSecondPokemon(randomNum2)
    setBackground('#e5e5e5')
    setBattle(true)
    setCheckWinner(false)
  }

  function fightWinner(){
    if(getWinner){
      setFirstPokemon(localWinner)
    }
  }


  function end(){
    localStorage.removeItem('myValueInLocalStorage');
    setFirstPokemon(1)
    setSecondPokemon(1)
    setBackground('#fff')
    setBattle(false)
    setCheckWinner(false)
    setGetWinner(false)
  }

  useEffect(() => {
    async function fetchData(){
        const pokemon1 = `https://pokeapi.co/api/v2/pokemon/${firstPokemon}`
        const pokemon2 = `https://pokeapi.co/api/v2/pokemon/${secondPokemon}`
        const getPokemon1 = axios.get(pokemon1)
        const getPokemon2 = axios.get(pokemon2)
        axios.all([getPokemon1, getPokemon2]).then(
            axios.spread((...allData) => {
                const pokemon1Data = allData[0].data.name
                const pokemon2Data = allData[1].data.name
                const pok1Stat = ((allData[0].data.stats[0].base_stat + allData[0].data.stats[2].base_stat + allData[0].data.stats[4].base_stat) - (allData[1].data.stats[1].base_stat + allData[1].data.stats[3].base_stat) )
                const pok2Stat = ((allData[1].data.stats[0].base_stat + allData[1].data.stats[2].base_stat + allData[1].data.stats[4].base_stat) - (allData[0].data.stats[1].base_stat + allData[0].data.stats[3].base_stat) )
                if( pok1Stat > pok2Stat){
                    setWinner(allData[0].data.name)
                    setCheckWinner(true)
                    localStorage.setItem('myValueInLocalStorage', winner)
                    setLocalWinner(localStorage.getItem('myValueInLocalStorage'))
                    setGetWinner(true)
                }else if(pok1Stat < pok2Stat){
                    setWinner(allData[1].data.name)
                    setCheckWinner(true)
                    localStorage.setItem('myValueInLocalStorage', winner)
                    setLocalWinner(localStorage.getItem('myValueInLocalStorage'))
                    setGetWinner(true)
                }else{
                    setCheckWinner(false)
                }
                setPok1(pokemon1Data)
                setPok2(pokemon2Data)
            })
        )
      
    }
    fetchData();
  }, [winner,setLocalWinner,firstPokemon, secondPokemon])

  return (
 
      <div className="container" style={{background}}>
        <div className="main-wrHomeer">
          {battle === false &&
            <div className="main-logo">
              <img src={logo} alt="Logo"/>
            </div>
          } 
          <CSSTransition in={battle}  timeout={100} classNames="fade">
             	<div className="battle-wrapper">
               <CSSTransition in={checkWinner}  timeout={1500} classNames="battle-fade">
               <div className="pokemon-wrapper">
                   <div className="pokemon">
                       <div className="pokemon-image">
                           {pok1 === 'bulbasaur' && <img src={bulbasaur} alt="Bulbasaur"/>}
                           {pok1 === 'ivysaur' && <img src={ivysaur} alt="Ivysaur"/>}
                           {pok1 === 'venusaur' && <img src={venusaur} alt="Venusaur"/>}
                           {pok1 === 'charmander' && <img src={charmander} alt="Charmander"/>}
                           {pok1 === 'charmeleon' && <img src={charmeleon} alt="Charmeleon"/>}
                       </div>
                       <span>{pok1}</span>
                   </div> 
               </div>
               </CSSTransition>
               <CSSTransition in={checkWinner}  timeout={1500} classNames="battle-fade">
               <div className="versus">VS</div>
               </CSSTransition>
               <CSSTransition in={checkWinner}  timeout={1500} classNames="battle-fade">
               <div className="pokemon-wrapper">
                   <div className="pokemon">
                       <div className="pokemon-image">
                           {pok2 === 'bulbasaur' && <img src={bulbasaur} alt="Bulbasaur"/>}
                           {pok2 === 'ivysaur' && <img src={ivysaur} alt="Ivysaur"/>}
                           {pok2 === 'venusaur' && <img src={venusaur} alt="Venusaur"/>}
                           {pok2 === 'charmander' && <img src={charmander} alt="Charmander"/>}
                           {pok2 === 'charmeleon' && <img src={charmeleon} alt="Charmeleon"/>}
                       </div>
                       <span>{pok2}</span> 
                   </div>
               </div>
               </CSSTransition>
               <CSSTransition in={checkWinner}  timeout={1500} classNames="winner-fade">
                <div className="pokemon-winner">
                  <span>Winner!</span>
                    <div className="pokemon-wrapper">
                      <div className="pokemon">
                        <div className="pokemon-image">
                            {winner === 'bulbasaur' && <img src={bulbasaur} alt="Bulbasaur"/>}
                            {winner === 'ivysaur' && <img src={ivysaur} alt="Ivysaur"/>}
                            {winner === 'venusaur' && <img src={venusaur} alt="Venusaur"/>}
                            {winner === 'charmander' && <img src={charmander} alt="Charmander"/>}
                            {winner === 'charmeleon' && <img src={charmeleon} alt="Charmeleon"/>}
                        </div>
                        <span>{winner}</span> 
                      </div>
                    </div>
                   
                </div>
                </CSSTransition>
             </div>
             </CSSTransition>
           
            
             <CSSTransition in={checkWinner} timeout={1500} classNames="button-fade">
              <div>
                <button onClick={() => {fight();fightWinner();}}>{battle === true ? "Start new battle" : "Start pokemon battle"}</button>
              </div>
              </CSSTransition>
            {battle === true && 
             <CSSTransition in={checkWinner} timeout={1500} classNames="winner-fade">
              <div className="pokemon-winner">

                <button onClick={() => { end();}}>End game</button>
              </div>
              </CSSTransition>
            }
    
        </div>
       
      </div>
      
   
  
  );
}

export default Home;
