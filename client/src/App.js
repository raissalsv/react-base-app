import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  InputGroup,
  Input,
  Button,
  FormGroup
} from 'reactstrap';

import Weather from './Weather';
import { render } from 'react-dom';
import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      weather: null,
      cityList: [],
      newCityName: ''
    }
  }

  getCityList = () => {
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      var cityList = res.map(r => r.city_name);
      this.setState({cityList});
    });
  };

  componentDidMount(){
    this.getCityList();
  }

  handleInputChange = (e) => {
    this.setState({ newCityName: e.target.value});
  };

  handleAddCity = () => {
    fetch('/api/cities', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: this.state.newCityName })
    })
    .then(res => res.json())
    .then(res => {
      this.getCityList();
      this.setState({ newCityName: '' });
    });
  };

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      console.log(weather);
      this.setState({weather})
    })
  }

  handleChangeCity = (e) => {
    this.getWeather(e.target.value);
  }

  render(){
    return (
      <Container fluid className="centered">
      <Navbar dark color="dark">
        <NavbarBrand href="/">MyWeather</NavbarBrand>
      </Navbar>
      <Row>
        <Col>
         <div Nam="container-fluid bg-light text-dark p-5">
          <div class="container bg-light p-5">
            <h1 class="display-4 fw-bold">MyWeather</h1>
              <p>The current weather for your favorite cities!</p>
          </div>
        </div> 
          <InputGroup>
            <Input 
                  placeholder="New city name..."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
              />
              <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="display-5">Current Weather</h1>
          <FormGroup>
            <Input type="select" onChange={this.handleChangeCity} defaultValue="test">
              {this.state.cityList.length === 0 && <option defaultValue="s">No cities added yet</option>}
              {this.state.cityList.length > 0 && <option>Select a city</option>}
              {this.state.cityList.map((city, i) => <option key={i}>{city}</option>)}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Weather data={this.state.weather}></Weather>
    </Container>
    );
  };
};

export default App;
