import React, { Component, Fragment } from 'react'
import { Router, Route, Switch } from 'react-router'
import AboutPage from '../pages/AboutPage'
import CartPage from '../pages/CartPage'
import ContactPage from '../pages/ContactPage'
import FavouritePage from '../pages/FavouritePage'
import ForgetPasswordPage from '../pages/ForgetPasswordPage'
import HomePage from '../pages/HomePage'
import NotificationPage from '../pages/NotificationPage'
import PrivacyPage from '../pages/PrivacyPage'
import ProductCategoryPage from '../pages/ProductCategoryPage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import ProductSubCategoryPage from '../pages/ProductSubCategoryPage'
import PurchasePage from '../pages/PurchasePage'
import RefundPage from '../pages/RefundPage'
import RegisterPage from '../pages/RegisterPage'
import SearchPage from '../pages/SearchPage'
import UserLoginPage from '../pages/UserLoginPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import ProfilePage from '../pages/ProfilePage'
import axios from 'axios'
import AppURL from '../api/AppURL'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import OrderListPage from '../pages/OrderListPage'
class AppRoute extends Component {

  constructor(){
    super();
    this.state={
      user: {}
    }
  }



  setUser = (user) => {
    this.setState({user: user})
  }

  componentDidMount(){

    axios.get(AppURL.UserData).then(response=>{
      this.setUser(response.data)
    }).catch(error=> {

    });
  }

  render() {

    return (
      <Fragment>
        <NavMenuDesktop user={this.state.user} setUser={this.setUser}/>
        <Switch>
            {/* <Route exact path='/' component={HomePage} /> */}
            <Route exact path='/' render={(props) => <HomePage {...props} key={Date.now()} /> } />
            <Route exact path='/login' render={(props) => <UserLoginPage {...props} user={this.state.user} setUser={this.setUser} key={Date.now()} /> } />

            <Route exact path='/forget' render={(props) => <ForgetPasswordPage {...props} key={Date.now()} /> } />

            <Route exact path='/register' render={(props) => <RegisterPage user={this.state.user} setUser={this.setUser} {...props} key={Date.now()} /> } />

            <Route exact path='/reset/:id' render={(props) => <ResetPasswordPage {...props} key={Date.now()} /> } />

            <Route exact path='/profile' render={(props) => <ProfilePage user={this.state.user} setUser={this.setUser} {...props} key={Date.now()} /> } />

            <Route exact path='/contact' render={(props) => <ContactPage {...props} key={Date.now()} /> } />
            <Route exact path='/purchase' render={(props) => <PurchasePage {...props} key={Date.now()} /> } />
            <Route exact path='/privacy' render={(props) => <PrivacyPage {...props} key={Date.now()} /> } />
            <Route exact path='/refund' render={(props) => <RefundPage {...props} key={Date.now()} /> } />
            <Route exact path='/about' render={(props) => <AboutPage {...props} key={Date.now()} /> } />
            {/* <Route exact path='/login' component={UserLoginPage} />
            <Route exact path='/contact' component={ContactPage} />
            <Route exact path='/purchase' component={PurchasePage} />
            <Route exact path='/privacy' component={PrivacyPage} />
            <Route exact path='/refund' component={RefundPage} />
            <Route exact path='/about' component={AboutPage} /> */}
            <Route exact path='/productdetails' render={(props) => <ProductDetailsPage user={this.state.user} {...props} key={Date.now()} /> } />
            <Route exact path='/notification' render={(props) => <NotificationPage {...props} key={Date.now()} /> } />
            <Route exact path='/favourite' render={(props) => <FavouritePage user={this.state.user} {...props} key={Date.now()} /> } />
            {/* cart page */}
            <Route exact path='/cart' render={(props) => <CartPage user={this.state.user} {...props} key={Date.now()} /> } />

            <Route exact path='/productcategory/:category' render={(props) => <ProductCategoryPage {...props} key={Date.now()} /> } />
            <Route exact path='/productsubcategory/:category/:subcategory' render={(props) => <ProductSubCategoryPage {...props} key={Date.now()} /> } />
            <Route exact path='/productdetails/:code' render={(props) => <ProductDetailsPage user={this.state.user} {...props} key={Date.now()} /> } />
            <Route exact path='/productbysearch/:searchkey' render={(props) => <SearchPage {...props} key={Date.now()} /> } />
            
            <Route exact path='/orderlist' render={(props) => <OrderListPage user={this.state.user} {...props} key={Date.now()} /> } />
            {/* <Route exact path='/productdetails' component={ProductDetailsPage} />
            <Route exact path='/notification' component={NotificationPage} />
            <Route exact path='/favourite' component={FavouritePage} />
            <Route exact path='/cart' component={CartPage} />
            <Route exact path='/productcategory/:category' component={ProductCategoryPage} />
            <Route exact path='/productsubcategory/:category/:subcategory' component={ProductSubCategoryPage} />
            <Route exact path='/productdetails/:code' component={ProductDetailsPage} /> */}
        </Switch>
      </Fragment>
    )
  }
}

export default AppRoute