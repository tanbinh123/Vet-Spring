import React, {Component} from "react";
import {Button, Row, Card, Col} from "react-bootstrap";
import axios from "axios";

export default class ClientPage extends Component{

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
        return this.props.history.push("/visitCalendar")
    }

    booking = () => {
        return this.props.history.push("/booking")
    }

    animalManager = () => {
        return this.props.history.push("/list")
    }


    render() {

        const cardStyle = {
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
        }
        const buttonStyle = {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            color: 'black',
            height: '25vh',
            width: '50vh',
            borderRadius: '40px',
            fontWeight: 'bold',
            fontSize: 20
        }
        const buttonStyle2 = {
            /*backgroundColor: 'rgba(255, 255, 255, 0.9)',*/
            color: 'black',
            height: '25vh',
            width: '50vh',
            borderRadius: '40px',
            fontWeight: 'bold',
            fontSize: 20
        }


        return(
            <Card className={"border border-dark text-black bg-trans"}>
                <Card.Header className={"text-center"} style={{fontWeight: 'bold', fontSize: 25}}>
                    Welcome to Client Panel!
                </Card.Header>

                <Card.Body >
                    <Row>
                        <Col className={"user-text"}>
                            <p style={{fontSize: 40}}>User:</p>
                            <p>{this.state.email}</p>
                        </Col>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark btn-panel"} onClick={this.booking}>
                                Booking
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{paddingTop: 20}}>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark btn-panel"} onClick={this.animalManager}>
                                Animal Manager
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