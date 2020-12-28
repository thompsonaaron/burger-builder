import * as actionTypes from './actionTypes';
import instance from '../../axios-orders';

export const add_ingredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
};
 
export const remove_ingredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () => {
    return async(dispatch) =>  {
        try{
            const response = await instance.get('/ingredients.json');
            dispatch(setIngredients(response.data));
        } catch {
            dispatch(fetchIngredientsFailed())
        }
    }
}