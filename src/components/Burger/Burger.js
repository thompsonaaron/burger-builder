import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
    console.log(props.ingredients);
    let ingredients = Object.keys(props.ingredients)
        .map( igKey => {
            return [...Array(props.ingredients[igKey])].map( (_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce( (accumulator, currentValue) => {
            return accumulator.concat(currentValue)
        }, []);
        console.log(ingredients);

        if (ingredients.length === 0){
            ingredients = <p>Please start adding ingredients!</p>
        }

        
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;