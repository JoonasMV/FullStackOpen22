const Filter = ({ handleFilter }) => {
    return (
        <div>
            Search:
            <input onChange={handleFilter} />
        </div>
    )
}

export default Filter