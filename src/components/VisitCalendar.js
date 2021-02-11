import {React, Component} from "react";
import {Col, Row, Container} from "react-bootstrap";

export default class VisitCalendar extends Component {

    months(){
        var tab = []
        for(var i = 0; i < 4; i++){
            tab.push(
                <Row className="border border-right-0 border-bottom-0" style={{backgroundColor: 'rgba(150, 150, 150, 0.5)', height: '16vh'}}>
                    {this.day(i * 7)}
                </Row>
            )
        }
        return tab
    }

    day(x){
        var tab = []
        for(var i = 0; i < 7; i++){
            tab.push(
                <Col className="day p-lg-2 border border-left-0 border-top-0 text-truncate ">
                    <h5 className="row align-items-center">
                        <span className="date col-1">{i + x + 1}</span>
                    </h5>
                    <p className="d-sm-none">No events</p>
                </Col>
            )
        }
        return tab
    }



    render() {
        return(
            <div className="container-fluid">
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