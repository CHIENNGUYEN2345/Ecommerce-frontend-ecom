import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import HomeSlider from './HomeSlider'

class HomeTopMobile extends Component {

  constructor(){
    super();
    this.state = {
      MenuData: [],
      SliderData: []
    }
  }
  componentDidMount(){
    axios.get(AppURL.AllCategoryDetails).then(response => {
      this.setState({MenuData: response.data});
    }).catch(error =>{

    });

    axios.get(AppURL.AllSlider).then(response => {
      this.setState({SliderData: response.data});
    }).catch(error =>{

    });
  }
  render() {
    return (
        <Fragment>
        <Container className='p-0 m-0 overflow-hidden' fluid={true}>
            <Row className='p-0 m-0 overflow-hidden'>
                
                <Col lg={12} md={12} sm={12}>
                <HomeSlider data={this.state.SliderData}/>
                </Col>
            </Row>
        </Container>
      </Fragment>
    )
  }
}

export default HomeTopMobile