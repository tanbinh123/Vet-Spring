import {React, Component} from "react";
import {Modal, Button, ButtonGroup, Card, FormControl, InputGroup, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faStepForward, faFastBackward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import MyToast from "./MyToast";
import {Link} from "react-router-dom";
import AnimalModal from "./AnimalModal";


export default class AnimalList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            animals: [],
            currentPage: 1,
            animalsPerPage: 5,
            showModal: false,
            showModalEdit: false
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/Animals/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({animals: data})
            })
    };

    deleteAnimal = (animalId) =>{
        axios.delete("http://localhost:8080/api/Animals?index=" + animalId)
            .then(response => {
                if(response.data != null){
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}), 3000);
                        this.setState({
                        animals: this.state.animals.filter(animal => animal.animalID !== animalId)
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
        if(this.state.currentPage < Math.ceil(this.state.animals.length / this.state.animalsPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    }

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.animals.length / this.state.animalsPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.animals.length / this.state.animalsPerPage)
            })
        }
    }

    handleShow = () => {
        this.setState({
            showModal: true
        })
    }

    // handleShowWithParams = (animalId) => {
    //     this.setState({
    //         showModalEdit: true
    //     })
    // }

    handleClose = () => {
        this.setState({
            showModal: false

        },
        console.log("asdasd")
        )
    }

    render(){

        const {animals, currentPage, animalsPerPage} = this.state;
        const lastIndex = currentPage * animalsPerPage;
        const firstIndex = lastIndex - animalsPerPage;
        const currentAnimals = animals.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(this.state.animals.length / this.state.animalsPerPage)

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        }

        return(
            <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Animal deleted Successfully."} type = {"danger"}/>
            </div>
            <Card className={"border border-dark text-white"} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)'
            }}>
                <Card.Header>
                    <div style={{"float":"left", fontWeight: 'bold', color: 'black'}}>
                        <FontAwesomeIcon icon={faList}/> Animal List
                    </div>
                    <div style={{"float":"right"}}>
                        <Button size={"sm"} onClick={this.handleShow}>
                            Add Animal
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant={"secondary"} style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.4)'
                    }}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {animals.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan={"6"}>{animals.length}</td>
                            </tr>   :
                            currentAnimals.map((animal) => (
                                <tr key={animal.id}>
                                    <td>
                                        {animal.animalID}
                                    </td>
                                    <td>
                                        {animal.name}
                                    </td>
                                    <td>
                                        {animal.age}
                                    </td>
                                    <td>
                                        {animal.typ}
                                    </td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"edit/"+animal.animalID} className={"btn btn-sm btn-outline-primary"} size={"sm"}><FontAwesomeIcon icon={faEdit}/></Link>
                                            <Button size={"sm"} variant={"outline-danger"} onClick={this.deleteAnimal.bind(this, animal.animalID)}><FontAwesomeIcon icon={faTrash}/></Button>
                                            {/*<Button onClick={this.handleShowWithParams(animal.animalID)} className={"btn btn-sm btn-outline-primary"}><FontAwesomeIcon icon={faEdit}/></Button>*/}
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
                            <FormControl style={pageNumCss} className={"bg-dark"} name={"currentPage"} value={currentPage}
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


                <Modal show={this.state.showModal}
                       onHide={this.handleClose} onClick={this.handleClose}>
                        <AnimalModal />
                </Modal>

            </div>
        )
    }
}

