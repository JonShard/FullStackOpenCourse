import { useState } from 'react'

const Person = ({ person }) => <>{person.name} - {person.number}<br /></>

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 0,
      name: 'Arto Hellas',
      number: '12345678'
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const submitPerson = () => {
    event.preventDefault()

    if (persons.some(p => p.name == newName)) {
      alert(`'${newName}' is already added to phonebook`)
      return
    }

    const person = {
      id: persons.length,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const onNameChange = (event) => setNewName(event.target.value)
  const onNumberChange = (event) => setNewNumber(event.target.value)


  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App