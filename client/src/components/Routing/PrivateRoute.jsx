import React from "react";
import { Route, Redirect } from "react-router-dom";

// custom route defination
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        // localStorage.getItem("authToken") ? (
        //   <Component {...props} />
        // ) : (
        //   <Redirect to="/login" />
        // )
        <Component {...props} />
      )}
    />
  );
};

export default PrivateRoute;
