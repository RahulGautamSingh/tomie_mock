import { INCREMENT_CURR_STEP, STORE_USER_DATA } from "./action_types";

export let initialState = {
  user: {},
  currentStep: 0,
  stepInfo: [
    { num: 1, desc: "CREATE YOUR ACCOUNT PASSWORD" },
    { num: 2, desc: "PERSONAL INFORMATION" },
    { num: 3, desc: "EMPLOYMENT DETAILS" },
    { num: 4, desc: "UPLOAD DOCUMENTS" },
    { num: 5, desc: "COMPLETE" },
  ],
};

export function reducer(state = initialState, action) {
  console.log("hello there");
  switch (action.type) {
    case STORE_USER_DATA:
      return { ...state, user: action.payload };
    case INCREMENT_CURR_STEP:
      return { ...state ,currentStep: action.payload};
    default:
      return state;
  }
}
