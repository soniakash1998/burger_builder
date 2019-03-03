import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import Aux from '../../HOC/Aux';

class BurgerBuilder extends Component{
    
    state = {
        ingredients : {
            salad : 1,
            bacan : 1,
            cheese : 2,
            meat : 2
        }
    }
    render(){
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <div>Burger Control</div>
            </Aux>
        );
    }  
};

export default BurgerBuilder;