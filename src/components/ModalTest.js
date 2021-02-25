import {Component} from "react";
import React from "react";
import {Button, Card, Form, Modal} from "react-bootstrap";
import Animal from "./Animal";
import MyToast from "./MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import axios from "axios";

export default class ModalTest extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.animalChange = this.animalChange.bind(this);
        this.SubmitAnimal = this.SubmitAnimal.bind(this);
    }

    initialState = {
        id: "", name: "", age: "", typ: "", show: true
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
            typ: this.state.typ
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
            typ: this.state.typ
        }

        axios.post("http://localhost:8080/api/Animals", animal)
            .then(response => {
                if(response.data != null){
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

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        const {name, age, animalID, typ} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={this.state.method === "put" ?
                        "Animal updated Successfully." : "Animal saved Successfully."} type={"success"}/>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose} className={"border border-dark bg-dark text-white"}>
                    <Modal.Header><FontAwesomeIcon icon={this.state.id !== "" ? faEdit : faPlusSquare}/>
                        {this.state.id !== "" ? " Update Animal" : " Add new Animal"}</Modal.Header>
                    <Form id={"AnimalFormId"} onSubmit={this.state.id !== "" ?
                        this.updateAnimal : this.SubmitAnimal} onReset={this.resetForm}>
                        <Modal.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete={"off"} type="text" placeholder="Enter a Name"
                                                  className={"bg-dark text-white"} name={"name"}
                                                  value={name} onChange={this.animalChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"number"} placeholder="Age"
                                                  className={"bg-dark text-white"} name={"age"}
                                                  value={age} onChange={this.animalChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"text"} placeholder="Type"
                                                  className={"bg-dark text-white"} name={"typ"}
                                                  value={typ} onChange={this.animalChange}/>
                                </Form.Group>
                            </Form.Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id !== "" ? "Update" : "Save"}
                            </Button>{' '}
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button variant="info" type="button" onClick={this.animalList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Animal List
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}