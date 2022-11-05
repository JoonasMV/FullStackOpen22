import { useImperativeHandle, useState, forwardRef } from "react"

const Togglable = ((props, ref) => {
  const [visible, setVisible] = useState(false)
  const showAll = { display: visible ? "" : "none" }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {return {toggleVisibility}})

  return (
    <div>
      {visible && <div style={showAll}>
        {props.children}
      </div>}
        <button onClick={toggleVisibility}>{visible && "cancel" || props.label}</button>
    </div>
  )
})

export default forwardRef(Togglable)
