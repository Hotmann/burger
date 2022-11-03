import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import * as actions from "../../store/actions/index";

const Checkout = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    props.onInitPurchase();
  });

  const checkoutCancelledHandler = () => {
    navigate(-1, { replace: true });
  };

  const checkoutContinuedHandler = () => {
    navigate("contact-data", { replace: true });
    // this.props.history.replace("/checkout/contact-data");
  };

  let summary = <Navigate to="/" />;

  if (props.ings) {
    const purchasedRedirect = props.purchased ? navigate("/") : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Outlet />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
