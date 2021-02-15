import React, {Component} from "react";
import {Card, Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import MyToast from "./MyToast";

export default class SupplyAddModal extends Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.supplyChange = this.supplyChange.bind(this);
        this.SubmitSupply = this.SubmitSupply.bind(this);
    }

    initialState = {
        supplyID: "",
        name: "",
        amount: ""
    }

    componentDidMount() {

    }


    resetForm = () => {
        this.setState(() => this.initialState)
    }


    SubmitSupply = event => {
        event.preventDefault();

        const supply = {
            name: this.state.name,
            amount: this.state.amount
        }

        axios.post("http://localhost:8080/api/Supplies", supply)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true, "method":"post"})
                    setTimeout(() => this.setState({"show":false}), 3000)
                } else{
                    this.setState({"show":false})
                }
            })
        this.setState(this.initialState)
    }

    supplyChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    suppliesList = () => {
        return this.props.history.push("/storage")
    }

    render() {
        const {supplyID, name, amount} = this.state;

        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ?
                        "Supply updated Successfully." : "Supply saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark text-black bg-trans"}>
                    <Card.Header><FontAwesomeIcon icon={supplyID !== "" ? faEdit : faPlusSquare}/>
                        {supplyID !== "" ? " Update Supply" : " Add new Supply"}</Card.Header>
                    <Form id={"SupplyFormId"} onSubmit={supplyID !== "" ?
                        this.updateSupply : this.SubmitSupply} onReset={this.resetForm}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete={"off"} type="text" placeholder="Enter Name"
                                                  className={"text-black bg-trans"} name={"name"}
                                                  value={name} onChange={this.supplyChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"value"} placeholder="Amount"
                                                  className={"text-black bg-trans"} name={"amount"}
                                                  value={amount} onChange={this.supplyChange}/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {supplyID !== "" ? "Update" : "Save"}
                            </Button>{' '}
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            {supplyID !== "" ?
                                <Button variant="info" type="button" onClick={this.suppliesList.bind()}>
                                    <FontAwesomeIcon icon={faList}/> Storage
                                </Button> : null
                            }
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}