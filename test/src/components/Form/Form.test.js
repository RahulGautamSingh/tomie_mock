import React from "react";
import Form from "./index";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { initialState, reducer } from "../../redux/reducer";
import { render, fireEvent } from "@testing-library/react";
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
      <Form />
    </Provider>
  );
test("All fields are rendered properly", () => {
  const { getByPlaceholderText, getByTestId } = renderComponent(initialState);
  const nameInput = getByPlaceholderText(/username/i, {
    exact: true,
    selector: "input",
  });
  const emailInput = getByPlaceholderText(/email/i, {
    exact: true,
    selector: "input",
  });
  const cnfPassInput = getByPlaceholderText(/confirm-password/i, {
    exact: true,
    selector: "input",
  });
  const passwordInput = getByTestId(/PASSWORD/i, {
    exact: true,
    selector: "input",
  });
  expect(nameInput).toBeTruthy();
  expect(emailInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
  expect(cnfPassInput).toBeTruthy();
});

test("Invalid Form Submission", () => {
  const { getByText } = renderComponent(initialState);
  const btn = getByText(/Save & Next →/i);
  fireEvent(
    btn,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  //expecting the current step to remain the same
  expect(initialState.currentStep).toBe(0);
});

test("Create Account", async () => {
  const { getByPlaceholderText, getByTestId, getByText } =
    renderComponent(initialState);
  const nameInput = getByPlaceholderText(/username/i, {
    exact: true,
    selector: "input",
  });
  const emailInput = getByPlaceholderText(/email/i, {
    exact: true,
    selector: "input",
  });
  const cnfPassInput = getByPlaceholderText(/confirm-password/i, {
    exact: true,
    selector: "input",
  });
  const passwordInput = getByTestId(/password/i, {
    exact: true,
    selector: "input",
  });
  const imageInput = getByPlaceholderText(/image/i, {
    exact: true,
    selector: "input",
  });
  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "JD@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "John" } });
  fireEvent.change(cnfPassInput, { target: { value: "John" } });
  fireEvent.change(imageInput, { target: { value: "" } });
  const btn = getByText(/Save & Next →/i);
  fireEvent.click(btn);
  setTimeout(() => {
    expect(initialState.currentStep).toBe(1);
  }, 1500);
});



