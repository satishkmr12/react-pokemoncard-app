import React, { useState, useEffect } from 'react';
import PokemonCards from './Components/PokemonCards';
import axios from "axios";
import './pokemonStyle.css';
import Pokemon from './Components/Pokemon';


function PokemonApp() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=10';

    const [listPokemon, setListPokemon] = useState([]);
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonSelected, setPokemonSelected] = useState(false);
    const [searchPokemon, setSearchPokemon] = useState({
        name:'',
        id:'',
        img:'',
        hp:'',
        attack:'',
        defence:'',
        type:''
    });

    async function getListPokemon(){
        const responce = await fetch(url);
        const resultData = await responce.json();

        const fetchPokemonDetails = results => {
            results.forEach( async (data) => {
                const newUrl = `https://pokeapi.co/api/v2/pokemon/${data.name}`;
                const responce  = await fetch(newUrl);
                const resultData = await responce.json();

                setListPokemon( prevData => [...prevData, resultData]); 
            });
        }
        fetchPokemonDetails(resultData.results);
    }
    useEffect(() => {
        getListPokemon();
    }, [])

    const newPokemon = (e) =>{
        setPokemonName(e.target.value);
    }
    const getPokemon = () =>{
        if(pokemonName){
         axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                    .then((resp) =>{
                        setSearchPokemon({
                            name:resp.data.name,
                            id:resp.data.id,
                            img:resp.data.sprites.other.dream_world.front_default,
                            hp:resp.data.stats[0].base_stat,
                            attack:resp.data.stats[1].base_stat,
                            defence:resp.data.stats[2].base_stat,
                            type:resp.data.types[0].type.name

                        });
                        setPokemonSelected(true);
                        setPokemonName('');
                    });
            }else{
                window.alert("Please enter pokemon name or id to search");
            }
    }

    const reload = () =>{
        setListPokemon([]);
        for (var a=[],i=0;i<150;++i) a[i]=i;
        const ARRAY_LENGTH = 10
        const randomArray = []
        for(let i = 0; i<ARRAY_LENGTH; i++) {
            var val = a[Math.floor(Math.random()*a.length)];
            randomArray.push(val);
        }
        randomArray.forEach( async (data) => {
            const newUrl = `https://pokeapi.co/api/v2/pokemon/${data}`;
            const responce  = await fetch(newUrl);
            const resultData = await responce.json();

            setListPokemon( prevData => [...prevData, resultData]); 
        });


    }

    return (
        <>
        <div className="app-container">
            <h3 style={{textAlign:"center"}}>POKEMON CARDS </h3>
            <div className="search">
            <input type="text"
                    value={pokemonName}
                    placeholder=" Search pokemon"
                    name="search" 
                    onChange={newPokemon}
                    />
            <button className="btn btn-primary" onClick={getPokemon}>search</button>
             <div className="container">
                 {!pokemonSelected ? null:<Pokemon pokemon = {searchPokemon} />}
             </div>
            </div> 
        <div className="pokemon-container">
            <div className="all-container">
                { listPokemon.map((pokemon, index) => 
                    <PokemonCards 
                        key= {index}
                        id = {pokemon.id}
                        image= {pokemon.sprites.other.dream_world.front_default}
                        name= {pokemon.name}
                        type= {pokemon.types[0].type.name}
                    />
                )}
            </div>
            <button style={{backgroundColor:"greenyellow", cursor: "pointer", marginTop:"15px", marginBottom:"15px"}} 
            type="btn btn-secondary" 
            onClick={reload}>
            Reload 
            </button>
        </div>  
        </div>    
        </>
    )
}

export default PokemonApp
