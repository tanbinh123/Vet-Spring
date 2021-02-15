import {React, Component} from "react";
import {Modal, Button, ButtonGroup, Card, FormControl, InputGroup, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faStepForward, faFastBackward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import MyToast from "./MyToast";
import {Link} from "react-router-dom";
import "./CSS/Style.css"
import SupplyAddModal from "./SupplyAddModal";

export default class Storage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            supplies: [],
            currentPage: 1,
            suppliesPerPage: 5,
            showModal: false,
            showModalEdit: false
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/Supplies/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({supplies: data})
            })
    };

    deleteSupply = (supplyId) =>{
        axios.delete("http://localhost:8080/api/Supplies?index=" + supplyId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        supplies: this.state.supplies.filter(supply => supply.supplyID !== supplyId)
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
        if(this.state.currentPage < Math.ceil(this.state.orders.length / this.state.ordersPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    }

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.supplies.length / this.state.suppliesPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.supplies.length / this.state.suppliesPerPage)
            })
        }
    }

    handleShow = () => {
        this.setState({
            showModal: true
        })
    }

    handleClose = () => {
        this.setState({
                showModal: false
            })
    }

    panel = () => {
        console.log(localStorage.getItem("userRank"))
        if(localStorage.getItem("userRank") === "ADMIN")
            return this.props.history.push("/adminpage")
        else if(localStorage.getItem("userRank") === "WORKER")
            return this.props.history.push("/workerpage")
    }

    render(){

        const {supplies, currentPage, suppliesPerPage} = this.state;
        const lastIndex = currentPage * suppliesPerPage;
        const firstIndex = lastIndex - suppliesPerPage;
        const currentSupplies = supplies.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(this.state.supplies.length / this.state.suppliesPerPage)


        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Supply deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark text-white bg-trans"}>
                    <Card.Header>
                        <div style={{"float":"left", fontWeight: 'bold', color: 'black'}}>
                            <FontAwesomeIcon icon={faList}/> Storage
                        </div>
                        <div style={{"float":"left", fontWeight: 'bold', color: 'black'}}>
                            <Button size={"sm"} className={"back-btn"} onClick={this.panel}>
                                Back to Panel
                            </Button>
                        </div>
                        <div style={{"float":"right"}}>
                            <Button size={"sm"} onClick={this.handleShow}>
                                Add Supply
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant={"secondary bg-trans"}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {supplies.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"6"}>{supplies.length}</td>
                                </tr>   :
                                currentSupplies.map((supply) => (
                                    <tr key={supply.id}>
                                        <td>
                                            {supply.supplyID}
                                        </td>
                                        <td>
                                            {supply.name}
                                        </td>
                                        <td>
                                            {supply.amount}
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edits/"+supply.supplyID} className={"btn btn-sm btn-outline-primary"} size={"sm"}><FontAwesomeIcon icon={faEdit}/></Link>
                                                <Button size={"sm"} variant={"outline-danger"} onClick={this.deleteSupply.bind(this, supply.supplyID)}><FontAwesomeIcon icon={faTrash}/></Button>
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


                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <SupplyAddModal />
                </Modal>

            </div>
        )
    }
}

