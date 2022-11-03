import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import ContactData from "./containers/Checkout/ContactData/ContactData";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "../src/store/actions/index";

const AsyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const AsyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Routes>
        <Route path="/" element={<BurgerBuilder />} />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path="orders" element={<AsyncOrders />} />
          <Route path="checkout/" element={<AsyncCheckout />}>
            <Route path="/checkout/contact-data" element={<ContactData />} />
          </Route>
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="logout" element={<Logout />} />
          <Route
            path="*"
            element={<Navigate to={this.props.authRedirectPath} />}
          />
        </Routes>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.checkAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
