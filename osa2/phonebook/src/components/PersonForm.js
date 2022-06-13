const PersonForm = ({ addPerson, handleChange, newPerson }) => {
    return (
        <div>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: 
                    <input
                        name="name"
                        onChange={handleChange}
                        // value needed to reset input
                        value={newPerson.name}
                    />
                </div>
                <div>
                    number:
                    <input 
                        name="number"
                        onChange={handleChange}
                        // value needed to reset input
                        value={newPerson.number} 
                    />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
        </form>
      </div>
    )
}

export default PersonForm