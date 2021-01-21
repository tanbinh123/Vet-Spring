import React, {Component} from "react";
import {Jumbotron} from "react-bootstrap";

export default class Welcome extends Component{
    render() {
        return(
            <Jumbotron className={"bg-dark text-white"}>
                <h1>Vet Page</h1>
                <p>
                    bla bla bla
                </p>
            </Jumbotron>
        )
    }
}
