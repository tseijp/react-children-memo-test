import * as React from "react";
import { createRoot } from "react-dom/client";
import { useIsSwitch, useRefUpdate } from "./hooks";
import { mainStyle, itemStyle } from "./styles";

const App = () => {
  return (
    <Container fallback={<Item>FALLBACK</Item>}>
      <Item isMemoed>CHILDREN</Item>
    </Container>
  );
};

const Container = ({ fallback, children }) => {
  const $main = useRefUpdate();
  const isSwitch = useIsSwitch();

  return (
    <main ref={$main} style={mainStyle}>
      <div style={{ width: "80%" }}>not memoed</div>
      {/* not memoed 1 */}
      {!isSwitch && children}
      {isSwitch && fallback}
      {/* not memoed 2 */}
      {isSwitch ? fallback : <>{children}</>}
      {isSwitch ? <>{fallback}</> : children}
      <div style={{ width: "80%" }}>memoed</div>
      {/* memoed 1 */}
      <span style={isSwitch ? { display: "none" } : {}}>{children}</span>
      <span style={isSwitch ? {} : { display: "none" }}>{fallback}</span>
      {/* memoed 2 */}
      {isSwitch ? fallback : children}
      {isSwitch ? <>{fallback}</> : <>{children}</>}
    </main>
  );
};

const Item = ({ children }) => {
  const $div = useRefUpdate();
  const id = React.useId();

  return (
    <div ref={$div} style={itemStyle}>
      {children}
      <span style={{ fontSize: "1rem" }}>{id}</span>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
