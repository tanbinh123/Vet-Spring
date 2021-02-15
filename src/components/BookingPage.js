import React, {Component} from "react";
import {Dropdown, Card, Form, Button, Row, DropdownButton} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import MyToast from "./MyToast";

export default class BookingPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            userid: localStorage.getItem("userID"),
            animals: [],
            data2: [],
            day: this.props.history.location.state.day,
            bookAnimalName: "",
            bookAnimalId: "",
            bookTime: ""
        };
    }

    componentDidMount() {
        console.log(this.state.day)
        axios.get("http://localhost:8080/api/Animals/all")
            .then(response => response.data)
            .then((data) => {
                data.map(animal => {
                    if (animal.owner !== null) {
                        if (animal.owner.id == this.state.userid) {
                            this.state.data2.push(animal.name)
                        }
                    }
                })

                this.setState({
                    "animals": this.state.data2
                })
            })
    }

    getAnimalbyName = (name) => {
        axios.get("http://localhost:8080/api/Animals/all")
            .then(response => response.data)
            .then((data) => {
                data.map(animal => {
                    if (animal.owner !== null) {
                        if (animal.owner.id == this.state.userid) {
                            if(animal.name == name){
                                this.setState({
                                    "bookAnimalId": animal.animalID
                                }, () =>{
                                    this.bookVisit()
                                })
                                    console.log(this.state.bookAnimalId)

                            }
                        }
                        }
                    })
                })
    }

    bookVisit = () => {

            let visit = {
                day: this.state.day,
                time: this.state.bookTime,
                animal: {"animalID": this.state.bookAnimalId},
                client: {"id": this.state.userid}
            }

            console.log(visit)

            axios.post("http://localhost:8080/api/Visits", visit)
                .then(response => {
                    if (response.data != null) {
                        this.clientCalendar()
                    }
                })
    }

    typeChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    clientCalendar = () => {
        return this.props.history.push("/booking")
    }


    render() {

        const {bookAnimalName, bookTime} = this.state;

        return(
            <div>
                <Card className={"border border-dark text-black bg-trans"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Book a Visit</Card.Header>
                    <Form id={"BookingFormId"}  >
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control required autoComplete={"off"} type="text" placeholder="Enter Visit Time"
                                                  className={"text-black"} name={"bookTime"}
                                                  style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                                                  value={bookTime} onChange={this.typeChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Animal</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"text"} placeholder="Animal to Visit"
                                                  className={"text-black"}
                                                  style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                                                  name={"bookAnimalName"}
                                                  value={bookAnimalName} onChange={this.typeChange}/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        {/*<Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control required autoComplete={"off"} as={"select"}
                                                  className={"text-black bg-trans"} name={"time"}
                                                  value={time} > {this.options()}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Animal</Form.Label>
                                    <Form.Control required autoComplete={"off"} as={"select"} placeholder="Amount"
                                                  className={"text-black bg-trans"} name={"name"}
                                                  value={animal} > {this.optionsAnimal()}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>*/} {/*not working dropdown, maybe fix ?*/ }
                        <Card.Footer>
                            <Button variant="success" type="button" onClick={() => this.getAnimalbyName(bookAnimalName)}>
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