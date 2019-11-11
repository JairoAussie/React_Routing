import React, { Fragment, useState } from "react"
import { Navbar } from "react-bulma-components"

function navLoggedIn() {
    return (
        <Fragment>
            <Navbar.Container position="start">
                <Navbar.Item href="#">Logout</Navbar.Item>
            </Navbar.Container>
            <Navbar.Container position="end">
                        <Navbar.Item href="#">Add Post</Navbar.Item>
                        <Navbar.Item href="#">Categories</Navbar.Item>
                        <Navbar.Item href="/about">About</Navbar.Item>
                        <Navbar.Item href="/">Home</Navbar.Item>
                        <Navbar.Item href="#">My Blog</Navbar.Item>
            </Navbar.Container>
        </Fragment>
    )
}

function navLoggedOut() {
    return (
        <Fragment>
            <Navbar.Container position="start">
                    <Navbar.Item href="#">Login</Navbar.Item>
                    <Navbar.Item href="#">Register</Navbar.Item>
            </Navbar.Container>
            <Navbar.Container position="end">
                <Navbar.Item href="#">Categories</Navbar.Item>
                <Navbar.Item href="/about">About</Navbar.Item>
                <Navbar.Item href="/">Home</Navbar.Item>
            </Navbar.Container>
        </Fragment>
    )
}


// The Nav component renders the nav bar at the top of the page
// It is a class component because it requires state to manage the hamburger menu toggle
const Nav = (props) => {

    const [active, setActive] = useState(false)
    const {loggedInUser} = props

    return (
        // active is stored in state, and used to toggle the hamburger menu
        // const { loggedInUser } = this.props
        
            <Navbar color="info" fixed="top"  active={active}>
                <Navbar.Brand>
                    <Navbar.Item renderAs="p">{loggedInUser || "guest"}</Navbar.Item>
                    <Navbar.Burger onClick={() => {setActive(!active)}} />
                </Navbar.Brand>
                <Navbar.Menu>
                    {/* Render the relevant links depending on whether or not a user is logged in  */}
                    {loggedInUser ? navLoggedIn() : navLoggedOut()}
                </Navbar.Menu>
            </Navbar>
        
    )
}
export default Nav