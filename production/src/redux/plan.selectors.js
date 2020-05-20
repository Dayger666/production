import {createSelector} from "reselect";

const getOrdersSelector = (state) => {
    return state.plan.orders
}

export const getOrders = createSelector(getOrdersSelector, (orders) => {
    return orders;
})

export const getOrder = (state, id) => state.plan.orders.filter(order => {
    if (order._id === id) return order
})
