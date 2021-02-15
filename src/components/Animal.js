import React, {Component} from "react";
import {Card, Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import MyToast from "./MyToast";

export default class Animal extends Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.animalChange = this.animalChange.bind(this);
        this.SubmitAnimal = this.SubmitAnimal.bind(this);
    }

    initialState = {
        id: "", name: "", age: "", typ: "", ownerid: localStorage.getItem("userID")
    }

    componentDidMount() {
        const animalId = +this.props.match.params.id;
        if(animalId != null){
           this.finAnimalById(animalId);
        }
    }

    finAnimalById = (animalId) => {
        axios.get("http://localhost:8080/api/Animals?index="+animalId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        id: response.data.animalID,
                        name: response.data.name,
                        age: response.data.age,
                        typ: response.data.typ
                    })
                }
            }).catch((error) => {
            console.error("Error" + error)
        })
    }

    resetForm = () => {
        this.setState(() => this.initialState)
    }

    updateAnimal = event => {
        event.preventDefault();

        const animal = {
            name: this.state.name,
            animalID : this.state.id,
            age: this.state.age,
            typ: this.state.typ,
            owner: {
                "id": this.state.ownerid
            }
        }

        axios.put("http://localhost:8080/api/Animals", animal)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true, "method":"put"})
                    setTimeout(() => this.setState({"show":false}), 3000)
                    setTimeout(() => this.animalList(), 3000)
                } else{
                    this.setState({"show":false})
                }
            })
        this.setState(this.initialState)
    }

    SubmitAnimal = event => {
        event.preventDefault();

        const animal = {
            name: this.state.name,
            age: this.state.age,
            typ: this.state.typ,
            owner: {
                "id": this.state.ownerid
            }
        }

        axios.post("http://localhost:8080/api/Animals", animal)
            .then(response => {
                if(response.data != null){
                    console.log(animal)
                    this.setState({"show":true, "method":"put"})
                    setTimeout(() => this.setState({"show":false}), 3000)
                } else{
                    this.setState({"show":false})
                }
            })
        this.setState(this.initialState)
    }

    animalChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    animalList = () => {
        return this.props.history.push("/list")
    }

    render() {
        const {name, age, animalID, typ} = this.state;

        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ?
                        "Animal updated Successfully." : "Animal saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark text-black"}
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
                    <Card.Header><FontAwesomeIcon icon={this.state.id !== "" ? faEdit : faPlusSquare}/>
                    {this.state.id !== "" ? " Update Animal" : " Add new Animal"}</Card.Header>
                    <Form id={"AnimalFormId"} onSubmit={this.state.id !== "" ?
                        this.updateAnimal : this.SubmitAnimal} onReset={this.resetForm}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete={"off"} type="text" placeholder="Enter a Name"
                                                  className={"text-black"} name={"name"}
                                                  style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                                                  value={name} onChange={this.animalChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"number"} placeholder="Age"
                                                  className={"text-black"} name={"age"}
                                                  style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                                                  value={age} onChange={this.animalChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"text"} placeholder="Type"
                                                  className={"text-black"} name={"typ"}
                                                  style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                                                  value={typ} onChange={this.animalChange}/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id !== "" ? "Update" : "Save"}
                            </Button>{' '}
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button variant="info" type="button" onClick={this.animalList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Animal List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}