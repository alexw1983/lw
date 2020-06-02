import * as React from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

interface Props {
  header: string;
  items: string[];
  onRemove?: (item: string) => void;
}

const ActionChartList: React.FC<Props> = (props) => {
  return (
    <>
      <h5 className="mt-3">{props.header}</h5>
      <ListGroup>
        {props.items.map((item, idx) => {
          return (
            <ListGroupItem key={`action-chart-${idx}`}>
              {item}{" "}
              {props.onRemove ? (
                <Button onClick={() => props.onRemove(item)}>
                  <Trash />
                </Button>
              ) : (
                <></>
              )}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </>
  );
};

export default ActionChartList;
