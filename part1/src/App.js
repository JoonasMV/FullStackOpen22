const Hello = (props) => {
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
        </div>
    )
}

const App = () => {
    const nimi = "Pekka"
    const ika = 10

    return (
        <div>
         <h1>Greetings</h1>
         <Hello name="Maya" age={ika + 10} />
         <Hello name="Pekka" age={ika} />
        </div>
    )
}
export default App