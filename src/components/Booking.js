import {React, Component} from "react";
import {Button, Col, Row, Container, Card} from "react-bootstrap";
import "./CSS/Style.css"

export default class Booking extends Component {

    bookingPage = (prop) => {
        return this.props.history.push({pathname: "/bookingPage", state: {day: prop}})
    }

    months(){
        var tab = []
        for(var i = 0; i < 4; i++){
            tab.push(
                <Row className="border border-right-0 border-bottom-0"
                     style={{backgroundColor: 'rgba(150, 150, 150, 0.5)', height: '16vh'}}>
                    {this.day(i * 7)}
                </Row>
            )
        }
        return tab
    }

    day(x){
        var tab = []
        for(let i = 0; i < 7; i++){
            let dayInt = i + x + 1
            tab.push(
            <Col className="day p-lg-2 border border-left-0 border-top-0 text-truncate ">
                <Button className={"btn-calendar"} onClick={() => this.bookingPage(dayInt)}>
                    <h5 className="row align-items-center">
                        <span className="date col-1">{dayInt}</span>
                    </h5>
                </Button>
                <p className="d-sm-none">No events</p>
            </Col>
            )
        }
        return tab
    }

    panel = () => {
        return this.props.history.push("/clientpage")
    }


render() {
    return(
        <div className="container-fluid">
            <div style={{"float":"right", fontWeight: 'bold', color: 'black'}}>
                <Button className={"back-btn"} style={{marginLeft: 0}} onClick={this.panel}>
                    Back to Panel
                </Button>
            </div>
            <header>
                <h1 className="display-5 mb-6 text-center">February 2021</h1>
                <div className="row d-none d-sm-flex p-1 bg-dark text-white">
                    <h5 className="col-sm p-1 text-center">Monday</h5>
                    <h5 className="col-sm p-1 text-center">Tuesday</h5>
                    <h5 className="col-sm p-1 text-center">Wednesday</h5>
                    <h5 className="col-sm p-1 text-center">Thursday</h5>
                    <h5 className="col-sm p-1 text-center">Friday</h5>
                    <h5 className="col-sm p-1 text-center">Saturday</h5>
                    <h5 className="col-sm p-1 text-center">Sunday</h5>
                </div>
            </header>
            {this.months()}
        </div>
    )
}


}