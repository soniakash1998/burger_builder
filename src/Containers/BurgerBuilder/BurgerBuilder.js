import React, {Component} from 'react';
import {connect} from 'react-redux';

import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Aux from '../../HOC/Aux/Aux';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{
    
    state = {
        purchasing : false,
    }
    
    componentDidMount () {
        console.log(this.props);
        this.props.onInitIngredients();
    }
    
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum+el;
            }, 0);
            return sum > 0
    }
    
    purchaseHandler = () => {
        this.setState({purchasing : true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }
    
    purchaseContinueHandler = () => {
        
        this.props.history.push('/checkout');
    }
    
    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        let burger = this.state.error ? <p>sometihng went wrong </p> : <Spinner />
        
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved} 
                        disabled = {disabledInfo}
                        purchasable = {!this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        price = {this.props.price}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients = {this.props.ings}
                price = {this.props.price}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}/>
        }
        
            
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }  
}

const mapStoreToProps = state => {
    return{
        ings : state.ingredients,
        price : state.totalPrice,
        error : state.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded : (ingNmae) => dispatch(burgerBuilderActions.addIngredient(ingNmae)),
        onIngredientRemoved : (ingNmae) => dispatch(burgerBuilderActions.removeIngredient(ingNmae)),
        onInitIngredients : () => dispatch(burgerBuilderActions.initIngredients()) 
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));