import './App.css';
import NavBar from "./components/NavBar";
import {Container, Row, Col} from "react-bootstrap";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Animal from "./components/Animal";
import AnimalList from "./components/AnimalList";
import UserList from "./components/UserList";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {

    const marginTop = {
        marginTop: "20px"
    }

  return (
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
                    </Switch>
                </Col>
            </Row>
        </Container>
    <Footer/>
    </Router>
  );
}

export default App;
