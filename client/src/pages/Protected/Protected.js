import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { FormBtn } from "../../components/Form";

class Landing extends Component {
  state = {};

  componentDidMount() {
    console.log("Landing page mounted.");
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("The form button was pressed.");
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12">
            <Jumbotron>
              <h1>You're not authorized to be here!</h1>
            </Jumbotron>
            <form>
              <FormBtn onClick={this.handleFormSubmit}>
                Submit Button
              </FormBtn>
            </form>
            <Link to={"/Food/"}>
              Return to Food page
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;
