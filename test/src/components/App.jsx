import "./App.css";
import Form from "./Form";
import ProgressTracker from "./ProgressTracker";
// import { useSelector } from "react-redux";
export default function App() {



  return (
    <div className="container">
      <div className="main">
        <div className="logo">
          <img src="logo.png" alt="comapny-logo" style={{ display: "block" }} />
        </div>
        <ProgressTracker/>
        <Form/>
      </div>
    </div>
  );
}
