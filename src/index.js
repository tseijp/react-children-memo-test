import * as React from "react";
import { createRoot } from "react-dom/client";
import { useForceUpdate, useIsSwitch, useRefUpdate } from "./hooks";
import { mainStyle, itemStyle } from "./styles";

const App = () => {
  const update = useForceUpdate();
  React.useEffect(() => {
    window.addEventListener("keydown", update);
    return () => window.removeEventListener("keydown", update);
  });
  return (
    <Container fallback={<Item>FALLBACK</Item>}>
      <Item>CHILDREN</Item>
    </Container>
  );
};

const Container = ({ fallback, children }) => {
  const $main = useRefUpdate();
  const isSwitch = useIsSwitch();

  return (
    <main ref={$main} style={mainStyle}>
      {/* regenerated 1 */}
      <div style={{ width: "80%" }}>regenerated</div>
      {!isSwitch && children}
      {isSwitch && fallback}
      {/* regenerated 2 */}
      {isSwitch ? fallback : <>{children}</>}
      {/* same */}
      {/* {isSwitch ? <>{fallback}</> : children} */}
      {/* not memoed */}
      <div style={{ width: "80%" }}>not memoed</div>
      {isSwitch ? fallback : children}
      {/* same */}
      {/* {isSwitch ? <>{fallback}</> : <>{children}</>} */}
      {/* memoed */}
      <div style={{ width: "80%" }}>memoed</div>
      <span style={isSwitch ? { display: "none" } : {}}>{children}</span>
      <span style={isSwitch ? {} : { display: "none" }}>{fallback}</span>
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
