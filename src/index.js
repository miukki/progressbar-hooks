import React from "react";
import ReactDOM from "react-dom";

import Stepper from "./Stepper";

const targetIntValue = fn => ({ target: { value } }) => fn(+value);

function App() {
  const [width, widthSet] = React.useState(800);

  const [steps, stepsSet] = React.useState([`title1`, `title2`, `title3`]);

  const [current, currentSet] = React.useState(1);

  return (
    <>
      <input value={width} onChange={targetIntValue(widthSet)} />

      <div style={{ width }}>
        <Stepper steps={steps} current={current} onItemClick={currentSet} />
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
