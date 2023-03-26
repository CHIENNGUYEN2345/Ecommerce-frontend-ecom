import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Product1 from '../../assets/images/product/product1.png'
import Product2 from '../../assets/images/product/product2.png'
import Product3 from '../../assets/images/product/product3.png'
import Product4 from '../../assets/images/product/product4.png'
import  ReactDOM  from 'react-dom'
import { Link, Redirect } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import SuggestedProduct from './SuggestedProduct'
import ReviewList from './ReviewList'
import cogoToast from 'cogo-toast';
import axios from 'axios'
import AppURL from '../../api/AppURL'
class ProductDetails extends Component {

     constructor(){
          super();
          this.state={
               previewImg: "0",
               isSize: null,
               isColor: null,
               color: "",
               size: "",
               quantity: "",
               productCode: null,
               addToCart: "Add To Cart",
               pageRefreshStatus: false,
               addToFav: "Favourite",
               orderNow: 'Order Now',
               pageRedirectStatus: false,



          }

     }

     componentDidMount(){
          window.scroll(0,0)
        }

     imgOnClick = (event) => {
          let imgSrc = event.target.getAttribute('src');
          // let previewImg = document.getElementById('previewImg');
          // ReactDOM.findDOMNode(previewImg).setAttribute('src', imgSrc)
          this.setState({previewImg: imgSrc})
     }

     addToCart = () => {
          let isSize = this.state.isSize;
          let isColor = this.state.isColor;
          let color = this.state.color;
          let size = this.state.size;
          let quantity = this.state.quantity;
          let productCode = this.state.productCode;
          let email = this.props.user.email;
          if(isColor==='yes' && color.length===0){
               cogoToast.error('Please select Color', {position: 'top-right'});
          }
          else if(isSize==='yes' && size.length===0){
               cogoToast.error('Please select Size', {position: 'top-right'});
          }else if(quantity.length===0){
               cogoToast.error('Please select quantity', {position: 'top-right'});
          }
          else if(!localStorage.getItem('token')){
               cogoToast.warn('Please login first!', {position: 'top-right'});
          }else{
               this.setState({addToCart: "Adding..."})
               let MyFormData = new FormData();
               MyFormData.append('color', color);
               MyFormData.append('size', size);
               MyFormData.append('quantity', quantity);
               MyFormData.append('product_code', productCode);
               MyFormData.append('email', email);

               axios.post(AppURL.addToCart, MyFormData).then(response => {
                    if(response.data===1)//means if get successful (1 is the return)
                    {
                         cogoToast.success('Product Added Successfully', {position: 'top-center'});
                         this.setState({addToCart: "Add To Cart"})
                         this.setState({pageRefreshStatus: true})
                    }else{
                         cogoToast.error('Your request is not done, try again!', {position: 'top-center'});
                         this.setState({addToCart: "Add To Cart"})
                    }
                  }).catch(error =>{
                    cogoToast.error('Your request is not done, try again!', {position: 'top-center'});
                    this.setState({addToCart: "Add To Cart"})
                  });
          }

     }//end addtocart medthod.

     //add to fav
     addToFav = () => {
          this.setState({addToFav: "Adding..."});
          let productCode = this.state.productCode;
          let email = this.props.user.email;
          if(!localStorage.getItem('token')){
               cogoToast.warn('Please login first!', {position: 'top-right'});

          }else{
               axios.get(AppURL.AddFavourite(productCode,email)).then(response => {
                    if(response.data===1)//means if get successful (1 is the return)
                    {
                         cogoToast.success('Product Added Successfully', {position: 'top-center'});
                         this.setState({addToFav: "Favourite"})
                         
                    }else{
                         cogoToast.error('Your request is not done, try again!', {position: 'top-center'});
                         this.setState({addToFav: "Favourite"})
                    }
                  }).catch(error =>{
                    cogoToast.error('Your request is not done, try again!', {position: 'top-center'});
                    this.setState({addToFav: "Add To Cart"})
                  });
          }
     }//end

