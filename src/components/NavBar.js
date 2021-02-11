import React, {Component} from "react";
import {Navbar, Nav, Image, Button} from "react-bootstrap";
import {Link} from "react-router-dom"
import img from "../images/pet-shop.png"

export default class NavBar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloggedin: false
        }
    }

    render() {
        return(
            <Navbar style={{
                backgroundColor: 'rgba(255, 255, 255, 0.0)',
                fontWeight: 'bold'
            }}>
                <Link to={""} className={"navbar-brand"}>
                    <Image src={img} style={{
                        width: '120%',
                        height: '120%'
                    }}></Image>
                </Link>

                <Nav className="mr-auto">
                    <Link to="add" className={"nav-link"}>Add Animal</Link>
                    <Link to="list" className={"nav-link"}>Animal List</Link>
                    <Link to="users" className={"nav-link"}>Users List</Link>
                    <Link to="orders" className={"nav-link"}>Orders List</Link>
                    <Link to="addorders" className={"nav-link"}>Order Add</Link>
                    <Link to="storage" className={"nav-link"}>Storage</Link>
                    <Link to="addsupply" className={"nav-link"}>Supply Add</Link>
                    <Link to="booking" className={"nav-link"}>Booking</Link>
                    <Link to="clientpage" className={"nav-link"}>Client</Link>
                    {this.state.isloggedin === true && <Link to={""}>logout</Link> }
                </Nav>
                <Nav className={"ml-auto"}>
                    {this.state.isloggedin === false && <Link to="login" className={"nav-link"}>Login</Link>}
                    <Link to="addusers" className={"nav-link"}>Register</Link>
                </Nav>
            </Navbar>
    )
    }
}
