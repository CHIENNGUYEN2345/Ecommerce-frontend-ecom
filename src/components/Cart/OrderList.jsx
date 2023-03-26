import axios from 'axios';
import cogoToast from 'cogo-toast';
import React, { Component, Fragment } from 'react'
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router';
import AppURL from '../../api/AppURL';

class OrderList extends Component {
  constructor(){
    super();
    this.state = {
        ProductData: [],
        name: '',
        rating: '',
        comment: '',
        product_name: '',
        product_code: '',
        reviewModal: false,
    }   
  }

  componentDidMount(){
    let email = this.props.user.email;
    axios.get(AppURL.OrderListByUser(email)).then(response => {
        this.setState({ProductData: response.data});
    }).catch(error => {

    })
}//end

reviewModalOpen = (product_code, product_name) => {
  this.setState({ reviewModal: true, product_code: product_code, product_name: product_name })
}//end

reviewModalClose = () => {
  this.setState({ reviewModal: false })
}//end


nameOnChange = (event) => {
  let name = event.target.value;
  this.setState({name: name});
}//end

ratingOnChange = (event) => {
  let rating = event.target.value;
  this.setState({rating: rating});
}//end

commentOnChange = (event) => {
  let comment = event.target.value;
  this.setState({comment: comment});
}//end

postReview = () => {
  let product_code = this.state.product_code;
  let product_name = this.state.product_name;
  let rating = this.state.rating;
  let comment = this.state.comment;
  let name = this.state.name;

  if(name.length===0){
    cogoToast.error('Name is required.', {position: 'top-right'});
    
  }else if(comment.length===0){
    cogoToast.error('Comment is required.', {position: 'top-right'});
  }
  else if(rating.length===0){
    cogoToast.error('Rating is required.', {position: 'top-right'});
  }else if(product_name.length===0){
    cogoToast.error('Comment is required.', {position: 'top-right'});
  }else if(comment.length>51){
    cogoToast.error('Comments can not more than 51 character.', {position: 'top-right'});
  }else{
            let MyFormData = new FormData();
            MyFormData.append('product_code', product_code)
            MyFormData.append('product_name', product_name)
            MyFormData.append('reviewer_name', name)
            MyFormData.append('reviewer_photo', '')
            MyFormData.append('reviewer_rating', rating)
            MyFormData.append('reviewer_comments', comment)

            axios.post(AppURL.postReview, MyFormData).then(response => {
              //response.data ===1 (success)
              if(response.data===1){
                  cogoToast.success('Review submitted.', {position: 'top-center'});
                  this.reviewModalClose();
              }else{
                  cogoToast.error('Failed. Please check your database.', {position: 'top-center'});
              }
          }).catch(error => {
              cogoToast.error('Failed. Please check your database.', {position: 'top-center'});
      })
  }
}//end

  render() {
    if(!localStorage.getItem('token')){
      return <Redirect to="/login" />
    }
    const MyList = this.state.ProductData;
    const MyView = MyList.map((ProductList, i)=>{
      return <div>
        <Row>
        {/* <Col md={3} lg={3} sm={6} xs={6}>
                        <img className="cart-product-img" src={ProductList.image} />
                    </Col> */}
        <Col md={6} lg={6} sm={6} xs={6}>
                    <h6>{ProductList.order_date}</h6>
                    <h5 className="product-name">{ProductList.product_name}</h5>
                <h6> Quantity = {ProductList.quantity} </h6>
                <p>{ProductList.size} | {ProductList.color}</p>
                <h6>Price = {ProductList.unit_price}$ x {ProductList.quantity} = {ProductList.total_price}$</h6>
                <p>Status: {ProductList.order_status}</p>
                    </Col>
                    
        </Row>
        <Button onClick={this.reviewModalOpen.bind(this, ProductList.product_code, ProductList.product_name)}>Review</Button>
                    <hr></hr>
      </div>
    });
    return (
      <Fragment>
        <Container>
        <div className='section-title text-center mb-55'><h2>ORDER HISTORY</h2>
                <p>User: {this.props.user.name}</p>
            </div>
            <Card >                
                <Card.Body>
                <Row>


                  {MyView}

                </Row>              
                </Card.Body>               
            </Card>
        </Container>
        <Modal show={this.state.reviewModal} onHide={this.reviewModalClose}>
        <Modal.Header closeButton>
        <h6><i className="fa fa-bell"></i> Post your review: </h6>
        </Modal.Header>
        <Modal.Body>
            



        </Modal.Body>

        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                    <label className="form-label">Your Name</label>
                    <input onChange={this.nameOnChange}  className="form-control" type="text" placeholder=""/>
        </div>

        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                <label className="form-label">Select product rating</label>
                <select onChange={this.ratingOnChange}    className="form-control">
                <option value="">Choose</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
            </div>
        
        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Your Comment</label>
            <textarea onChange={this.commentOnChange} rows={2} className='form-control' type='text' placeholder='your message here' />
        </div>
        
        <Modal.Footer>

        <Button variant="secondary" onClick={this.postReview}>
        Post
        </Button>

        <Button variant="danger" onClick={this.reviewModalClose}>
        Close
        </Button>

        

        </Modal.Footer>
        </Modal>
      </Fragment>
    )
  }
}

export default OrderList