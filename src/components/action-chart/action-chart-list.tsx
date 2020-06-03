import * as React from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { IEquipment } from "../../redux/types";

interface Props {
  header: string;
  items: IEquipment[];
  onRemove?: (item: IEquipment) => void;
}

const ActionChartList: React.FC<Props> = (props) => {
  return (
    <>
      <h5 className="mt-3">{props.header}</h5>
      <ListGroup>
        {props.items.map((item, idx) => {
          return (
            <ListGroupItem key={`action-chart-${item.id}-${idx}`}>
              {item.name}
              {props.onRemove && (
                <Button
                  className="float-right"
                  onClick={() => props.onRemove(item)}
                >
                  <Trash />
                </Button>
              )}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </>
  );
};

export default ActionChartList;
