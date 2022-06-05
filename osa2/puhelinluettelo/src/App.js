import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  // makes an array from JSON file
  useEffect(() => {
    //console.log("onMount")
    axios
    .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        // sets showPersons for initial render
        setShowPersons(response.data)
      })
  }, [])

  const [newPerson, setNewPerson] = useState({
    name: "",
    number: ""
  })

  const [filter, setFilter] = useState("")
  const [showPersons, setShowPersons] = useState(persons)

  const handleChange = (event) => {
    const value = event.target.value
    setNewPerson({
      ...newPerson,
      [event.target.name]: value,
    })
    console.log(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let match = false

    // checks if name is already in the phonebook
    persons.forEach(element => {
      if (element.name === newPerson.name) {
        match = true
      }
    });

    // adds a new contact if the name is not already in the phonebook
    if (!match) {
      setPersons(persons.concat(newPerson))
      if(newPerson.name.toLocaleLowerCase().includes(filter)){
        setShowPersons(showPersons.concat(newPerson))
        // resets fields if number is added
        setNewPerson({
          name: "",
          number: ""
        })
      }
    } else {
      alert(`${newPerson.name} is already in the phonebook`)
    }
  }

  const handleFilter = (event) => {
    const filterInput = event.target.value
    setFilter(filterInput)

    setShowPersons(
      persons.filter(person => person.name.toLowerCase().includes(filterInput))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} handleChange={handleChange} newPerson={newPerson} />
     
      <h2>Numbers</h2>
      <Persons persons={showPersons} />
    </div>
  )
}

export default App