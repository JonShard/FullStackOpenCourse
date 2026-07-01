
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello world {props.name}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age}/>
      <Hello name='Artur'/>
      <Hello name='Tollak'/>

    </div>
  )
}

export default App 