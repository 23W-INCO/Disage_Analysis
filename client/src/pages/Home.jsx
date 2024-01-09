import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import "./Loading.css";

const options = [
  {
    value: "Code for Familial hypercholesterolemia",
    label: "Code for Familial hypercholesterolemia",
  },
  { value: "Burn of ear", label: "Burn of ear" },
  { value: "Egg allergy", label: "Egg allergy" },
  {
    value: "Ankylosis of the elbow joint",
    label: "Ankylosis of the elbow joint",
  },
  { value: "Respiratory infections", label: "Respiratory infections" },
  {
    value: "Lower respiratory tract infection",
    label: "Lower respiratory tract infection",
  },
  {
    value: "Unspecified pre-existing hypertension complicating the puerperium",
    label: "Unspecified pre-existing hypertension complicating the puerperium",
  },
  {
    value: "Code for Chronic obstructive pulmonary disease",
    label: "Code for Chronic obstructive pulmonary disease",
  },
  {
    value: "Stenosis of coronary artery stent, sequela",
    label: "Stenosis of coronary artery stent, sequela",
  },
  { value: "Gout", label: "Gout" },
  { value: "Drug hypersensitivity NOS", label: "Drug hypersensitivity NOS" },
  {
    value: "Drug-induced persisting dementia",
    label: "Drug-induced persisting dementia",
  },
  {
    value: "Adverse reaction to erythromycin",
    label: "Adverse reaction to erythromycin",
  },
  {
    value: "Adverse reaction to simvastatin",
    label: "Adverse reaction to simvastatin",
  },
  {
    value: "Adverse reaction to penicillins",
    label: "Adverse reaction to penicillins",
  },
];

const Home = () => {
  

  const {
    apiBaseUrl,
    diseaseDataHandler,
    diseaseData,
    currentData,
    currentDataHandler,
  } = useContext(GlobalContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState(null);
  //   console.log(apiBaseUrl);

  const [Loader, setLoadder] = useState(false);

  useEffect(() => {
    if (selectedOption) {
      diseaseDataHandler([]);
     
      setLoadder(true);
      fetch(`${apiBaseUrl}/${selectedOption.value}`)
        .then((response) => {
          // Check if the request was successful (status code 200-299)
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          // Parse the response as JSON
          return response.json();
        })
        .then((data) => {
          // Handle the data
          console.log(data);
          diseaseDataHandler(data);
          currentDataHandler(selectedOption.value);
          setLoadder(false);
        })
        .catch((error) => {
          // Handle errors during the fetch
          console.error("Fetch error:", error);
          setLoadder(false);
        });
    } else {
      setData(null);
    }
  }, [selectedOption]);

  //   console.log(data);
  console.log(diseaseData);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-[100%] ">
      <div className=" w-[30%]">
        <h1 className="text-4xl font-bold mb-4 text-center"></h1>

        <h1 className="text-5xl font-bold mb-4 text-center">Disage Analysis</h1>
        <div className="flex justify-center items-center">
          <div className="">
            <p className="">
              Introducing "Disage Analysis", your one-stop platform for
              enlightening data visualizations on the age distribution of
              patients with specific medical conditions. Our user-friendly
              interface, designed with healthcare data analysts in
              consideration, lets you choose diseases of interest and displays
              an overall bar charts and  gender-based bar charts. This gives you
              the ability to decide how best to allocate resources and implement
              patient care plans depending on the particular age distributions
              associated with each disease. - Sahan Adikaram (Under the direction of Prof. Dr. Dominik Böhler)
            </p>
          </div>
        </div>
        <p className="text-gray-600 mb-8">
          Explore and analyze disease data for better insights.
        </p>
        <div className="w-84 mx-auto mb-4">
          <Select
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
          />
        </div>
        {data && (
          <div className="text-left">
            <h2 className="text-lg font-bold mb-2">Selected Data:</h2>
            <pre className="bg-gray-200 p-4 rounded-md">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {diseaseData.length !== 0 ? (
          <>
            {" "}
            <h1>{currentData}</h1>
            <div className="space-x-4">
              <Link to="/overallChart">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Overall Chart
                </button>
              </Link>
              <Link to="/maleChart">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Male Chart
                </button>
              </Link>
              <Link to="/femaleChart">
                <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                  Female Chart
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            {Loader ? (
              <>
                {" "}
                <div className="loading-container">
                  <div className="loader"></div>
                  <p className="loading-text">Please wait...</p>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl text-center my-7">
                  Select the condition type
                </h1>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
