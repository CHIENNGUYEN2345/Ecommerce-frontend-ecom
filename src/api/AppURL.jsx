class AppURL {
  static BaseURL = "http://localhost:8000/api";
  static VisitorDetails = this.BaseURL+"/getvisitor";
  static PostContact = this.BaseURL+"/postcontact";
  static AllSiteInfo = this.BaseURL+"/allsiteinfo";
  static AllCategoryDetails = this.BaseURL+"/allcategory";
  static ProductListByRemark(Remark){
    return this.BaseURL+"/productlistbyremark/"+Remark;
  }
  static ProductListByCategory(category){
    return this.BaseURL+"/productlistbycategory/"+category;
  }
  static ProductListBySubCategory(category, subcategory){
    return this.BaseURL+"/productlistbysubcategory/"+category+"/"+subcategory;
  }

  static AllSlider = this.BaseURL+'/allslider';

  static ProductDetails(code){
    return this.BaseURL+"/productdetails/"+code;
  }

  static NotificationHistory = this.BaseURL+'/notification';

  static ProductBySearch(searchkey){
    return this.BaseURL+"/search/"+searchkey;
  }

  //user login
  static UserLogin = this.BaseURL+'/login';
  //user profile page
  static UserData = this.BaseURL+'/user';
  //user regist page
  static UserRegister = this.BaseURL+'/register';
  //foget pw
  static UserForgetPassword = this.BaseURL+'/forgetpassword';
  //foget pw
  static UserResetPassword = this.BaseURL+'/resetpassword';

  static SimilarProduct(code){
    return this.BaseURL+"/similar/"+code;
  }

  static ReviewList(code){
    return this.BaseURL+"/reviewlist/"+code;
  }
  //add to cart
  static addToCart = this.BaseURL+'/addtocart';

  //cart count
  static CartCount(product_code){
    return this.BaseURL+"/cartcount/"+product_code;
  }

  //add fav
  static AddFavourite(product_code, email){
    return this.BaseURL+"/favourite/"+product_code+"/"+email;
  }

  static FavouriteList(email){
    return this.BaseURL+"/favouritelist/"+email;
  }

  static FavouriteRemove(product_code,email){
    return this.BaseURL+"/favouriteremove/"+product_code+"/"+email;
  }

  static CartList(email){
    return this.BaseURL+"/cartlist/"+email;
  }

  static RemoveCartList(id){
    return this.BaseURL+"/removecartlist/"+id;
  }

  //+ item
  static CartItemPlus(id, quantity, price){
    return this.BaseURL+"/cartitemplus/"+id+"/"+quantity+"/"+price;
  }

  //- item
  static CartItemMinus(id, quantity, price){
    return this.BaseURL+"/cartitemminus/"+id+"/"+quantity+"/"+price;
  }

  //add to cart
  static cartOrder = this.BaseURL+'/cartorder';

  //history of order
  static OrderListByUser(email){
    return this.BaseURL+"/orderlistbyuser/"+email;
  }

  //review
  //add to cart
  static postReview = this.BaseURL+'/postreview';
  
}
export default AppURL