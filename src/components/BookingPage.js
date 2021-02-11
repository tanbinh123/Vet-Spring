import React, {Component} from "react";
import {Dropdown, Card, Form, Button, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import MyToast from "./MyToast";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";

export default class BookingPage extends Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        animals: [],
        day: '',
        userid: localStorage.getItem("userID")
    }

    componentDidMount() {
        /*
        * get all animals to local array
        * add animals from local array that have userid
        *
        *
        * */
    }

    clientCalendar = () => {
        return this.props.history.push("/booking")
    }

    options(){
        var tab = []
        for(var i = 9; i < 17; i++){
            tab.push(<option>{i}:00</option>)
            tab.push(<option>{i}:30</option>)
        }
        return tab
    }

    render() {
        const {animal, time} = this.state;

        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ?
                        "Order updated Successfully." : "Order saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark text-black bg-trans"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Book a Visit</Card.Header>
                    <Form id={"VisitFormId"} /* on submit */ >
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control required autoComplete={"off"} as={"select"}
                                                  className={"text-black bg-trans"} name={"time"}
                                                  value={time}> {this.options()}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Animal</Form.Label>
                                    <Form.Control required autoComplete={"off"} as={"select"} placeholder="Amount"
                                                  className={"text-black bg-trans"} name={"animal"}
                                                  value={animal}>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> Book
                            </Button>{' '}
                                <Button variant="info" type="button" onClick={this.clientCalendar}>
                                    <FontAwesomeIcon icon={faList}/> Back to calendar
                                </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}