
import "./styles.css";
import { useSelector } from "react-redux";

export default function ProgressTracker() {
  let state = useSelector((state) => state);
  return (
    <div className="progressbar">
      {state.stepInfo.map((step, index) => {
        return (
          <div className="step-box" key={index}>
            <div
              className="step-top"
              style={{
                justifyContent:
                  index === 0
                    ? "flex-end"
                    : index === 4
                    ? "flex-start"
                    : "center",
              }}
            >
              <hr
                className="left-hr"
                style={{ display: index === 0 ? "none" : "flex" }}
              />
              <div
                className={
                  state.currentStep + 1 === step.num ? "circle active" : "circle"
                }
                data-testid="steps"
              >
                {step.num}
              </div>
              <hr
                className="right-hr"
                style={{ display: index === 4 ? "none" : "flex" }}
              />
            </div>
            <div   className={
                  state.currentStep + 1 === step.num ? "step-info active-info" : "step-info"
                }>
              <p className="step-num">{"STEP " + step.num}</p>
              <p className="step-description">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
