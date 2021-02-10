import './App.css';
import NavBar from "./components/NavBar";
import {Container, Row, Col} from "react-bootstrap";
import Welcome from "./components/Welcome";
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

function App() {

    const marginTop = {
        marginTop: "20px"
    }

  return (
      <div style={{
          backgroundImage: `url(${image})`,
          backgroundPositionY: -280,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh'
      }}>
        <Router>
            <NavBar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            <Route path={"/"} exact component={Welcome}/>
                            <Route path={"/add"} exact component={Animal}/>
                            <Route path={"/list"} exact component={AnimalList}/>
                            <Route path={"/edit/:id"} exact component={Animal}/>
                            <Route path={"/users"} exact component={UserList}/>
                            <Route path={"/editu/:id"} exact component={UserAdd}/>
                            <Route path={"/addusers"} exact component={UserAdd}/>
                            <Route path={"/orders"} exact component={OrdersList}/>
                            <Route path={"/edito/:id"} exact component={OrderAdd}/>
                            <Route path={"/addorders"} exact component={OrderAdd}/>
                            <Route path={"/storage"} exact component={Storage}/>
                            <Route path={"/edits/:id"} exact component={SupplyAdd}/>
                            <Route path={"/addsupply"} exact component={SupplyAdd}/>
                            <Route path={"/booking"} exact component={Booking}/>
                            <Route path={"/login"} exact component={Login}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        <Footer/>
        </Router>
      </div>
  );
}

export default App;
