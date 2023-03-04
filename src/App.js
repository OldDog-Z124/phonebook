import { useState, useEffect } from 'react'

import personsService from './services/persons'

const Filter = ({ value, handleChange }) => {
  
  return (
    <p>
      filter shown with
      <input 
        value={value} 
        onChange={handleChange} 
      />
    </p>
  )
}

const PersonForm = ({ name, handleNameChange, number, handleNumberChange, addPerson }) => {
  
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input type='tel' value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, deletePerson}) => {

  return (
    <div>
      {persons.map(person => 
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      )}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterword, setFilterword] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initiaPersons => {
        setPersons(initiaPersons)
      })
  }, [])

  let personsToShow = persons.filter(person => person.name.includes(filterword))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value) 
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
  
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    personsService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleFilterwordChange = (event) => {
    setFilterword(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={filterword}
        handleChange={handleFilterwordChange}
      />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App