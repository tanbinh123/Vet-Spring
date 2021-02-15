import React, {Component} from "react";
import {Navbar, Nav, Image, Button} from "react-bootstrap";
import {Link} from "react-router-dom"
import img from "../images/pet-shop.png"

export default class NavBar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            islogged: false,
            //isloggedin: this.props.history.location.state.isloggedin,
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
                    {this.state.islogged === true && <Link to={""}>logout</Link> }
                </Nav>
                <Nav className={"ml-auto"}>
                    {this.state.islogged === false && <Link to="login" className={"nav-link"}>Login</Link>}
                    <Link to="addusers" className={"nav-link"}>Register</Link>
                </Nav>
            </Navbar>
        )
    }
}
