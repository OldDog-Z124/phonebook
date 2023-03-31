import { useState, useEffect } from 'react'

import personsService from '../../services/persons'

import Notification from '../../components/Notification'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'



const Home = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterword, setFilterword] = useState('')
  const [message, setMessage] = useState({})

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

  const handleFilterwordChange = (event) => {
    setFilterword(event.target.value)
  }

  const addMessage = (text, type) => {
    const object = {
      text,
      type
    }
    setMessage(object)
    setTimeout(() => setMessage({}), 5000)
  }

  const addNewPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        addMessage(`Added ${newName}`, 'succeed')
      })
  }

  const updatePerson = () => {
    const person = persons.find(person => person.name === newName)
    const changePerson = {...person, number: newNumber}

    personsService
      .update(person.id, changePerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      })
  }

  const deletePerson = (id, person) => {
    personsService
      .deletePerson(id)
      .then(repsonse => {
        setPersons(persons.filter(person => person.id !== id))
        addMessage(`Deleted ${person.name}`, 'succeed')
      })
      .catch(error => {
        addMessage(`Information of ${person.name} has already been removed from server`, 'error')
      })
  }

  const handlePersonFormSubmit = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replaace the old number with a new one?`)) {
        updatePerson()
      }
    }
    else {
      addNewPerson()
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h2' component='h1' sx={{textAlign: 'center', margin: 3 }}>Phonebook</Typography>
      <Notification message={message.text} type={message.type} />
      
      <Filter 
        value={filterword}
        handleChange={handleFilterwordChange}
      />
      
      <PersonForm
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
        onSubmit={handlePersonFormSubmit}
      />
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </Container>
  )
}

export default Home