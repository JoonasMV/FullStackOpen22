const Contact = ({ person, removeContact }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => removeContact(person.id, person.name)}>Delete</button>
    </div>
  )
}

const Contacts = ({ persons, removeContact }) => {
  return (
    <div>
      {persons.map((person) => (
        <Contact key={person.name} person={person} removeContact={removeContact} />
      ))}
    </div>
  )
}

export default Contacts