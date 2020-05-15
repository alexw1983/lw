import * as React from "react";
import { useParams } from "react-router-dom";

const Player: React.FC<{}> = (props) => {
  let { id } = useParams();
  return <p>ID = {id}</p>;
};

export default Player;
