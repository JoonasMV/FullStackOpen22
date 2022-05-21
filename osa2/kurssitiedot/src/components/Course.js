const Course = (props) => {

    let courses = []
    props.course.forEach(element => {
      //console.log(element.name)
      let course = 
      <div key={element.id}>
        <Header name={element.name} />
        <Content parts={element.parts} />
        <Total parts={element.parts} />
      </div>
      courses.push(course)
    })
    return (
      <>
        {courses}
      </>
    )
  }
  const Header = (props) => {
    //console.log(props)
      return (
          <h1>
              {props.name}
          </h1>
      )
  }
  
  const Part = (props) => {
      return (
          <p>
              {props.name} {props.exercises}
          </p>
      )
  }
  
  const Content = (props) => {
  
      let parts = []
      props.parts.forEach(element => {
          let row = <Part name={element.name} exercises={element.exercises} key={element.name.toString()} />
          parts.push(row)
      })
      
      return (
          <div>
              {parts}
          </div>
      )
  }
  
  const Total = (props) => {
    const all = [] 
    props.parts.forEach(element => {
      all.push(element.exercises)
    })
    //console.log(all)
  
    const initialValue = 0
      const total = all.reduce(
        (s, p) => s + p, initialValue
        )
  
      return (
          <p>
              <strong>Total of {total} exercises</strong>
          </p>
      )
  }
  

export default Course