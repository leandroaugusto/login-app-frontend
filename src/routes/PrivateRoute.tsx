import React from "react";
import { Route, Navigate } from "react-router-dom";

import { getAuthToken } from "@/storage/tokenStorage";

interface PrivateRouteProps {
  component: React.FunctionComponent<Record<string, never>>;
  path?: string;
  [key: string]: unknown;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = !!getAuthToken();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
