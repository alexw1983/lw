import * as React from "react";

interface Props {
  header: string;
  items: string[];
}

const ActionChartList: React.FC<Props> = (props) => {
  return (
    <>
      <h5>{props.header}</h5>
      {props.items.map((item, idx) => {
        return <p key={`action-chart-${idx}`}>{item}</p>;
      })}
    </>
  );
};

export default ActionChartList;