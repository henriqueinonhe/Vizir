import React from "react";
import ReactDOM from "react-dom";

function App() : JSX.Element
{
  return (
    <>
      Hello World!
    </>
  );
}

const rootNodeId = "root";
const rootNode = document.getElementById(rootNodeId);
ReactDOM.render(<App />, rootNode);