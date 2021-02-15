import React, {Component} from "react";
import {Card, Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import "./CSS/Style.css"

export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.userChange = this.userChange.bind(this);
    }

    initialState = {
        users: [],
        email: ""
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/Users/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({users: data})
            })

    }

    findUser = (pass) => {
        this.state.users.map(user => {
            if(user.email === this.state.email){
                if(user.password === pass){
                    localStorage.setItem("userID", user.id)
                    localStorage.setItem("userRank", user.rank)
                    this.afterLoginPage(user)
                }
            }
        })
    }

    navbarChange = () => {
        return this.props.history.push({pathname: "/navbar", state: {isloggedin: true}})
    }

    resetForm = () => {
        this.setState(() => this.initialState)
    }

    userChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    afterLoginPage = (user) => {
        if(user.rank === "CLIENT")
            return this.props.history.push("/clientpage")
        else if(user.rank === "WORKER")
            return this.props.history.push("/workerpage")
        else if(user.rank === "ADMIN")
            return this.props.history.push("/adminpage")
    }

    render() {
        const {email, password} = this.state;

        return(
            <div>
                <Card className={"border border-dark text-black bg-trans"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.id !== "" ? faEdit : faPlusSquare}/> Log in</Card.Header>
                    <Form id={"LoginFormId"} onReset={this.resetForm}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required autoComplete={"off"} type="text" placeholder="Enter Email"
                                                  className={"text-black bg-trans"} name={"email"}
                                                  value={email} onChange={this.userChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required autoComplete={"off"} type={"password"} placeholder="Password"
                                                  className={"text-black bg-trans"}
                                                  name={"password"}
                                                  value={password} onChange={this.userChange}/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" type="button" onClick={() => this.findUser(password)}>
                                <FontAwesomeIcon icon={faSave} /> Login
                            </Button>{' '}
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}