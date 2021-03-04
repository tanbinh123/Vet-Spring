import React, {Component} from "react";
import {Dropdown, Card, Form, Button, Row, DropdownButton} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import MyToast from "./MyToast";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export default class BookingPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isVisit: "",
            userid: localStorage.getItem("userID"),
            animals: [],
            data2: [],
            visits: [],
            day: this.props.history.location.state.day,
            bookAnimalName: "",
            bookAnimalId: "",
            bookTime: ""
        };
    }

    componentDidMount() {
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

        axios.get("http://localhost:8080/api/Visits/all")
            .then(response => response.data)
            .then((data) => {
                data.map(visit => {
                    this.state.data2.push(visit)
                })

                this.setState({
                    "visits": this.state.data2
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
                            }
                        }
                        }
                    })
                })
    }

    checkVisitExistance = () => {
        this.state.visits.map(visit => {
            if(visit !== "Fufu"){
                let minute = parseInt(this.state.bookTime.slice(3, 5))
                let Vminute = parseInt(visit.time.slice(3, 5))
                let hour = parseInt(this.state.bookTime.slice(0, 2))
                let Vhour = parseInt(visit.time.slice(0, 2))
                let minutesConverted = hour * 60 + minute
                let VminutesConverted = Vhour * 60 + Vminute
                let diff = Math.abs(VminutesConverted - minutesConverted)
                if(visit.day === this.state.day)
                        if(diff < 30)
                            this.state.isVisit = true
            }
        })
    }

    bookVisit = () => {

        let visit = {
            day: this.state.day,
            time: this.state.bookTime,
            animal: {"animalID": this.state.bookAnimalId},
            client: {"id": this.state.userid}
        }

        this.checkVisitExistance()

        if(this.state.isVisit !== true) {
            axios.post("http://localhost:8080/api/Visits", visit)
                .then(response => {
                    if (response.data != null) {
                        this.clientCalendar()
                    }
                })
            }
            else{
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 6000);

            }
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
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Time not available."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark text-black bg-trans"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Book a Visit</Card.Header>
                    <Form id={"BookingFormId"}  >
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control required autoComplete={"off"} type="text" placeholder="Enter Visit Time"
                                                  className={"text-black bg-trans"} name={"bookTime"}
                                                  value={bookTime} onChange={this.typeChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Animal</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"text"} placeholder="Animal to Visit"
                                                  className={"text-black bg-trans"}
                                                  name={"bookAnimalName"}
                                                  value={bookAnimalName} onChange={this.typeChange}/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                           {/* <Form.Row>
                                <select id = "dropdown" value={""} defaultValue={""}>
                                    <option value="N/A">N/A</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>

                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control required autoComplete={"off"} as={"select"}
                                                  className={"text-black bg-trans"} name={"time"}
                                                  value={bookTime} onChange={this.typeChange}>
                                        <option value={"12:00"}>12:00</option>
                                        <option value={"12:30"}>12:30</option>
                                        <option>14:00</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Animal</Form.Label>
                                    <Form.Control required autoComplete={"off"} as={"select"} placeholder="Amount"
                                                  className={"text-black bg-trans"} name={"name"}
                                                  value={animal} > {this.optionsAnimal()}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>*/}
                       {/*not working dropdown, maybe fix ?*/ }
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