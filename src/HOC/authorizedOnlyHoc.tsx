import React from "react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";

enum CheckState {
  initiated,
  succeed,
  failed,
}

export const authorizedOnlyHoc = <Props extends Record<string, unknown>>(
  Component: React.ComponentType<Props>,
  redirectPath = "/login"
): React.ComponentType<Props> => {
  const WithAuthorized = (props: Props) => {
    const [isAuthorized, setIsAuthorized] = useState(CheckState.initiated);
    useEffect(() => {
      const isAuthorized = localStorage.getItem("nameUser");
      setIsAuthorized(isAuthorized ? CheckState.succeed : CheckState.failed);
    }, []);

    if (isAuthorized === CheckState.initiated) {
      return <div>Checking if user is authorized</div>;
    }

    if (isAuthorized === CheckState.failed) {
      return <Redirect to={redirectPath} />;
    }
    return <Component {...props} />;
  };

  WithAuthorized.displayName = `${Component.displayName}withAuthorized`;
  return WithAuthorized;
};
