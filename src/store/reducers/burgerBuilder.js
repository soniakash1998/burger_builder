import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients : null,
    totalPrice : 4,
    error : false
};

const ingredientPrice = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.9
}; 

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT):
            return{
                   ...state,
                   ingredients : {
                       ...state.ingredients,
                       [action.ingredientName]: state.ingredients[action.ingredientName]+1
                   },
                   totalPrice : state.totalPrice + ingredientPrice[action.ingredientName]
            };
        
        case(actionTypes.REMOVE_INGREDIENT):
            return{
                   ...state,
                   ingredients : {
                       ...state.ingredients,
                       [action.ingredientName]: state.ingredients[action.ingredientName]-1
                   },
                   totalPrice : state.totalPrice - ingredientPrice[action.ingredientName]
            };
        
        case(actionTypes.SET_INGREDIENTS):
            return{
                ...state,
                ingredient: action.ingredients,
                error : false
            }
            
        case(actionTypes.FETCH_INGREDIENTS_FAILED):
            return{
                ...state,
                error:true
            }
        
        default:
            return state;
    }
}

export default reducer;