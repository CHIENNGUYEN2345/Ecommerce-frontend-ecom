import React, { Component, Fragment } from 'react'
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
import SearchList from '../components/ProductDetails/SearchList'
class SearchPage extends Component {
    constructor({match}){
        super();
        this.state={
            SearchKey: match.params.searchkey,
            ProductData: []
        }
    }

    componentDidMount(){
        window.scroll(0,0);
        // alert(this.state.Category);
        axios.get(AppURL.ProductBySearch(this.state.SearchKey)).then(response => {
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
        {/* <SubCategory/> */}
        <SearchList SearchKey={this.state.SearchKey} ProductData={this.state.ProductData} />
        
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

export default SearchPage