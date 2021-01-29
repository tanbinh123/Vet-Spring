import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom"

export default class NavBar extends Component{
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Link to={""} className={"navbar-brand"}>
                        icon
                </Link>

                <Nav className="mr-auto">
                    <Link to="add" className={"nav-link"}>Add Animal</Link>
                    <Link to="list" className={"nav-link"}>Animal List</Link>
                    <Link to="users" className={"nav-link"}>Users List</Link>
                </Nav>
            </Navbar>

        )
    }
}
