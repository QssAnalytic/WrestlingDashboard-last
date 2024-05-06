import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const OveralCircle = ({ percentage }) => (
  <div>
    <CircularProgressbar
      value={percentage || 0}
      text={`${percentage || 0}`}
      styles={{
        root: {},
        path: {
          stroke: `${
            percentage <= 20
              ? "#E51818"
              : percentage >= 21 && percentage <= 40
              ? "#D15935"
              : percentage >= 41 && percentage <= 60
              ? "#E4AC51"
              : percentage >= 61 && percentage <= 80
              ? "#85D450"
              : "#4CA631"
          }`,
          strokeLinecap: "round",
          transition: "stroke-dashoffset 0.5s ease 0s",
          transform: "rotate(1turn)",
          transformOrigin: "center center",
        },
        trail: {
          stroke: "rgba(43, 45, 51, 1)",
          strokeLinecap: "butt",
          transform: "rotate(0turn)",
          transformOrigin: "center center",
        },
        text: {
          fill: "#fff",
          fontWeight: "500",
          textAlign: "center",
          fontFamily: "Carlito",
          fontSize: "27.256px",
          fontStyle: "normal",
          lineHeight: "normal",
        },
        background: {
          fill: "#3e98c7",
        },
      }}
    />
  </div>
);

export default OveralCircle;
