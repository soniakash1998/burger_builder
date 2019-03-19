import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Aux from '../../HOC/Aux/Aux';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

const ingredientPrice = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.9
}; 

class BurgerBuilder extends Component{
    
    state = {
        ingredients:null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error: false
    }
    
    componentDidMount () {
        axios.get('https://burger-builder-7c89c.firebaseio.com/ingredients.json')
            .then(response => {
               this.setState({ingredients : response.data}); 
            })
            .catch(error => this.setState({error : true}));
    }
    
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum+el;
            }, 0);
            this.setState({purchasable : sum > 0});
    }
    
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = ingredientPrice[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = ingredientPrice[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    
    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        });
    }
    
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        let burger = this.state.error ? <p>sometihng went wrong </p> : <Spinner />
        
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler} 
                        disabled = {disabledInfo}
                        purchasable = {!this.state.purchasable}
                        ordered = {this.purchaseHandler}
                        price = {this.state.totalPrice}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients = {this.state.ingredients}
                price = {this.state.totalPrice}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}/>
        }
        
        
        if(this.state.loading){
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);