     orderNow = () => {
          let isSize = this.state.isSize;
          let isColor = this.state.isColor;
          let color = this.state.color;
          let size = this.state.size;
          let quantity = this.state.quantity;
          let productCode = this.state.productCode;
          let email = this.props.user.email;
          if(isColor==='yes' && color.length===0){
               cogoToast.error('Please select Color', {position: 'top-right'});
          }
          else if(isSize==='yes' && size.length===0){
               cogoToast.error('Please select Size', {position: 'top-right'});
          }else if(quantity.length===0){
               cogoToast.error('Please select quantity', {position: 'top-right'});
          }
          else if(!localStorage.getItem('token')){
               cogoToast.warn('Please login first!', {position: 'top-right'});
          }else{
               this.setState({orderNow: "Adding..."})
               let MyFormData = new FormData();
               MyFormData.append('color', color);
               MyFormData.append('size', size);
               MyFormData.append('quantity', quantity);
               MyFormData.append('product_code', productCode);
               MyFormData.append('email', email);

               axios.post(AppURL.addToCart, MyFormData).then(response => {
                    if(response.data===1)//means if get successful (1 is the return)
                    {
                         cogoToast.success('Product Added Successfully', {position: 'top-center'});
                         this.setState({orderNow: "Order Now"})
                         this.setState({pageRedirectStatus: true})
                    }else{
                         cogoToast.error('Your request is not done, try again!', {position: 'top-center'});
                         this.setState({addToCart: "Add To Cart"})
                    }
                  }).catch(error =>{
                    cogoToast.error('Your request is not done, try again!', {position: 'top-center'});
                    this.setState({addToCart: "Add To Cart"})
                  });
          }
     }//end

     pageRedirect = () => {
          if(this.state.pageRedirectStatus===true){
               
               return (
                    <Redirect to='/cart'/>
               )
          }
     }

     colorOnChange = (event) => {
          let color = event.target.value;
          // alert(color);
          this.setState({color: color})
     }

     sizeOnChange = (event) => {
          let size = event.target.value;
          // alert(size);
          this.setState({size: size})
     }

     quantityOnChange = (event) => {
          let quantity = event.target.value;
          this.setState({quantity: quantity})
     }

     PriceOption(price, special_price){
          if(special_price=='na'){
               return (
                    <p className='product-price-on-card'>Price: ${price}</p>
               )
          }else{
               return (
                    <p className='product-price-on-card'>Price: <strike className='text-secondary'>${price}</strike> ${special_price}</p>
               )
          }
     }

     pageRefresh = () => {
          if(this.state.pageRefreshStatus===true){
               let URL = window.location;
               return (
                    <Redirect to={URL}/>
               )
          }
     }

