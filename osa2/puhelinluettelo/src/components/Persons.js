import Person from "./Person"
const Persons = ({ persons }) => {
   //console.log(persons)
   return (
      <div>
         {persons.map(person =>
            <Person key={person.name} person={person} />
            )}
      </div>
   )
}

export default Persons