import {React, Component} from "react";
import {Modal, Button, ButtonGroup, Card, FormControl, InputGroup, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faList,
    faEdit,
    faTrash,
    faStepBackward,
    faStepForward,
    faFastBackward,
    faFastForward,
    faSearch, faTimes
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import MyToast from "./MyToast";
import {Link} from "react-router-dom";
import AnimalModal from "./AnimalModal";
import "./CSS/Style.css"


export default class UserList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersSearch: [],
            search: '',
            currentPage: 1,
            usersPerPage: 5,
            showModal: false,
            showModalEdit: false
        };
    }

    componentDidMount() {
        this.getUsers()
    };

    getUsers = () => {
        axios.get("http://localhost:8080/api/Users/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({users: data})
            })
    }

    findUserByEmail = (userEmail) => {
        this.state.users.map(user => {
            if(user.email === userEmail){
                this.state.usersSearch.push(user)
            }
        })
    }

    switchUsers = (email) => {
        this.findUserByEmail(email)
        this.setState({
            "users": this.state.usersSearch
        })
    }

    deleteUser = (userId) =>{
        axios.delete("http://localhost:8080/api/Users?index=" + userId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        users: this.state.users.filter(user => user.id !== userId)
                    });
                } else{
                    this.setState({"show":false})
                }
            })
    }

    changePage = event =>{
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    cancelSearch = () => {
        this.setState({
            "search": ''
        })
        this.getUsers()
    }

    firstPage = () => {
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: 1
            })
        }
    }

    prevPage = () => {
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
    }

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    }

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.users.length / this.state.usersPerPage)
            })
        }
    }



    render(){

        const {users, currentPage, usersPerPage, search} = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(this.state.users.length / this.state.usersPerPage)

        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"User deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark text-white"} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)'
                }}>
                    <Card.Header>
                        <div style={{"float":"left", fontWeight: 'bold', color: 'black'}}>
                            <FontAwesomeIcon icon={faList}/> Users List
                        </div>
                        <div style={{"float":"right", fontWeight: 'bold', color: 'black'}}>
                            <InputGroup size={"sm"}>
                                <FormControl placeholder={"Search"} name={"search"} value={search}
                                             className={"text-black info-border"} onChange={this.searchChange} />
                                    <InputGroup.Append>
                                        <Button size={"sm"} variant={"outline-info"}
                                                type={"button"} onClick={() => this.switchUsers(search)}>
                                            <FontAwesomeIcon icon={faSearch}/>
                                        </Button>
                                        <Button size={"sm"} variant={"outline-danger"}
                                                type={"button"} onClick={this.cancelSearch}>
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </Button>
                                    </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant={"secondary"} style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.4)'
                        }}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Rank</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"6"}>{users.length}</td>
                                </tr>   :
                                currentUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td>
                                            {u.id}
                                        </td>
                                        <td>
                                            {u.email}
                                        </td>
                                        <td>
                                            {u.rank}
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editu/"+u.id} className={"btn btn-sm btn-outline-primary"} size={"sm"}><FontAwesomeIcon icon={faEdit}/></Link>
                                                <Button size={"sm"} variant={"outline-danger"} onClick={this.deleteUser.bind(this, u.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{"float":"left", color: 'black'}}>
                            Showing page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size={"sm"}>
                                <InputGroup.Prepend>
                                    <Button type={"button"} variant={"outline-info"} disabled={currentPage === 1}
                                            onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward}/> First
                                    </Button>
                                    <Button type={"button"} variant={"outline-info"} disabled={currentPage === 1}
                                            onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward}/> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl className={"bg-dark pageNumCss"} name={"currentPage"} value={currentPage}
                                             onChange={this.changePage}/>
                                <InputGroup.Append>
                                    <Button type={"button"} variant={"outline-info"} disabled={currentPage === totalPages}
                                            onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faStepForward}/> Next
                                    </Button>
                                    <Button type={"button"} variant={"outline-info"} disabled={currentPage === totalPages}
                                            onClick={this.lastPage}>
                                        <FontAwesomeIcon icon={faFastForward}/> Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

