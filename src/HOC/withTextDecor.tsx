import React from "react";

export function withTextDecor<P>(
  WrappedComponent: React.ComponentType<P>,
  styleParams: Record<string, unknown>
): React.FC<P> {
  const WithTextDecor = (props: P) => (
    <WrappedComponent {...props} {...styleParams} />
  );

  WithTextDecor.displayName = `${WrappedComponent?.displayName}withTextDecor`;
  return WithTextDecor;
}
