import React, { Component } from 'react'
import { Fragment } from 'react'
import Privacy from '../components/others/Privacy'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import UserLogin from '../components/common/UserLogin'
import Purchase from '../components/others/Purchase'
import Category from '../components/ProductDetails/Category'
import AppURL from '../api/AppURL'
import axios from 'axios'
import SubCategory from '../components/ProductDetails/SubCategory'
class ProductSubCategoryPage extends Component {
    constructor({match}){
        super();
        this.state={
            Category: match.params.category,
            SubCategory: match.params.subcategory,
            ProductData: []
        }
    }

    componentDidMount(){
        window.scroll(0,0);
        // alert(this.state.Category);
        axios.get(AppURL.ProductListBySubCategory(this.state.Category, this.state.SubCategory)).then(response => {
            this.setState({ProductData: response.data});
          }).catch(error =>{
      
          });
      }
  render() {
    return (
        <Fragment>
        <div className='Desktop'>
          <NavMenuDesktop/>
          
        </div>
        <div className='Mobile'>
          <NavMenuMobile/>
          
        </div>
        
        <SubCategory Category={this.state.Category} SubCategory={this.state.SubCategory} ProductData={this.state.ProductData} />
        
        <div className='Desktop'>
          <FooterDesktop/>
        </div>
        <div className='Mobile'>
          <FooterMobile/>
        </div>
        
        
      
    </Fragment>
    )
  }
}

export default ProductSubCategoryPage