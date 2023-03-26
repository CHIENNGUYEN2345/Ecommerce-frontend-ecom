import React, { Component, Fragment } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/easyshop.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MegaMenuMobile from '../home/MegaMenuMobile';

class NavMenuMobile extends Component {

  constructor(){
    super();
    this.state={
      SideNavState: "sideNavClose",
      ContentOverState: "ContentOverlayClose"
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

  render() {
    return (
      <Fragment>
        <div className='TopSectionDown'>
        <Container fluid={"true"} className='fixed-top shadow-sm p-2 mb-0 bg-white'>
          <Row>
            <Col lg={4} sm={12} md={4} xs={12}>

            <Button className="btn" onClick={this.MenuBarClickHandler}>
                <i className='fa fa-bars'></i>
              </Button>

              <Link to="/"><img className='nav-logo' src={Logo} /></Link>
              <Button className="cart-btn">
                <i className='fa fa-shopping-cart'> 3 items</i>
              </Button>
            </Col>

            
          </Row>
        </Container>

        <div className={this.state.SideNavState}>
          
          <MegaMenuMobile/>
        </div>

        <div onClick={this.ContentOverlayClickHandler} className={this.state.ContentOverState}>

        </div>
        
        </div>
      </Fragment>
    )
  }
}

export default NavMenuMobile