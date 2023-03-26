import React, { Component, Fragment } from 'react'
import { Button, Col, Row, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/easyshop.png';
import Bars from '../../assets/images/bars.png';
import Product1 from '../../assets/images/product/product1.png'
import axios from 'axios';
import AppURL from '../../api/AppURL';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router';
class Cart extends Component {
    constructor(){
        super();
        this.state = {
            ProductData: [],
            isLoading:"",
            mainDiv:"d-none",
            pageRefreshStatus: false,
            confirmBtn: "Confirm Order",
            city: '',
            payment: '',
            name: '',
            address: '',
            pageRedirectStatus: false,


        }
    }

    componentDidMount(){
        axios.get(AppURL.CartList(this.props.user.email)).then(response => {
            this.setState({ProductData: response.data, isLoading: "d-none", mainDiv: ""});
        }).catch(error => {

        })
    }//end

    removeItem = (id) => {
        axios.get(AppURL.RemoveCartList(id)).then(response => {
            //response.data ===1 (success)
            if(response.data===1){
                cogoToast.success('Removed.', {position: 'top-center'});
                this.setState({pageRefreshStatus: true})
            }else{
                cogoToast.error('Try again *_*', {position: 'top-center'});
            }
        }).catch(error => {
            cogoToast.error('Try again *_*', {position: 'top-center'});
        })
    }//end

    pageRefresh = () => {
        if(this.state.pageRefreshStatus===true){
             let URL = window.location;
             return (
                  <Redirect to={URL}/>
             )
        }
   }//end

   itemPlus = (id, quantity, price) => {
    axios.get(AppURL.CartItemPlus(id, quantity, price)).then(response => {
        //response.data ===1 (success)
        if(response.data===1){
            cogoToast.success('Increased!', {position: 'top-center'});
            this.setState({pageRefreshStatus: true})
        }else{
            cogoToast.error('Try again *_*', {position: 'top-center'});
        }
    }).catch(error => {
        cogoToast.error('Try again *_*', {position: 'top-center'});
    })
}//end

    itemMinus = (id, quantity, price) => {
        axios.get(AppURL.CartItemMinus(id, quantity, price)).then(response => {
            //response.data ===1 (success)
            if(response.data===1){
                cogoToast.success('Decreased!', {position: 'top-center'});
                this.setState({pageRefreshStatus: true})
            }else{
                cogoToast.error('Try again *_*', {position: 'top-center'});
            }
        }).catch(error => {
            cogoToast.error('Try again *_*', {position: 'top-center'});
    })
}//end

    cityOnChange = (event) => {
        let city = event.target.value;
        this.setState({city: city})
    }//end

    paymentOnChange = (event) => {
        let payment = event.target.value;
        this.setState({payment: payment})
    }//end

    addressOnChange = (event) => {
        let address = event.target.value;
        this.setState({address: address})
    }//end

    nameOnChange = (event) => {
        let name = event.target.value;
        this.setState({name: name})
    }//end

    confirmOnClick = () => {
        let city = this.state.city;
        let payment = this.state.payment;
        let name = this.state.name;
        let address = this.state.address;
        let email = this.props.user.email;
        if(city.length===0){
            cogoToast.error('Please select city.', {position: 'top-right'});
            
        }else if(payment.length===0){
            cogoToast.error('Please select payment.', {position: 'top-right'});
        }else if(name.length===0){
            cogoToast.error('Please select your name.', {position: 'top-right'});
        }else if(address.length===0){
            cogoToast.error('Please select your address.', {position: 'top-right'});
        }else{
            let invoice = new Date().getTime();
            let MyFormData = new FormData();
            MyFormData.append('city', city)
            MyFormData.append('payment_method', payment)
            MyFormData.append('delivery_address', address)
            MyFormData.append('name', name)
            MyFormData.append('email', email)
            MyFormData.append('invoice_no', invoice)
            MyFormData.append('delivery_charge', "00")

            axios.post(AppURL.cartOrder, MyFormData).then(response => {
                //response.data ===1 (success)
                if(response.data===1){
                    cogoToast.success('Order request received!', {position: 'top-center'});
                    this.setState({pageRedirectStatus: true})
                }else{
                    cogoToast.error('Try again *_*', {position: 'top-center'});
                }
            }).catch(error => {
                cogoToast.error('Try again *_*', {position: 'top-center'});
        })

        }

    }//end

    pageRedirect = () => {
        if(this.state.pageRedirectStatus===true){
            return (
                <Redirect to="/orderlist" />
            )
        }
    }//end


  render() {
    if(!localStorage.getItem('token')){
        return <Redirect to="/login" />
      }
    const MyList = this.state.ProductData;
    let totalPriceSum = 0;
    const MyView = MyList.map((ProductList, i)=>{
        totalPriceSum = totalPriceSum+parseInt(ProductList.total_price);
        return <div>
            <Card >                
                <Card.Body>
                <Row>
                    <Col md={3} lg={3} sm={6} xs={6}>
                        <img className="cart-product-img" src={ProductList.image} />
                    </Col>

                    <Col md={6} lg={6} sm={6} xs={6}>
                    <h5 className="product-name">{ProductList.product_name}</h5>
                <h6> Quantity = {ProductList.quantity} </h6>
                <p>{ProductList.size} | {ProductList.color}</p>
                <h6>Price = {ProductList.unit_price}$ x {ProductList.quantity} = {ProductList.total_price}$</h6>

                

                    </Col>

                    <Col md={3} lg={3} sm={12} xs={12}>

                    <Button onClick={()=>this.itemPlus(ProductList.id, ProductList.quantity, ProductList.unit_price)} className="btn mt-2 mx-1 site-btn"><i className="fa fa-plus"></i></Button>

                    

                    <Button onClick={()=>this.itemMinus(ProductList.id, ProductList.quantity, ProductList.unit_price)} className="btn mt-2 mx-1 site-btn"><i className="fa fa-minus"></i></Button>

                    <Button onClick={()=>this.removeItem(ProductList.id)} className="btn mt-2 mx-1 site-btn"><i className="fa fa-trash-o"></i>Remove</Button>

                    </Col>
                </Row>              
                </Card.Body>               
            </Card>
        </div>
    })

    return (
        <Fragment>

        <Container fluid={true}>   

        <div className='section-title text-center mb-55'>
            <h2>Product Cart List</h2>
                
        </div>



        <Row>


            <Col className="p-1" lg={7} md={7} sm={12} xs={12} >
                {MyView}
            </Col> 
 

            <Col className="p-1" lg={5} md={5} sm={12} xs={12} >
                <div className="card p-2">
                            <div className="card-body">
                                    <div className="container-fluid ">
                                        <div className="row">
                <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                    <h5 className="Product-Name text-danger">Total Due: {totalPriceSum}  $</h5>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                    <label className="form-label">Choose City</label>
                    <select onChange={this.cityOnChange} className="form-control">
                    <option value="">Choose</option>
                    <option value="HoChiMinhCITY">HoChiMinh city</option>
                    <option value="HaNoi">Ha Noi </option>
                    <option value="BinhDuong">Binh Duong </option>
                    <option value="DaNang">Da Nang </option>
                    <option value="HaiPhong">Hai Phong </option>
                    <option value="CanTho">Can Tho  </option>
                    </select>
                </div>

                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                    <label className="form-label">Choose Payment Method</label>
                    <select onChange={this.paymentOnChange}    className="form-control">
                    <option value="">Choose</option>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Cash On Delivery">Stripe</option>
                    </select>
                </div>
                
                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                    <label className="form-label">Your Name</label>
                    <input onChange={this.nameOnChange}  className="form-control" type="text" placeholder=""/>
                </div>

                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                    <label className="form-label">Delivery Address</label>
                    <textarea onChange={this.addressOnChange}  rows={2}  className="form-control" type="text" placeholder=""/>
                </div>
                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                    <button onClick={this.confirmOnClick}  className="btn  site-btn">{this.state.confirmBtn} </button>
                </div>
                </div>
                                    </div>
                            </div>
                            </div>
     </Col> 
        </Row>

    </Container>

    {this.pageRefresh()}
    {this.pageRedirect()}
   </Fragment>
    )
  }
}

export default Cart