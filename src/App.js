import "./App.css";
import ReactSpeedometer from "react-d3-speedometer";
import { useState } from "react";
import { getData, helpingFunc, calculate } from "./utils/utils";

function App() {
  const [searchState, setSearchState] = useState("");
  const [data, setData] = useState(0);

  async function handleClick() {
    setData(0);
    const stringParam = await getData(searchState);
    const fetchedData = await helpingFunc(stringParam);
    console.log(fetchedData)
    const result =  calculate(fetchedData).toFixed(1);
     setData(Number(result));
  }

  return (
    <div className="App">
      <div className="main">
        <h1 className="mainHeading">Keyword Search Volume</h1>
        <div className="search-div">
          <input
            name="search"
            onChange={(e) => {
              setSearchState(e.target.value);
            }}
            value={searchState}
          />
          <button
            className="btn-div"
            onClick={() => {
              handleClick();
            }}
          >
            Submit
          </button>
        </div>
        <div className="vol-container">
          <ReactSpeedometer
            width={500}
            maxValue={9999999 }
            minValue={0}
            needleHeightRatio={0.8}
            value={data}
            currentValueText="Overall Volume"
            customSegmentLabels={[
              {
                text: "Very Low",
                position: "INSIDE",
                color: "#555",
              },
              {
                text: "Low",
                position: "INSIDE",
                color: "#555",
              },
              {
                text: "Medium",
                position: "INSIDE",
                color: "#555",
              },
              {
                text: "High",
                position: "INSIDE",
                color: "#555",
              },
              {
                text: "Very High",
                position: "INSIDE",
                color: "#555",
              },
            ]}
            ringWidth={80}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            needleColor={"#000"}
            textColor={"#000"}
          />
          <div className="vol-data">
            <p>Volume of searched keyword is {data}/month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
