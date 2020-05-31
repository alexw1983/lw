import React from "react";
import { IEquipment } from "../../../../redux/types";
import { ListGroupItem, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

interface Props {
  items: IEquipment[];
  equipmentType: string;
  removeFn?: (item: IEquipment) => void | undefined;
}

const EquipmentItems = (props: Props) => {
  return (
    <>
      {props.items
        .filter((x) => x.type === props.equipmentType)
        .map((item, idx) => (
          <ListGroupItem key={`${props.equipmentType}_${item.id}_${idx}`}>
            {item.name}
            {props.removeFn && (
              <Button
                className="float-right"
                onClick={() => props.removeFn(item)}
              >
                <Trash />
              </Button>
            )}
          </ListGroupItem>
        ))}
    </>
  );
};

export default EquipmentItems;
