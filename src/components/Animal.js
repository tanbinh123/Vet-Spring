import React, {Component} from "react";
import {Card, Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faPlusSquare, faSave} from '@fortawesome/free-solid-svg-icons';


export default class Animal extends Component{

    constructor(props) {
        super(props);
        this.state = {name: "", age: "", type: ""};
        this.animalChange = this.animalChange.bind(this);
        this.SubmitAnimal = this.SubmitAnimal.bind(this);
    }

    SubmitAnimal(event){
        alert(this.state.name + this.state.age + this.state.type);
        event.preventDefault();
    }

    animalChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Add Animal</Card.Header>
                <Form id={"AnimalFormId"} onSubmit={this.SubmitAnimal}>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId={"formGridTitle"}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter a Name"
                                              className={"bg-dark text-white"} name={"name"}
                                              value={this.state.name} onChange={this.animalChange}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId={"formGridTitle"}>
                                <Form.Label>Age</Form.Label>
                                <Form.Control required type={"number"} placeholder="Age"
                                              className={"bg-dark text-white"} name={"age"}
                                              value={this.state.age} onChange={this.animalChange}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId={"formGridTitle"}>
                                <Form.Label>Type</Form.Label>
                                <Form.Control required type={"text"} placeholder="Type"
                                              className={"bg-dark text-white"} name={"type"}
                                              value={this.state.type} onChange={this.animalChange}/>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> Submit
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        )
    }
}