import React, {Component} from "react";
import {Card, Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import MyToast from "./MyToast";

export default class UserAdd extends Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.userChange = this.userChange.bind(this);
        this.SubmitUser = this.SubmitUser.bind(this);
    }

    initialState = {
        id: "", email: "", rank: "", password: ""
    }

    componentDidMount() {
        const userId = +this.props.match.params.id;
        if(userId != null){
            this.finUserById(userId);
        }
    }

    finUserById = (UserId) => {
        axios.get("http://localhost:8080/api/Users?index="+UserId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        id: response.data.id,
                        email: response.data.email,
                        rank: response.data.rank,
                        password: response.data.password
                    })
                }
            }).catch((error) => {
            console.error("Error" + error)
        })
    }

    resetForm = () => {
        this.setState(() => this.initialState)
    }

    updateUser = event => {
        event.preventDefault();

        const user = {
            id : this.state.id,
            password: this.state.password,
            email: this.state.email,
            rank: this.state.rank
        }
        console.log(user)

        axios.put("http://localhost:8080/api/Users", user)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true, "method":"put"})
                    setTimeout(() => this.setState({"show":false}), 3000)
                    setTimeout(() => this.usersList(), 3000)
                } else{
                    this.setState({"show":false})
                }
            })
        this.setState(this.initialState)
    }

    SubmitUser = event => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            rank: "CLIENT",
            password: this.state.password
        }

        axios.post("http://localhost:8080/api/Users", user)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true, "method":"post"})
                    setTimeout(() => this.setState({"show":false}), 3000)
                    setTimeout(() => this.usersList(), 3000)
                } else{
                    this.setState({"show":false})
                }
            })
        this.setState(this.initialState)
    }

    userChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    usersList = () => {
        return this.props.history.push("/users")
    }

    render() {
        const {id, email, rank, password} = this.state;

        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ?
                        "User updated Successfully." : "User saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark text-black"} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)'
                }}>
                    <Card.Header><FontAwesomeIcon icon={this.state.id !== "" ? faEdit : faPlusSquare}/>
                        {this.state.id !== "" ? " Update User" : " Add new User"}</Card.Header>
                    <Form id={"UserFormId"} onSubmit={this.state.id !== "" ?
                        this.updateUser : this.SubmitUser} onReset={this.resetForm}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required autoComplete={"off"} type="text" placeholder="Enter Email"
                                                  className={"text-black"} name={"email"}
                                                  style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                                                  value={email} onChange={this.userChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"password"} placeholder="Password"
                                                  className={"text-black"}
                                                  style={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                                                  name={"password"}
                                                  value={password} onChange={this.userChange}/>
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
                            {this.state.id !== "" ?
                                <Button variant="info" type="button" onClick={this.usersList.bind()}>
                                    <FontAwesomeIcon icon={faList}/> Users List
                                </Button> : null
                            }
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}