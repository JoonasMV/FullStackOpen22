const Filter = ({ handleFilter }) => {
    return (
        <div>
            <form>
                search: 
                <input 
                    onChange={handleFilter}
                />
            </form>
        </div>
    )
}

export default Filter