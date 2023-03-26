import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import parse from 'html-react-parser';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
class Purchase extends Component {

  constructor(){
    super();
    this.state ={
      purchase: ""
    }
  }

  componentDidMount(){
    axios.get(AppURL.AllSiteInfo).then(response => {
      let StatusCode = response.status;
      if(StatusCode==200){
        let JsonData = (response.data)[0]['purchase_guide'];
        this.setState({about: JsonData})
      }
    }).catch(error => {});
  }

  render() {
    return (
        <Fragment>
        <Container>
        <div className='breadbody'>
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/purchase">Purchase</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
        </div>
            <Row className='p-2'>
                <Col className='shadow-sm bg-white mt-2' md={12} lg={12} sm={12} xs={12}>
                    <h4 className='section-title-login'>Purchase Page</h4>
                    <p className='section-title-contact'>
                    {parse(this.state.purchase)}
                    </p>
                </Col>
            </Row>

            
        </Container>
      </Fragment>
    )
  }
}

export default Purchase