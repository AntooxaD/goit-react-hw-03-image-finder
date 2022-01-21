import { BallTriangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Spinner } from "../Style/styled";

export default function LoaderSpin({ radius }) {
  return (
    <Spinner>
      <BallTriangle color="#3f51b5" radius={radius} />
    </Spinner>
  );
}
