import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

class Checkout extends Component {

    // UNSAFE_componentWillMount() {
    //     const queryParams = new URLSearchParams(this.props.location.search)
    //     const ingredients = {};
    //     let price = 0;

    //     for (let param of queryParams.entries()) {
    //         if (param[0] === 'price'){
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //             //[salad, 1]
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: price
    //     })
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log("In checkout.js:" + this.props.match.path);
        let summary = <Redirect to="/" />;
        let purchased = null;
        if (this.props.ings) {
            if (this.props.purchased){
                purchased = <Redirect to="/" />;
            }
            summary =
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
        }
        return (
            <div>
                {purchased}
                {summary}
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);

