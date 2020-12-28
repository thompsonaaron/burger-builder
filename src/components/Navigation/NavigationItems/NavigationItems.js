import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
        <NavigationItem link="/orders" exact>Orders</NavigationItem>
        <NavigationItem link="auth" exact>Login</NavigationItem>
    </ul>
);

export default navigationItems;