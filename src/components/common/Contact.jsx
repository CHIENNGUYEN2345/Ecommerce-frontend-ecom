import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import validation from '../../validation/validation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Contact extends Component {

    constructor(){
        super();
        this.state={
            name: "",
            email: "",
            message: ""
        }
    }

    nameOnChange = (event) => {
        let name = event.target.value;
        this.setState({name: name})
    }

    emailOnChange = (event) => {
        let email = event.target.value;
        this.setState({email: email})
    }

    messageOnChange = (event) => {
        let message = event.target.value;
        this.setState({message: message})
    }

    onFormSubmit = (event) => {
        let name = this.state.name;
        let email = this. state.email;
        let message = this.state.message;
        let sendBtn = document.getElementById('sendBtn');
        let contactForm = document.getElementById('contactForm');
        if(message.length == 0){
            toast.error('plese write the message')
        }
        else if(name.length == 0){
            toast.error('plese write the name')
        }
        else if(email.length == 0){
            toast.error('plese write the email')
        }else if(!(validation.NameRegx).test(name)){
            toast.error('invalid name')
        }
        else{
            sendBtn.innerHTML = "Sending, Please Wait";
            let MyFormData = new FormData();
            MyFormData.append('name', name)
            MyFormData.append('email', email)
            MyFormData.append('message', message)

            axios.post(AppURL.PostContact, MyFormData)
              .then(function (response) {
                if(response.status==200 && response.data==1 ){
                    toast.success('success!');
                    sendBtn.innerHTML = "Send";
                    contactForm.reset();
                    
                }else{
                    toast.success('error!');
                    sendBtn.innerHTML = "Send";
                }
              })
              .catch(function (error) {
                toast.error(error);
                sendBtn.innerHTML = "Send";
              });
        }
        event.preventDefault();
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
                    <Form id='contactForm' onSubmit={this.onFormSubmit} className='onboardForm'>
                        <h4 className='section-title-login'>CONTACT US</h4>
                        <h6 className='section-sub-title'>Please contact with us</h6>
                        <input onChange={this.nameOnChange} className='form-control m-2' type='text' placeholder='Enter mobile number' />
                        <input onChange={this.emailOnChange} className='form-control m-2' type='email' placeholder='Enter email number' />
                        <Form.Control className='form-control m-2' onChange={this.messageOnChange} 
                        as="textarea" rows={3} />
                        <Button type='submit' id='sendBtn' className='btn btn-block m-2 site-btn-login' placeholder='Messgae'>Send</Button>
                    </Form>
                </Col>

                <Col className='p-0 m-0 Desktop' md={6} lg={6} sm={6} xs={6}>
                    <br></br><br></br>
                    <p className='section-title-contact'>106/1/2/3/4/5 Street, Abcdefghij District, Hanoi city.</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.034563074095!2d106.3256590144061!3d20.95112709580111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31359bd16b8a7b8f%3A0x34751ced63ef54d6!2zSOG6o2kgRMawxqFuZw!5e0!3m2!1svi!2s!4v1675329926034!5m2!1svi!2s" width="600" height="450" styles="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </Col>
            </Row>
        </Container>
        <ToastContainer />
      </Fragment>
    )
  }
}

export default Contact