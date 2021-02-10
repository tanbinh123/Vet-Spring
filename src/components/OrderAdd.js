import React, {Component} from "react";
import {Card, Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import MyToast from "./MyToast";

export default class OrderAdd extends Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.orderChange = this.orderChange.bind(this);
        this.SubmitOrder = this.SubmitOrder.bind(this);
    }

    initialState = {
        ordersID: "",
        name: "",
        amount: ""
    }

    componentDidMount() {
        const orderId = +this.props.match.params.id;
        if(orderId != null){
            this.finOrderById(orderId);
        }
    }

    finOrderById = (OrderId) => {
        axios.get("http://localhost:8080/api/Orders?index="+OrderId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        ordersID: response.data.ordersID,
                        name: response.data.name,
                        amount: response.data.amount
                    })
                }
            }).catch((error) => {
            console.error("Error" + error)
        })
    }

    resetForm = () => {
        this.setState(() => this.initialState)
    }

    updateOrder = event => {
        event.preventDefault();

        const order = {
            ordersID : this.state.ordersID,
            name: this.state.name,
            amount: this.state.amount
        }
        {console.log(order)}

        axios.put("http://localhost:8080/api/Orders", order)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true, "method":"put"})
                    setTimeout(() => this.setState({"show":false}), 3000)
                    setTimeout(() => this.ordersList(), 3000)
                } else{
                    this.setState({"show":false})
                }
            })
        this.setState(this.initialState)
    }

    SubmitOrder = event => {
        event.preventDefault();

        const order = {
                name: this.state.name,
                amount: this.state.amount
        }

        axios.post("http://localhost:8080/api/Orders", order)
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

    orderChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    ordersList = () => {
        return this.props.history.push("/orders")
    }

    render() {
        const {ordersID, name, amount} = this.state;

        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ?
                        "Order updated Successfully." : "Order saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark text-black"} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)'
                }}>
                    <Card.Header><FontAwesomeIcon icon={ordersID !== "" ? faEdit : faPlusSquare}/>
                        {ordersID !== "" ? " Update Order" : " Add new Order"}</Card.Header>
                    <Form id={"OrderFormId"} onSubmit={ordersID !== "" ?
                        this.updateOrder : this.SubmitOrder} onReset={this.resetForm}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete={"off"} type="text" placeholder="Enter Name"
                                                  className={"text-black"} name={"name"}
                                                  style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                                                  value={name} onChange={this.orderChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"value"} placeholder="Amount"
                                                  className={"text-black"} name={"amount"}
                                                  style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                                                  value={amount} onChange={this.orderChange}/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {ordersID !== "" ? "Update" : "Save"}
                            </Button>{' '}
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            {ordersID !== "" ?
                                <Button variant="info" type="button" onClick={this.ordersList.bind()}>
                                    <FontAwesomeIcon icon={faList}/> Orders List
                                </Button> : null
                            }
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}