import styled from "styled-components"
import { buttonStyling, textStyling } from "./styles"

const StyledButton = styled.button`
  ${buttonStyling}
  ${textStyling}
  font-size: ${props => props.buttonSize};
  
    &:hover {
      background: #FF9F9F;
      cursor: pointer;
    }
`
export default StyledButton