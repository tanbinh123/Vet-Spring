import React, {Component} from "react";
import {Button, Row, Card, Col} from "react-bootstrap";
import axios from "axios";

export default class WorkerPage extends Component{

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

    visitCalendar = () => {
        return this.props.history.push("/visitsAdmin")
    }

    orders = () => {
        return this.props.history.push("/addsupply")
    }

    storage = () => {
        return this.props.history.push("/storage")
    }


    render() {

        return(
            <Card className={"border border-dark text-black bg-trans"}>
                <Card.Header className={"text-center"} style={{fontWeight: 'bold', fontSize: 25}}>
                    Welcome to Worker Panel!
                </Card.Header>

                <Card.Body >
                    <Row>
                        <Col className={"user-text"}>
                            <p style={{fontSize: 40}}>User:</p>
                            <p>{this.state.email}</p>
                        </Col>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark"} variant={"outline-info btn-panel"} onClick={this.orders}>
                                Orders
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{paddingTop: 20}}>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark btn-panel"}onClick={this.storage}>
                                Storage
                            </Button>
                        </Col>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark btn-panel"} onClick={this.visitCalendar}>
                                Visit Calendar
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        )}
}