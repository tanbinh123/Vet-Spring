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
        return this.props.history.push("/visitCalendar")
    }

    orders = () => {
        return this.props.history.push("/addorders")
    }

    storage = () => {
        return this.props.history.push("/storage")
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
            <Card className={"border border-dark text-black"} style={cardStyle}>
                <Card.Header className={"text-center"} style={{fontWeight: 'bold', fontSize: 25}}>
                    Welcome to Worker Panel!
                </Card.Header>

                <Card.Body >
                    <Row>
                        <Col className={"text-center"}>
                            {this.state.email} Profile
                        </Col>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark"} variant={"outline-info"} style={buttonStyle2} onClick={this.orders}>
                                Orders
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{paddingTop: 20}}>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark"} style={buttonStyle} onClick={this.storage}>
                                Storage
                            </Button>
                        </Col>
                        <Col className={"text-center"}>
                            <Button className={"border border-dark"} style={buttonStyle} onClick={this.visitCalendar}>
                                Visit Calendar
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        )}
}