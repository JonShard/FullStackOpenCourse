import { useState } from 'react'

const Person = ({ person }) => <>{person.name} - {person.number}<br /></>

const SearchFilter = ({ search, setSearch }) => {
  const onSearchChange = (event) => setSearch(event.target.value)
  return <div>search: <input onChange={onSearchChange} value={search} /></div>
}


const SubmissionForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
  const onNameChange = (event) => setNewName(event.target.value)
  const onNumberChange = (event) => setNewNumber(event.target.value)

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


const Numbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 0,
      name: 'Arto Hellas',
      number: '12345678'
    },
    {
      id: 1,
      name: 'Ada lovalace',
      number: '12345678'
    },
    {
      id: 2,
      name: 'Sam Doufus',
      number: '55345128'
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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

      <Numbers persons={search.length == '' ? persons : persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))} />
    </div>
  )
}

export default App