import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const Graph = (props) => {
  // console.log(props.data);
  const labels = Object.keys(props.data);
  // console.log(labels);
  const fastAst = [];
  const closeAst = [];
  const diaAst = [];
  const astData = labels.map((ast, index) => {
    let kmphr = props.data[ast].map((element) => {
      return +element.close_approach_data[0].relative_velocity
        .kilometers_per_hour;
    });
    let closeDistAst = props.data[ast].map((element) => {
      return +element.close_approach_data[0].miss_distance.kilometers;
    });
    let estDiameter = props.data[ast].map((element) => {
      return element.estimated_diameter.kilometers.estimated_diameter_max;
    });

    // console.log("estdia", estDiameter);
    const sumDiaOnEachDay = estDiameter.reduce((acc, cv) => {
      return acc + cv;
    }, 0);

    let avgDiaOnEachDay = sumDiaOnEachDay / estDiameter.length;
    // console.log("avg", avgDiaOnEachDay);
    diaAst.push(avgDiaOnEachDay);
    // console.log(closeDistAst);
    const closestOneEachDay = Math.min(...closeDistAst);
    closeAst.push(closestOneEachDay);
    // const key = "abcdef";
    const fastAstEachDay = Math.max(...kmphr);
    fastAst.push(fastAstEachDay);
    return props.data[ast].length;
  });
  console.log("fastAst", fastAst);
  console.log("closeAst", closeAst);
  console.log("diaAst", diaAst);

  // console.log(astData);

  const data = {
    labels,
    datasets: [
      {
        label: "No : of asteroids per day",
        data: astData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <Line options={options} data={data} />
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="colSpan">Date</th>
            {labels.map((ele) => (
              <th scope="colSpan" key={ele}>
                {ele}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="colSpan">Fastest Asteroid(km/hr)</th>
            {fastAst.map((ele) => (
              <th scope="colSpan" key={ele}>
                {ele}
              </th>
            ))}
          </tr>
          <tr>
            <th scope="colSpan">Closest Asteroid(km)</th>
            {closeAst.map((ele) => (
              <th scope="colSpan" key={ele}>
                {ele}
              </th>
            ))}
          </tr>
          <tr>
            <th scope="colSpan">Average Diameter(km)</th>
            {diaAst.map((ele) => (
              <th scope="colSpan" key={ele}>
                {ele}
              </th>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Graph;
