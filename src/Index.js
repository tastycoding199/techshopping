import { hot } from "react-hot-loader/root";
import React from 'react';
import reactDom from 'react-dom';
import App from './App';


const render = (Component) =>
  reactDom.render(<Component />, document.getElementById("root"));

render(hot(App));
