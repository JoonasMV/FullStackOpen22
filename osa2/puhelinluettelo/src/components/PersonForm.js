const PersonForm = ({ addPerson, handleChange, newPerson }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: 
                <input
                    type="text"
                    name="name" 
                    value={newPerson.name} 
                    onChange={handleChange}
                />
            </div>
            <div>
                number:
                <input 
                    type="tel"
                    name="number"
                    value={newPerson.number} 
                    onChange={handleChange} 
                />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm