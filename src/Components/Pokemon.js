import React from 'react'

function Pokemon(props) {
    return (
        <div className='pokemon-card'>
        <div className="number"><small>#0{props.pokemon.id}</small></div>
        <img src={props.pokemon.img} alt={props.pokemon.name} />
        <div className="detail-wrapper">
            <h3>{props.pokemon.name}</h3>
            <h4>Type: {props.pokemon.type} </h4>
            <small>hp: {props.pokemon.hp}</small>
            <small>attack: {props.pokemon.attack}</small>
            <small>defence: {props.pokemon.defence}</small>
        </div>
    </div>
    )
}

export default Pokemon
