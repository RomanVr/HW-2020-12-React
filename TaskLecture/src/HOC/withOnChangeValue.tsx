import React from "react";

/**
 * см тесты в src/utils/withOnChangeValue.test.tsx
 * @param Component
 */

// Обернуть input или другой компонент с обработчиком onChange,
// который передает данные в другой обработчик, например onChangeValue
export const withOnChangeValue = <P extends Object>(
  Component: React.ComponentType<P>
) => {
  const WithOnChangeValue = (
    props: P & {
      onChange?: (ev: React.ChangeEvent) => void;
      onChangeValue?: (newText: string) => void;
    }
  ) => {
    // put your code here
    const onChange = (ev: React.ChangeEvent<Element>) => {
      if (props.onChangeValue) {
        props.onChangeValue((ev.target as HTMLInputElement).value);
      }
      if (props.onChange) {
        props.onChange(ev);
      }
    };
    return <Component onChange={onChange} />;
  };

  WithOnChangeValue.displayName = `${
    Component.displayName || Component
  }withOnChangeValue`;

  return WithOnChangeValue;
};
