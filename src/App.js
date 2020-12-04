import React, { Component } from 'react';
import store from './store';
import List from './List';
import './App.css'

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  let {[keyToOmit]: _, ...rest} = obj;
  return rest;
}

class App extends Component {

  state = {store}
  
  handleAddRandom = (listId) => {
    const newCard = newRandomCard()

    const {lists, allCards} = this.state.store

    const newLists = lists.map(list => {
      if (list.id === listId) {
        return {
                ...list,
                cardIds: [...list.cardIds, newCard.id]
              };
      }
      return list
    })

    const newCards = {
      ...allCards,
      [newCard.id]: newCard
    }

    this.setState({store: {lists: newLists, allCards: newCards}})

    console.log(listId)
  }
  
  handleDeleteItem = (cardId) => {
    const {lists, allCards} = this.state.store
    
    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }))

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })

  }

  render() {
    const {store} = this.state
    return (
        <main className='App'>
          <header className='App-header'>
            <h1>Trelloyes!</h1>
          </header>
          <div className='App-list'>
            {store.lists.map(list => (
                <List
                  key={list.id}
                  id={list.id}
                  header={list.header}
                  cards={list.cardIds.map(id => store.allCards[id])}
                  onDeleteItem={this.handleDeleteItem}
                  onAddRandom={this.handleAddRandom}
                />
              ))}
      
          </div>
        </main>
    )
  };
  
}


export default App;
