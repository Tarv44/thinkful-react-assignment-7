import React from 'react';
import './List.css'
import Card from './Card'

function List(props) {
    const cards = props.cards.map(card => (
        <Card 
            key={card.id}
            cardId={card.id}
            title={card.title} 
            content={card.content}
            onDeleteItem={props.onDeleteItem}
        />
    ))

    return (
        <section className='List'>
            <header className='List-header'>
            <h2>{props.header}</h2>
            </header>
            <div className='List-cards'>
                {cards}
                <button
                    type='button'
                    className='List-add-button'
                    onClick={() => props.onAddRandom(props.id)}
                >
                    + Add Random Card
                </button>
            </div>
        </section>
    )
}

export default List;