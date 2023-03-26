import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import AppURL from '../../api/AppURL';
import Forget from '../../assets/images/forget.jpg'
export class ResetPassword extends Component {

    constructor(){
        super();
        this.state={
            token: '',// a.k.a pin code
          email: '',
          password: '',
          password_confirmation: '',
          message: '',
          loggedIn: false
        }
      }

      //reset from submit method
      formSubmit = (e) => {
        e.preventDefault();
        const data = {
            token: this.state.token,
          email: this.state.email,
          password: this.state.password,
        //   name: this.state.name,
          password_confirmation: this.state.password_confirmation
        }
    
        axios.post(AppURL.UserResetPassword, data).then(response=>{
            this.setState({message: response.data.message})

            toast.success(this.state.message, {
                position: 'top-center'
              })

              document.getElementById('formreset').reset()
        }).catch(error=>{
            this.setState({message: error.response.data.message})
            toast.error(this.state.message, {
                position: 'top-center'
              })
        })
      }

  render() {
    return (
        <Fragment>
        <Container>
            <Row className='p-2'>
                <Col className='shadow-sm bg-white mt-2' md={12} lg={12} sm={12} xs={12}>

                </Col>
            </Row>

            <Row className='text-center'>
                <Col className='d-flex jusity-content-center' md={6} lg={6} sm={12} xs={12}>
                    <Form className='onboardForm' onSubmit={this.formSubmit} id='formreset'>
                        <h4 className='section-title-login'>Reset your password to save your account.</h4>
                        {/* <h6 className='section-sub-title'>Please Enter Your Mobile Number</h6> */}
                        
                        <input className='form-control m-2' type='text' placeholder='Enter your pin code' onChange={(e)=>{this.setState({token: e.target.value})}} />

                        <input className='form-control m-2' type='email' placeholder='Enter your email' onChange={(e)=>{this.setState({email: e.target.value})}} />

                        <input className='form-control m-2' type='password' placeholder='Enter your new password' onChange={(e)=>{this.setState({password: e.target.value})}} />

                        <input className='form-control m-2' type='password' placeholder='Confirm your password' onChange={(e)=>{this.setState({password_confirmation: e.target.value})}}/>

                        <Button type='submit' className='btn btn-block m-2 site-btn-login'>Reset</Button>
                        <br></br> <br></br>
                        <hr/>
                        
                    </Form>
                </Col>

                <Col className='p-0 m-0 Desktop' md={6} lg={6} sm={6} xs={6}>
                    <img className='onboardBanner' src={Forget} />
                </Col>
            </Row>
        </Container>
        <ToastContainer/>
      </Fragment>
    )
  }
}

export default ResetPassword