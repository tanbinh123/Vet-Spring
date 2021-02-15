import React, {Component} from "react";
import {Button, Row, Card, Col} from "react-bootstrap";
import axios from "axios";
import "./CSS/Style.css"

export default class AdminPage extends Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        email: '',
        userid: localStorage.getItem("userID")
    }

    componentDidMount() {
        this.findUserById()
        console.log(this.state.email)
    }

    findUserById = () => {
        axios.get("http://localhost:8080/api/Users?index="+this.state.userid)
            .then(response => {
                if(response.data != null){
                    console.log(response)
                    this.setState({
                        "email": response.data.email
                    })
                }
            })
    }

    visitManager = () => {
        return this.props.history.push("/visitsadmin")
    }

    userManager = () => {
        return this.props.history.push("/users")
    }

    animalManager = () => {
        return this.props.history.push("/animallistadmin")
    }

    storageManager = () => {
        return this.props.history.push("/storage")
    }



    render() {
        return(
            <Card className={"border border-dark text-black bg-trans"}>
                <Card.Header className={"text-center"} style={{fontWeight: 'bold', fontSize: 25}}>
                    Welcome to Admin Panel!
                </Card.Header>

                <Card.Body >
                    <Row>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark btn-panel"} onClick={this.storageManager}>
                                Manage Storage
                            </Button>
                        </Col>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark btn-panel"} onClick={this.userManager}>
                                Manage Users
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{paddingTop: 20}}>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark btn-panel"} onClick={this.animalManager}>
                                Manage Animals
                            </Button>
                        </Col>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark btn-panel"} onClick={this.visitManager}>
                                Manage Visits
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        )}
}