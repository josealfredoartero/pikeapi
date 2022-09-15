import React from 'react'

import Card from 'react-bootstrap/Card';

export const CardPokemon = ({thisPokemon}) => {

    return (
        <>
        {/* mostrar los pokemons en cards que se envian hacia el componente*/}
            <Card border="dark" style={{ width: '22rem' }}>
                <Card.Header>
                    <div className='d-flex'>
                        <Card.Text className='titulo col-6'>{thisPokemon.name}</Card.Text>
                        <Card.Text className='titulo offset-2 col-4'># {thisPokemon.id}</Card.Text>
                    </div>
                    <img src={thisPokemon.img} alt=""/>
                    <div className='d-flex'>
                        <Card.Text className='col-3'>{thisPokemon.stats[0].stat.name}: {thisPokemon.stats[0].base_stat}</Card.Text>
                        <Card.Text className='col-4'>{thisPokemon.stats[1].stat.name}: {thisPokemon.stats[1].base_stat}</Card.Text>
                        <Card.Text className='col-5'>{thisPokemon.stats[2].stat.name}: {thisPokemon.stats[2].base_stat}</Card.Text>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='d-flex col-12'>
                        <div className='col-6'>
                            <Card.Title>tipo:</Card.Title>
                            <ol>
                                {thisPokemon.types.map((value, index) => (
                                        <li type='disc' key={thisPokemon.id + '/'+  index}>{value.type.name}</li>
                                    ))
                                }
                            </ol>
                        </div>
                        <div className='col-6'>
                        <Card.Title>Habilidades:</Card.Title>
                        <ol>
                            {thisPokemon.abilities.map((value, index) => (
                                <li type='disc' key={thisPokemon.id + '-'+  index}>{value.ability.name}</li>
                            ))}
                        </ol>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default CardPokemon