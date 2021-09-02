import {
  STORE_USER_DATA,
  //    SEND_USER_DATA,
  INCREMENT_CURR_STEP
} from "./action_types";

export let storingUserData = (userData) => ({
  type: STORE_USER_DATA,
  payload: userData,
});
export let incrementCurrStep = (stepVal) => ({
  type: INCREMENT_CURR_STEP,
  payload: stepVal,
});
// sending data to backend server
export let sendingUserDataToServer = (userData) => {
  return async function (dispatch, getState) {
    console.log(userData)
    let url = "http://localhost:3200/users";
    let formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("image", userData.avatar);

    let response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    let data = await response.json();
    console.log(data);
  };
};
