import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Graph from "./Graph";

const DateSelect = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  // const [labels, setLabels] = useState([]);
  // utility function
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let dd = [year, month, day].join("-");
    // console.log(typeof dd);
    return dd;
  }

  // const demo = (e) => {
  //   e.preventDefault();
  //   console.log("demo function");
  // };

  const clickHandler = async (e) => {
    e.preventDefault();
    // console.log("working function");
    let sDate = formatDate(startDate);
    let eDate = formatDate(endDate);
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${sDate}&end_date=${eDate}&api_key=mu0GPf5WAdJNRZx2a8trsymlRtD7KmZ3kXysqaXN`;

    const response = await fetch(url);
    // console.log(response.data);
    const resJson = response.json();
    // console.log(resJson);

    // what to do with the data
    resJson.then((result) => {
      // console.log(sDate);
      const data = result.near_earth_objects;
      setData(data);

      // console.log(data);

      // const labelData = labels.map((date) => {
      //   return date;
      // });
      // console.log(labelData);
    });
  };

  // useEffect(() => {
  //   //   // console.log(data);
  //   // setLabels(Object.keys(data));
  //   console.log(Object.keys(data));
  //   //   console.log(labels);
  // }, [data]);

  // console.log(startDate);
  // console.log(endDate);
  if (data.length !== 0) {
    return <Graph data={data} />;
  }
  return (
    <div
      className="container d-flex justify-content-center border mt-5 align-items-center"
      style={{ height: "80vh" }}
    >
      <div className="mx-auto p-2" style={{ width: "200px" }}>
        <form>
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
          <br />
          <br />
          End Date:
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
          <br />
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={clickHandler}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DateSelect;
