import { createSelectorHook, useDispatch, useSelector } from "react-redux"
import { setFilter } from "../reducers/filterSlice.js"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
    console.log(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter