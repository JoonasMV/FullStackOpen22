import { useState, useEffect } from "react"

import contactService from "./services/ContactService"

import Contacts from "./modules/Contacts"
import PersonForm from "./modules/PersonForrm"
import Filter from "./modules/Filter"
import Notification from "./modules/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notification, setNotification] = useState({
    message: null,
    error: false,
  })

  useEffect(() => {
    contactService.getAll().then((response) => {
      setPersons(response)
      setFilteredPersons(response)
    })
  }, [])

  const addContact = (e) => {
    e.preventDefault()
    const duplicate = persons.find((person) => person.name === newName)
    if (duplicate) {
      if (window.confirm(`${newName} already added, replace the old number with a new one?`)) {
        updateContact(duplicate.id, { name: newName, number: newNumber })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    contactService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response))
        setFilteredPersons(persons.concat(response))
        setNewName("")
        setNewNumber("")
        handleNotification(`${newName} added to contacts`, false)
      })
      .catch((err) => { 
        //console.log(err.response.data.error)
        handleNotification(err.response.data.error, true) 
      })
  }

  const removeContact = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      contactService
        .remove(id)
        .then(() => {
          const newPersons = persons.filter((person) => person.id !== id)
          setPersons(newPersons)
          setFilteredPersons(newPersons)
          handleNotification(`${name} successfully deleted`, false)
        })
        .catch((err) => handleNotification(`Error deleting ${name}`, true))
    }
  }

  const updateContact = (id, newContact) => {
    contactService
      .update(id, newContact)
      .then((returnedContact) => {
        const newPersons = persons.map((person) =>
          person.id !== id ? person : returnedContact
        )
        setPersons(newPersons)
        setFilteredPersons(newPersons)
        handleNotification(`${newContact.name} successfully updated`, false)
      })
      .catch((err) => {
        handleNotification(`${newContact.name} was already deleted`, true)
        const newPersons = persons.filter((person) => person.id !== id)
        setPersons(newPersons)
        setFilteredPersons(newPersons)
      })
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(
      e.target.value,
      setFilteredPersons(
        persons.filter((person) => person.name.toLowerCase().includes(filter))
      )
    )
  }

  const handleNotification = (msg, err) => {
    setNotification({ message: msg, error: err })
    setTimeout(() => {
      setNotification({ message: null, error: false })
    }, 3000)
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Contacts persons={filteredPersons} removeContact={removeContact} />
    </div>
  )
}

export default App
