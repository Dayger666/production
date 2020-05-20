import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:2999/api/",
})

export const authAPI = {
    registerUser(userData){
        return instance.post(`register`, userData).then(res => res.data);
    },
    loginUser(userData){
        return instance.post(`login`, userData).then(res => res.data);
    },
}

export const planAPI = {
    getPlan(){
        return instance.get(`getPlan`).then(res => res.data);
    },
    createOrderFromPlan(id){
        return instance.post(`createOrderFromPlan`, {id}).then(res => res.data);
    },
    getMaterials(){
        return instance.get(`getMaterials`).then(res => res.data);
    }

}

export const specAPI = {
    getSpecifications(){
        return instance.get(`getSpec`).then(res => res.data);
    },
    createSpecification(data){
        return instance.post(`createSpec`, data).then(res => res.data);
    },
    planOrder(id){
        return instance.post(`planOrder`, {id}).then(res => res.data);
    },
    updateOrder(id, status){
        return instance.post(`updateOrder`, {id, status}).then(res => res.data);
    },
    updateOrderSteps(id, steps){
        return instance.post(`updateOrderSteps`, {id, steps}).then(res => res.data);
    },
    deleteSpec(id){
        return instance.post(`deleteSpec`, {id}).then(res => res.data);
    }

}

export const orderAPI = {
    getOrders(){
        return instance.get(`getOrders`).then(res => res.data);
    },
    unloadToStore(id, name, amount){
        return instance.post(`unloadToStore`, {id, name, amount}).then(res => res.data);
    },
}