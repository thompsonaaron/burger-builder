import * as actionTypes from './actionTypes';
import instance from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return async (dispatch) => {
        try {
            dispatch(purchaseBurgerStart());
            const response = await instance.post('/orders.json', JSON.stringify(orderData));
            console.log(response);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            // if (!response) {
            //     throw 'Response was not ok';
            // }
            //alert("Order Received!");
        } catch (error) {
            // currently, this doesn't get caught by the withErrorHandler unless it uses componentWillMount
            console.log('Encountered an error while posting order.' + error);
            dispatch(purchaseBurgerFail(error));
            return error;
        }
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return async dispatch => {
        dispatch(fetchOrderStart());
        let response = null;
        try{
            let response = await instance.get('/orders.json');
            console.log(response);
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        }catch (error){
            dispatch(fetchOrderFail(error));
        }
    }
}