  render() {

     let ProductAllData = this.props.data;
     let title = ProductAllData['productList'][0]['title'];
     let brand = ProductAllData['productList'][0]['brand'];
     let category = ProductAllData['productList'][0]['category'];
     let subcategory = ProductAllData['productList'][0]['subcategory'];
     let image = ProductAllData['productList'][0]['image'];

     if(this.state.previewImg === "0"){
          this.setState({previewImg: image})
     }

     let price = ProductAllData['productList'][0]['price'];
     let product_code = ProductAllData['productList'][0]['product_code'];
     let remark = ProductAllData['productList'][0]['remark'];
     let special_price = ProductAllData['productList'][0]['special_price'];
     let star = ProductAllData['productList'][0]['star'];

     let short_description = ProductAllData['productDetails'][0]['short_description'];
     let image_one = ProductAllData['productDetails'][0]['image_one'];
     let image_two = ProductAllData['productDetails'][0]['image_two'];
     let image_three = ProductAllData['productDetails'][0]['image_three'];
     let image_four = ProductAllData['productDetails'][0]['image_four'];
     let long_description = ProductAllData['productDetails'][0]['long_description'];
     let color = ProductAllData['productDetails'][0]['color'];
     let size = ProductAllData['productDetails'][0]['size'];
     let product_id = ProductAllData['productDetails'][0]['product_id'];

     var ColorDiv = 'd-none';
     if(color!='na'){
          let ColorArray = color.split(',')
          var ColorOption = ColorArray.map((ColorList, i) => {
               return <option value={ColorList}>{ColorList}</option>
          })
          ColorDiv = ''
     }
     else{
          ColorDiv = 'd-none'
     }

     var SizeDiv = 'd-none';
     if(size!='na'){
          let SizeArray = size.split(',')
          var SizeOption = SizeArray.map((SizeList, i) => {
               return <option value={SizeList}>{SizeList}</option>
          })
          SizeDiv = ''
     }
     else{
          SizeDiv = 'd-none'
     }

     if(this.state.isSize===null){
          if(size!="na"){
               this.setState({isSize: "yes"})
          }else{
               this.setState({isSize: "no"})
          }
     }

     if(this.state.isColor===null){
          if(color!="na"){
               this.setState({isColor: "yes"})
          }else{
               this.setState({isColor: "no"})
          }
     }

     if(this.state.productCode===null){
          this.setState({productCode: product_code})
     }

    return (
        <Fragment>
        <Container fluid={true} className="BetweenTwoSection">
        <div className='breadbody'>
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={"/productcategory/"+category}>{category}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={"/productsubcategory/"+category+"/"+subcategory}>{subcategory}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={"/productdetails/"+product_id}>{title}</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
        </div>
            <Row className="p-2">
<Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
     <Row>
     <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
     {/* <img id="previewImg" className="bigimage" src={image_one} /> */}

     <div className=''>
          <InnerImageZoom className='detailimage' src={this.state.previewImg} zoomScale={1.8} zoomType={'hover'} zoomSrc={this.state.previewImg} />
     </div>

     <Container  className="my-3">
          <Row>
               <Col className="p-0 m-0"  md={3} lg={3} sm={3} xs={3}>
                    <img onClick={this.imgOnClick} className="w-100 smallimage product-sm-img" src={image_one} />
               </Col>
               <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                    <img onClick={this.imgOnClick} className="w-100 smallimage product-sm-img" src={image_two} />
               </Col>
               <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                    <img onClick={this.imgOnClick} className="w-100 smallimage product-sm-img" src={image_three} />
               </Col>
               <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                    <img onClick={this.imgOnClick} className="w-100 smallimage product-sm-img" src={image_four} />
               </Col>
          </Row>
     </Container>
     </Col>
     <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
     <h5 className="Product-Name">{title}</h5>
     <h6 className="section-sub-title">{short_description}</h6>
     {/* price here */}
     {this.PriceOption(price, special_price)}
     <h6 className="mt-2">Category: {category}</h6>
     {/* <div className="input-group">
          <div className="form-check mx-1">
               <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
               <label className="form-check-label" htmlFor="exampleRadios1">Black</label>
          </div>
          <div className="form-check mx-1">
               <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
               <label className="form-check-label" htmlFor="exampleRadios1">Green</label>
          </div>
          <div className="form-check mx-1">
               <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
               <label className="form-check-label" htmlFor="exampleRadios1">Red</label>
          </div>
     </div> */}

     <h6 className="mt-2">Sub Category: {subcategory}</h6>
     <h6 className="mt-2">Brand: <b>{brand}</b></h6>
     <h6 className="mt-2">Product code: {product_code}</h6>
     {/* <div className="input-group">
          <div className="form-check mx-1">
               <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
               <label className="form-check-label" htmlFor="exampleRadios1">X</label>
          </div>
          <div className="form-check mx-1">
               <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
               <label className="form-check-label" htmlFor="exampleRadios1">XX</label>
          </div>
          <div className="form-check mx-1">
               <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
               <label className="form-check-label" htmlFor="exampleRadios1">XXXX</label>
          </div>
     </div> */}

     <div className={ColorDiv}>
          <h6 className='mt-2'>Choose color: </h6>
          <select onChange={this.colorOnChange} className='form-control form-select'>
               <option>Choose color</option>{ColorOption}
          </select>
     </div>

     <div className={ColorDiv}>
          <h6 className='mt-2'>Choose size: </h6>
          <select onChange={this.sizeOnChange} className='form-control form-select'>
               <option>Choose size</option>{SizeOption}
          </select>
     </div>

     <div className={ColorDiv}>
          <h6 className='mt-2'>Choose quantity: </h6>
          <select onChange={this.quantityOnChange} className='form-control form-select'>
               <option>Choose Quantity</option>
               <option value='01'>01</option>
               <option value='02'>02</option>
               <option value='03'>03</option>
               <option value='04'>04</option>
               <option value='04'>05</option>
               <option value='04'>06</option>
               <option value='04'>07</option>
               <option value='04'>08</option>
               <option value='04'>09</option>
               <option value='04'>10</option>
          </select>
     </div>

     {/* <h6 className="mt-2">Quantity</h6>
     <input  className="form-control text-center w-50" type="number" /> */}

     <div className="input-group mt-3">
          {/* //button add to cart */}
          <button onClick={this.addToCart} className="btn site-btn m-1 "> <i className="fa fa-shopping-cart"></i>  {this.state.addToCart}</button>
          <button onClick={this.orderNow} className="btn btn-primary m-1"> <i className="fa fa-car"></i>  {this.state.orderNow}</button>
          <button onClick={this.addToFav} className="btn btn-primary m-1"> <i className="fa fa-heart"></i> {this.state.addToFav}</button>
     </div>
     </Col>
     </Row>

     <Row>
     <Col className="" md={6} lg={6} sm={12} xs={12}>
     <h6 className="mt-2">DETAILS</h6>
     <p>{long_description}</p>
     </Col>

     <Col className="" md={6} lg={6} sm={12} xs={12}>
     
          <ReviewList code={product_code}/>
     </Col>
     </Row>

</Col>
            </Row>
        </Container>
        <SuggestedProduct subcategory={subcategory}/>

        {this.pageRefresh()}
          {this.pageRedirect()}
        </Fragment>
    )
  }
}

export default ProductDetails