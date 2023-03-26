import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import AppURL from '../../api/AppURL';
import Login from '../../assets/images/login.png'
class Register extends Component {

    constructor(){
        super();
        this.state={
        name: '',
          email: '',
          password: '',
          password_confirmation: '',
          message: '',
          loggedIn: false
        }
      }

    //register from submit method.
    formSubmit = (e) => {
        e.preventDefault();
        const data = {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          password_confirmation: this.state.password_confirmation
        }
    
        axios.post(AppURL.UserRegister, data).then(response=>{
          localStorage.setItem('token', response.data.token);
          this.setState({loggedIn: true})
          this.props.setUser(response.data.user)
        })
      }

  render() {

    if(this.state.loggedIn){
        return <Redirect to={'/profile'} />
      }
      if(localStorage.getItem('token')){
        return <Redirect to="/profile" />
      }
    

    return (
        <Fragment>
        <Container>
            <Row className='p-2'>
                <Col className='shadow-sm bg-white mt-2' md={12} lg={12} sm={12} xs={12}>

                </Col>
            </Row>

            <Row className='text-center'>
                <Col className='d-flex jusity-content-center' md={6} lg={6} sm={12} xs={12}>
                    <Form className='onboardForm' onSubmit={this.formSubmit}>
                        <h4 className='section-title-login'>USER REGISTER</h4>
                        {/* <h6 className='section-sub-title'>Please Enter Your Mobile Number</h6> */}
                        
                        <input className='form-control m-2' type='text' placeholder='Enter your name' onChange={(e)=>{this.setState({name: e.target.value})}} />

                        <input className='form-control m-2' type='email' placeholder='Enter your email' onChange={(e)=>{this.setState({email: e.target.value})}}/>

                        <input className='form-control m-2' type='password' placeholder='Enter your password' onChange={(e)=>{this.setState({password: e.target.value})}} />

                        <input className='form-control m-2' type='password' placeholder='Confirm your password' onChange={(e)=>{this.setState({password_confirmation: e.target.value})}}/>

                        <Button type='submit' className='btn btn-block m-2 site-btn-login'>Sign Up</Button>

                        <br></br> <br></br>
                        <hr/>
                        <p>Forget your password? <Link to='/forget'>Click here to solve problem.</Link></p>
                        <p>Already have an account? <b><Link to='/login'>Log In</Link></b></p>
                    </Form>
                </Col>

                <Col className='p-0 m-0 Desktop' md={6} lg={6} sm={6} xs={6}>
                    <img className='onboardBanner' src={Login} />
                </Col>
            </Row>
        </Container>
      </Fragment>
    )
  }
}

export default Register