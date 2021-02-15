import {React, Component} from "react";
import {Button, ButtonGroup, Card, FormControl, InputGroup, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faStepForward, faFastBackward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import MyToast from "./MyToast";
import {Link} from "react-router-dom";
import "./CSS/Style.css"


export default class VisitsAdmin extends Component{

    constructor(props) {
        super(props);
        this.state = {
            visits: [],
            data2: [],
            currentPage: 1,
            visitsPerPage: 5,
        };
    }

    componentDidMount() {
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

    deleteVisit = (visitId) =>{
        axios.delete("http://localhost:8080/api/Visits?index=" + visitId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        visits: this.state.visits.filter(visit => visit.visitID !== visitId)
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
        if(this.state.currentPage < Math.ceil(this.state.visits.length / this.state.visitsPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    }

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.visits.length / this.state.visitsPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.visits.length / this.state.visitsPerPage)
            })
        }
    }

    panel = () => {
        console.log(localStorage.getItem("userRank"))
        if(localStorage.getItem("userRank") === "ADMIN")
            return this.props.history.push("/adminpage")
        else if(localStorage.getItem("userRank") === "WORKER")
            return this.props.history.push("/workerpage")
    }


    render(){

        const {visits, currentPage, visitsPerPage} = this.state;
        const lastIndex = currentPage * visitsPerPage;
        const firstIndex = lastIndex - visitsPerPage;
        const currentVisits = visits.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(this.state.visits.length / this.state.visitsPerPage)

        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Visit deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark text-white bg-trans"}>
                    <Card.Header>
                        <div style={{"float":"left", fontWeight: 'bold', color: 'black'}}>
                            <FontAwesomeIcon icon={faList}/> Visits List
                        </div>
                        <div style={{"float":"left", fontWeight: 'bold', color: 'black'}}>
                            <Button size={"sm"} className={"back-btn"} onClick={this.panel}>
                                Back to Panel
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant={"secondary bg-trans"}>
                            <thead>
                            <tr>
                                <th>Day</th>
                                <th>Time</th>
                                <th>Animal</th>
                                <th>Client</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {visits.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"6"}>{visits.length}</td>
                                </tr>   :
                                currentVisits.map((visit) => (
                                    <tr key={visit.id}>
                                        <td>
                                            {visit.day}
                                        </td>
                                        <td>
                                            {visit.time}
                                        </td>
                                        <td>
                                            {visit.animal.name}
                                        </td>
                                        <td>
                                            {visit.client.email}
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                {/*<Link to={"edit/"+animal.animalID} className={"btn btn-sm btn-outline-primary"} size={"sm"}><FontAwesomeIcon icon={faEdit}/></Link>*/}
                                                <Button size={"sm"} variant={"outline-danger"} onClick={this.deleteVisit.bind(this, visit.visitID)}><FontAwesomeIcon icon={faTrash}/></Button>
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
                                    <Button type={"button"} variant={"outline-dark"} disabled={currentPage === 1}
                                            onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward}/> First
                                    </Button>
                                    <Button type={"button"} variant={"outline-dark"} disabled={currentPage === 1}
                                            onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward}/> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl className={"pageNumCss"} name={"currentPage"} value={currentPage}
                                             onChange={this.changePage}/>
                                <InputGroup.Append>
                                    <Button type={"button"} variant={"outline-dark"} disabled={currentPage === totalPages}
                                            onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faStepForward}/> Next
                                    </Button>
                                    <Button type={"button"} variant={"outline-dark"} disabled={currentPage === totalPages}
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

