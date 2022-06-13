import Person from "./Person"
const Persons = ({ persons, deletePerson, filter }) => {

   let personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))
   return (
      <div>
         <h2>Numbers</h2>
         {personsToShow.map(person =>
            <Person key={person.name} person={person} deletePerson={deletePerson} />
            )}
      </div>
   )
}

export default Persons