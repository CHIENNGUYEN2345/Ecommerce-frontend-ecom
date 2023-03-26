import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppURL from '../../api/AppURL';
import Forget from '../../assets/images/forget.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class ForgetPassword extends Component {

    constructor(){
        super();
        this.state={
          email: '',
          message: '',

        }
      }

    //forget pass form submit.
  formSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email
    }

    axios.post(AppURL.UserForgetPassword, data).then(response=>{
    //   console.log(response)
    this.setState({message: response.data.message})

    toast.success(this.state.message, {
        position: 'top-center'
      })
    }).catch(error => {
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
                    <Form className='onboardForm' onSubmit={this.formSubmit}>
                        <h4 className='section-title-login'>Forget your password? Don't worry!</h4>
                        
                        {/* <h6 className='section-sub-title'>Please Enter Your Mobile Number</h6> */}
                        
                        

                        <input className='form-control m-2' type='email' placeholder='Enter your email' onChange={(e)=>{this.setState({email: e.target.value})}} />

                        
                        <Button type="submit" className='btn btn-block m-2 site-btn-login'>Reset Password</Button>
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

export default ForgetPassword