import "./styles.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  incrementCurrStep,
  sendingUserDataToServer,
  storingUserData,
} from "../../redux/actions";
import { useRef } from "react";
import { useState } from "react";
export default function Form() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let nameRef = useRef(),
    emailRef = useRef(),
    passRef = useRef(),
    cnfPassRef = useRef();
  let [image, setImage] = useState(null);
  // let [error, setError] = useState();
  function checkError() {
    if (nameRef.current.value === "") {
      alert("Fill your name");
      return true;
    }
    if (emailRef.current.value === "") {
      alert("Fill your email");
      return true;
    }
    if (passRef.current.value === "") {
      alert("Fill your password");
      return true;
    }
    if (cnfPassRef.current.value === "") {
      alert("Fill your confirm password");
      return true;
    }
    console.log(image);
    if (image === null) {
      alert("Upload avatar");
      return true;
    }
    if (cnfPassRef.current.value !== passRef.current.value) {
      alert("Passwords do not match");
      return true;
    }

    return false;
  }
  return (
    <div className="form-container">
      <p className="form-step-description">
        {state.stepInfo[state.currentStep].desc}
      </p>
      <p className="step-instruction">
        Because there will be documents that you need to prepare to apply for
        the loan, let's start off by creating a password so that you can login
        to your account once you have these document ready.
      </p>

      {state.currentStep === 0 && (
        <div className="form-section">
          <div className="avatar-upload">
            <img src={"Avatar.png"} alt="avatar" />
            <label htmlFor="upload-photo" id="avatar-label">
              {image != null ? "Uploaded" : "Upload"}
            </label>
            <input
              type="file"
              name="photo"
              id="upload-photo"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              placeholder="image"
            />
          </div>
          <div className="user-info">
            <div className="info-box">
              <label htmlFor="username">
                NAME
                <input type="text" name="username" ref={nameRef} placeholder="username"/>
              </label>
            </div>
            <div className="info-box">
              <label htmlFor="email">
                EMAIL
                <input type="email" name="email" ref={emailRef} placeholder="email"/>
              </label>
            </div>
            <div className="info-box" style={{ alignSelf: "flex-end" }}>
              <label htmlFor="password" >
                PASSWORD
                <input type="password" name="password" ref={passRef} placeholder="password" data-testid="password" />
              </label>
            </div>
            <div className="info-box" style={{ alignSelf: "flex-end" }}>
              <label htmlFor="confirm-password">
                CONFIRM PASSWORD
                <input
                  type="password"
                  name="confirm-password"
                  ref={cnfPassRef}
                  placeholder="confirm-password"
                />
              </label>
            </div>
          </div>
        </div>
      )}
      {state.currentStep !== 0 && (
        <div className="other-forms">
          <h1>Coming Soon...</h1>
        </div>
      )}
      <div className="button-div">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (state.currentStep < 4) {
              console.log("yes")
              if (state.currentStep === 0) {
                console.log("yes2")
                if (!checkError()) {
                  console.log("yes3")
                  //store data in redux-store
                  dispatch(
                    storingUserData({
                      name: nameRef.current.value,
                      email: emailRef.current.value,
                      avatar: image,
                      password: passRef.current.value,
                    })
                  );
                  //move to next step
                  console.log("yes4")
                  dispatch(incrementCurrStep(state.currentStep + 1));
                }
              } else dispatch(incrementCurrStep(state.currentStep + 1));
            } else {
              //submit step send data to server
              dispatch(sendingUserDataToServer(state.user));
            }
          }}
        >
          {state.currentStep !== 4 ? "Save & Next →" : "Submit →"}
        </button>
      </div>
    </div>
  );
}
