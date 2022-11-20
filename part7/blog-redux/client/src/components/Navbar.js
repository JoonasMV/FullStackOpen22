import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../slices/loginSlice"
import styled, { css } from "styled-components"
import StyledButton from "../styled/StyledButton"
import { textStyling, buttonStyling } from "../styled/styles"

const Stylednav = styled.div`
  display: flex;
  padding: 10px;
`
const MenuButton = styled(StyledButton)`
  ${buttonStyling}
  margin-right: 20px;
`
const UserInfo = styled.div`
  font-family: Consolas;
  font-size: 25px;
  padding: 10px;
  margin-left: auto;
`

const Container = styled.div`
  display: flex;
`

const StyledLink = styled(Link)`
  ${textStyling}
  text-decoration: none;
`

const Navbar = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.login)

  const padding = {
    paddingRight: 5,
  }

  return (
    <Container>
      <Stylednav>
        <MenuButton>
          <StyledLink to="/">Home </StyledLink>
        </MenuButton>
        <MenuButton>
          <StyledLink to="/users">Users</StyledLink>
        </MenuButton>
      </Stylednav>

      <UserInfo>
        <strong>{loggedInUser.username} logged in</strong>
        <StyledButton onClick={() => dispatch(handleLogout())} style={{marginLeft: "10px"}}>
          Log out
        </StyledButton>
      </UserInfo>
    </Container>
  )
}

export default Navbar
