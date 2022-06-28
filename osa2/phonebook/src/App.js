import React, {useState, useEffect} from "react";

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons"
import Notification from "./components/Notification"

import personService from "./services/personService";

function App() {
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState({message: null, error: false})

  useEffect(() => {
    personService
    .getAll()
    .then(initPersons => {
      setPersons(initPersons)
    })
  }, [])
  
  const [filter, setFilter] = useState("")
  const [newPerson, setNewPerson] = useState({ name: "", number: "" })

  const handleChange = (e) => {
    const value = e.target.value
    setNewPerson({
      // creates copy of newPerson
      ...newPerson,
      // updates value of newPerson with value from box that is currently being
      // written to and value from current input box
      [e.target.name]: value,
    })
  }

  const addPerson = (e) => {
    e.preventDefault()
    let dubplicate = false
    let dubplicatePerson = ""

    // checks if person being added is already in the list
    persons.forEach(person => {
      if(person.name.trim() === newPerson.name.trim()){
        dubplicate = true
        dubplicatePerson = person
      } 
    });

    // adds person if name is not on the list
    if(!dubplicate) {
      // adds person to db
      personService
        .addPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons => persons.concat(returnedPerson))
        })
        .catch(error => {
          handleMessage({message: error.response.data.error, error: true})
          console.log(error)
        })
        setNewPerson({ name: "", number: "" })
    } else {
      // alerts if person is already in the phonebook
      if (window.confirm(`${dubplicatePerson.name} is already in the phonebook`)) {
        personService
          .changeNumber(dubplicatePerson.id, newPerson)
          .then(returnedPerson => {
            const updatedPersons = persons.map(person => 
              person.id !== returnedPerson.id ? person : returnedPerson)
          setPersons(updatedPersons)
          })
      }
    }
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .delPerson(person.id)
        .then(() => {
          const deletedPersons = persons.filter(element => element.id !== person.id)
          setPersons(deletedPersons)
          handleMessage({message: `${person.name} was removed`, error: false})
        })
        .catch(error => {
          handleMessage({message: error, error: true})
        })
    }
  }

  const handleMessage = ({message, error}) => {
    setNotification({message: message, error: error})
    setTimeout(() => {
      setNotification({message: null, error: false})
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification}/>

      <Filter handleFilter={handleFilter} />

      <PersonForm 
        addPerson={addPerson}
        handleChange={handleChange}
        newPerson={newPerson}
      />
    
      <Persons 
        persons={persons} 
        filter={filter} 
        deletePerson={deletePerson} 
      />
    </div>
  )
}

export default App;
