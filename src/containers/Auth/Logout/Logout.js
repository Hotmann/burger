import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as actions from "../../../store/actions/index";
const Logout = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    props.onLogout();
    navigate("/");
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
