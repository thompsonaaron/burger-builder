import * as actionTypes from './actionTypes';
//action creators (a.k.a. functions):
//synchronous code to execute when async is finished
export const add = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}
//async code 
export const add_ingredient = (ingredientName) => {
    return function (dispatch, getState){ // second argument is current state prior to async call; see mapStateToProps
        const ingredients = getState().ingredients;
        console.log('ingredients from async are ' + JSON.stringify(ingredients));
        // setTimeout( () => {
            dispatch(add(ingredientName));
        // }, 2000);
    }
};
 
export const remove_ingredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
};