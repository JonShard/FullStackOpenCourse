import { useState, useEffect } from 'react'
import axios from 'axios'

import personsService from './services/persons'

const Person = ({ person, persons, setPersons }) => {
  const onDelete = () => {
    if (!confirm(`Are you sure you want to delete ${person.name}`))
      return

    personsService
      .remove(person.id)
      .then(deletedPerson => {
        console.log(`Deleted person '${deletedPerson.name}' with ID: '${deletedPerson.id}'`)
        setPersons(persons.filter(p => p.id !== deletedPerson.id))
      })
      .catch(error => alert("Deletion failed"))
  }
  return <div>{person.name} - {person.number} <button onClick={onDelete}>delete</button></div>
}

const SearchFilter = ({ search, setSearch }) => {
  const onSearchChange = (event) => setSearch(event.target.value)
  return <div>search: <input onChange={onSearchChange} value={search} /></div>
}


const SubmissionForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
  const onNameChange = (event) => setNewName(event.target.value)
  const onNumberChange = (event) => setNewNumber(event.target.value)

  const updatePerson = (personToUpdate) => {
    personsService.update(personToUpdate.id, personToUpdate)
      .then()
      .catch(error => alert('Failed to update person'))
  }

  const submitPerson = () => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber
    }

    // Update existing entry?
    const personFromServer = persons.find(p => p.name == newName)

    if (personFromServer) {
      if (confirm(
        `'${newName}' is already added to phonebook with number '${personFromServer.number}'.\n` +
        `Would you like to update their number to '${newNumber}'?`
      )) {
        personFromServer.number = newNumber
        updatePerson(personFromServer)
      }
    } else {
      personsService.create(person)
        .then(updatedPerson => {
          setPersons(persons.concat(updatedPerson))
        })
        .catch(error => alert("Unable to add phonebook entry"))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Submissions</h2>
      <form>
        <div>
          name: <input onChange={onNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={onNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={submitPerson}>add</button>
        </div>
      </form>
    </div>
  )
}


const Numbers = ({ persons, setPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => <Person
        key={person.id}
        person={person}
        persons={persons}
        setPersons={setPersons}
      />)}
    </div>
  )
}


const App = () => {
  // Phonebook entries
  const [persons, setPersons] = useState([])

  // Text input field values
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons), [])
      .catch(error => alert("Unable to get phonebook entries from the server"))
  }, [])


  console.log(`Rendering ${persons.length} phonebook entries`)
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter search={search} setSearch={setSearch} />

      <SubmissionForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />

      <Numbers
        persons={search.length == '' ? persons : persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App