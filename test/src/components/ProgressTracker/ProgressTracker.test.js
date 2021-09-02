import React from "react";
import ProgressTracker from "./index";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { initialState, reducer } from "../../redux/reducer";
import { render, fireEvent, getAllByTitle } from "@testing-library/react";
import "@testing-library/jest-dom";
// function renderWithRedux(
//   ui,
//   {
//     initialState,
//     store = createStore(reducer, initialState, applyMiddleware(logger, thunk)),
//   } = {}
// ) {
//   return {
//     ...render(<Provider store={store}>{ui}</Provider>),
//     store,
//   };
// }
const renderComponent = (initialState) =>
  render(
    <Provider
      store={createStore(reducer, initialState, applyMiddleware(logger, thunk))}
    >
      <ProgressTracker />
    </Provider>
  );

test("All steps are rendered properly", () => {
  const { getAllByTestId } = renderComponent(initialState);

  let arrayOfSteps = getAllByTestId("steps", { selector: "div" });
  expect(arrayOfSteps.length).toBe(5);
  console.log(arrayOfSteps)
});
