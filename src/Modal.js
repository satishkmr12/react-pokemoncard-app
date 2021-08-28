import React, { useRef, useEffect, useCallback } from 'react';
import './pokemonStyle.css';


export const Modal = ({pokeInfo, showModal, setShowModal }) => {
  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {(showModal && pokeInfo.length !== 0)  ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
            <div className="ModalWrapper" showModal={showModal}>
              <img className="ModalImg" src={pokeInfo.sprites.other.dream_world.front_default} alt={pokeInfo.name} />
              <div className="ModalContent">
                <h1>Id: #0{pokeInfo.id}</h1>
                <h1>Name: {pokeInfo.name} </h1>
                <h2>Type: {pokeInfo.types[0].type.name} </h2>
                <h3>hp: {pokeInfo.stats[0].base_stat} </h3>
                <h3>Attack: {pokeInfo.stats[1].base_stat} </h3>
                <h3>Defence: {pokeInfo.stats[2].base_stat} </h3>
              </div>
              <button className="close-button"
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              > Close </button>
            </div>
        </div>
      ) : null}
    </>
  );
};