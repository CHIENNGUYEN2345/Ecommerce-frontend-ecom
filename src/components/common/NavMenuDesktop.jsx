import React, { Component, Fragment } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/easyshop.png';
import Bars from '../../assets/images/bars.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import MegaMenuMobile from '../home/MegaMenuMobile';
import MegaMenuAll from '../home/MegaMenuAll';
import axios from 'axios';
import AppURL from '../../api/AppURL';

class NavMenuDesktop extends Component {
  constructor(){
    super();
    this.state={
      SideNavState: "sideNavClose",
      ContentOverState: "ContentOverlayClose",
      Searchkey: "",
      SearchRedirectStatus: false,
      cartCount: 0
    };
    this.searchOnChange = this.searchOnChange.bind(this);
    this.searchOnClick = this.searchOnClick.bind(this);
    this.searchRedirect = this.searchRedirect.bind(this);
  }

  componentDidMount(){
    let product_code =this.props.product_code;
    axios.get(AppURL.CartCount(product_code)).then((response)=>{
      this.setState({cartCount: response.data})
    })
  }

  searchOnChange(event){
    let Searchkey = event.target.value;
    this.setState({Searchkey: Searchkey})
  }

  searchOnClick(){
    if(this.state.Searchkey.length>=3){
      this.setState({SearchRedirectStatus: true})
    }else{
      alert('Please type more than 2 character.')
    }
  }

  searchRedirect(){
    if(this.state.SearchRedirectStatus===true){
      return <Redirect to={'/productbysearch/'+this.state.Searchkey} />
    }
  }



  MenuBarClickHandler = () =>{
    this.SideNavOpenClose();
  }

  ContentOverlayClickHandler = () =>{
    this.SideNavOpenClose();
  }

  SideNavOpenClose = () =>{
    let SideNavState = this.state.SideNavState;
    let ContentOverState = this.state.ContentOverState;
    if(SideNavState === 'sideNavOpen'){
      this.setState({SideNavState: 'sideNavClose',
      ContentOverState: 'ContentOverlayClose'})
    }else{
      this.setState({SideNavState: 'sideNavOpen',
      ContentOverState: 'ContentOverlayOpen'})
    }
  }

  logOut = () => {
    localStorage.clear();
  }

  render() {

    let buttons;
    if(localStorage.getItem('token')){
        buttons = (
          <div>
                <Link to="/favourite" className='btn'>
                <i className='fa h4 fa-heart'></i><sup><span className='badge text-white bg-danger'>3</span></sup>
              </Link>
              <Link to="/notification" className='btn'>
                <i className='fa h4 fa-bell'></i><sup><span className='badge text-white bg-danger'>5</span></sup>
              </Link>
              
              <Link to='/profile' className='h4 btn'>PROFILE</Link>

              <Link to='/' onClick={this.logOut} className='h4 btn'>LOGOUT</Link>

              <Link to='/cart' className="cart-btn">
                <i className='fa fa-shopping-cart'></i> {this.state.cartCount} items
              </Link>
          </div>
        )
    }else{
          buttons = (
            <div>
                  <Link to="/favourite" className='btn'>
                  <i className='fa h4 fa-heart'></i><sup><span className='badge text-white bg-danger'>3</span></sup>
                </Link>
                <Link to="/notification" className='btn'>
                  <i className='fa h4 fa-bell'></i><sup><span className='badge text-white bg-danger'>5</span></sup>
                </Link>
                
                <Link to='/login' className='h4 btn text-secondary'>LOGIN</Link>
  
                <b><Link to='/register' className='h4 btn'>REGISTER</Link></b>
  
                <Link to='/cart' className="cart-btn">
                  <i className='fa fa-shopping-cart'></i> 0 items
                </Link>
            </div>
          )
    }

    return (
      <Fragment>
        <div className='TopSectionDown'>
        <Navbar fixed={'top'} className='navbar' bg="light">
        <Container fluid={"true"} className='fixed-top shadow-sm p-2 mb-0 bg-white'>
          <Row>
            <Col lg={4} sm={12} md={4} xs={12}>
            {/* <Button className="btn" >
                <i className='fa fa-bars'></i>
              </Button> */}
              <img src={Bars} className="bar-img" onClick={this.MenuBarClickHandler} />
              <Link to="/"><img className='nav-logo' src={Logo} /></Link>
            </Col>

            <Col className='p-1 mt-1' lg={4} sm={12} md={4} xs={12}>
              <div className='input-group w-100'>
                <input onChange={this.searchOnChange} type="text" className="form-control" />
                <Button onClick={this.searchOnClick} type='button' className='btn site-btn'>
                  <i className='fa fa-search'></i>
                </Button>
              </div>
            </Col>

            <Col className='p-1 mt-1' lg={4} sm={12} md={4} xs={12}>

              {buttons}
            </Col>
          </Row>
          {this.searchRedirect()}
        </Container>
        </Navbar>
        </div>
        <div className={this.state.SideNavState}>
          
          <MegaMenuAll />
        </div>

        <div onClick={this.ContentOverlayClickHandler} className={this.state.ContentOverState}>

        </div>

      </Fragment>
    )
  }
}

export default NavMenuDesktop