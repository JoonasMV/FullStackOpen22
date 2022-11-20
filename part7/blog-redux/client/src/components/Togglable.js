import { useImperativeHandle, useState, forwardRef } from "react"
import PropTypes from "prop-types"
import StyledButton from "../styled/StyledButton"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const showAll = { display: visible ? "" : "none" }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      {visible && <div style={showAll}>{props.children}</div>}
      <StyledButton buttonSize={"15px"} onClick={toggleVisibility}>
        {(visible && "cancel") || props.buttonLabel}
      </StyledButton>
    </div>
  )
})

Togglable.displayName = "Togglable"

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
