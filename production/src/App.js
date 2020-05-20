import React, {useEffect} from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import SalesPlan from "./components/SalesPlan/SalesPlan"
import {compose} from "redux";
import {Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import CreateSpecification from "./components/Specifications/CreateSpecification/CreateSpecification";
import AllSpecifications from "./components/Specifications/AllSpecifications/AllSpecifications";
import {getSpecifications} from "./redux/specification.reducer";
import Orders from "./components/Orders/Orders";
import Materials from "./components/Materials/Materials";

function App(props) {
    useEffect(() => {
       props.getSpecifications();
    }, [])
  return (
    <div className="App">
        <Header/>
        <Route path={'/register'} render={() => <Register/>}/>
        <Route path={'/login'} render={() => <Login/>}/>
        <Route path={'/create_specification'} render={() => <CreateSpecification/>}/>
        <div className="app_content">
            <Route path={'/sales_plan'} render={() => <SalesPlan/>}/>
            <Route path={'/specifications'} render={() => <AllSpecifications/>}/>
            <Route path={'/orders'} render={() => <Orders/>}/>
            <Route path={'/materials'} render={() => <Materials/>}/>
        </div>
    </div>
  );
}


function mapStateToProps() {
    return {}
}

export default compose(
    withRouter,
    connect(mapStateToProps,{getSpecifications}),
)(App)



