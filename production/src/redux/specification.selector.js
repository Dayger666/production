import {createSelector} from "reselect";

const getSpecOrders = (state) => {
    return state.plan.orders
}

export const getOrdersSelector = createSelector(getOrdersSelector, (orders) => {
    return orders;
})

export const getOrder = (state, id) => state.plan.orders.filter(order => {
    if (order._id === id) return order
})
