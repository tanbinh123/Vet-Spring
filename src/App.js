import './App.css';
import NavBar from "./components/NavBar";
import {Container, Row, Col} from "react-bootstrap";
import Footer from "./components/Footer";
import Animal from "./components/Animal";
import AnimalList from "./components/AnimalList";
import UserList from "./components/UserList";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import image from "./images/index-background.jpeg";
import React from "react";
import UserAdd from "./components/UserAdd";
import OrdersList from "./components/OrdersList";
import OrderAdd from "./components/OrderAdd";
import Storage from "./components/Storage";
import SupplyAdd from "./components/SupplyAdd";
import Booking from "./components/Booking";
import Login from "./components/Login";
import ClientPage from "./components/ClientPage";
import VisitCalendar from "./components/VisitCalendar";
import BookingPage from "./components/BookingPage";
import WorkerPage from "./components/WorkerPage";
import AdminPage from "./components/AdminPage";
import UserAddAdmin from "./components/UserAddAdmin";
import AnimalListAdmin from "./components/AnimalListAdmin";
import VisitsAdmin from "./components/VisitsAdmin";
import text from "./components/text"

function App() {

  return (
      <div className={"background-image"} style={{backgroundImage: `url(${image})`}}>
        <Router>
            <NavBar />
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route path={"/"} exact component={text}/>
                            <Route path={"/add"} exact component={Animal}/>
                            <Route path={"/list"} exact component={AnimalList}/>
                            <Route path={"/edit/:id"} exact component={Animal}/>
                            <Route path={"/users"} exact component={UserList}/>
                            <Route path={"/editu/:id"} exact component={UserAddAdmin}/>
                            <Route path={"/addusers"} exact component={UserAdd}/>
                            <Route path={"/orders"} exact component={OrdersList}/>
                            <Route path={"/edito/:id"} exact component={OrderAdd}/>
                            <Route path={"/addorders"} exact component={OrderAdd}/>
                            <Route path={"/storage"} exact component={Storage}/>
                            <Route path={"/edits/:id"} exact component={SupplyAdd}/>
                            <Route path={"/addsupply"} exact component={SupplyAdd}/>
                            <Route path={"/booking"} exact component={Booking}/>
                            <Route path={"/login"} exact component={Login}/>
                            <Route path={"/clientpage"} exact component={ClientPage}/>
                            <Route path={"/visitCalendar"} exact component={VisitCalendar}/>
                            <Route path={"/bookingPage"} exact component={BookingPage}/>
                            <Route path={"/workerpage"} exact component={WorkerPage}/>
                            <Route path={"/adminpage"} exact component={AdminPage}/>
                            <Route path={"/animallistadmin"} exact component={AnimalListAdmin}/>
                            <Route path={"/visitsadmin"} exact component={VisitsAdmin}/>
                            <Route path={"/navbar"} exact component={NavBar}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
{/*
          <div className={"index-name"}>Vet Website</div>
*/}

      </div>
  );
}

export default App;
