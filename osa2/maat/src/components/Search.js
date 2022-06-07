const Search = ({ handleSearch  }) => {
    return(
        <div>
            find countries
            <input
                type="text"
                onChange={handleSearch}
            />
        </div>
    )
}

export default Search