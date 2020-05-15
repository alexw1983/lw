import * as React from "react";

interface Props {
  header: string;
  items: string[];
}

const ActionChartList: React.FC<Props> = (props) => {
  return (
    <>
      <h5>{props.header}</h5>
      {props.items.map((item) => {
        return <p>{item}</p>;
      })}
    </>
  );
};

export default ActionChartList;