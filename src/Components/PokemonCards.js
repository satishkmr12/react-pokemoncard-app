import React, {useState} from 'react';
import '../pokemonStyle.css';
import axios from "axios";
import { Modal } from '../Modal';

function PokemonCards({id,name,type,image}){
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [showModal, setShowModal] = useState(false) 

    const getPokemonDetails = (name) => {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                    .then((resp) =>{
                        setPokemonDetails(resp.data);
                    });
                    
            setShowModal(prev => !prev);    
    }

    return (
        <>
        {
            showModal ? <Modal pokeInfo={pokemonDetails} showModal={showModal} setShowModal={setShowModal} />:
            <div className='pokemon-card' onClick={() => getPokemonDetails(name)}>
                    <div className="number"><small>#0{id}</small></div>
                    <img src={image} alt={name} />
                    <div className="detail-wrapper">
                        <h3>{name}</h3>
                        <small>attack: {type}</small>
                    </div>
            </div>
        }
        </>
    )
}

export default PokemonCards
