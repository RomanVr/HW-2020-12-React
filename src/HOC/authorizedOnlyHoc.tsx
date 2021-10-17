import React from "react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { asyncLocalStorage } from "@/api/auth";

enum CheckState {
  initiated,
  succeed,
  failed,
}

export function authorizedOnlyHoc<P>(
  WrappedComponent: React.ComponentType<P>,
  redirectPath = "/login"
): React.FC<P> {
  const WithAuthorized = (props: P) => {
    const [isAuthorized, setIsAuthorized] = useState(CheckState.initiated);
    useEffect(() => {
      (async () => {
        const isAuthorized = await asyncLocalStorage.isLoggedIn();
        setIsAuthorized(isAuthorized ? CheckState.succeed : CheckState.failed);
      })();
    }, []);

    if (isAuthorized === CheckState.initiated) {
      return <div>Checking if user is authorized</div>;
    }

    if (isAuthorized === CheckState.failed) {
      return <Redirect to={redirectPath} />;
    }
    return <WrappedComponent {...props} />;
  };

  WithAuthorized.displayName = `${WrappedComponent?.displayName}withAuthorized`;

  return WithAuthorized;
}
