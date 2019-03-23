import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class CheckOut extends Component{
    
    checkoutCancelledHandeller = () => {
        this.props.history.goBack();
    }
    
    checkoutContinuedHandeller = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients = {this.props.ings}
                    checkoutCancelled = {this.checkoutCancelledHandeller}
                    checkoutContinued = {this.checkoutContinuedHandeller}/>
                <Route 
                    path = {this.props.match.path + '/contact-data'}
                    component = {ContactData}
                />
            </div>
        );
    }
}

const mapStoreToProps = state => {
    return{
        ings: state.ingredients
    };
};

export default connect(mapStoreToProps)(CheckOut);