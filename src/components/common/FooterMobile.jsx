import React, { Component, Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Apple from '../../assets/images/apple.png'
import Google from '../../assets/images/google.png'

class FooterMobile extends Component {
  render() {
    return (
      <Fragment>
        <div className='footerback m-0 mt-5 pt-3 shadow-sm'>
        <Container className='text-center'>
          <Row className='px-0 my-5'>
            <Col className='p-2' lg={3} md={3} sm={6} xs={12}>
              <h5 className='footer-menu-title'>OFFICE ADDRESS</h5>
              <p>106/1/2/3/4/5 Street, Abcdefghij District, Hanoi city.<br></br>
              Email: huuchien.np@gmail.com</p>
              <h5 className='footer-menu-title'>SOCIAL LINK</h5>
              <a href=''><i className='fab m-1 h4 fa-facebook'></i></a>
              <a href=''><i className='fab m-1 h4 fa-instagram'></i></a>
              <a href=''><i className='fab m-1 h4 fa-twitter'></i></a>
            </Col>

            

            <Col className='p-2' lg={3} md={3} sm={6} xs={12}>
              <h5 className='footer-menu-title'>MORE INFO</h5>
              <Link to='/' className='footer-link'>How To Purchase</Link><br></br>
              <Link to='/' className='footer-link'>Privacy Policy</Link><br></br>
              <Link to='/' className='footer-link'>Refund Police</Link><br></br>
            </Col>

            <Col className='p-2' lg={3} md={3} sm={6} xs={12}>
              <h5 className='footer-menu-title'>DOWNLOAD APPS</h5>
              <a><img src={Google} /></a>
              <a><img className='mt-2' src={Apple} /></a>
            </Col>
          </Row>
        </Container>
        <Container fluid={true} className='text-center m-0 pt-3 pb-1 bg-dark'>
          <Container>
            <Row>
              <h6 className='text-white'>&copy; Copyright 2023 by ChienNguyen Easy Shop, All Right Reserved</h6>
            </Row>
          </Container>
        </Container>
        </div>
      </Fragment>
    )
  }
}

export default FooterMobile